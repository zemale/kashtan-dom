/* app.js — Каштановый дом */

var KEY = 'kashtan_v1';

var FURNITURE = [
  {id:'rug',    name:'Ковёр',        emoji:'🟧', price:40,  left:50, bottom:4,  size:34, z:1,  desc:'Тёплый, мягкий'},
  {id:'plant',  name:'Растение',     emoji:'🪴', price:50,  left:12, bottom:6,  size:30, z:3,  desc:'Живое в доме'},
  {id:'lamp',   name:'Торшер',       emoji:'💡', price:60,  left:88, bottom:8,  size:30, z:3,  desc:'Свет по вечерам'},
  {id:'shelf',  name:'Полка с книгами', emoji:'📚', price:70, left:78, bottom:44, size:28, z:2, desc:'Есть что почитать'},
  {id:'pillow', name:'Подушка',      emoji:'🛋', price:45,  left:24, bottom:4,  size:26, z:2,  desc:'Для ленивых вечеров'},
  {id:'clock',  name:'Часы',         emoji:'🕰', price:65,  left:62, bottom:56, size:24, z:2,  desc:'Тик-так'},
  {id:'garland',name:'Гирлянда',     emoji:'✨', price:55,  left:50, bottom:78, size:26, z:2,  desc:'Праздник каждый день'},
  {id:'aqua',   name:'Аквариум',     emoji:'🐠', price:90,  left:16, bottom:46, size:28, z:2,  desc:'Рыбки молчат'},
  {id:'table',  name:'Стол',         emoji:'🪑', price:80,  left:66, bottom:5,  size:30, z:3,  desc:'Рабочее место'},
  {id:'piano',  name:'Пианино',      emoji:'🎹', price:120, left:88, bottom:5,  size:32, z:3,  desc:'Для настроения'},
  {id:'frame',  name:'Картина',      emoji:'🖼', price:60,  left:42, bottom:52, size:26, z:2,  desc:'На стену'},
  {id:'catbed', name:'Лежанка',      emoji:'🧺', price:75,  left:36, bottom:3,  size:26, z:2,  desc:'Уютное гнездо'}
];

var MILESTONES = {3:30, 7:80, 14:180, 21:400};
var FEED_PRICE = 15;

function todayStr(){
  var d = new Date();
  var m = ('0' + (d.getMonth() + 1)).slice(-2);
  var day = ('0' + d.getDate()).slice(-2);
  return d.getFullYear() + '-' + m + '-' + day;
}
function dayNum(s){
  if(!s) return null;
  var p = s.split('-');
  return new Date(+p[0], +p[1] - 1, +p[2]).getTime() / 86400000;
}
function uid(){ return Math.random().toString(36).slice(2, 9); }

function defaultState(){
  return {
    coins: 60, tickets: 1,
    habits: [
      {id:uid(), title:'Читать 20 минут', kind:'good', streak:0, best:0, last:null, frozen:false, days:{}},
      {id:uid(), title:'Зарядка утром', kind:'good', streak:0, best:0, last:null, frozen:false, days:{}},
      {id:uid(), title:'Не залипать в телефоне перед сном', kind:'bad', streak:0, best:0, last:null, frozen:false, days:{}}
    ],
    pets: [], furniture: [], log: []
  };
}

var S = null;
function load(){
  try{
    var raw = localStorage.getItem(KEY);
    if(raw){ S = JSON.parse(raw); }
  }catch(e){}
  if(!S || !S.habits){ S = defaultState(); save(); }
  if(!S.pets) S.pets = [];
  if(!S.furniture) S.furniture = [];
  if(!S.log) S.log = [];
}
function save(){
  try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){}
}

var tab = 'home';
var ui = { adopt:null, adoptFeed:null, pet:null };

