/* app.js — Каштановый дом */

var KEY = 'kashtan_v1';

var FURNITURE = [
  {id:'rug',    name:'Ковёр',           emoji:'🟧', price:40,  x:50, y:4,  size:34, z:1, room:'living',  desc:'Тёплый, мягкий'},
  {id:'plant',  name:'Растение',        emoji:'🪴', price:50,  x:12, y:6,  size:30, z:3, room:'living',  desc:'Живое в доме'},
  {id:'lamp',   name:'Торшер',          emoji:'💡', price:60,  x:88, y:8,  size:30, z:3, room:'bedroom', desc:'Свет по вечерам'},
  {id:'shelf',  name:'Полка с книгами', emoji:'📚', price:70,  x:78, y:44, size:28, z:2, room:'living',  desc:'Есть что почитать'},
  {id:'pillow', name:'Подушка',         emoji:'🛋', price:45,  x:24, y:4,  size:26, z:2, room:'bedroom', desc:'Для ленивых вечеров'},
  {id:'clock',  name:'Часы',            emoji:'🕰', price:65,  x:62, y:56, size:24, z:2, room:'living',  desc:'Тик-так'},
  {id:'garland',name:'Гирлянда',        emoji:'✨', price:55,  x:50, y:78, size:26, z:2, room:'kids',    desc:'Праздник каждый день'},
  {id:'aqua',   name:'Аквариум',        emoji:'🐠', price:90,  x:16, y:46, size:28, z:2, room:'kids',    desc:'Рыбки молчат'},
  {id:'table',  name:'Стол',            emoji:'🪑', price:80,  x:66, y:5,  size:30, z:3, room:'kitchen', desc:'Рабочее место'},
  {id:'piano',  name:'Пианино',         emoji:'🎹', price:120, x:88, y:5,  size:32, z:3, room:'living',  desc:'Для настроения'},
  {id:'frame',  name:'Картина',         emoji:'🖼', price:60,  x:42, y:52, size:26, z:2, room:'living',  desc:'На стену'},
  {id:'catbed', name:'Лежанка',         emoji:'🧺', price:75,  x:36, y:3,  size:26, z:2, room:'bedroom', desc:'Уютное гнездо'},
  {id:'sofa',   name:'Диван',           emoji:'🛋️', price:110, x:50, y:4,  size:38, z:3, room:'living',  desc:'Мягкое место для всех'},
  {id:'tv',     name:'Телевизор',       emoji:'📺', price:150, x:78, y:8,  size:34, z:4, room:'living',  desc:'Вечерний сериал'},
  {id:'ficus',  name:'Фикус',           emoji:'🌿', price:60,  x:22, y:44, size:32, z:3, room:'living',  desc:'Большой и зелёный'},
  {id:'stove',  name:'Плита',           emoji:'🍳', price:130, x:20, y:6,  size:30, z:3, room:'kitchen', desc:'Что-нибудь вкусное'},
  {id:'kettle', name:'Чайник',          emoji:'🫖', price:40,  x:62, y:8,  size:22, z:3, room:'kitchen', desc:'Чай на всех'},
  {id:'bed',    name:'Кровать',         emoji:'🛏️', price:160, x:60, y:4,  size:40, z:2, room:'bedroom', desc:'Спать — это важно'},
  {id:'mirror', name:'Зеркало',         emoji:'🪞', price:70,  x:30, y:50, size:26, z:2, room:'bedroom', desc:'Всё видно'},
  {id:'toybox', name:'Коробка игрушек', emoji:'🧸', price:75,  x:70, y:4,  size:28, z:2, room:'kids',    desc:'Тут живёт плюшевый'},
  {id:'cactus', name:'Кактус',          emoji:'🌵', price:35,  x:14, y:6,  size:24, z:3, room:'kids',    desc:'Колючий, но свой'},
  {id:'guitar', name:'Гитара',          emoji:'🎸', price:100, x:82, y:5,  size:30, z:3, room:'kids',    desc:'Петь под неё'},
  {id:'nighlight', name:'Ночник',       emoji:'🕯', price:45,  x:44, y:6,  size:22, z:3, room:'kids',    desc:'Не страшно в темноте'}
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
    pets: [], furniture: [], log: [], lastCollect: null,
    built: [], lastShow: null
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
  if(S.lastCollect === undefined) S.lastCollect = null;
  if(!S.built) S.built = [];
  if(S.lastShow === undefined) S.lastShow = null;
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
  syncRooms();
}
function save(){
  try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){}
}

