const { MessageEmbed } = require('discord.js');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
const ms = require('ms');
const moment = require('moment');
const value = require('../Json/guildSettings.json');
module.exports = {
  name: "ban",
  aliases: ["ban"],
  run: async(client, message, args) => {
    
    function embed(msg) {
    let emd = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
    message.channel.send(emd)
    }

    if(![value.Moderation.BanYT, value.Moderation.GenelYT].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return embed("Hata: Bu komudu kullanmak için yetkin yetersiz.");


    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return embed("Hata: Lütfen bir kullanıcı belirt.")
    if(user.id === message.author.id || user.id === message.guild.OwnerID || user.bot || user.roles.highest.position >= message.member.roles.highest.position || !user.bannable) return embed("Hata: Bu kullanıcıyı yasaklayamam.");


    let cezano = await patavatsizDatabase.cezaNoCek() + 1
    let reason = args.slice(1).join(" ") || "yok"
    patavatsizDatabase.cezaEkle(user, message.author, reason, "yok", "yok", moment(Date.now()).locale("tr").format("LLL"), cezano, "ban")
    message.guild.members.cache.get(user.id).ban({reason: reason})
    message.channel.send(`${value.Emoji.Check} | \`${user.user.tag}\` başarıyla sunucudan yasaklandı. \`(#${cezano})\``);
    client.channels.cache.get(value.Moderation.banLog).send(new MessageEmbed().setColor("RANDOM").setDescription(`\`(${user.user.tag} - ${user.id})\` sunucudan yasaklandı!\n\n\`>\` **Ceza Numarası: #${cezano}**\n\`>\`** Ceza Türü: "BAN"**\n\`>\` **Cezayı Veren:** ${message.author} \`(${message.author.tag} - ${message.author.id})\`\n\`>\` **Tarih: ${moment(Date.now()).locale("tr").format("LLL")}**`).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})))


  }
}