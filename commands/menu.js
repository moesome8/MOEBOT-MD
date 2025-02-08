module.exports = async (sock, chatId) => {
    const menuMessage = `╭━━━〔 *MOEBOT-MD* 〕━━━┈⊷
┃★╭──────────────
┃★│ Owner : *MOE VIPPEER*
┃★│ Baileys : *Multi Device*
┃★│ Type : *NodeJs*
┃★│ Platform : *Heroku*
┃★│ Mode : *[private]*
┃★│ Prefix : *[.]*  
┃★│ Version : *V.5 Bᴇᴛᴀ*
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
╭━━〔 *Download Menu* 〕━━┈⊷
┃◈┃• facebook
┃◈┃• mediafire
┃◈┃• tiktok
┃◈┃• twitter
┃◈┃• youtube
┃◈┃• spotify
┃◈┃• apk
┃◈└───────────┈⊷
╰──────────────┈⊷
╭━━〔 *Group Menu* 〕━━┈⊷
┃◈┃• grouplink
┃◈┃• kick
┃◈┃• promote 
┃◈┃• demote
┃◈┃• revoke
┃◈┃• setwelcome
┃◈┃• delete 
┃◈┃• mute
┃◈┃• unmute
┃◈┃• tagall
┃◈└───────────┈⊷
╰──────────────┈⊷
╭━━〔 *Fun Menu* 〕━━┈⊷
┃◈┃• joke
┃◈┃• ship
┃◈┃• insult
┃◈┃• pickup 
┃◈┃• truth
┃◈┃• dare
┃◈└───────────┈⊷
╰──────────────┈⊷
╭━━〔 *Vision* 〕━━┈⊷
┃◈ Our Vision:
┃◈ To empower our users with innovative WhatsApp automation.
┃◈ Delivering reliability and creativity,
┃◈ we aim to set the benchmark in messaging bots.
╰──────────────┈⊷
> *©️ ᴘᴏᴡᴇʀᴇᴅ ʙʏ MOEMD-BOT☠️*`;

    await sock.sendMessage(chatId, { text: menuMessage });
};
