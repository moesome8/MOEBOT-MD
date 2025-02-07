module.exports = async (sock, chatId) => {
    const menuMessage = `╭━━━〔 *MOEBOT-MD* 〕━━━┈⊷
┃★╭──────────────
┃★│ Owner : *MOE VIPPEER*
┃★│ Baileys : *Multi Device*
┃★│ Type : *NodeJs*
┃★│ Platform : *Heroku*
┃★│ Mode : *[public]*
┃★│ Prefix : *[.]*  
┃★│ Version : *V.1 Bᴇᴛᴀ*
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
> *©️ ᴘᴏᴡᴇʀᴇᴅ ʙʏ MOEMD-BOT☠️*`;

    await sock.sendMessage(chatId, { text: menuMessage });
};
