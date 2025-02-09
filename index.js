const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");

const qrcode = require("qrcode-terminal");
const dotenv = require("dotenv");
dotenv.config();

const startBot = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("./auth_info");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false, // QR itaonyeshwa kwa qrcode-terminal
  });

  // QR Code Display
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("🔹 Scan QR Code hii kwenye WhatsApp yako:");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "close") {
      console.log("🔴 Connection closed. Restarting bot...");
      startBot();
    } else if (connection === "open") {
      console.log("✅ MOEBOT-MD imeunganishwa na WhatsApp!");
    }
  });

  sock.ev.on("creds.update", saveCreds);

  // Kusikiliza Messages
  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0];
    const messageText = msg.message?.conversation || "";
    const remoteJid = msg.key.remoteJid;

    console.log(`📩 Ujumbe mpya: ${messageText}`);

    if (messageText === ".ping") {
      await sock.sendMessage(remoteJid, { text: "🏓 Pong!" });
    }

    if (messageText === ".status") {
      await sock.sendMessage(remoteJid, { text: "✅ MOEBOT-MD iko hewani!" });
    }

    if (messageText === ".help" || messageText === ".menu") {
      await sock.sendMessage(remoteJid, {
        text: "🛠 *MOEBOT-MD Commands:*\n\n.ping - Test response\n.status - Check bot status\n.help - List commands",
      });
    }

    // Auto Read Messages
    if (process.env.AUTO_READ_MESSAGES === "yes") {
      await sock.readMessages([msg.key]);
    }

    // Auto View Once
    if (msg.message?.viewOnceMessage) {
      await sock.sendMessage(remoteJid, {
        text: "👀 Nimeona ujumbe wako wa view-once!",
      });
    }

    // Anti-Delete Messages
    sock.ev.on("messages.update", (updates) => {
      updates.forEach((update) => {
        console.log(`❌ Ujumbe umefutwa kutoka ${remoteJid}`);
      });
    });
  });

  // Kusikiliza Status Updates
  sock.ev.on("status-update", async (status) => {
    console.log(`📝 Status mpya kutoka ${status.participant}`);

    if (process.env.AUTO_READ_STATUS === "yes") {
      await sock.readMessages([status.id]);
    }

    if (process.env.AUTO_LIKE_STATUS === "yes") {
      await sock.sendMessage(status.participant, {
        react: { text: "❤️", key: status.key },
      });
    }
  });
};

startBot();
