const { MessageEmbed } = require('discord.js');
const value = require('../Json/guildSettings.json');
module.exports = {
  name: "temizle",
  aliases: ["sil", "temizle"],
  run: async(client, message, args) => {

     function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
      message.channel.send(embed).s(10)
    }

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return embed("Bu komudu kullanamazsın")

    if(!args[0]) return embed("Hata: Silinecek mesaj miktarını belirtmelisin (1-100)")
    if(isNaN(args[0])) return embed("Hata: Girdiğiniz değer bir sayı olmalıdır")
    if(args[0] > 100 || args[0] < 1) return embed("Hata: Girdiğiniz değer 1 ile 100 arasında olmalıdır")
    message.delete().then(() => {
    message.channel.bulkDelete(args[0])
    embed(`Başarıyla **${args[0]}** adet mesaj silindi!`)
    });
  }
}