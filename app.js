/* app.js — Каштановый дом */

var KEY = 'kashtan_v1';

var FURNITURE = [
  {id:'rug',    name:'Ковёр',        emoji:'🟧', price:40,  x:50, y:4,  size:34, z:1, desc:'Тёплый, мягкий'},
  {id:'plant',  name:'Растение',     emoji:'🪴', price:50,  x:12, y:6,  size:30, z:3, desc:'Живое в доме'},
  {id:'lamp',   name:'Торшер',       emoji:'💡', price:60,  x:88, y:8,  size:30, z:3, desc:'Свет по вечерам'},
  {id:'shelf',  name:'Полка с книгами', emoji:'📚', price:70, x:78, y:44, size:28, z:2, desc:'Есть что почитать'},
  {id:'pillow', name:'Подушка',      emoji:'🛋', price:45,  x:24, y:4,  size:26, z:2, desc:'Для ленивых вечеров'},
  {id:'clock',  name:'Часы',         emoji:'🕰', price:65,  x:62, y:56, size:24, z:2, desc:'Тик-так'},
  {id:'garland',name:'Гирлянда',     emoji:'✨', price:55,  x:50, y:78, size:26, z:2, desc:'Праздник каждый день'},
  {id:'aqua',   name:'Аквариум',     emoji:'🐠', price:90,  x:16, y:46, size:28, z:2, desc:'Рыбки молчат'},
  {id:'table',  name:'Стол',         emoji:'🪑', price:80,  x:66, y:5,  size:30, z:3, desc:'Рабочее место'},
  {id:'piano',  name:'Пианино',      emoji:'🎹', price:120, x:88, y:5,  size:32, z:3, desc:'Для настроения'},
  {id:'frame',  name:'Картина',      emoji:'🖼', price:60,  x:42, y:52, size:26, z:2, desc:'На стену'},
  {id:'catbed', name:'Лежанка',      emoji:'🧺', price:75,  x:36, y:3,  size:26, z:2, desc:'Уютное гнездо'}
];
var FURN_MAP = {};
FURNITURE.forEach(function(f){ f.x0 = f.x; f.y0 = f.y; FURN_MAP[f.id] = f; });

var WALLS = [
  {id:'cream', name:'Крем',    a:'#fdf3dd', b:'#f6e7c9'},
  {id:'mint',  name:'Мята',    a:'#ebf6e7', b:'#d7ead0'},
  {id:'rose',  name:'Розовый', a:'#fdeaea', b:'#f8d6d6'},
  {id:'sky',   name:'Небо',    a:'#e9f2fc', b:'#d3e4f7'},
  {id:'lilac', name:'Лаванда', a:'#f1eafc', b:'#ded0f6'},
  {id:'sand',  name:'Песок',   a:'#f8f0e0', b:'#eedcbf'},
  {id:'night', name:'Ночь',    a:'#445471', b:'#303c53'}
];
var FLOORS = [
  {id:'oak',    name:'Дуб',    a:'#d9b98b', b:'#d2b07f'},
  {id:'walnut', name:'Орех',   a:'#a97c50', b:'#9a6d43'},
  {id:'grey',   name:'Серый',  a:'#cdc8c0', b:'#bfb9b0'},
  {id:'moss',   name:'Мох',    a:'#a7bd93', b:'#97ad83'},
  {id:'rose',   name:'Розовый',a:'#e7c6c6', b:'#dcb6b6'},
  {id:'tile',   name:'Плитка', a:'#ece6da', b:'#ded7c8'}
];
var WALL_MAP = {}, FLOOR_MAP = {};
WALLS.forEach(function(w){ WALL_MAP[w.id] = w; });
FLOORS.forEach(function(f){ FLOOR_MAP[f.id] = f; });

