const { MessageEmbed, Client } = require('discord.js');
const client = new Client();
const moment = require('moment');
const ms = require('ms');
require('moment-duration-format');
const value = require('../Json/guildSettings.json');
const qdb = require('quick.db');
const pdb = new qdb.table("penality");
const rdb = new qdb.table("register");
const sdb = new qdb.table("staff");
const cdb = new qdb.table("coin");
const wdb = new qdb.table("warning");
const ldb = new qdb.table("rolelog");

Promise.prototype.s = function (time) {
  if (this) this.then(s => {
    if (s.deletable) s.delete({ timeout: time * 1000 });
  });
};

function embed(msg, user, guild) {
let embed = new MessageEmbed().setColor("RANDOM").setAuthor(user.tag, user.avatarURL({ dynamic: true })).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
}

function lembed(msg, guild) {
  let logembed = new MessageEmbed().setColor("RANDOM").setAuthor(guild.name, guild.iconURL({ dynamic: true })).setFooter(value.Embed.Footer).setTimestamp().setDescription(msg)
}

class patavatsizDatabase {

  
  static man(member) {
    member.roles.cache.has(value.Register.Booster) ? member.roles.set([ value.Register.erkekRolleri[0], value.Register.erkekRolleri[1], value.Register.Booster ]) : member.roles.set([ value.Register.erkekRolleri[0], value.Register.erkekRolleri[1] ]);
  }

  static woman(member) {
    member.roles.cache.has(value.Register.Booster) ? member.roles.set([value.Register.kadinRolleri[0], value.Register.kadinRolleri[1], value.Register.Booster]) : member.roles.set([ value.Register.kadinRolleri[0], value.Register.kadinRolleri[1] ]);
  }

  static staff(authority, sex, isim, member) {
    if (sex === `<@&${value.Register.erkekRolleri[0]}>`) {
      sdb.add(`yetkili.${authority.id}.erkekkayit`, 1) && sdb.add(`yetkili.${authority.id}.toplamkayit`, 1) && rdb.push(`kullanici.${member.id}.gecmis`, { Name: isim, Process: sex }) && rdb.add(`kullanici.${member.id}.isimgecmis`, 1)
    } else if (sex === `<@&${value.Register.kadinRolleri[0]}>`) { sdb.add(`yetkili.${authority.id}.kadinkayit`, 1) && sdb.add(`yetkili.${authority.id}.toplamkayit`, 1) && rdb.push(`kullanici.${member.id}.gecmis`, { Name: isim, Process: sex }) && rdb.add(`kullanici.${member.id}.isimgecmis`, 1) }
    rdb.set(`kullanici.${member.id}.songecmis`, {
      Name: isim
    });
  }

  static isimEkle(member, isim, islem) {
    rdb.push(`kullanici.${member.id}.gecmis`, {
      Name: isim,
      Process: islem
    });
  }

  static isimGuncelle(member, isim, islem) {
    rdb.push(`kullanici.${member.id}.gecmis`, {
      Name: isim,
      Process: islem
    });
  }

  static isimCek(member) {
  let cek = rdb.get(`kullanici.${member.id}.gecmis`) || [];
  return cek
  }

  static sonIsimCek(member) {
    let sonisim = rdb.fetch(`kullanici.${member.id}.songecmis`)
    return sonisim;
  }
 
  static coinEkle(member, coin) {
  cdb.add(`market.${member.id}.coin`, coin)
  }

  static coinSil(member, coin) {
  cdb.subtract(`market.${member.id}.coin`, coin)
  }

  static coinSifirla(member) {
  cdb.delete(`market.${member.id}.coin`)
  }

  static coinKontrol(member) {
    let cek = cdb.get(`market.${member.id}.coin`) || "0";
    return cek;
  }


  static roleAdd(member, role, date, author) {
    ldb.push(`kullanici.${member}.rollog`, {
      Push: `${value.Emoji.Check} Rol Verildi. Rol: ${role} Yetkili: ${author}\nTarih: ${date}\n⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽`
    })
  }

  static roleRemove(member, role, date, author) {
    ldb.push(`kullanici.${member}.rollog`, {
      Push: `${value.Emoji.Cross} Rol Alındı. Rol: ${role} Yetkili: ${author}\nTarih: ${date}\n⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽⎽`
    })
  }

