const { MessageEmbed } = require('discord.js');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
const value = require('../Json/guildSettings.json');
const qdb = require('quick.db');
const cdb = new qdb.table("coin")
module.exports = {
  name: "buy",
  aliases: ["buy"],
  run: async(client, message, args) => {

    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
      message.channel.send(embed)
    };

let ürünid = args[0]
let alıncakürün = coinsistem.Ürünler.SpotifyMarket[coinsistem.Ürünler.SpotifyMarket.indexOf(coinsistem.Ürünler.SpotifyMarket.find(x => x.Id == ürünid))] || coinsistem.Ürünler.NetflixMarket[coinsistem.Ürünler.NetflixMarket.indexOf(coinsistem.Ürünler.NetflixMarket.find(x => x.Id == ürünid))] || coinsistem.Ürünler.NitroMarket[coinsistem.Ürünler.NitroMarket.indexOf(coinsistem.Ürünler.NitroMarket.find(x => x.Id == ürünid))] || coinsistem.Ürünler.ExxenMarket[coinsistem.Ürünler.ExxenMarket.indexOf(coinsistem.Ürünler.ExxenMarket.find(x => x.Id == ürünid))] || coinsistem.Ürünler.YouTubeMarket[coinsistem.Ürünler.YouTubeMarket.indexOf(coinsistem.Ürünler.YouTubeMarket.find(x => x.Id == ürünid))]
let coin = patavatsizDatabase.coinKontrol(message.author)
let category = message.guild.channels.cache.get(value.KategoryID);
if(coin >= alıncakürün.urunFiyati) {
    message.guild.channels.create(`${message.member.displayName}|${alıncakürün.Id}`, {
              parent: category,
            permissionOverwrites: [
                {id: value.EveryoneID, deny: ['VIEW_CHANNEL']},
                {id: message.author.id, allow: [('VIEW_CHANNEL'), ('SEND_MESSAGES')]},
                {id: value.Coin.CoinStaff, allow: [('VIEW_CHANNEL'), ('SEND_MESSAGES')]}]
            })
            patavatsizDatabase.coinSil(message.author, alıncakürün.urunFiyati)
            message.react(value.Emoji.Check)
}
 if(coin < alıncakürün.urunFiyati) {
   embed("Hata: Coininiz yetersiz.")
 }

 if(!ürünid) return embed("Hata: Bir ürün id'si girin")

  }
}
