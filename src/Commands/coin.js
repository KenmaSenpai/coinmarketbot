const { MessageEmbed } = require('discord.js');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
const value = require('../Json/guildSettings.json');
const qdb = require('quick.db');
const cdb = new qdb.table("coin")
module.exports = {
  name: "coin",
  aliases: ["coin"],
  run: async(client, message, args) => {

    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
      message.channel.send(embed).s(10);
    };

    if(![value.Coin.CoinStaff].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return embed("Bu komudu kullanmak için yetkin yetersiz");

    if(!args[0]) return embed("Hata: Bir işlem belirtin\n\`.coin ekle/çıkar/temizle\`");
    if(!args[0].includes("ekle") && !args[0].includes("çıkar")) return embed("Hata: Yalnızca ekle/çıkar parametrelerini kullanabilirsiniz.")



  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
   if(!uye || uye.id === message.author.id || uye.roles.highest.position >= message.member.roles.highest.position || uye.id === message.guild.OwnerID || uye.bot) return embed("Hata: Bu kullanıcıya coin veremezsin veya bir kullanıcı belirtmedin")

    let miktar = Number(args[2])
    if(!miktar) return embed("Hata: Bir miktar belirtin");

    if(args[0] === "ekle") {
    patavatsizDatabase.coinEkle(uye, miktar)
    let coinAmount = patavatsizDatabase.coinKontrol(uye)
    embed(`${uye} kullanıcısının hesabına başarıyla **${miktar}** coin eklendi\n${value.Emoji.Coin} | kullanıcının yeni toplam coin miktarı: **${coinAmount}**`)
    message.react(value.Emoji.Check)
    }

    if(args[0] === "çıkar") {
    patavatsizDatabase.coinSil(uye, miktar)
    let coinAmount = patavatsizDatabase.coinKontrol(uye)

    embed(`${uye} kullanıcısının hesabından başarıyla **${miktar}** coin çıkarıldı\n${value.Emoji.Coin} | kullanıcının yeni toplam coin miktarı: **${coinAmount}**`)
    message.react(value.Emoji.Check)
    }
  


  }
}