  static rolCek(member) {
    let cek = ldb.get(`kullanici.${member}.rollog`) || [];
    return cek;
  }


  static mesajSil(member) {
    qdb.delete(`kullanici.${member.id}.message`)
  }

  static mesajEkle(member) {
    qdb.add(`kullanici.${member.id}.message`, 1)
  }

  static mesajKontrol(member) {
    let cek = qdb.get(`kullanici.${member.id}.message`) || [];
    return cek;
  };
  

  static cezaEkle(member, authority, reason, time, ftime, date, cezano, tur) {
    let log = client.channels.cache.get(value.Moderation.LogKanali)
    let cezanumarasi = cezano
    let ceza = {
      No: cezanumarasi,
      Ceza: tur,
      Kullanici: member.id,
      Yetkili: authority.id,
      Sebep: reason,
      Sure: time,
      BitisSure: ftime,
      Tarih: date,
      LogKanali: log
    };
    pdb.set(`ceza.${cezanumarasi}`, ceza)
    pdb.push(`kullanici.${member.id}.cezalar`, ceza)
    pdb.add(`cezano.${value.sunucuID}`, 1)
    if(tur === "ban") {
      pdb.add(`cezalar.${member.id}.toplam`, 1)
      pdb.add(`cezalar.${member.id}.ban`, 1)
      pdb.add(`cezapuan.${member.id}`, 30)
    } else if(tur === "jail") {
      pdb.add(`cezalar.${member.id}.toplam`, 1)
      pdb.add(`cezalar.${member.id}.jail`, 1)
      pdb.add(`cezapuan.${member.id}`, 25)
    } else if(tur === "tempjail") {
      pdb.push(tur, { id: member.id, Numara: cezanumarasi, Bitis: Date.now()+ms(time) })
      pdb.add(`cezalar.${member.id}.toplam`, 1)
      pdb.add(`cezalar.${member.id}.tempjail`, 1)
      pdb.add(`cezapuan.${member.id}`, 20)
    } else if(tur === "mute") {
      pdb.push(tur, { id: member.id, Numara: cezanumarasi, Bitis: Date.now()+ms(time) })
      pdb.add(`cezalar.${member.id}.toplam`, 1)
      pdb.add(`cezalar.${member.id}.chatmute`, 1)
      pdb.add(`cezapuan.${member.id}`, 15)
    } else if(tur === "voice mute") {
      pdb.push(tur, { id: member.id, Numara: cezanumarasi, Bitis: Date.now()+ms(time) })
      pdb.add(`cezalar.${member.id}.toplam`, 1)
      pdb.add(`cezalar.${member.id}.voicemute`, 1)
      pdb.add(`cezapuan.${member.id}`, 15)
    } else if(tur === "warn") {
      pdb.add(`cezalar.${member.id}.toplam`, 1)
      pdb.add(`cezalar.${member.id}.warn`, 1)
      pdb.add(`cezapuan.${member.id}`, 10)
    }

  }

  static cezaNoCek() {
    let cek = pdb.get(`cezano.${value.sunucuID}`)
    return cek    
  }

  static cezaPuanCek(member) {
    let cek = pdb.fetch(`cezapuan.${member.id}`) || 0
    return cek;
  }

  static cezaCek(member) {
    let cek = pdb.get(`kullanici.${member.id}.cezalar`) || []
    return cek;
  }

  static cezaBilgi(cezano) {
    let cek = pdb.get(`ceza.${cezano}`) || []
    return cek;
  }

  static kullaniciCezaBilgisi(member) {
    let chatmute = pdb.get(`cezalar.${member.id}.chatmute`) || 0
    let voicemute = pdb.get(`cezalar.${member.id}.voicemute`) || 0
    let muteler = chatmute + voicemute || 0
    let jail = pdb.get(`cezalar.${member.id}.jail`) || 0
    let tempjail = pdb.get(`cezalar.${member.id}.tempjail`) || 0
    let ban = pdb.get(`cezalar.${member.id}.ban`) || 0
    let toplam = pdb.get(`cezalar.${member.id}.toplam`) || 0
  }

  
}

module.exports = {patavatsizDatabase}
