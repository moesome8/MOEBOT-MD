const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    DisconnectReason,
} = require("@whiskeysockets/baileys");
const fs = require("fs");
const path = require("path");
const qrcode = require("qrcode-terminal");
require("dotenv").config();

async function startBot() {
    const { state, saveCreds } =
        await useMultiFileAuthState("auth_info_baileys");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        syncFullHistory: true,
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (connection === "open") {
            console.log("✅ Bot imeunganishwa kwenye WhatsApp!");
        } else if (connection === "close") {
            console.log("❌ Muunganisho umefungwa:", lastDisconnect.error);
            if (
                lastDisconnect.error?.output?.statusCode !==
                DisconnectReason.loggedOut
            ) {
                console.log("🔄 Reconnecting...");
                startBot();
            }
        }
        if (qr) {
            console.log(
                "QR Code imeonekana, lakini imezimwa kuonyesha kutokana na credentials sahihi.",
            );
        }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.remoteJid.endsWith("@g.us")) return;

        const from = msg.key.remoteJid;
        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        console.log(`📩 Ujumbe mpya kutoka ${from}: ${text}`);

        if (text.toLowerCase() === "hello") {
            await sock.sendMessage(from, { text: "Hello! I am MOE☠️ Bot 🤖." });
        } else if (text.toLowerCase() === "sticker") {
            const quoted =
                msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
            if (quoted && quoted.imageMessage) {
                try {
                    const buffer = await sock.downloadMediaMessage({
                        message: quoted,
                    });
                    await sock.sendMessage(from, { sticker: buffer });
                } catch (error) {
                    console.error("Error converting image to sticker:", error);
                }
            }
        } else if (text.toLowerCase() === "download") {
            const quoted =
                msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
            if (
                quoted &&
                (quoted.imageMessage ||
                    quoted.videoMessage ||
                    quoted.audioMessage)
            ) {
                try {
                    const media = await sock.downloadMediaMessage({
                        message: quoted,
                    });
                    const fileName = `downloads/${Date.now()}.jpg`;
                    fs.writeFileSync(fileName, media);
                    await sock.sendMessage(from, {
                        text: `✅ Media downloaded: ${fileName}`,
                    });
                } catch (error) {
                    console.error("Error downloading media:", error);
                }
            }
        }
    });

    console.log("✅ MOE☠️ Bot is running in private mode!");
}

startBot().catch((err) => console.error("Error starting bot:", err));