var tab = 'home';
var editMode = false;
var zoomRoom = null;
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

var BASE_ROOMS = [
  {id:'living',  name:'Гостиная', tag:'CAM 01', wall:'cream', floor:'oak'},
  {id:'kitchen', name:'Кухня',    tag:'CAM 02', wall:'mint',  floor:'tile'},
  {id:'bedroom', name:'Спальня',  tag:'CAM 03', wall:'lilac', floor:'walnut'},
  {id:'kids',    name:'Детская',  tag:'CAM 04', wall:'sky',   floor:'moss'}
];

/* Здания, которые строятся за каштаны. У каждого свой плюс. */
var EXTRA_ROOMS = [
  {id:'theater', name:'Театр',      wall:'lilac', floor:'walnut', deco:'🎭', price:180,
   bonus:'Представление питомцев с мини-сюжетом. Посмотрела — получаешь каштаны.'},
  {id:'library', name:'Библиотека', wall:'cream', floor:'walnut', deco:'📚', price:140,
   bonus:'За каждую отмеченную привычку платят на 5 🌰 больше — тишина помогает.'},
  {id:'museum',  name:'Музей',      wall:'mint',  floor:'tile',   deco:'🏺', price:220,
   bonus:'Каждый питомец приносит на 2 🌰 больше при сборе дохода дома.'}
];

var ROOMS = BASE_ROOMS.slice();
function syncRooms(){
  var out = BASE_ROOMS.slice();
  (S.built || []).forEach(function(id){
    EXTRA_ROOMS.forEach(function(r){
      if(r.id === id && out.indexOf(r) < 0) out.push(r);
    });
  });
  out.forEach(function(r, i){ r.tag = 'CAM ' + pad2(i + 1); });
  ROOMS = out;
}
function hasRoom(id){
  return (S.built || []).indexOf(id) >= 0;
}

function pad2(n){ return ('0' + n).slice(-2); }
function clockStr(off){
  var d = new Date(Date.now() + off * 1000);
  return pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
}

function spreadX(x, used, gap){
  x = Math.max(8, Math.min(92, x));
  for(var t = 0; t < 30; t++){
    var hit = false;
    for(var i = 0; i < used.length; i++){ if(Math.abs(used[i] - x) < gap) hit = true; }
    if(!hit) break;
    x = x + gap;
    if(x > 92) x = 8 + (t * 9) % 46;
  }
  used.push(x);
  return Math.max(6, Math.min(94, x));
}

function roomIndex(id){
  for(var i = 0; i < ROOMS.length; i++){ if(ROOMS[i].id === id) return i; }
  return -1;
}

/* ---------- настроение и доход дома ---------- */
function moodInfo(){
  var needs = [
    {label:'питомцы',  have:S.pets.length,           need:5},
    {label:'вещи',     have:S.furniture.length,      need:5},
    {label:'привычки', have:(S.habits || []).length,  need:5}
  ];
  var met = 0;
  needs.forEach(function(n){ if(n.have >= n.need) met++; });
  return {needs:needs, met:met, happy:met >= 2};
}
function incomeHTML(){
  if(!S.pets.length) return '';
  var m = moodInfo();
  var bonus = hasRoom('museum') ? 2 : 0;
  var per = (m.happy ? 10 : 5) + bonus;
  var total = S.pets.length * per;
  var done = S.lastCollect === todayStr();
  var need = m.needs.map(function(n){
    var ok = n.have >= n.need;
    return '<span class="' + (ok ? 'ok' : 'no') + '">' + (ok ? '✅' : '❌') + ' ' + n.label + ' ' + n.have + '/' + n.need + '</span>';
  }).join('');
  var b = ['<div class="income' + (m.happy ? ' happy' : '') + '">'];
  b.push('<div style="flex:1;min-width:0"><b>' + (m.happy ? 'Питомцы счастливы 🐾' : 'Питомцы скучают 🐾') + '</b>' +
    '<div class="incomeTxt">' + per + '🌰 за питомца' + (bonus ? ' (включая музей +2)' : '') + ' · условий выполнено ' + m.met + ' из 3</div>' +
    '<div class="need">' + need + '</div></div>');
  b.push('<button class="btn ' + (done ? '' : 'primary') + '" id="collectBtn"' + (done ? ' disabled' : '') +
    ' style="padding:10px 12px;white-space:nowrap">' + (done ? 'Собрано ✓' : 'Собрать +' + total + ' 🌰') + '</button>');
  b.push('</div>');
  return b.join('');
}
function collectIncome(){
  if(!S.pets.length){ toast('Сначала заведи питомца'); return; }
  if(S.lastCollect === todayStr()){ toast('Сегодня уже собрано — приходи завтра'); return; }
  var m = moodInfo();
  var per = (m.happy ? 10 : 5) + (hasRoom('museum') ? 2 : 0);
  var total = S.pets.length * per;
  S.coins += total;
  S.lastCollect = todayStr();
  save(); render();
  toast('+' + total + ' 🌰 ' + (m.happy ? 'от счастливых питомцев' : 'от питомцев'));
}