/* ---------- утилиты ---------- */
function h(html){
  var d = document.createElement('div');
  d.innerHTML = html.trim();
  return d.firstChild;
}
function esc(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function toast(msg){
  var t = document.getElementById('toast');
  if(!t){ t = h('<div class="toast" id="toast"></div>'); document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(t._tm);
  t._tm = setTimeout(function(){ t.classList.remove('on'); }, 2100);
}
function coins(n){ return n + ' 🌰'; }

/* ---------- дом ---------- */
function houseHTML(){
  var pets = S.pets;
  var n = Math.min(pets.length, 8);
  var w = n ? Math.min(30, 86 / n) : 0;
  var items = [];
  S.furniture.forEach(function(fid){
    var f = null;
    FURNITURE.forEach(function(x){ if(x.id === fid) f = x; });
    if(!f) return;
    items.push('<div class="furn" style="left:' + f.left + '%;bottom:' + f.bottom + '%;font-size:' + f.size + 'px;z-index:' + f.z + '">' + f.emoji + '</div>');
  });
  var petHTML = '';
  pets.slice(0, 8).forEach(function(p, i){
    var left = 6 + i * (84 / Math.max(n, 1));
    petHTML += '<div class="housePet" style="left:' + left + '%;width:' + w + '%;z-index:' + (5 + i) + '">' +
      petSVG(p.petId, p.feed, 100, p.level) + '</div>';
  });
  var wall = '<div class="wall"></div><div class="floor"></div>' +
    '<div class="window"><div class="sky"></div><div class="frame"></div></div>';
  return '<div class="house">' + wall + items.join('') + petHTML +
    (pets.length ? '' : '<div class="emptyHouse">Дом пустой — заведи первого питомца 🐾</div>') + '</div>';
}

function screenHome(){
  var totalStreak = 0;
  S.habits.forEach(function(x){ totalStreak = Math.max(totalStreak, x.streak); });
  var b = [];
  b.push(houseHTML());
  b.push('<div class="card"><div class="row"><div><b>Серия</b><div class="meta">' + totalStreak + ' дн. лучшая сейчас</div></div><div class="spacer"></div><div class="pill good">' + S.pets.length + ' питомцев</div></div></div>');
  if(S.pets.length){
    b.push('<h3>Питомцы</h3><div class="petShelf">');
    S.pets.slice(0, 9).forEach(function(p){
      var f = FEED_MAP[p.feed] || FEED_MAP.base;
      b.push('<div class="petMini" data-pet="' + p.id + '">' + petSVG(p.petId, p.feed, 92, p.level) +
        '<b>' + esc(p.name) + '</b><div class="lvl">' + f.emoji + ' ур.' + p.level + '</div></div>');
    });
    b.push('</div>');
  } else {
    b.push('<p class="hint">Питомца заводят за жетон 🎟 — жетоны дают за выполненные привычки.</p>');
  }
  b.push('<h3>Как играть</h3><div class="card"><p class="hint" style="margin:0">Отмечай привычки каждый день → получаешь каштаны 🌰 и жетоны 🎟. Каштаны — на мебель, жетоны — на питомцев. Корм меняет внешность питомца: белый делает альбиносом, зелёный выращивает растения, добрый даёт крылья. Серии 3/7/14/21 дают бонус.</p></div>');
  return b.join('');
}

/* ---------- привычки ---------- */
function streakDots(habit){
  var out = [];
  var t = new Date();
  for(var i = 13; i >= 0; i--){
    var d = new Date(t.getTime() - i * 86400000);
    var key = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    var st = habit.days[key];
    out.push('<i class="' + (st === 1 ? 'done' : st === 0 ? 'miss' : '') + '"></i>');
  }
  return '<div class="dots">' + out.join('') + '</div>';
}

function screenHabits(){
  var b = ['<h2>Привычки</h2>'];
  if(!S.habits.length) b.push('<p class="hint">Пока пусто. Добавь первую — полезную или вредную.</p>');
  var today = todayStr();
  S.habits.forEach(function(hb){
    var done = hb.days[today] !== undefined;
    var pct = Math.min(100, Math.round(hb.streak / 21 * 100));
    b.push('<div class="card habit" data-habit="' + hb.id + '">');
    b.push('<div class="row"><div class="title">' + (hb.kind === 'bad' ? '🚫 ' : '✅ ') + esc(hb.title) + '</div><div class="spacer"></div>' +
      '<span class="pill">' + (hb.streak ? '🔥 ' + hb.streak : '—') + '</span></div>');
    b.push('<div class="meta">' + (hb.kind === 'bad' ? 'Держусь подряд' : 'Подряд') + ' · цель 21 день' + (hb.frozen ? ' · ❄️ заморозка' : '') + '</div>');
    b.push('<div class="bar"><i style="width:' + pct + '%"></i></div>');
    b.push(streakDots(hb));
    if(done){
      b.push('<div class="actions"><div class="btn ghost" style="flex:1;text-align:center">Отмечено сегодня ' + (hb.days[today] ? '✔' : '✘') + '</div></div>');
    } else {
      b.push('<div class="actions"><button class="btn primary" data-do="yes" data-h="' + hb.id + '">' + (hb.kind === 'bad' ? 'Удержалась' : 'Сделала') + '</button>' +
        '<button class="btn ghost" data-do="no" data-h="' + hb.id + '">' + (hb.kind === 'bad' ? 'Сорвалась' : 'Не сегодня') + '</button></div>');
    }
    b.push('</div>');
  });
  b.push('<button class="btn orange" id="addHabit" style="width:100%;padding:14px">+ Добавить привычку</button>');
  b.push('<div class="card" style="margin-top:12px"><p class="hint" style="margin:0"><b>Заморозка ❄️</b> — один пропуск подряд не рвёт серию. Второй подряд — серия начинается заново.</p></div>');
  return b.join('');
}

function checkin(id, ok){
  var hb = null;
  S.habits.forEach(function(x){ if(x.id === id) hb = x; });
  if(!hb) return;
  var t = todayStr();
  if(hb.days[t] !== undefined) return;
  var dn = dayNum(t);
  var prev = dayNum(hb.last);
  var gap = prev === null ? null : dn - prev;

  if(ok){
    if(gap === null || gap > 2) hb.streak = 1;
    else if(gap === 2) { hb.streak = hb.streak + 1; hb.frozen = true; toast('❄️ Заморозка спасла серию'); }
    else hb.streak = hb.streak + 1;
    if(hb.streak > hb.best) hb.best = hb.streak;
    hb.days[t] = 1;
    hb.last = t;
    S.coins += 10;
    S.tickets += 1;
    toast('+10 🌰 и +1 🎟');
    var ms = MILESTONES[hb.streak];
    if(ms){
      S.coins += ms;
      S.log.push({d:t, t:'Серия ' + hb.streak + ' — ' + hb.title});
      setTimeout(function(){ toast('🔥 Серия ' + hb.streak + '! Бонус ' + ms + ' 🌰'); }, 1200);
    }
  } else {
    hb.days[t] = 0;
    hb.last = t;
    if(!hb.frozen){ hb.frozen = true; toast('❄️ Потрачена заморозка — серия цела'); }
    else { hb.streak = 0; hb.frozen = false; toast('Серия началась заново — ничего, продолжаем'); }
  }
  save(); render();
}

function habitModal(){
  modal('<h3>Новая привычка</h3>' +
    '<input id="nhTitle" class="inp" placeholder="Например: пить воду утром" maxlength="60">' +
    '<div class="sectbtns" style="margin-top:12px"><button class="on" data-kind="good">Полезная</button><button data-kind="bad">Вредная</button></div>' +
    '<button class="btn primary" id="nhSave" style="width:100%;padding:13px">Добавить</button>');
  var kind = 'good';
  document.querySelectorAll('[data-kind]').forEach(function(btn){
    btn.onclick = function(){
      kind = btn.getAttribute('data-kind');
      document.querySelectorAll('[data-kind]').forEach(function(x){ x.classList.remove('on'); });
      btn.classList.add('on');
    };
  });
  document.getElementById('nhSave').onclick = function(){
    var v = document.getElementById('nhTitle').value.trim();
    if(!v){ toast('Напиши название'); return; }
    S.habits.push({id:uid(), title:v, kind:kind, streak:0, best:0, last:null, frozen:false, days:{}});
    save(); closeModal(); render(); toast('Привычка добавлена');
  };
}

/* ---------- магазин ---------- */
function screenShop(){
  var b = ['<h2>Магазин мебели</h2><p class="hint">Вещи сразу появляются в доме — без расстановки, всё уже на местах.</p>'];
  FURNITURE.forEach(function(f){
    var owned = S.furniture.indexOf(f.id) >= 0;
    b.push('<div class="card"><div class="item"><div class="ico">' + f.emoji + '</div>' +
      '<div><div class="nm">' + esc(f.name) + '</div><div class="ds">' + esc(f.desc) + '</div></div>' +
      '<div class="spacer"></div>' +
      (owned ? '<span class="pill good">В доме</span>' : '<button class="btn primary" data-buy="' + f.id + '">' + f.price + ' 🌰</button>') +
      '</div></div>');
  });
  return b.join('');
}

function buy(id){
  var f = null;
  FURNITURE.forEach(function(x){ if(x.id === id) f = x; });
  if(!f) return;
  if(S.furniture.indexOf(id) >= 0) return;
  if(S.coins < f.price){ toast('Не хватает каштанов'); return; }
  S.coins -= f.price;
  S.furniture.push(id);
  save(); render();
  toast(f.name + ' — в доме!');
}

/* ---------- питомцы ---------- */
function screenPets(){
  var b = ['<h2>Питомцы</h2>'];
  b.push('<div class="card"><div class="row"><div><b>Жетоны</b><div class="meta">за выполненные привычки</div></div><div class="spacer"></div><div class="pill">' + S.tickets + ' 🎟</div></div></div>');
  b.push('<button class="btn orange" id="adoptBtn" style="width:100%;padding:14px;margin-bottom:6px">Завести питомца · 1 🎟</button>');
  if(!S.pets.length){
    b.push('<p class="hint">Пока никого. Возьми жетон за привычку и выбери — от льва до лебедя.</p>');
  } else {
    b.push('<h3>Живут у тебя</h3><div class="petShelf">');
    S.pets.forEach(function(p){
      b.push('<div class="petMini" data-pet="' + p.id + '">' + petSVG(p.petId, p.feed, 92, p.level) +
        '<b>' + esc(p.name) + '</b><div class="lvl">' + (FEED_MAP[p.feed] || FEED_MAP.base).emoji + ' ур.' + p.level + '</div></div>');
    });
    b.push('</div>');
  }
  b.push('<h3>Корма</h3><div class="card"><p class="hint" style="margin:0">' +
    FEEDS.map(function(f){ return f.emoji + ' <b>' + f.name + '</b> — ' + f.short; }).join('<br>') + '</p></div>');
  return b.join('');
}

function adoptModal(){
  if(S.tickets < 1){ toast('Нужен жетон 🎟 — выполни привычку'); return; }
  ui.adopt = null; ui.adoptFeed = null;
  var grid = PETS.map(function(p){
    return '<div class="pick" data-pick="' + p.id + '">' + petSVG(p.id, 'base', 76, 1) + '<b>' + p.name + '</b></div>';
  }).join('');
  var feeds = FEEDS.map(function(f){
    return '<button class="feedbtn" data-feed="' + f.id + '"><span>' + f.emoji + '</span>' + f.name + '</button>';
  }).join('');
  modal('<h3>Кто будет жить в доме?</h3>' +
    '<div class="pickGrid">' + grid + '</div>' +
    '<h3 style="margin-top:16px">Первый корм</h3>' +
    '<div class="feedGrid">' + feeds + '</div>' +
    '<div class="feedNote" id="feedNote">Выбери питомца и корм — увидишь результат.</div>' +
    '<button class="btn primary" id="adoptGo" style="width:100%;padding:13px" disabled>Забрать домой · 1 🎟</button>');
  document.querySelectorAll('[data-pick]').forEach(function(el){
    el.onclick = function(){
      ui.adopt = el.getAttribute('data-pick');
      document.querySelectorAll('[data-pick]').forEach(function(x){ x.classList.remove('on'); });
      el.classList.add('on');
      previewAdopt();
    };
  });
  document.querySelectorAll('[data-feed]').forEach(function(el){
    el.onclick = function(){
      ui.adoptFeed = el.getAttribute('data-feed');
      document.querySelectorAll('[data-feed]').forEach(function(x){ x.classList.remove('on'); });
      el.classList.add('on');
      previewAdopt();
    };
  });
  document.getElementById('adoptGo').onclick = adoptGo;
}

function previewAdopt(){
  var note = document.getElementById('feedNote');
  var btn = document.getElementById('adoptGo');
  if(ui.adopt && ui.adoptFeed){
    var pet = PET_MAP[ui.adopt];
    var f = FEED_MAP[ui.adoptFeed];
    note.innerHTML = '<div class="preview">' + petSVG(ui.adopt, ui.adoptFeed, 120, 1) + '</div>' +
      '<b>' + pet.name + '</b> после «' + f.name + '»: ' + f.short.toLowerCase() + '.';
    btn.disabled = false;
  } else {
    note.textContent = 'Выбери питомца и корм — увидишь результат.';
    btn.disabled = true;
  }
}

function adoptGo(){
  if(!ui.adopt || !ui.adoptFeed) return;
  if(S.tickets < 1){ toast('Нет жетона'); return; }
  var pet = PET_MAP[ui.adopt];
  S.tickets -= 1;
  S.pets.push({id:uid(), petId:ui.adopt, name:pet.name, feed:ui.adoptFeed, level:1});
  save(); closeModal(); render();
  toast(pet.name + ' теперь живёт у тебя 🎉');
}

function petModal(id){
  var p = null;
  S.pets.forEach(function(x){ if(x.id === id) p = x; });
  if(!p) return;
  var pet = PET_MAP[p.petId];
  var f = FEED_MAP[p.feed] || FEED_MAP.base;
  var btns = FEEDS.map(function(x){
    return '<button class="feedbtn' + (x.id === p.feed ? ' on' : '') + '" data-pfeed="' + x.id + '"><span>' + x.emoji + '</span>' + x.name + '</button>';
  }).join('');
  modal('<h3>' + esc(p.name) + '</h3>' +
    '<div class="petBig">' + petSVG(p.petId, p.feed, 190, p.level) + '</div>' +
    '<div class="meta" style="text-align:center">' + f.emoji + ' ' + f.name + ' · уровень ' + p.level + ' · ' + f.short + '</div>' +
    '<h3 style="margin-top:16px">Покормить · ' + FEED_PRICE + ' 🌰</h3>' +
    '<div class="feedGrid">' + btns + '</div>' +
    '<div class="row" style="margin-top:14px"><input class="inp" id="petName" value="' + esc(p.name) + '" maxlength="20">' +
    '<button class="btn" id="petRename">Имя</button></div>');
  document.querySelectorAll('[data-pfeed]').forEach(function(el){
    el.onclick = function(){ feedPet(p.id, el.getAttribute('data-pfeed')); };
  });
  document.getElementById('petRename').onclick = function(){
    var v = document.getElementById('petName').value.trim();
    if(!v) return;
    p.name = v; save(); toast('Теперь зовут ' + v); petModal(p.id); render();
  };
}

function feedPet(id, feed){
  var p = null;
  S.pets.forEach(function(x){ if(x.id === id) p = x; });
  if(!p) return;
  if(S.coins < FEED_PRICE){ toast('Не хватает каштанов'); return; }
  S.coins -= FEED_PRICE;
  p.feed = feed;
  p.level = Math.min(8, (p.level || 1) + 1);
  save(); render();
  petModal(id);
  toast((FEED_MAP[feed] || FEED_MAP.base).name + ' корм — питомец изменился');
}

/* ---------- модалка ---------- */
function modal(html){
  var m = document.getElementById('modal');
  var sheet = document.getElementById('sheet');
  sheet.innerHTML = html;
  m.hidden = false;
}
function closeModal(){
  document.getElementById('modal').hidden = true;
  document.getElementById('sheet').innerHTML = '';
}

/* ---------- рендер ---------- */
function render(){
  document.getElementById('coins').innerHTML = '<span>' + S.coins + '</span> 🌰';
  var main = document.getElementById('screen');
  if(tab === 'home') main.innerHTML = screenHome();
  else if(tab === 'habits') main.innerHTML = screenHabits();
  else if(tab === 'shop') main.innerHTML = screenShop();
  else main.innerHTML = screenPets();
  document.querySelectorAll('#tabs button').forEach(function(b){
    b.classList.toggle('on', b.getAttribute('data-tab') === tab);
  });
}

document.addEventListener('click', function(e){
  var t = e.target;
  var tabBtn = t.closest('#tabs button');
  if(tabBtn){ tab = tabBtn.getAttribute('data-tab'); render(); window.scrollTo(0,0); return; }
  if(t.closest('[data-close]')){ closeModal(); return; }
  var doBtn = t.closest('[data-do]');
  if(doBtn){ checkin(doBtn.getAttribute('data-h'), doBtn.getAttribute('data-do') === 'yes'); return; }
  if(t.closest('#addHabit')){ habitModal(); return; }
  var buyBtn = t.closest('[data-buy]');
  if(buyBtn){ buy(buyBtn.getAttribute('data-buy')); return; }
  var petEl = t.closest('[data-pet]');
  if(petEl){ petModal(petEl.getAttribute('data-pet')); return; }
  if(t.closest('#adoptBtn')){ adoptModal(); return; }
});

load();
render();