/* чем занят питомец: x/y — место в доме, s — размер, a — анимация */
var PET_ACTS = {
  cat:     {x:16, y:51, s:22, a:'window'},
  dog:     {x:54, y:3,  s:26, a:'play', props:[{e:'🎾', c:'front'}]},
  owl:     {x:79, y:47, s:20, a:'perch'},
  dragon:  {x:70, y:63, s:22, a:'fly', props:[{e:'✨', c:'side'}]},
  griffin: {x:87, y:58, s:20, a:'fly', props:[{e:'✨', c:'side'}]},
  swan:    {x:38, y:3,  s:24, a:'preen', props:[{e:'🪶', c:'side'}]},
  snake:   {x:30, y:2,  s:22, a:'coil', props:[{e:'☀️', c:'top'}]},
  seal:    {x:24, y:2,  s:22, a:'balance', props:[{e:'🏐', c:'nose'}]},
  capy:    {x:46, y:3,  s:24, a:'bath', props:[{e:'🛁', c:'tub'},{e:'🌿', c:'side'}]},
  unicorn: {x:64, y:3,  s:24, a:'sparkle', props:[{e:'🌈', c:'side'}]},
  horse:   {x:76, y:3,  s:26, a:'chew', props:[{e:'🌾', c:'front'}]},
  deer:    {x:86, y:3,  s:24, a:'graze', props:[{e:'🌿', c:'front'}]},
  wolf:    {x:10, y:3,  s:24, a:'chew', props:[{e:'🦴', c:'front'}]},
  lion:    {x:44, y:2,  s:26, a:'pounce', props:[{e:'🧶', c:'side'}]},
  fox:     {x:68, y:2,  s:22, a:'pounce', props:[{e:'🧦', c:'side'}]},
  turtle:  {x:24, y:3,  s:22, a:'crawl', props:[{e:'🥬', c:'front'}]},
  panda:   {x:56, y:3,  s:26, a:'chew', props:[{e:'🎋', c:'front'}]},
  penguin: {x:14, y:2,  s:22, a:'crawl', props:[{e:'❄️', c:'side'}]},
  hedgehog:{x:40, y:3,  s:20, a:'walk', props:[{e:'🍎', c:'side'}]},
  frog:    {x:64, y:2,  s:20, a:'pounce', props:[{e:'🪰', c:'side'}]},
  koala:   {x:84, y:42, s:20, a:'nap', props:[{e:'🌿', c:'side'}]},
  peacock: {x:74, y:3,  s:24, a:'preen', props:[{e:'🪶', c:'side'}]},
  otter:   {x:12, y:2,  s:22, a:'balance', props:[{e:'🪨', c:'nose'}]},
  bat:     {x:34, y:64, s:18, a:'perch', props:[{e:'🌙', c:'side'}]},
  hamster: {x:48, y:3,  s:20, a:'chew', props:[{e:'🌻', c:'front'}]}
};
var ACT_TEXT = {
  cat:'смотрит в окно на птичек, сидя на высоком подоконнике',
  dog:'прыгает за мячиком на полу',
  owl:'сидит на полке, разложив книжки, и наблюдает за домом',
  dragon:'парит под потолком и пускает искры',
  griffin:'кружит под потолком, охраняя дом',
  swan:'чистит пёрышки, сидя у стены',
  snake:'свернулась клубком и греется на солнышке',
  seal:'балансирует мячиком на носу',
  capy:'сидит в тазике с водой и жуёт травинку',
  unicorn:'сияет искрами и любуется радугой',
  horse:'жуёт сено из кормушки',
  deer:'общипывает листья с кустика',
  wolf:'грызёт косточку в своём углу',
  lion:'играет с клубком пряжи',
  fox:'утащила носок и треплет его',
  turtle:'медленно таскает домик по полу и жуёт лист салата',
  panda:'сидит и с аппетитом грызёт бамбук',
  penguin:'катается на животе по полу, как на льду',
  hedgehog:'семенит по дому с яблоком на иголках',
  frog:'сидит на полу и ловит муху языком',
  koala:'дремлет на ветке с листьями и жуёт эвкалипт',
  peacock:'распустил хвост-веер и важно ходит',
  otter:'лежит на спине и балансирует камешком',
  bat:'висит вниз головой под потолком и спит',
  hamster:'набивает щёки зерном и прячет запасы'
};


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
    wall: 'cream', floor: 'oak',
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
  if(!S.log) S.log = [];
  if(!WALL_MAP[S.wall]) S.wall = 'cream';
  if(!FLOOR_MAP[S.floor]) S.floor = 'oak';
  S.furniture = (S.furniture || []).map(function(it){
    if(typeof it === 'string'){
      var d = FURN_MAP[it];
      return d ? {id:d.id, x:d.x0, y:d.y0} : null;
    }
    if(!it || !it.id || !FURN_MAP[it.id]) return null;
    if(it.x == null || it.y == null){ it.x = FURN_MAP[it.id].x0; it.y = FURN_MAP[it.id].y0; }
    return it;
  }).filter(function(x){ return !!x; });
}
function save(){
  try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){}
}