/* ---------- сцены: питомцы и предметы ---------- */
var SCENE_MS = 9000;
var PLANTS = ['green', 'flower', 'cherry'];
var GROWERS = ['sea', 'sun', 'rainbow'];
var HUNTERS = ['cat', 'wolf'];
var PREY = ['owl', 'peacock', 'hamster', 'deer'];
var FASTPETS = {frog:1, fox:1, hamster:1, otter:1, penguin:1, bat:1};

function tracesHas(pp, ids){
  var tr = tracesOf(pp);
  for(var i = 0; i < ids.length; i++){ if(tr.indexOf(ids[i]) >= 0) return true; }
  return false;
}
function findPair(list, okA, okB){
  for(var i = 0; i < list.length; i++){
    for(var j = 0; j < list.length; j++){
      if(i === j) continue;
      if(okA(S.pets[list[i]]) && okB(S.pets[list[j]])) return [list[i], list[j]];
    }
  }
  return null;
}
function buildScene(k, ri){
  var sc = {text:'', bubbles:{}, props:{}, cls:{}, moved:{}, movePi:null, moveRoom:null};
  function bub(pi, e){ sc.bubbles[pi] = e; }
  function prop(pi, e, c){ if(!sc.props[pi]) sc.props[pi] = []; sc.props[pi].push({e:e, c:c || 'side'}); }
  function cls(pi, c){ sc.cls[pi] = c; }
  if(k.kind === 'fight'){
    bub(k.a, '💢'); bub(k.b, '💥');
    prop(k.a, '🔥', 'side'); prop(k.b, '❄️', 'side');
    cls(k.a, 'scene-fight'); cls(k.b, 'scene-fight');
    sc.text = '🔥 против ❄️ — искры и пар, но всё понарошку';
  } else if(k.kind === 'chase'){
    bub(k.a, '🐾'); bub(k.b, '💨');
    cls(k.b, 'scene-flee');
    sc.moved[k.b] = (ri + 1) % ROOMS.length;
    sc.movePi = k.b; sc.moveRoom = (ri + 1) % ROOMS.length;
    sc.text = '🐶 гоняет 🐱 — кошка удирает в другую комнату';
  } else if(k.kind === 'talk'){
    bub(k.a, '❤️'); bub(k.b, '🌸');
    sc.text = '🌿 и 🌺 мило беседуют';
  } else if(k.kind === 'grow'){
    bub(k.a, '💧'); bub(k.b, '🌱');
    prop(k.b, '🌿', 'big'); prop(k.b, '🌺', 'big');
    cls(k.b, 'scene-grow');
    sc.text = '🌊 поливает — растения на питомце растут на глазах';
  } else if(k.kind === 'hunt'){
    bub(k.a, '👀'); bub(k.b, '💨');
    prop(k.a, '🐾', 'side');
    cls(k.b, 'scene-flee');
    sc.text = 'охота понарошку — все целы и невредимы';
  } else if(k.kind === 'ball'){
    bub(k.a, '🎾'); sc.text = '🐶 гоняет мяч по ковру';
  } else if(k.kind === 'scratch'){
    bub(k.a, '🐾'); sc.text = '🐱 точит когти о диван';
  } else if(k.kind === 'window'){
    bub(k.a, '🐦'); sc.text = '🐱 смотрит в окно на птичек';
  } else if(k.kind === 'books'){
    bub(k.a, '📖'); sc.text = '🦉 сидит на полке и читает книжки';
  } else if(k.kind === 'lampdance'){
    bub(k.a, '✨'); sc.text = '🐲 вьётся вокруг торшера и пускает искры';
  } else if(k.kind === 'piano'){
    bub(k.a, '🎵'); prop(k.a, '🎶', 'top'); sc.text = '🎹 кто-то тренькает на пианино';
  } else if(k.kind === 'sleep'){
    bub(k.a, '💤'); cls(k.a, 'scene-sleep'); sc.text = 'дрыхнет без задних лап';
  } else if(k.kind === 'crawl'){
    bub(k.a, '🥬'); sc.text = '🐢 медленно ползёт к миске';
  } else if(k.kind === 'circle'){
    bub(k.a, '💨'); sc.text = 'носится кругами вокруг черепахи';
  } else if(k.kind === 'play'){
    bub(k.a, '❤️'); bub(k.b, '✨'); sc.text = 'догонялки, потом сидят рядом';
  } else {
    bub(k.a, '💭'); sc.text = 'гуляет по дому и присматривается';
  }
  return sc;
}
function pickScene(list, ri, seed){
  var cands = [];
  var pair;
  pair = findPair(list, function(p){ return tracesHas(p, ['fire']); }, function(p){ return tracesHas(p, ['frost']); });
  if(pair) cands.push({kind:'fight', a:pair[0], b:pair[1]});
  pair = findPair(list, function(p){ return p.petId === 'dog'; }, function(p){ return p.petId === 'cat'; });
  if(pair) cands.push({kind:'chase', a:pair[0], b:pair[1]});
  pair = findPair(list, function(p){ return tracesHas(p, ['green']); }, function(p){ return tracesHas(p, ['flower']); });
  if(pair) cands.push({kind:'talk', a:pair[0], b:pair[1]});
  pair = findPair(list, function(p){ return tracesHas(p, GROWERS); }, function(p){ return tracesHas(p, PLANTS); });
  if(pair) cands.push({kind:'grow', a:pair[0], b:pair[1]});
  pair = findPair(list, function(p){ return HUNTERS.indexOf(p.petId) >= 0; }, function(p){ return PREY.indexOf(p.petId) >= 0; });
  if(pair) cands.push({kind:'hunt', a:pair[0], b:pair[1]});
  var hasTurtle = false;
  list.forEach(function(pi){ if(S.pets[pi].petId === 'turtle') hasTurtle = true; });
  list.forEach(function(pi){
    var pp = S.pets[pi];
    if(pp.petId === 'dog' && (own('rug') || own('toybox'))) cands.push({kind:'ball', a:pi});
    if(pp.petId === 'cat' && own('sofa')) cands.push({kind:'scratch', a:pi});
    if(pp.petId === 'cat' && !own('sofa')) cands.push({kind:'window', a:pi});
    if(pp.petId === 'owl' && own('shelf')) cands.push({kind:'books', a:pi});
    if(pp.petId === 'dragon' && own('lamp')) cands.push({kind:'lampdance', a:pi});
    if(own('piano') && (pp.petId === 'cat' || pp.petId === 'fox' || pp.petId === 'hamster')) cands.push({kind:'piano', a:pi});
    if((own('bed') || own('pillow')) && (pp.petId === 'cat' || pp.petId === 'koala')) cands.push({kind:'sleep', a:pi});
    if(pp.petId === 'turtle') cands.push({kind:'crawl', a:pi});
    if(hasTurtle && FASTPETS[pp.petId]) cands.push({kind:'circle', a:pi});
  });
  if(list.length >= 2) cands.push({kind:'play', a:list[0], b:list[1]});
  if(!cands.length) cands.push({kind:'solo', a:list[0]});
  return buildScene(cands[(seed + ri * 3) % cands.length], ri);
}
function scenePlan(){
  var shift = Math.floor(Date.now() / 14000) % ROOMS.length;
  var seed = Math.floor(Date.now() / SCENE_MS);
  var assign = {}, rooms = [];
  for(var ri0 = 0; ri0 < ROOMS.length; ri0++) rooms.push([]);
  S.pets.forEach(function(pp, pi){
    var r = (pi + shift) % ROOMS.length;
    assign[pi] = r; rooms[r].push(pi);
  });
  var scenes = [];
  for(var sj = 0; sj < ROOMS.length; sj++) scenes.push(null);
  var flee = {};
  ROOMS.forEach(function(room, ri){
    var list = rooms[ri].filter(function(pi){ return assign[pi] === ri; });
    if(!list.length) return;
    var sc = pickScene(list, ri, seed);
    scenes[ri] = sc;
    if(sc.movePi != null && sc.moveRoom != null){ assign[sc.movePi] = sc.moveRoom; flee[sc.movePi] = true; }
  });
  return {assign:assign, scenes:scenes, flee:flee};
}

