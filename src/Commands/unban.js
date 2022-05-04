const { MessageEmbed } = require('discord.js');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
const value = require("../Json/guildSettings.json");
module.exports = {
  name: "unban",
  aliases: ["unban"],
  run: async(client, message, args) => {
    function embed(msg) {
    let emd = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
    message.channel.send(emd)
    }

    if(![value.Moderation.BanYT, value.Moderation.GenelYT].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return embed("Hata: Bu komudu kullanmak için yetkin yetersiz.");

    if(!args[0] || isNaN(args[0])) return embed("Hata: Bir kullanıcı id'si belirtin.").s(10)


    let user = await client.users.fetch(args[0])
    message.guild.members.unban(user.id);
    embed(`\`${args[0]}\` idli kullanıcının banı başarıyla açıldı!`)
  }
}