var tab = 'home';
var editMode = false;
var ui = { adopt:null, adoptFeed:null, pet:null };

/* ---------- утилиты ---------- */
function esc(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function toast(msg){
  var t = document.getElementById('toast');
  if(!t){ t = document.createElement('div'); t.className = 'toast'; t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(t._tm);
  t._tm = setTimeout(function(){ t.classList.remove('on'); }, 2100);
}
function own(id){
  for(var i = 0; i < S.furniture.length; i++){ if(S.furniture[i].id === id) return true; }
  return false;
}

/* ---------- дом ---------- */
function freeX(x, used){
  var ok = true;
  used.forEach(function(u){ if(Math.abs(u - x) < 11) ok = false; });
  if(ok) return x;
  var slots = [8,20,32,44,56,68,80,92];
  var best = null, bd = 999;
  slots.forEach(function(s){
    var busy = false;
    used.forEach(function(u){ if(Math.abs(u - s) < 11) busy = true; });
    if(busy) return;
    if(Math.abs(s - x) < bd){ bd = Math.abs(s - x); best = s; }
  });
  return best == null ? x : best;
}

function houseHTML(){
  var w = WALL_MAP[S.wall] || WALLS[0];
  var fl = FLOOR_MAP[S.floor] || FLOORS[0];
  var style = '--wall1:' + w.a + ';--wall2:' + w.b + ';--floor1:' + fl.a + ';--floor2:' + fl.b + ';';
  var b = ['<div class="house' + (editMode ? ' edit' : '') + '" id="house" style="' + style + '">'];
  b.push('<div class="wall"></div><div class="floor"></div><div class="skirt"></div>');
  b.push('<div class="window"><div class="sky"></div><div class="frame"></div><div class="bird">🐦</div></div><div class="sill"></div>');
  S.furniture.forEach(function(it){
    var f = FURN_MAP[it.id];
    if(!f) return;
    b.push('<div class="furn" data-fid="' + it.id + '" style="left:' + it.x + '%;bottom:' + it.y + '%;font-size:' + f.size + 'px;z-index:' + f.z + '">' + f.emoji + '</div>');
  });
  var MAX_HOUSE = 12;
  var housePets = S.pets.slice(0, MAX_HOUSE);
  var floorList = [], wallList = [];
  housePets.forEach(function(p){
    var d = PET_ACTS[p.petId] || {x:50, y:2, s:22, a:'walk'};
    if(p.petId === 'owl' && !own('shelf')) d = {x:20, y:2, s:20, a:'walk'};
    (d.y < 30 ? floorList : wallList).push({p:p, d:d});
  });
  var items = [];
  var fN = floorList.length;
  var fRows = 1, fCols = Math.max(1, fN), fsz = 19;
  for(var cc = Math.max(1, fN); cc >= 1; cc--){
    var rr = Math.ceil(fN / cc);
    var ss = Math.min(19, 88 / cc);
    if(rr * (ss * 1.6 + 1.5) <= 40){ fRows = rr; fCols = cc; fsz = ss; break; }
  }
  var rowStep = fsz * 1.6 + 1.5;
  floorList.forEach(function(it, i){
    var row = Math.floor(i / fCols);
    var col = i % fCols;
    it.x = (col + 0.5) * 100 / fCols;
    it.y = 1 + row * rowStep;
    it.s = fsz;
    it.z = 20 + i;
    items.push(it);
  });
  var wN = wallList.length;
  var wsz = Math.min(22, 88 / Math.max(1, wN));
  wallList.forEach(function(it, i){
    it.x = wN === 1 ? Math.max(wsz / 2 + 3, Math.min(97 - wsz / 2, it.d.x)) : (i + 0.5) * 100 / wN;
    it.y = Math.max(26, Math.min(74, it.d.y));
    it.s = Math.min(it.d.s || 20, wsz);
    it.z = 40 + i;
    items.push(it);
  });
  items.forEach(function(it){
    var p = it.p, d = it.d, sz = it.s;
    var x = Math.max(sz / 2 + 2, Math.min(98 - sz / 2, it.x));
    var props = (d.props || []).map(function(pr){
      return '<span class="prop ' + pr.c + '">' + pr.e + '</span>';
    }).join('');
    b.push('<div class="housePet act-' + d.a + '" style="left:' + x + '%;bottom:' + it.y + '%;width:' + sz + '%;z-index:' + it.z + '">' +
      '<div class="petBody">' + petSVG(p.petId, p.feed, 200, p.level, tracesOf(p)) + '</div>' + props +
      (d.a === 'nap' ? '<span class="zzz">💤</span>' : '') +
      '</div>');
  });
  if(S.pets.length > MAX_HOUSE){
    b.push('<div class="morePets">+' + (S.pets.length - MAX_HOUSE) + ' ещё в домике</div>');
  }
  if(!S.pets.length){
    b.push('<div class="emptyHouse">Дом пустой — заведи первого питомца 🐾</div>');
  }
  b.push('</div>');
  return b.join('');
}

function editorHTML(){
  var sw = WALLS.map(function(c){
    return '<button class="swatch' + (S.wall === c.id ? ' on' : '') + '" data-wall="' + c.id + '" title="' + c.name + '" style="--a:' + c.a + ';--b:' + c.b + '"></button>';
  }).join('');
  var sf = FLOORS.map(function(c){
    return '<button class="swatch' + (S.floor === c.id ? ' on' : '') + '" data-floor="' + c.id + '" title="' + c.name + '" style="--a:' + c.a + ';--b:' + c.b + '"></button>';
  }).join('');
  return '<div class="card editor">' +
    '<div class="hint" style="margin:0 0 10px">Тащи мебель пальцем или мышкой. Стены и пол — жми на квадратик.</div>' +
    '<div class="swRow"><span>Стены</span><div class="sw">' + sw + '</div></div>' +
    '<div class="swRow"><span>Пол</span><div class="sw">' + sf + '</div></div>' +
    '<button class="btn ghost" id="resetFurn" style="width:100%;margin-top:10px">Расставить мебель по местам</button>' +
    '</div>';
}

function screenHome(){
  var totalStreak = 0;
  S.habits.forEach(function(x){ totalStreak = Math.max(totalStreak, x.streak); });
  var b = [];
  b.push(houseHTML());
  b.push('<div class="row" style="margin-bottom:10px"><button class="btn ' + (editMode ? 'primary' : '') + '" id="editHouse" style="flex:1;padding:12px">' +
    (editMode ? '✓ Готово' : '✏️ Обставить дом') + '</button></div>');
  if(editMode) b.push(editorHTML());
  b.push('<div class="card"><div class="row"><div><b>Серия</b><div class="meta">' + totalStreak + ' дн. лучшая сейчас</div></div><div class="spacer"></div><div class="pill good">' + S.pets.length + ' питомцев</div></div></div>');
  if(S.pets.length){
    b.push('<h3>Питомцы</h3><div class="petShelf">');
    S.pets.slice(0, 9).forEach(function(p){
      var f = FEED_MAP[p.feed] || FEED_MAP.base;
      b.push('<div class="petMini" data-pet="' + p.id + '">' + petSVG(p.petId, p.feed, 92, p.level, tracesOf(p)) +
        '<b>' + esc(p.name) + '</b><div class="lvl">' + f.emoji + ' ур.' + p.level + '</div></div>');
    });
    b.push('</div>');
  } else {
    b.push('<p class="hint">Питомца заводят за жетон 🎟 — жетоны дают за выполненные привычки.</p>');
  }
  b.push('<h3>Как играть</h3><div class="card"><p class="hint" style="margin:0">Отмечай привычки каждый день → получаешь каштаны 🌰 и жетоны 🎟. Каштаны — на мебель, жетоны — на питомцев. Дом обставляется как хочешь: двигай мебель, меняй стены и пол. Корм меняет внешность питомца: белый делает альбиносом, зелёный выращивает растения, добрый даёт крылья. Серии 3/7/14/21 дают бонус.</p></div>');
  return b.join('');
}

/* ---------- перетаскивание мебели ---------- */
var drag = null;
function bindHouseDrag(){
  var house = document.getElementById('house');
  if(!house || !editMode) return;
  var rect = function(){ return house.getBoundingClientRect(); };
  var items = house.querySelectorAll('.furn');
  for(var i = 0; i < items.length; i++){
    (function(el){
      var box = null;
      el.addEventListener('pointerdown', function(e){
        e.preventDefault();
        box = rect();
        drag = {el:el, id:el.getAttribute('data-fid'), box:box, x:null, y:null};
        el.classList.add('dragging');
        try{ el.setPointerCapture(e.pointerId); }catch(err){}
      });
      el.addEventListener('pointermove', function(e){
        if(!drag || drag.el !== el) return;
        var x = (e.clientX - drag.box.left) / drag.box.width * 100;
        var y = (drag.box.bottom - e.clientY) / drag.box.height * 100;
        x = Math.max(4, Math.min(96, x));
        y = Math.max(1, Math.min(90, y));
        drag.x = x; drag.y = y;
        el.style.left = x + '%';
        el.style.bottom = y + '%';
      });
      var finish = function(){
        if(!drag || drag.el !== el) return;
        if(drag.x != null){
          S.furniture.forEach(function(it){
            if(it.id === drag.id){ it.x = Math.round(drag.x); it.y = Math.round(drag.y); }
          });
          save();
        }
        el.classList.remove('dragging');
        drag = null;
      };
      el.addEventListener('pointerup', finish);
      el.addEventListener('pointercancel', finish);
    })(items[i]);
  }
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
    else if(gap === 2){ hb.streak = hb.streak + 1; hb.frozen = true; toast('❄️ Заморозка спасла серию'); }
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
  var b = ['<h2>Магазин мебели</h2><p class="hint">Вещь сразу появляется в доме, а потом её можно переставить как угодно.</p>'];
  FURNITURE.forEach(function(f){
    var has = own(f.id);
    b.push('<div class="card"><div class="item"><div class="ico">' + f.emoji + '</div>' +
      '<div><div class="nm">' + esc(f.name) + '</div><div class="ds">' + esc(f.desc) + '</div></div>' +
      '<div class="spacer"></div>' +
      (has ? '<span class="pill good">В доме</span>' : '<button class="btn primary" data-buy="' + f.id + '">' + f.price + ' 🌰</button>') +
      '</div></div>');
  });
  return b.join('');
}

function buy(id){
  var f = FURN_MAP[id];
  if(!f) return;
  if(own(id)) return;
  if(S.coins < f.price){ toast('Не хватает каштанов'); return; }
  S.coins -= f.price;
  S.furniture.push({id:id, x:f.x0, y:f.y0});
  save(); render();
  toast(f.name + ' — в доме! Переставь как нравится');
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
      b.push('<div class="petMini" data-pet="' + p.id + '">' + petSVG(p.petId, p.feed, 92, p.level, tracesOf(p)) +
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
  S.pets.push({id:uid(), petId:ui.adopt, name:pet.name, feed:ui.adoptFeed, level:1, traces:[ui.adoptFeed]});
  save(); closeModal(); render();
  toast(pet.name + ' теперь живёт у тебя 🎉');
}

function petModal(id){
  var p = null;
  S.pets.forEach(function(x){ if(x.id === id) p = x; });
  if(!p) return;
  var pet = PET_MAP[p.petId];
  var f = FEED_MAP[p.feed] || FEED_MAP.base;
  var act = ACT_TEXT[p.petId] || 'гуляет по дому';
  var btns = FEEDS.map(function(x){
    return '<button class="feedbtn' + (x.id === p.feed ? ' on' : '') + '" data-pfeed="' + x.id + '"><span>' + x.emoji + '</span>' + x.name + '</button>';
  }).join('');
  modal('<h3>' + esc(p.name) + '</h3>' +
    '<div class="petBig">' + petSVG(p.petId, p.feed, 190, p.level, tracesOf(p)) + '</div>' +
    '<div class="meta" style="text-align:center">' + f.emoji + ' ' + f.name + ' · уровень ' + p.level + '</div>' +
    '<div class="traces">Накоплено: ' + tracesOf(p).map(function(x){ var q = FEED_MAP[x]; return q ? q.emoji : ''; }).join(' ') + '</div>' +
    '<div class="actNote">Сейчас ' + act + '. ' + f.short + '.</div>' +
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
    p.name = v; save(); petModal(p.id); render(); toast('Теперь зовут ' + v);
  };
}

function tracesOf(p){
  if(!p.traces || !p.traces.length) p.traces = p.feed ? [p.feed] : [];
  return p.traces;
}

function feedPet(id, feed){
  var p = null;
  S.pets.forEach(function(x){ if(x.id === id) p = x; });
  if(!p) return;
  if(S.coins < FEED_PRICE){ toast('Не хватает каштанов'); return; }
  S.coins -= FEED_PRICE;
  if(!p.traces || !p.traces.length) p.traces = p.feed ? [p.feed] : [];
  if(p.traces.indexOf(feed) < 0) p.traces.push(feed);
  p.feed = feed;
  p.level = Math.min(8, (p.level || 1) + 1);
  save(); render();
  petModal(id);
  toast((FEED_MAP[feed] || FEED_MAP.base).name + ' корм: тело новое, старые детали остались');
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
  bindHouseDrag();
}

document.addEventListener('click', function(e){
  var t = e.target;
  var tabBtn = t.closest('#tabs button');
  if(tabBtn){ tab = tabBtn.getAttribute('data-tab'); editMode = false; render(); window.scrollTo(0,0); return; }
  if(t.closest('[data-close]')){ closeModal(); return; }
  if(t.closest('#editHouse')){ editMode = !editMode; render(); window.scrollTo(0,0); return; }
  var wb = t.closest('[data-wall]');
  if(wb){ S.wall = wb.getAttribute('data-wall'); save(); render(); return; }
  var fb = t.closest('[data-floor]');
  if(fb){ S.floor = fb.getAttribute('data-floor'); save(); render(); return; }
  if(t.closest('#resetFurn')){
    S.furniture.forEach(function(it){
      var f = FURN_MAP[it.id];
      if(f){ it.x = f.x0; it.y = f.y0; }
    });
    save(); render(); toast('Мебель вернулась на места'); return;
  }
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