function camsHTML(only){
  var wSel = WALL_MAP[S.wall] || WALLS[0];
  var fSel = FLOOR_MAP[S.floor] || FLOORS[0];
  var customWall = S.wall !== 'cream';
  var customFloor = S.floor !== 'oak';
  var plan = scenePlan();
  var after = '';
  var b = ['<div class="camGrid' + (only != null ? ' solo' : '') + '" id="camGrid">'];
  ROOMS.forEach(function(room, ri){
    if(only != null && only !== ri) return;
    var w = customWall ? wSel : (WALL_MAP[room.wall] || wSel);
    var fl = customFloor ? fSel : (FLOOR_MAP[room.floor] || fSel);
    var st = '--wall1:' + w.a + ';--wall2:' + w.b + ';--floor1:' + fl.a + ';--floor2:' + fl.b + ';';
    b.push('<div class="cam" data-room="' + ri + '" style="' + st + '">');
    b.push('<div class="wall"></div><div class="floor"></div><div class="skirt"></div>');
    b.push('<div class="window"><div class="sky"></div><div class="frame"></div></div>');
    if(room.deco) b.push('<div class="roomDeco">' + room.deco + '</div>');
    if(only != null) b.push('<button class="camBack" id="camBack" title="Назад">🔙</button>');
    b.push('<div class="camBar"><i class="rec"></i><b>' + room.tag + '</b><span>' + esc(room.name).toUpperCase() + '</span><em>' + clockStr(ri * 2) + '</em></div>');
    if(room.id === 'theater' && only != null){
      after = '<button class="roomAct" data-stage="1">🎭 ' +
        (S.pets.length < 2 ? 'Нужно два питомца' : S.lastShow === todayStr() ? 'Сегодня уже смотрели · ещё завтра' : 'Смотреть представление · +' + SHOW_PRICE + ' 🌰') +
        '</button>';
    }

    S.furniture.forEach(function(it, i){
      var f = FURN_MAP[it.id];
      if(!f) return;
      var rr = roomIndex(f.room);
      if(rr < 0) rr = i % ROOMS.length;
      if(rr !== ri) return;
      b.push('<div class="furn" data-fid="' + it.id + '" data-room="' + ri + '" style="left:' + it.x + '%;bottom:' + it.y + '%;font-size:' + Math.round(f.size * 0.55) + 'px;font-size:' + (f.size * 0.3).toFixed(1) + 'cqw;z-index:' + f.z + '">' + f.emoji + '</div>');
    });

    var mine = [];
    S.pets.forEach(function(pp, pi){ if(plan.assign[pi] === ri) mine.push(pi); });
    var used = [];
    var sc = plan.scenes[ri];
    mine.forEach(function(pi, k){
      var pp = S.pets[pi];
      var d = PET_ACTS[pp.petId] || {x:50, y:2, s:22, a:'walk'};
      if(pp.petId === 'owl' && !own('shelf')) d = {x:20, y:2, s:20, a:'walk'};
      var sz = d.s || 22;
      if(mine.length > 3) sz = Math.min(sz, 86 / mine.length);
      var x = spreadX(d.x, used, Math.max(14, sz + 5));
      var y = Math.max(2, Math.min(78, d.y));
      var props = (d.props || []).slice();
      if(sc && sc.props[pi]) props = props.concat(sc.props[pi]);
      if(plan.flee[pi]) props.push({e:'💨', c:'side'});
      var propsHTML = props.map(function(pr){
        return '<span class="prop ' + pr.c + '">' + pr.e + '</span>';
      }).join('');
      var bub = (sc && sc.bubbles[pi]) ? '<span class="pbub">' + sc.bubbles[pi] + '</span>' : '';
      var cls = (sc && sc.cls[pi]) ? ' ' + sc.cls[pi] : '';
      b.push('<div class="housePet act-' + d.a + cls + '" style="left:' + x + '%;bottom:' + y + '%;width:' + sz + '%;z-index:' + (20 + k) + '">' + bub +
        '<div class="petBody">' + petSVG(pp.petId, pp.feed, 200, pp.level, tracesOf(pp)) + '</div>' + propsHTML +
        (d.a === 'nap' ? '<span class="zzz">💤</span>' : '') +
        '</div>');
    });
    if(!mine.length) b.push('<div class="camEmpty">тут пока тихо…</div>');
    if(sc && sc.text) b.push('<div class="camScene">' + sc.text + '</div>');
    b.push('<div class="camEdge"></div>');
    b.push('</div>');
  });
  if(only == null && ROOMS.length % 2 === 1){
    b.push('<div class="camSlot" data-goshop="1"><b>+</b><span>Ещё комната<br>в магазине</span></div>');
  }
  b.push('</div>');
  return b.join('') + after;
}

