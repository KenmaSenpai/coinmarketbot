const { MessageEmbed } = require('discord.js');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
const value = require('../Json/guildSettings.json');
const qdb = require('quick.db');
const cdb = new qdb.table("coin")
module.exports = {
  name: "top-coin",
  aliases: ["topcoin", "coinsıralaması", "tcoin"],
  run: async(client, message, args) => {

    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
      message.channel.send(embed).s(20);
    };

    if(![value.Coin.CoinStaff].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return embed("Bu komudu kullanmak için yetkin yetersiz");


      let toplist = message.guild.members.cache.filter(x => cdb.get(`market.${x.id}.coin`)).array().sort((x, y) => Number(cdb.get(`market.${y.id}.coin` || "0")) - Number(cdb.get(`market.${x.id}.coin` || "0"))).slice(0, 20).map((x, i) => `\`${i + 1}.\` ${x}: \`${cdb.get(`market.${x.id}.coin`)} Coin\`${x.id === message.author.id ? " **(Siz)** " : ""}`).join("\n")
      embed(`${toplist}`)
    
  }
}