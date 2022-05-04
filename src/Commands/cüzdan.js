const { MessageEmbed } = require('discord.js');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
const value = require('../Json/guildSettings.json');
const qdb = require('quick.db');
const cdb = new qdb.table("coin")
module.exports = {
  name: "cüzdan",
  aliases: ["cüzdan"],
  run: async(client, message, args) => {

    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
      message.channel.send(embed)
    };


  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])

  if(uye) {
    embed(`${value.Emoji.Coin} | ${uye}, şuanda \`${patavatsizDatabase.coinKontrol(uye) ? patavatsizDatabase.coinKontrol(uye) : "0"}\` coininiz bulunmakta.`)
  }

  if(!uye) {
     embed(`${value.Emoji.Coin} | ${message.author}, şuanda \`${patavatsizDatabase.coinKontrol(message.author) ? patavatsizDatabase.coinKontrol(message.author) : "0"}\` coininiz bulunmakta.`)
  }


  }
}