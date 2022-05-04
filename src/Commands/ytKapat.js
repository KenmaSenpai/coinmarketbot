const { MessageEmbed } = require('discord.js');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
const value = require('../Json/guildSettings.json');
module.exports = {
  name: "ytkapat",
  alises: ["ytkapat"],
  run: async(client, message, args) => {
    
    function embed(msg) {
    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg).setThumbnail()
    message.channel.send(embed).s(10)
  }

      function lembed(msg) {
    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg).setThumbnail()
    client.channels.cache.get(value.Moderation.ytLog).send(embed)
  }

    if(message.member.id !== message.guild.owner.id) return embed("Bu komudu kullanamazsın")

   function ytKapat(log, author, guild) {
     guild.roles.cache.filter(x => x.editable && x.permissions.has("ADMINISTRATOR")).forEach(x => {
       x.setPermissions(0)
     });
     log.send(lembed(`${author} tarafından bütün yetkiler kapatıldı!`))
    }

    ytKapat(client.channels.cache.get(value.Moderation.ytLog), message.author, client.guilds.cache.get(value.sunucuID))

  }
}