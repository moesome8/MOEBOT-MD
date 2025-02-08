// main.js

const settings = require('./settings');
require('./config.js');
const fs = require('fs');
const { MessageType } = require('@whiskeysockets/baileys');

// Import commands (hakikisha mafaili yako yako kwenye folder ya 'commands')
const menuCommand = require('./commands/menu');
const pingCommand = require('./commands/ping');
const aliveCommand = require('./commands/alive');
const runtimeCommand = require('./commands/runtime');
const stickerCommand = require('./commands/sticker');
const ttsCommand = require('./commands/tts');
const viewOnceCommand = require('./commands/viewonce');
const autostatusviewCommand = require('./commands/autostatusview');
const { handleChatbotResponse } = require('./commands/chatbot');
const { Antilink } = require('./lib/antilink');
const { handleBadwordDetection } = require('./lib/antibadword');

// Global settings
global.packname = settings.packname;
global.author = settings.author;
global.channelLink = "https://wa.me/message/HEYNTN2KD6K7O1";
global.ytch = "MOE VIPPEER";

// Global channel configuration
const channelInfo = {
    contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363161513685998@newsletter',
            newsletterName: 'MOEBOT-MD',
            serverMessageId: -1
        }
    }
};

async function handleMessages(sock, messageUpdate) {
    try {
        const { messages, type } = messageUpdate;
        if (type !== 'notify') return;

        const message = messages[0];
        if (!message?.message) return;

        const chatId = message.key.remoteJid;
        const senderId = message.key.participant || message.key.remoteJid;
        const isGroup = chatId.endsWith('@g.us');

        let userMessage = message.message.conversation ||
            message.message.extendedTextMessage?.text || '';
        userMessage = userMessage.trim().toLowerCase();

        console.log(`📩 New Message from ${senderId}: ${userMessage}`);

        // Process commands in private chats only
        if (!isGroup) {
            if (userMessage === '.menu') {
                await menuCommand(sock, chatId);
            } else if (userMessage === '.ping') {
                await pingCommand(sock, chatId);
            } else if (userMessage === '.alive') {
                await aliveCommand(sock, chatId);
            } else if (userMessage === '.runtime') {
                await runtimeCommand(sock, chatId);
            } else if (userMessage === '.sticker') {
                await stickerCommand(sock, chatId, message);
            } else if (userMessage.startsWith('.tts')) {
                await ttsCommand(sock, chatId, message);
            } else if (userMessage === '.viewonce') {
                await viewOnceCommand(sock, chatId, message);
            } else if (userMessage === '.autostatusview') {
                await autostatusviewCommand(sock, chatId);
            } else {
                console.log(`⚠️ Command not recognized: ${userMessage}`);
            }
        } else {
            // Processing for group chats (optional)
            if (userMessage) {
                await handleChatbotResponse(sock, chatId, message, userMessage, senderId);
            }
            await Antilink(message, sock);
            await handleBadwordDetection(sock, chatId, message, userMessage, senderId);
        }
    } catch (error) {
        console.error('Error in message handler:', error);
        if (message && message.key.remoteJid) {
            await sock.sendMessage(message.key.remoteJid, { text: '❌ Failed to process command!', ...channelInfo });
        }
    }
}

module.exports = {
    handleMessages,
};
