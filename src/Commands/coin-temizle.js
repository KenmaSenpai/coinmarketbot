const { MessageEmbed } = require('discord.js');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
const value = require('../Json/guildSettings.json');
const qdb = require('quick.db');
const cdb = new qdb.table("coin")
module.exports = {
  name: "coin-temizle",
  aliases: ["cointemizle", "coinsıfırla"],
  run: async(client, message, args) => {

    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
      message.channel.send(embed).s(20);
    };

    if(![value.Coin.CoinStaff].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return embed("Bu komudu kullanmak için yetkin yetersiz");

let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
   if(!uye || uye.id === message.author.id || uye.roles.highest.position >= message.member.roles.highest.position || uye.id === message.guild.OwnerID || uye.bot) return embed("Hata: Bu kullanıcının coinini sıfırlayamazsın veya bir kullanıcı belirtmedin")

patavatsizDatabase.coinSifirla(uye)

    embed(`${uye} kullanıcısının hesabındaki coinler başarıyla sıfırlandı`)
    message.react(value.Emoji.Check)
  }
}