function houseHTML(){
  var b = ['<div class="house' + (editMode ? ' edit' : '') + (zoomRoom != null ? ' zoom' : '') + '" id="house">'];
  b.push('<div id="camsWrap">' + camsHTML(zoomRoom) + '</div>');
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
  if(!editMode && zoomRoom == null) b.push(incomeHTML());
  if(!editMode && zoomRoom == null && S.pets.length) b.push('<p class="hint camHint">Тыкни в комнату — откроется крупно, как с камеры 📹</p>');
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
  if(!editMode) return;
  var grid = document.getElementById('camGrid');
  if(!grid) return;
  var items = grid.querySelectorAll('.furn');
  for(var i = 0; i < items.length; i++){
    (function(el){
      var box = null;
      el.addEventListener('pointerdown', function(e){
        e.preventDefault();
        box = el.parentNode.getBoundingClientRect();
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
    var libBonus = hasRoom('library') ? 5 : 0;
    S.coins += 10 + libBonus;
    S.tickets += 1;
    toast('+' + (10 + libBonus) + ' 🌰 и +1 🎟' + (libBonus ? ' · бонус библиотеки' : ''));
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
/* ---------- здания и театр ---------- */
var SHOW_PRICE = 35;
var SHOW_TITLES = [
  'Каштан и звёздный фонарь',
  'Тайна пропавшего носка',
  'Пирог для очень голодного дракона',
  'Как мышонок стал капитаном',
  'Бал в честь первого дождя'
];
var SHOW_PLOTS = [
  ['Они нашли на сцене каштан — и он засветился.',
   'Оказалось, это звёздное семечко, а не каштан.',
   'Посадили его посреди сцены и полили чаем.',
   'Выросло дерево из света, зал ахнул.',
   'Артисты поклонились, свет в зале зажёгся.'],
  ['Пропал самый любимый носок — розовый, с помпоном.',
   'Подозрение пало на того, кто громче всех храпел.',
   'Обыскали всю сцену, заглянули даже в занавес.',
   'Носок нашёлся на голове у главного героя.',
   'Он вышел кланяться — в носке, как в шляпе.'],
  ['На сцене появился пирог. Огромный. Ещё тёплый.',
   'Но пирог почему-то начал шевелиться.',
   'Из-под корочки высунулся любопытный нос.',
   'Все вместе решили: пирог делим на всех.',
   'Даже тот, кто собирался его съесть в одиночку.']
];
function theaterCast(){
  var pool = S.pets.slice(0, 9);
  if(pool.length < 2) return null;
  var seed = Math.floor(Date.now() / 3600000) % 997;
  var a = pool[seed % pool.length];
  var c = pool[(seed + 2) % pool.length];
  if(c.id === a.id) c = pool[(seed + 1) % pool.length];
  if(c.id === a.id) return null;
  var title = SHOW_TITLES[seed % SHOW_TITLES.length];
  var plot = SHOW_PLOTS[seed % SHOW_PLOTS.length];
  var nm = function(p){ return '<b>' + esc(p.name) + '</b>'; };
  var pic = function(p){ return '<span class="castPet">' + petSVG(p.petId, p.feed, 58, p.level, tracesOf(p)) + '</span>'; };
  var lines = [];
  lines.push('<i>Занавес поднимается. На сцене — ' + nm(a) + ' и ' + nm(c) + '.</i>');
  lines.push(pic(a) + nm(a) + ' — «' + plot[0] + '»');
  lines.push(pic(c) + nm(c) + ' — «' + plot[1] + '»');
  lines.push(pic(a) + nm(a) + ' — «' + plot[2] + '»');
  lines.push(pic(c) + nm(c) + ' — «' + plot[3] + '»');
  lines.push('<i>' + plot[4] + '</i>');
  return {title:title, lines:lines, cast:pic(a) + '<span class="castNm">' + esc(a.name) + '</span><span class="castAmp">и</span>' + pic(c) + '<span class="castNm">' + esc(c.name) + '</span>'};
}
function showTheater(){
  if(S.pets.length < 2){ toast('Для представления нужно хотя бы два питомца'); return; }
  var sc = theaterCast();
  if(!sc){ toast('Нужны два разных питомца'); return; }
  var done = S.lastShow === todayStr();
  modal('<h3>🎭 ' + esc(sc.title) + '</h3>' +
    '<div class="theaterCast">' + sc.cast + '</div>' +
    '<div class="stage" id="stage"></div>' +
    '<div id="showPay"></div>');
  var i = 0;
  clearInterval(window._showTimer);
  window._showTimer = setInterval(function(){
    var el = document.getElementById('stage');
    if(!el){ clearInterval(window._showTimer); return; }
    if(i >= sc.lines.length){
      clearInterval(window._showTimer);
      var pay = document.getElementById('showPay');
      if(pay){
        if(done){
          pay.innerHTML = '<p class="hint" style="text-align:center;margin:10px 0 0">Сегодня уже смотрели — приходите завтра.</p>';
        } else {
          pay.innerHTML = '<button class="btn orange" id="showPayBtn" style="width:100%;padding:13px;margin-top:10px">Занавес · +' + SHOW_PRICE + ' 🌰</button>';
          document.getElementById('showPayBtn').onclick = function(){
            S.coins += SHOW_PRICE;
            S.lastShow = todayStr();
            save(); render(); closeModal();
            toast('+' + SHOW_PRICE + ' 🌰 — браво! 👏');
          };
        }
      }
      return;
    }
    var div = document.createElement('div');
    div.className = 'showLine';
    div.innerHTML = sc.lines[i];
    el.appendChild(div);
    el.scrollTop = el.scrollHeight;
    i++;
  }, 1000);
}

function buyRoom(id){
  var r = null;
  EXTRA_ROOMS.forEach(function(x){ if(x.id === id) r = x; });
  if(!r) return;
  if(hasRoom(id)) return;
  if(S.coins < r.price){ toast('Не хватает каштанов — нужно ' + r.price + ' 🌰'); return; }
  S.coins -= r.price;
  S.built.push(id);
  syncRooms();
  save(); render();
  toast('🏗 ' + r.name + ' построен! Камера уже в доме');
}

function screenShop(){
  var b = ['<h2>Магазин</h2>'];
  b.push('<h3>Здания</h3>');
  b.push('<p class="hint">Новые комнаты. Покупаются один раз, камера появляется в доме сразу.</p>');
  EXTRA_ROOMS.forEach(function(r){
    var has = hasRoom(r.id);
    b.push('<div class="card bld' + (has ? ' done' : '') + '"><div class="item"><div class="ico">' + r.deco + '</div>' +
      '<div><div class="nm">' + esc(r.name) + '</div><div class="ds">' + esc(r.bonus) + '</div></div>' +
      '<div class="spacer"></div>' +
      (has ? '<span class="pill good">Построено</span>' : '<button class="btn primary" data-build="' + r.id + '">' + r.price + ' 🌰</button>') +
      '</div></div>');
  });
  b.push('<h2>Мебель</h2><p class="hint">Вещь сразу появляется в своей комнате, а потом её можно переставить как угодно.</p>');
  ROOMS.forEach(function(room){
    var list = FURNITURE.filter(function(f){ return f.room === room.id; });
    if(!list.length) return;
    b.push('<h3>' + esc(room.name) + '</h3>');
    list.forEach(function(f){
      var has = own(f.id);
      b.push('<div class="card"><div class="item"><div class="ico">' + f.emoji + '</div>' +
        '<div><div class="nm">' + esc(f.name) + '</div><div class="ds">' + esc(f.desc) + '</div></div>' +
        '<div class="spacer"></div>' +
        (has ? '<span class="pill good">В доме</span>' : '<button class="btn primary" data-buy="' + f.id + '">' + f.price + ' 🌰</button>') +
        '</div></div>');
    });
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


/* ---------- характер и отношения питомцев ---------- */
var HOME_BY_FEED = {
  base:'living', white:'bedroom', green:'kids',   gold:'living',  frost:'bedroom',
  kind:'living', dark:'bedroom',  cherry:'kids',  human:'living', sun:'living',
  rainbow:'kids',fire:'kitchen',  sea:'kitchen',  storm:'kitchen',moon:'bedroom',
  crystal:'living', choco:'kitchen', mushroom:'kids', flower:'kids'
};
var REL_PAIRS = {
  'fire|frost':'enemy',
  'kind|dark':'enemy',
  'sun|moon':'love',
  'cherry|flower':'love',
  'gold|crystal':'rival',
  'green|flower':'friend',
  'green|mushroom':'friend',
  'sea|storm':'friend',
  'sea|flower':'friend',
  'white|dark':'friend',
  'sun|rainbow':'friend',
  'human|kind':'friend',
  'choco|mushroom':'friend',
  'base|kind':'friend'
};
function relKey(a, b){ return a < b ? a + '|' + b : b + '|' + a; }
function relOf(a, b){
  if(!a || !b) return 'know';
  if(a === b) return 'friend';
  return REL_PAIRS[relKey(a, b)] || 'know';
}
var REL_META = {
  love:  {icon:'💞', label:'Влюблены',  cls:'love'},
  friend:{icon:'👫', label:'Друзья',    cls:'friend'},
  rival: {icon:'🏆', label:'Соперники', cls:'rival'},
  enemy: {icon:'⚔️', label:'Не ладят',  cls:'enemy'},
  know:  {icon:'🤝', label:'Знакомые',  cls:'know'}
};
function petRelations(p){
  var out = {love:[], friend:[], rival:[], enemy:[], know:[]};
  (S.pets || []).forEach(function(o){
    if(o.id === p.id) return;
    var meta = PET_MAP[o.petId] || {emoji:'🐾'};
    out[relOf(p.feed, o.feed)].push({id:o.id, name:o.name, emoji:meta.emoji});
  });
  return out;
}
function relHTML(p){
  var rel = petRelations(p);
  var rows = ['love','friend','rival','enemy','know'].map(function(k){
    var m = REL_META[k], list = rel[k];
    var body = list.length
      ? list.map(function(o){ return '<span class="relChip">' + o.emoji + ' ' + esc(o.name) + '</span>'; }).join('')
      : '<span class="relNone">пока никого</span>';
    return '<div class="relLine ' + m.cls + '"><span class="relIc">' + m.icon + '</span>' +
      '<span class="relLbl">' + m.label + '</span><span class="relList">' + body + '</span></div>';
  }).join('');
  var home = ROOMS[roomIndex(HOME_BY_FEED[p.feed] || 'living')] || ROOMS[0];
  return '<div class="relBox">' +
    '<div class="relLine home"><span class="relIc">🏠</span><span class="relLbl">Любимая комната</span>' +
    '<span class="relList"><span class="relChip">' + home.name + '</span></span></div>' + rows + '</div>';
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
    '<div class="actNote">🎯 Любит: ' + act + '.</div>' + relHTML(p) +
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
  clearInterval(window._showTimer);
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
  clearInterval(window._camTimer);
  if(tab === 'home' && !editMode){
    window._camTimer = setInterval(function(){
      var wrap = document.getElementById('camsWrap');
      if(!wrap) return;
      wrap.innerHTML = camsHTML(zoomRoom);
      bindHouseDrag();
    }, 9000);
  }
}

document.addEventListener('click', function(e){
  var t = e.target;
  var tabBtn = t.closest('#tabs button');
  if(tabBtn){ tab = tabBtn.getAttribute('data-tab'); editMode = false; zoomRoom = null; render(); window.scrollTo(0,0); return; }
  if(t.closest('[data-close]')){ closeModal(); return; }
  if(t.closest('#editHouse')){ editMode = !editMode; render(); window.scrollTo(0,0); return; }
  if(t.closest('#camBack')){ zoomRoom = null; render(); window.scrollTo(0,0); return; }
  if(t.closest('[data-stage]')){ showTheater(); return; }
  if(t.closest('[data-goshop]')){ tab = 'shop'; zoomRoom = null; render(); return; }
  var bldBtn = t.closest('[data-build]');
  if(bldBtn){ buyRoom(bldBtn.getAttribute('data-build')); return; }
  var camEl = t.closest('.cam');
  if(camEl && zoomRoom == null && !editMode && !t.closest('.furn')){ zoomRoom = +camEl.getAttribute('data-room'); render(); window.scrollTo(0,0); return; }
  if(t.closest('#collectBtn')){ collectIncome(); return; }
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
