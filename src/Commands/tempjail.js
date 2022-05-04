const { MessageEmbed } = require('discord.js');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
const value = require("../Json/guildSettings.json");
const qdb = require('quick.db');
const kdb = new qdb.table("kullanici")
const moment = require('moment');
const ms = require('ms');
module.exports = {
  name: "tempjail",
  aliases: ["tempjail", "sürelijail"],
  run: async(client, message, args) => {
    function embed(msg) {
    let emd = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
    message.channel.send(emd)
    }

    if(![value.Moderation.JailYT, value.Moderation.GenelYT].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return embed("Hata: Bu komudu kullanmak için yetkin yetersiz.");

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return embed("Hata: Lütfen bir kullanıcı belirt.")
    if(user.id === message.author.id || user.id === message.guild.OwnerID || user.bot || user.roles.highest.position >= message.member.roles.highest.position || !user.bannable) return embed("Hata: Bu kullanıcıyı jaile atamam.");

    let sure = args[1];
    let reason = args.splice(2).join(" ") || "yok"
    if(!sure || !ms(sure) || !reason) return embed("Hata: Geçerli bir süre (1s/1m/1h/1d) ve sebep belirtmelisin!")
    let logsure = sure.replace("s", " Saniye").replace("d", " Gün").replace("h", " Saat").replace("m", " Dakika")


    let cezano = await patavatsizDatabase.cezaNoCek() + 1
    let beforeJailRoles = user.roles.cache.filter(role => role.name !== "@everyone").forEach(x => user.roles.cache.get(x.id));
   await kdb.set(`tempjail.${user.id}.roles`, beforeJailRoles)
       patavatsizDatabase.cezaEkle(user, message.author, reason, sure, Date.now()+ms(sure), moment(Date.now()).locale("tr").format("LLL"), cezano, "tempjail" ); 
    user.roles.cache.filter(role => role.id !== value.Register.Booster).forEach(x => {
      user.roles.remove(x.id)
    });
    user.roles.add(value.Moderation.Jail)
    message.channel.send(`${value.Emoji.Check} ${user} kullanıcısının sunucuya erişimi başarıyla yasaklandı!`)
        client.channels.cache.get(value.Moderation.jailLog).send(new MessageEmbed().setColor("RANDOM").setDescription(`\`(${user.user.tag} - ${user.id})\` sunucuya erişimi yasaklandı!\n\n\`>\` **Ceza Numarası: #${cezano}**\n\`>\`** Ceza Türü: "TEMPJAIL"**\n\`>\` **Cezayı Veren:** ${message.author} \`(${message.author.tag} - ${message.author.id})\`\n\`>\` **Tarih: ${moment(Date.now()).locale("tr").format("LLL")}**\n\`>\` **Bitiş Tarihi: ${moment(Date.now()+ms(sure)).locale("tr").format("LLL")}**`).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})))

  setTimeout(async () => { 
let afterJailRoles = await kdb.get(`tempjail.${user.id}.roles`) || [];
await user.roles.add(afterJailRoles);
  }, ms(sure))  
}
}