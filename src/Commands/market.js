const { MessageEmbed } = require('discord.js');
const { patavatsizDatabase } = require('../Helpers/patavatsizDatabase');
const value = require('../Json/guildSettings.json');
const qdb = require('quick.db');
const cdb = new qdb.table("coin")
const table = require("table");
module.exports = {
  name: "market",
  aliases: ["market"],
  run: async(client, message, args) => {

    function embed(msg) {
      let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
      message.channel.send(embed)
    };

    let puansorgu = await patavatsizDatabase.coinKontrol(message.author)
    let nurundata = coinsistem.Ürünler.NetflixMarket
    let nurunler = [["ID", "Ürün İsmi", "Ürün Detayı" ,"Ürün Fiyatı"]];
       nurunler = nurunler.concat(nurundata.map(xvalue => { 
         let urunfiyatioku = `${xvalue.urunFiyati} 💵`	
          return [
          `${xvalue.Id}`,
          `${xvalue.urunAdi}`,
          `${xvalue.urunDetayi}`,
          `${urunfiyatioku}`
        ]
    }))
    
        let eurundata = coinsistem.Ürünler.ExxenMarket
        let eurunler = [["ID", "Ürün İsmi", "Ürün Detayı" ,"Ürün Fiyatı"]];
       eurunler = eurunler.concat(eurundata.map(xvalue => { 
         let urunfiyatioku = `${xvalue.urunFiyati} 💵`	
          return [
          `${xvalue.Id}`,
          `${xvalue.urunAdi}`,
          `${xvalue.urunDetayi}`,
          `${urunfiyatioku}`
        ]
    }))


        let yurundata = coinsistem.Ürünler.YoutubeMarket
        let yurunler = [["ID", "Ürün İsmi", "Ürün Detayı" ,"Ürün Fiyatı"]];
       yurunler = yurunler.concat(yurundata.map(xvalue => { 
         let urunfiyatioku = `${xvalue.urunFiyati} 💵`	
          return [
          `${xvalue.Id}`,
          `${xvalue.urunAdi}`,
          `${xvalue.urunDetayi}`,
          `${urunfiyatioku}`
        ]
    }))


    let niurundata = coinsistem.Ürünler.NitroMarket
        let niurunler = [["ID", "Ürün İsmi", "Ürün Detayı" ,"Ürün Fiyatı"]];
       niurunler = niurunler.concat(niurundata.map(xvalue => { 
         let urunfiyatioku = `${xvalue.urunFiyati} 💵`	
          return [
          `${xvalue.Id}`,
          `${xvalue.urunAdi}`,
          `${xvalue.urunDetayi}`,
          `${urunfiyatioku}`
        ]
    }))


    let surundata = coinsistem.Ürünler.SpotifyMarket
        let surunler = [["ID", "Ürün İsmi", "Ürün Detayı" ,"Ürün Fiyatı"]];
       surunler = surunler.concat(surundata.map(xvalue => { 
         let urunfiyatioku = `${xvalue.urunFiyati} 💵`	
          return [
          `${xvalue.Id}`,
          `${xvalue.urunAdi}`,
          `${xvalue.urunDetayi}`,
          `${urunfiyatioku}`
        ]
    }))
    
    let xembed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(value.Embed.Footer).setTimestamp()
    
    let msg = await message.channel.send(xembed.setDescription(`${value.Emoji.Yildiz1} **"Lucy Coin" MAGZASININ ANA SAYFASINA HOSGELDIN**\n\n${value.Emoji.Yildiz2} **1. Sayfa : Netflix Mağzası**\n${value.Emoji.Yildiz2} **2. Sayfa : Exxen Mağzası**\n${value.Emoji.Yildiz2} **3. Sayfa : YouTube Mağzası**\n${value.Emoji.Yildiz2} **4. Sayfa : Nitro Mağzası**\n${value.Emoji.Yildiz2} **5. Sayfa : Spotify Mağzası**\n\n${value.Emoji.Coin} **Cüzdanınızda ${puansorgu} coin bulunmakta.**\n\n**Nasıl satın alım yapabilirim?**\n${value.Emoji.Yildiz1} Her ürünün kendine ait tag kategorisi ve kodları bulunur, örneğin #N Netflix'i, #E Exxen'i simgeler, kodlar ise birer birer artar (#N1, #N2 gibi). Alttaki emojilere basarak mağzalar arasında gezebilirsiniz. Satın almak için \`.buy ürün_kodu\` kodunu kullanabilirsin, eğer cüzdanında yeterince coinin varsa; cüzdanından fiyatı kadar coin eksilecek ve sana bir kanal açılacak, bu kanalda yetkililerimiz size ürünü teslim edecek.`))
    let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
    await msg.react(value.Emoji.AnaSayfa)
    await msg.react(value.Emoji.C1)
    await msg.react(value.Emoji.C2)
    await msg.react(value.Emoji.C3)
    await msg.react(value.Emoji.C4)
    await msg.react(value.Emoji.C5)
    await msg.react(value.Emoji.Cross)


    collector.on("collect", async (reaction, user) => {
    if(reaction.emoji.id == '847166857252306955') {
      msg.edit(xembed.setDescription(`**Netflix Mağzası**\n\`\`\`css
${table.table(nurunler, {
          border: table.getBorderCharacters(`void`),
          columnDefault: {
            paddingLeft: 0,
            paddingRight: 1,
        },
        columns: {
          0: {
              paddingLeft: 1
          },
          1: {
              paddingLeft: 1
          },
          2: {
              paddingLeft: 1,
              alignment: "center"
          },
          3: {
              paddingLeft: 1,
              paddingRight: 1,
          },
      },
        /**
        * @typedef {function} drawHorizontalLine
        * @param {number} index
        * @param {number} size
        * @return {boolean}
        */
        drawHorizontalLine: (index, size) => {
          return index === 0 || index === 1 || index === size;
      }
      })}\`\`\`\n${value.Emoji.Yildiz2} **1. Sayfa : Netflix Mağzası**\n${value.Emoji.Yildiz2} **2. Sayfa : Exxen Mağzası**\n${value.Emoji.Yildiz2} **3. Sayfa : YouTube Mağzası**\n${value.Emoji.Yildiz2} **4. Sayfa : Nitro Mağzası**\n${value.Emoji.Yildiz2} **5. Sayfa : Spotify Mağzası**\n\n**Nasıl satın alım yapabilirim?**\n${value.Emoji.Yildiz1} Her ürünün kendine ait tag kategorisi ve kodları bulunur, örneğin #N Netflix'i, #E Exxen'i simgeler, kodlar ise birer birer artar (#N1, #N2 gibi). Alttaki emojilere basarak mağzalar arasında gezebilirsiniz. Satın almak için \`.buy ürün_kodu\` kodunu kullanabilirsin, eğer cüzdanında yeterince coinin varsa; cüzdanından fiyatı kadar coin eksilecek ve sana bir kanal açılacak, bu kanalda yetkililerimiz size ürünü teslim edecek.`))
    }
    if(reaction.emoji.id == '847166857407365160') {
      msg.edit(xembed.setDescription(`**Exxen Mağzası**\n\`\`\`css
${table.table(eurunler, {
          border: table.getBorderCharacters(`void`),
          columnDefault: {
            paddingLeft: 0,
            paddingRight: 1,
        },
        columns: {
          0: {
              paddingLeft: 1
          },
          1: {
              paddingLeft: 1
          },
          2: {
              paddingLeft: 1,
              alignment: "center"
          },
          3: {
              paddingLeft: 1,
              paddingRight: 1,
          },
      },
        /**
        * @typedef {function} drawHorizontalLine
        * @param {number} index
        * @param {number} size
        * @return {boolean}
        */
        drawHorizontalLine: (index, size) => {
          return index === 0 || index === 1 || index === size;
      }
      })}\`\`\`\n${value.Emoji.Yildiz2} **1. Sayfa : Netflix Mağzası**\n${value.Emoji.Yildiz2} **2. Sayfa : Exxen Mağzası**\n${value.Emoji.Yildiz2} **3. Sayfa : YouTube Mağzası**\n${value.Emoji.Yildiz2} **4. Sayfa : Nitro Mağzası**\n${value.Emoji.Yildiz2} **5. Sayfa : Spotify Mağzası**\n\n**Nasıl satın alım yapabilirim?**\n${value.Emoji.Yildiz1} Her ürünün kendine ait tag kategorisi ve kodları bulunur, örneğin #N Netflix'i, #E Exxen'i simgeler, kodlar ise birer birer artar (#N1, #N2 gibi). Alttaki emojilere basarak mağzalar arasında gezebilirsiniz. Satın almak için \`.buy ürün_kodu\` kodunu kullanabilirsin, eğer cüzdanında yeterince coinin varsa; cüzdanından fiyatı kadar coin eksilecek ve sana bir kanal açılacak, bu kanalda yetkililerimiz size ürünü teslim edecek.`))
    }

    if(reaction.emoji.id == '847166856795521044') {
      msg.edit(xembed.setDescription(`**YouTube Mağzası**\n\`\`\`css
${table.table(yurunler, {
          border: table.getBorderCharacters(`void`),
          columnDefault: {
            paddingLeft: 0,
            paddingRight: 1,
        },
        columns: {
          0: {
              paddingLeft: 1
          },
          1: {
              paddingLeft: 1
          },
          2: {
              paddingLeft: 1,
              alignment: "center"
          },
          3: {
              paddingLeft: 1,
              paddingRight: 1,
          },
      },
        /**
        * @typedef {function} drawHorizontalLine
        * @param {number} index
        * @param {number} size
        * @return {boolean}
        */
        drawHorizontalLine: (index, size) => {
          return index === 0 || index === 1 || index === size;
      }
      })}\`\`\`\n${value.Emoji.Yildiz2} **1. Sayfa : Netflix Mağzası**\n${value.Emoji.Yildiz2} **2. Sayfa : Exxen Mağzası**\n${value.Emoji.Yildiz2} **3. Sayfa : YouTube Mağzası**\n${value.Emoji.Yildiz2} **4. Sayfa : Nitro Mağzası**\n${value.Emoji.Yildiz2} **5. Sayfa : Spotify Mağzası**\n\n**Nasıl satın alım yapabilirim?**\n${value.Emoji.Yildiz1} Her ürünün kendine ait tag kategorisi ve kodları bulunur, örneğin #N Netflix'i, #E Exxen'i simgeler, kodlar ise birer birer artar (#N1, #N2 gibi). Alttaki emojilere basarak mağzalar arasında gezebilirsiniz. Satın almak için \`.buy ürün_kodu\` kodunu kullanabilirsin, eğer cüzdanında yeterince coinin varsa; cüzdanından fiyatı kadar coin eksilecek ve sana bir kanal açılacak, bu kanalda yetkililerimiz size ürünü teslim edecek.`))
    }

        if(reaction.emoji.id == '847166856619229193') {
      msg.edit(xembed.setDescription(`**Nitro Mağzası**\n\`\`\`css
${table.table(niurunler, {
          border: table.getBorderCharacters(`void`),
          columnDefault: {
            paddingLeft: 0,
            paddingRight: 1,
        },
        columns: {
          0: {
              paddingLeft: 1
          },
          1: {
              paddingLeft: 1
          },
          2: {
              paddingLeft: 1,
              alignment: "center"
          },
          3: {
              paddingLeft: 1,
              paddingRight: 1,
          },
      },
        /**
        * @typedef {function} drawHorizontalLine
        * @param {number} index
        * @param {number} size
        * @return {boolean}
        */
        drawHorizontalLine: (index, size) => {
          return index === 0 || index === 1 || index === size;
      }
      })}\`\`\`\n${value.Emoji.Yildiz2} **1. Sayfa : Netflix Mağzası**\n${value.Emoji.Yildiz2} **2. Sayfa : Exxen Mağzası**\n${value.Emoji.Yildiz2} **3. Sayfa : YouTube Mağzası**\n${value.Emoji.Yildiz2} **4. Sayfa : Nitro Mağzası**\n${value.Emoji.Yildiz2} **5. Sayfa : Spotify Mağzası**\n\n**Nasıl satın alım yapabilirim?**\n${value.Emoji.Yildiz1} Her ürünün kendine ait tag kategorisi ve kodları bulunur, örneğin #N Netflix'i, #E Exxen'i simgeler, kodlar ise birer birer artar (#N1, #N2 gibi). Alttaki emojilere basarak mağzalar arasında gezebilirsiniz. Satın almak için \`.buy ürün_kodu\` kodunu kullanabilirsin, eğer cüzdanında yeterince coinin varsa; cüzdanından fiyatı kadar coin eksilecek ve sana bir kanal açılacak, bu kanalda yetkililerimiz size ürünü teslim edecek.`))
    }
    if(reaction.emoji.id == '847166856996323428') {
      msg.edit(xembed.setDescription(`**Spotify Mağzası**\n\`\`\`css
${table.table(surunler, {
          border: table.getBorderCharacters(`void`),
          columnDefault: {
            paddingLeft: 0,
            paddingRight: 1,
        },
        columns: {
          0: {
              paddingLeft: 1
          },
          1: {
              paddingLeft: 1
          },
          2: {
              paddingLeft: 1,
              alignment: "center"
          },
          3: {
              paddingLeft: 1,
              paddingRight: 1,
          },
      },
        /**
        * @typedef {function} drawHorizontalLine
        * @param {number} index
        * @param {number} size
        * @return {boolean}
        */
        drawHorizontalLine: (index, size) => {
          return index === 0 || index === 1 || index === size;
      }
      })}\`\`\`\n${value.Emoji.Yildiz2} **1. Sayfa : Netflix Mağzası**\n${value.Emoji.Yildiz2} **2. Sayfa : Exxen Mağzası**\n${value.Emoji.Yildiz2} **3. Sayfa : YouTube Mağzası**\n${value.Emoji.Yildiz2} **4. Sayfa : Nitro Mağzası**\n${value.Emoji.Yildiz2} **5. Sayfa : Spotify Mağzası**\n\n**Nasıl satın alım yapabilirim?**\n${value.Emoji.Yildiz1} Her ürünün kendine ait tag kategorisi ve kodları bulunur, örneğin #N Netflix'i, #E Exxen'i simgeler, kodlar ise birer birer artar (#N1, #N2 gibi). Alttaki emojilere basarak mağzalar arasında gezebilirsiniz. Satın almak için \`.buy ürün_kodu\` kodunu kullanabilirsin, eğer cüzdanında yeterince coinin varsa; cüzdanından fiyatı kadar coin eksilecek ve sana bir kanal açılacak, bu kanalda yetkililerimiz size ürünü teslim edecek.`))
    }

    if(reaction.emoji.name == '🎁') {
      msg.edit(xembed.setDescription(`${value.Emoji.Yildiz1} **"Lucy Coin" MAGZASININ ANA SAYFASINA HOSGELDIN**\n\n${value.Emoji.Yildiz2} **1. Sayfa : Netflix Mağzası**\n${value.Emoji.Yildiz2} **2. Sayfa : Exxen Mağzası**\n${value.Emoji.Yildiz2} **3. Sayfa : YouTube Mağzası**\n${value.Emoji.Yildiz2} **4. Sayfa : Nitro Mağzası**\n${value.Emoji.Yildiz2} **5. Sayfa : Spotify Mağzası**\n\n${value.Emoji.Coin} **Cüzdanınızda ${puansorgu} coin bulunmakta.**\n\n**Nasıl satın alım yapabilirim?**\n${value.Emoji.Yildiz1} Her ürünün kendine ait tag kategorisi ve kodları bulunur, örneğin #N Netflix'i, #E Exxen'i simgeler, kodlar ise birer birer artar (#N1, #N2 gibi). Alttaki emojilere basarak mağzalar arasında gezebilirsiniz. Satın almak için \`.buy ürün_kodu\` kodunu kullanabilirsin, eğer cüzdanında yeterince coinin varsa; cüzdanından fiyatı kadar coin eksilecek ve sana bir kanal açılacak, bu kanalda yetkililerimiz size ürünü teslim edecek.`))
    }

    if(reaction.emoji.id == '844929186124267563') {
     msg.reactions.removeAll();
     msg.delete()
    }

    })


    

  }
}