const { MessageEmbed } = require('discord.js');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
const value = require("../Json/guildSettings.json");
module.exports = {
  name: "banlist",
  aliases: ["banlist", "banliste"],
  run: async(client, message, args) => {
    function embed(msg) {
    let emd = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
    message.channel.send(emd)
    }

    if(![value.Moderation.BanYT, value.Moderation.GenelYT].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return embed("Hata: Bu komudu kullanmak için yetkin yetersiz.");

    message.guild.fetchBans().then(ban => {
      if(ban.size >= 30) {
        embed(`${ban.size} adet banlanmış üye bulundu.\n\`30'dan fazla banlanmış üye olduğundan listelenemedi!\``)
      }
      if(ban.size < 30) {
        embed(`${ban.size} adet banlanmış üye bulundu.\n${ban.map(x => `\`${x}\``).join("\n")}`)
      }
    })

  }
}