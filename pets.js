/* pets.js — питомцы и корма. SVG с параметрами: корм меняет окрас и детали. */

const FEEDS = [
  {id:'base',   name:'Обычный',   emoji:'🥣', short:'Просто растёт'},
  {id:'white',  name:'Белый',     emoji:'🤍', short:'Альбинос: белая шерсть, красные глаза'},
  {id:'green',  name:'Зелёный',   emoji:'🌿', short:'На шкуре прорастают растения'},
  {id:'gold',   name:'Золотой',   emoji:'✨', short:'Золотая шерсть и свечение'},
  {id:'frost',  name:'Ледяной',   emoji:'❄️', short:'Голубой окрас и иней'},
  {id:'kind',   name:'Добрый',    emoji:'😇', short:'Ангельские крылья и нимб'},
  {id:'dark',   name:'Тёмный',    emoji:'🖤', short:'Чёрная шкура, горящие глаза'},
  {id:'cherry', name:'Вишнёвый',  emoji:'🌸', short:'Тёмно-розовый, вишня из головы'},
  {id:'human',  name:'Людской',   emoji:'🧍', short:'Встаёт на две ноги'},
  {id:'sun',    name:'Солнечный', emoji:'☀️', short:'Над ним светит солнце'},
  {id:'rainbow', name:'Радужный', emoji:'🌈', short:'Радужные полосы и дуга над головой'},
  {id:'fire',    name:'Огненный', emoji:'🔥', short:'Горящий хвост и искры'},
  {id:'sea',     name:'Морской',  emoji:'🌊', short:'Плавники, чешуйки и пузырьки'},
  {id:'storm',   name:'Грозовой', emoji:'⚡', short:'Туча, молния и искры'},
  {id:'moon',    name:'Лунный',   emoji:'🌙', short:'Серебристая шерсть, месяц и звёзды'},
  {id:'crystal', name:'Кристальный', emoji:'💎', short:'Прозрачный блеск и кристаллы'},
  {id:'choco',   name:'Шоколадный', emoji:'🍫', short:'Коричневая шерсть и какао-облако'},
  {id:'mushroom',name:'Грибной',  emoji:'🍄', short:'Мухомор на голове и мох у лап'},
  {id:'flower',  name:'Цветочный',emoji:'🌺', short:'Цветы в шерсти и бабочки'},
];
const FEED_MAP = {};
FEEDS.forEach(function(f){ FEED_MAP[f.id] = f; });

const PETS = [
  {id:'lion',    name:'Лев',      emoji:'🦁', fur:'#dfa85c', fur2:'#b0703a', eye:'#4a3418'},
  {id:'fox',     name:'Лисёнок',  emoji:'🦊', fur:'#e8834a', fur2:'#c25e2c', eye:'#3a2412'},
  {id:'cat',     name:'Кошка',    emoji:'🐱', fur:'#b9b3ab', fur2:'#8d867c', eye:'#3a3630'},
  {id:'owl',     name:'Сова',     emoji:'🦉', fur:'#b99a6b', fur2:'#8a6f45', eye:'#2f2416'},
  {id:'capy',    name:'Капибара', emoji:'🦫', fur:'#a97a4e', fur2:'#855c35', eye:'#33220f'},
  {id:'dragon',  name:'Дракончик',emoji:'🐲', fur:'#7fb069', fur2:'#5b8a47', eye:'#22401a'},
  {id:'dog',     name:'Собака',   emoji:'🐶', fur:'#c99a63', fur2:'#9b6f3d', eye:'#33230f'},
  {id:'snake',   name:'Змея',     emoji:'🐍', fur:'#8fbf6a', fur2:'#6d9c4c', eye:'#1f3416'},
  {id:'unicorn', name:'Единорог', emoji:'🦄', fur:'#f2ece2', fur2:'#d8cfc0', eye:'#4a3f52'},
  {id:'horse',   name:'Лошадь',   emoji:'🐴', fur:'#b07a45', fur2:'#8a5b2e', eye:'#33220f'},
  {id:'griffin', name:'Грифон',   emoji:'🦅', fur:'#d8b56a', fur2:'#a8853d', eye:'#4a3410'},
  {id:'seal',    name:'Тюлень',   emoji:'🦭', fur:'#9fa9b3', fur2:'#7b8792', eye:'#2a3038'},
  {id:'deer',    name:'Олень',    emoji:'🦌', fur:'#c9925c', fur2:'#a06f3d', eye:'#33230f'},
  {id:'wolf',    name:'Волк',     emoji:'🐺', fur:'#8e949c', fur2:'#666d76', eye:'#2a2f36'},
  {id:'swan',    name:'Лебедь',   emoji:'🦢', fur:'#fbfaf6', fur2:'#e2ded2', eye:'#3a3a42'},
  {id:'turtle',  name:'Черепаха', emoji:'🐢', fur:'#8fbf7a', fur2:'#5f8a4c', eye:'#22331a'},
  {id:'panda',   name:'Панда',    emoji:'🐼', fur:'#f7f3ea', fur2:'#d9d2c4', eye:'#2a2a30'},
  {id:'penguin', name:'Пингвин',  emoji:'🐧', fur:'#3a4049', fur2:'#262a31', eye:'#1b1e23'},
  {id:'hedgehog',name:'Ёжик',     emoji:'🦔', fur:'#d8b78d', fur2:'#8a6a48', eye:'#2e2216'},
  {id:'frog',    name:'Лягушка',  emoji:'🐸', fur:'#9ccf6b', fur2:'#6da347', eye:'#1f3a14'},
  {id:'koala',   name:'Коала',    emoji:'🐨', fur:'#b9bcc4', fur2:'#9296a0', eye:'#2c2f36'},
  {id:'peacock', name:'Павлин',   emoji:'🦚', fur:'#4f9fd0', fur2:'#2f6f9c', eye:'#122b3c'},
  {id:'otter',   name:'Выдра',    emoji:'🦦', fur:'#9b6b45', fur2:'#7a5031', eye:'#2a1a10'},
  {id:'bat',     name:'Летучая мышь', emoji:'🦇', fur:'#6b5a76', fur2:'#4b3d55', eye:'#e8d98a'},
  {id:'hamster', name:'Хомяк',    emoji:'🐹', fur:'#d7a76a', fur2:'#b58749', eye:'#2a1a10'}
];
const PET_MAP = {};
PETS.forEach(function(p){ PET_MAP[p.id] = p; });

function palette(feed, base){
  if(feed === 'white')  return {fur:'#faf6ee', fur2:'#e6dccd', eye:'#d9534f'};
  if(feed === 'green')  return {fur:'#a8c489', fur2:'#7fa25f', eye:'#2f4a22'};
  if(feed === 'gold')   return {fur:'#f0cb69', fur2:'#cfa045', eye:'#6b4a10'};
  if(feed === 'frost')  return {fur:'#c6e4f4', fur2:'#93c5df', eye:'#2c6b8f'};
  if(feed === 'dark')   return {fur:'#3b3542', fur2:'#221d29', eye:'#ff9a5a'};
  if(feed === 'cherry') return {fur:'#c85f80', fur2:'#9d3f5c', eye:'#431c28'};
  if(feed === 'kind')   return {fur:'#fffaf0', fur2:'#efe2ca', eye:'#6b5a3c'};
  if(feed === 'sun')    return {fur:'#f6cd60', fur2:'#dda32f', eye:'#7a5210'};
  if(feed === 'rainbow') return {fur:'#fbe3ef', fur2:'#cbb0e6', eye:'#5a3f78'};
  if(feed === 'fire')    return {fur:'#f08a4b', fur2:'#b8501f', eye:'#4a1500'};
  if(feed === 'sea')     return {fur:'#6fb6d3', fur2:'#40839f', eye:'#0f3f52'};
  if(feed === 'storm')   return {fur:'#a3aec6', fur2:'#6f7b95', eye:'#2b3a5a'};
  if(feed === 'moon')    return {fur:'#d7dfee', fur2:'#a3b0c9', eye:'#2c3a5c'};
  if(feed === 'crystal') return {fur:'#d4eef6', fur2:'#9bd3e2', eye:'#2d6b7a'};
  if(feed === 'choco')   return {fur:'#8f5f3f', fur2:'#66412b', eye:'#2a180f'};
  if(feed === 'mushroom')return {fur:'#d6c6ab', fur2:'#a3906f', eye:'#3a2c1c'};
  if(feed === 'flower')  return {fur:'#f6dbe7', fur2:'#dcaec4', eye:'#5a2a3c'};
  return {fur:base.fur, fur2:base.fur2, eye:base.eye};
}

/* ---- рисунки (цвета через CSS-переменные) ---- */
const ART = {};

ART.lion = [
  '<path d="M72 58 q16 4 12 24" stroke="var(--fur2)" stroke-width="5" fill="none" stroke-linecap="round"/>',
  '<rect x="34" y="78" width="8" height="14" rx="4" fill="var(--fur2)"/>',
  '<rect x="58" y="78" width="8" height="14" rx="4" fill="var(--fur2)"/>',
  '<ellipse cx="50" cy="74" rx="23" ry="15" fill="var(--fur)"/>',
  '<circle cx="50" cy="45" r="21" fill="var(--fur2)"/>',
  '<circle cx="36" cy="33" r="6" fill="var(--fur2)"/>',
  '<circle cx="64" cy="33" r="6" fill="var(--fur2)"/>',
  '<circle cx="50" cy="47" r="13.5" fill="var(--fur)"/>',
  '<circle cx="43" cy="44" r="3.1" fill="var(--eye)"/><circle cx="42.3" cy="43" r="1.1" fill="#fff" opacity=".9"/>',
  '<circle cx="57" cy="44" r="3.1" fill="var(--eye)"/><circle cx="56.3" cy="43" r="1.1" fill="#fff" opacity=".9"/>',
  '<path d="M50 50 l-4.5 4.5 h9 z" fill="var(--fur2)"/>',
  '<path d="M50 55 v4" stroke="var(--fur2)" stroke-width="1.4" stroke-linecap="round"/>'
].join('');

ART.fox = [
  '<path d="M18 84 q-8 -20 9 -25 q12 -3 13 12 q0 14 -22 13z" fill="var(--fur2)"/>',
  '<ellipse cx="54" cy="72" rx="21" ry="14" fill="var(--fur)"/>',
  '<rect x="40" y="80" width="7" height="12" rx="3.5" fill="var(--fur2)"/>',
  '<rect x="62" y="80" width="7" height="12" rx="3.5" fill="var(--fur2)"/>',
  '<path d="M41 24 l-7 19 18-7z" fill="var(--fur2)"/>',
  '<path d="M63 24 l7 19 -18-7z" fill="var(--fur2)"/>',
  '<circle cx="52" cy="46" r="15" fill="var(--fur)"/>',
  '<ellipse cx="52" cy="57" rx="8" ry="5.5" fill="#fff8ec"/>',
  '<circle cx="52" cy="54" r="2.2" fill="var(--fur2)"/>',
  '<circle cx="45" cy="43" r="3" fill="var(--eye)"/><circle cx="44.3" cy="42" r="1.1" fill="#fff" opacity=".9"/>',
  '<circle cx="59" cy="43" r="3" fill="var(--eye)"/><circle cx="58.3" cy="42" r="1.1" fill="#fff" opacity=".9"/>'
].join('');

ART.cat = [
  '<path d="M72 76 q16 -4 12 -22" stroke="var(--fur2)" stroke-width="6" fill="none" stroke-linecap="round"/>',
  '<ellipse cx="47" cy="74" rx="20" ry="14" fill="var(--fur)"/>',
  '<rect x="36" y="80" width="7" height="12" rx="3.5" fill="var(--fur2)"/>',
  '<rect x="54" y="80" width="7" height="12" rx="3.5" fill="var(--fur2)"/>',
  '<path d="M34 38 l-3 -14 13 7z" fill="var(--fur2)"/>',
  '<path d="M60 38 l3 -14 -13 7z" fill="var(--fur2)"/>',
  '<circle cx="47" cy="46" r="14" fill="var(--fur)"/>',
  '<circle cx="42" cy="44" r="2.8" fill="var(--eye)"/><circle cx="41.3" cy="43" r="1" fill="#fff" opacity=".9"/>',
  '<circle cx="53" cy="44" r="2.8" fill="var(--eye)"/><circle cx="52.3" cy="43" r="1" fill="#fff" opacity=".9"/>',
  '<path d="M47 51 l-2 2 h4z" fill="#e58aa5"/>',
  '<path d="M47 53 q-4 3 -7 0 M47 53 q4 3 7 0" stroke="var(--fur2)" stroke-width="1.2" fill="none"/>',
  '<path d="M33 47 h-8 M33 51 h-8 M61 47 h8 M61 51 h8" stroke="var(--fur2)" stroke-width="1" opacity=".8"/>'
].join('');

ART.owl = [
  '<ellipse cx="50" cy="60" rx="21" ry="27" fill="var(--fur)"/>',
  '<ellipse cx="50" cy="68" rx="12" ry="17" fill="#fff" opacity=".35"/>',
  '<ellipse cx="28" cy="60" rx="6" ry="16" fill="var(--fur2)"/>',
  '<ellipse cx="72" cy="60" rx="6" ry="16" fill="var(--fur2)"/>',
  '<path d="M36 34 l-4 -12 14 8z" fill="var(--fur2)"/>',
  '<path d="M64 34 l4 -12 -14 8z" fill="var(--fur2)"/>',
  '<circle cx="41" cy="46" r="8" fill="#fff"/><circle cx="59" cy="46" r="8" fill="#fff"/>',
  '<circle cx="41" cy="46" r="4" fill="var(--eye)"/><circle cx="59" cy="46" r="4" fill="var(--eye)"/>',
  '<circle cx="40" cy="44.6" r="1.4" fill="#fff" opacity=".95"/><circle cx="58" cy="44.6" r="1.4" fill="#fff" opacity=".95"/>',
  '<path d="M50 50 l-4 6 h8z" fill="#e0973f"/>',
  '<path d="M44 86 h-6 M56 86 h6" stroke="#e0973f" stroke-width="2.4" stroke-linecap="round"/>'
].join('');

ART.capy = [
  '<ellipse cx="50" cy="74" rx="25" ry="17" fill="var(--fur)"/>',
  '<circle cx="37" cy="36" r="5" fill="var(--fur2)"/>',
  '<circle cx="63" cy="36" r="5" fill="var(--fur2)"/>',
  '<ellipse cx="50" cy="44" rx="17" ry="15" fill="var(--fur)"/>',
  '<ellipse cx="50" cy="54" rx="10" ry="7" fill="var(--fur2)" opacity=".55"/>',
  '<circle cx="44" cy="40" r="2.6" fill="var(--eye)"/><circle cx="43.4" cy="39" r=".9" fill="#fff" opacity=".9"/>',
  '<circle cx="56" cy="40" r="2.6" fill="var(--eye)"/><circle cx="55.4" cy="39" r=".9" fill="#fff" opacity=".9"/>',
  '<ellipse cx="46" cy="53" rx="1.8" ry="1.2" fill="var(--eye)"/><ellipse cx="54" cy="53" rx="1.8" ry="1.2" fill="var(--eye)"/>',
  '<path d="M50 56 v3" stroke="var(--fur2)" stroke-width="1.2" stroke-linecap="round"/>'
].join('');

ART.dragon = [
  '<path d="M36 58 q-24 -20 -22 4 q10 10 22 5z" fill="var(--fur2)" opacity=".9"/>',
  '<path d="M64 58 q24 -20 22 4 q-10 10 -22 5z" fill="var(--fur2)" opacity=".9"/>',
  '<path d="M74 78 q14 2 10 12" stroke="var(--fur2)" stroke-width="6" fill="none" stroke-linecap="round"/>',
  '<path d="M80 88 l-5 6 l7 1z" fill="var(--fur2)"/>',
  '<ellipse cx="50" cy="74" rx="20" ry="14" fill="var(--fur)"/>',
  '<path d="M46 62 l4 -7 4 7z M54 60 l4 -6 4 6z M38 62 l4 -6 4 6z" fill="var(--fur2)"/>',
  '<circle cx="50" cy="44" r="14" fill="var(--fur)"/>',
  '<path d="M42 30 l-3 -8 8 4z M58 30 l3 -8 -8 4z" fill="var(--fur2)"/>',
  '<circle cx="45" cy="42" r="3" fill="var(--eye)"/><circle cx="44.3" cy="41" r="1.1" fill="#fff" opacity=".9"/>',
  '<circle cx="55" cy="42" r="3" fill="var(--eye)"/><circle cx="54.3" cy="41" r="1.1" fill="#fff" opacity=".9"/>',
  '<path d="M44 52 q6 4 12 0" stroke="var(--fur2)" stroke-width="1.6" fill="none" stroke-linecap="round"/>'
].join('');

ART.dog = [
  '<path d="M74 70 q12 -8 6 -20" stroke="var(--fur2)" stroke-width="5" fill="none" stroke-linecap="round"/>',
  '<ellipse cx="49" cy="74" rx="21" ry="14" fill="var(--fur)"/>',
  '<rect x="38" y="80" width="8" height="12" rx="4" fill="var(--fur2)"/>',
  '<rect x="54" y="80" width="8" height="12" rx="4" fill="var(--fur2)"/>',
  '<circle cx="49" cy="46" r="15" fill="var(--fur)"/>',
  '<ellipse cx="34" cy="47" rx="7" ry="12" fill="var(--fur2)"/>',
  '<ellipse cx="64" cy="47" rx="7" ry="12" fill="var(--fur2)"/>',
  '<ellipse cx="49" cy="55" rx="8" ry="6" fill="#fff8ec"/>',
  '<ellipse cx="49" cy="51" rx="3.4" ry="2.6" fill="var(--eye)"/>',
  '<path d="M49 56 v3 q-3 3 -6 0 M49 59 q3 3 6 0" stroke="var(--fur2)" stroke-width="1.3" fill="none" stroke-linecap="round"/>',
  '<circle cx="43" cy="43" r="3" fill="var(--eye)"/><circle cx="42.3" cy="42" r="1.1" fill="#fff" opacity=".9"/>',
  '<circle cx="55" cy="43" r="3" fill="var(--eye)"/><circle cx="54.3" cy="42" r="1.1" fill="#fff" opacity=".9"/>'
].join('');

ART.snake = [
  '<ellipse cx="50" cy="84" rx="25" ry="8" fill="var(--fur2)"/>',
  '<ellipse cx="50" cy="74" rx="20" ry="8" fill="var(--fur)"/>',
  '<ellipse cx="58" cy="64" rx="14" ry="7" fill="var(--fur2)"/>',
  '<path d="M66 62 q4 -16 -6 -22" stroke="var(--fur)" stroke-width="9" fill="none" stroke-linecap="round"/>',
  '<ellipse cx="58" cy="34" rx="12" ry="9" fill="var(--fur)"/>',
  '<circle cx="54" cy="32" r="2.6" fill="var(--eye)"/><circle cx="53.4" cy="31.2" r=".9" fill="#fff" opacity=".9"/>',
  '<circle cx="64" cy="32" r="2.6" fill="var(--eye)"/><circle cx="63.4" cy="31.2" r=".9" fill="#fff" opacity=".9"/>',
  '<path d="M48 36 h-6 l-4 -3 M42 36 l-4 3" stroke="#e8546b" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
  '<circle cx="40" cy="76" r="1.6" fill="var(--fur2)" opacity=".6"/><circle cx="62" cy="70" r="1.6" fill="var(--fur2)" opacity=".6"/>'
].join('');

ART.unicorn = [
  '<path d="M26 62 q-8 -14 4 -18" stroke="var(--fur2)" stroke-width="7" fill="none" stroke-linecap="round"/>',
  '<rect x="30" y="74" width="7" height="18" rx="3" fill="var(--fur2)"/>',
  '<rect x="42" y="76" width="7" height="16" rx="3" fill="var(--fur)"/>',
  '<rect x="56" y="76" width="7" height="16" rx="3" fill="var(--fur)"/>',
  '<rect x="66" y="74" width="7" height="18" rx="3" fill="var(--fur2)"/>',
  '<ellipse cx="50" cy="70" rx="22" ry="13" fill="var(--fur)"/>',
  '<path d="M66 64 q8 -12 4 -22" stroke="var(--fur)" stroke-width="11" fill="none" stroke-linecap="round"/>',
  '<ellipse cx="70" cy="40" rx="10" ry="9" fill="var(--fur)"/>',
  '<path d="M72 34 l6 -12 l2 13z" fill="#f4d36a" stroke="#d9ae3c" stroke-width="1"/>',
  '<path d="M62 32 q-6 -6 0 -10 q6 -4 4 4" stroke="var(--fur2)" stroke-width="4" fill="none" stroke-linecap="round"/>',
  '<circle cx="72" cy="38" r="2.4" fill="var(--eye)"/><circle cx="71.4" cy="37.2" r=".9" fill="#fff" opacity=".9"/>',
  '<ellipse cx="80" cy="43" rx="2" ry="1.4" fill="var(--fur2)"/>'
].join('');

ART.horse = [
  '<path d="M26 62 q-8 -14 4 -18" stroke="var(--fur2)" stroke-width="7" fill="none" stroke-linecap="round"/>',
  '<rect x="30" y="74" width="7" height="18" rx="3" fill="var(--fur2)"/>',
  '<rect x="42" y="76" width="7" height="16" rx="3" fill="var(--fur)"/>',
  '<rect x="56" y="76" width="7" height="16" rx="3" fill="var(--fur)"/>',
  '<rect x="66" y="74" width="7" height="18" rx="3" fill="var(--fur2)"/>',
  '<ellipse cx="50" cy="70" rx="22" ry="13" fill="var(--fur)"/>',
  '<path d="M66 64 q8 -12 4 -22" stroke="var(--fur)" stroke-width="11" fill="none" stroke-linecap="round"/>',
  '<ellipse cx="70" cy="40" rx="10" ry="9" fill="var(--fur)"/>',
  '<path d="M63 30 q-6 -8 2 -12 q8 -2 6 6" stroke="var(--fur2)" stroke-width="4" fill="none" stroke-linecap="round"/>',
  '<circle cx="72" cy="38" r="2.4" fill="var(--eye)"/><circle cx="71.4" cy="37.2" r=".9" fill="#fff" opacity=".9"/>',
  '<ellipse cx="80" cy="43" rx="2" ry="1.4" fill="var(--fur2)"/>',
  '<path d="M74 26 l-2 -6" stroke="var(--fur2)" stroke-width="2" stroke-linecap="round"/>'
].join('');

ART.griffin = [
  '<path d="M30 56 q-22 -16 -20 6 q10 8 20 4z" fill="var(--fur2)" opacity=".9"/>',
  '<path d="M58 54 q22 -16 20 6 q-10 8 -20 4z" fill="var(--fur2)" opacity=".9"/>',
  '<path d="M74 74 q14 2 8 14" stroke="var(--fur2)" stroke-width="5" fill="none" stroke-linecap="round"/>',
  '<ellipse cx="50" cy="72" rx="22" ry="14" fill="var(--fur)"/>',
  '<rect x="38" y="78" width="7" height="12" rx="3" fill="var(--fur2)"/>',
  '<rect x="56" y="78" width="7" height="12" rx="3" fill="var(--fur2)"/>',
  '<circle cx="50" cy="44" r="14" fill="#fbf6ea"/>',
  '<path d="M58 44 l12 4 -12 5z" fill="#e0973f"/>',
  '<path d="M50 30 q-4 -6 0 -10 q4 4 2 10" fill="#fbf6ea"/>',
  '<circle cx="45" cy="41" r="3" fill="var(--eye)"/><circle cx="44.3" cy="40" r="1.1" fill="#fff" opacity=".9"/>',
  '<circle cx="55" cy="41" r="3" fill="var(--eye)"/><circle cx="54.3" cy="40" r="1.1" fill="#fff" opacity=".9"/>'
].join('');

ART.seal = [
  '<ellipse cx="50" cy="76" rx="24" ry="14" fill="var(--fur)"/>',
  '<path d="M28 78 q-10 4 -8 10 q8 0 12 -4z" fill="var(--fur2)"/>',
  '<path d="M72 78 q10 4 8 10 q-8 0 -12 -4z" fill="var(--fur2)"/>',
  '<ellipse cx="50" cy="50" rx="16" ry="14" fill="var(--fur)"/>',
  '<circle cx="44" cy="48" r="2.8" fill="var(--eye)"/><circle cx="43.3" cy="47" r="1" fill="#fff" opacity=".9"/>',
  '<circle cx="56" cy="48" r="2.8" fill="var(--eye)"/><circle cx="55.3" cy="47" r="1" fill="#fff" opacity=".9"/>',
  '<ellipse cx="50" cy="56" rx="3" ry="2.2" fill="var(--fur2)"/>',
  '<path d="M50 58 v4 M43 60 h-8 M43 62 h-8 M57 60 h8 M57 62 h8" stroke="var(--fur2)" stroke-width="1.1" opacity=".8" stroke-linecap="round"/>'
].join('');

ART.deer = [
  '<path d="M38 30 l-6 -12 l6 4 l-4 -10 M62 30 l6 -12 l-6 4 l4 -10" stroke="var(--fur2)" stroke-width="2.4" fill="none" stroke-linecap="round"/>',
  '<rect x="34" y="74" width="5" height="18" rx="2.5" fill="var(--fur2)"/>',
  '<rect x="44" y="76" width="5" height="16" rx="2.5" fill="var(--fur)"/>',
  '<rect x="53" y="76" width="5" height="16" rx="2.5" fill="var(--fur)"/>',
  '<rect x="62" y="74" width="5" height="18" rx="2.5" fill="var(--fur2)"/>',
  '<ellipse cx="50" cy="70" rx="21" ry="12" fill="var(--fur)"/>',
  '<path d="M60 64 q6 -10 4 -18" stroke="var(--fur)" stroke-width="9" fill="none" stroke-linecap="round"/>',
  '<ellipse cx="63" cy="42" rx="9" ry="8" fill="var(--fur)"/>',
  '<ellipse cx="37" cy="34" rx="4" ry="9" fill="var(--fur2)" transform="rotate(-25 37 34)"/>',
  '<circle cx="65" cy="40" r="2.3" fill="var(--eye)"/><circle cx="64.4" cy="39.2" r=".9" fill="#fff" opacity=".9"/>',
  '<ellipse cx="71" cy="46" rx="2" ry="1.4" fill="var(--fur2)"/>'
].join('');

ART.wolf = [
  '<path d="M76 68 q12 -10 4 -22" stroke="var(--fur2)" stroke-width="8" fill="none" stroke-linecap="round"/>',
  '<ellipse cx="48" cy="74" rx="21" ry="14" fill="var(--fur)"/>',
  '<rect x="36" y="80" width="7" height="12" rx="3.5" fill="var(--fur2)"/>',
  '<rect x="52" y="80" width="7" height="12" rx="3.5" fill="var(--fur2)"/>',
  '<path d="M34 36 l-2 -14 14 8z" fill="var(--fur2)"/>',
  '<path d="M58 36 l2 -14 -14 8z" fill="var(--fur2)"/>',
  '<circle cx="46" cy="46" r="15" fill="var(--fur)"/>',
  '<path d="M46 52 l-7 4 q7 4 14 0z" fill="#f2eee6"/>',
  '<ellipse cx="46" cy="48" rx="3" ry="2.2" fill="var(--eye)"/>',
  '<circle cx="40" cy="42" r="3" fill="var(--eye)"/><circle cx="39.3" cy="41" r="1.1" fill="#fff" opacity=".9"/>',
  '<circle cx="53" cy="42" r="3" fill="var(--eye)"/><circle cx="52.3" cy="41" r="1.1" fill="#fff" opacity=".9"/>'
].join('');

ART.swan = [
  '<ellipse cx="46" cy="74" rx="24" ry="14" fill="var(--fur)"/>',
  '<path d="M64 68 q10 -6 6 -16" stroke="var(--fur2)" stroke-width="6" fill="none" stroke-linecap="round"/>',
  '<path d="M56 66 q10 -14 6 -26 q-3 -8 -10 -4" stroke="var(--fur)" stroke-width="9" fill="none" stroke-linecap="round"/>',
  '<ellipse cx="52" cy="30" rx="10" ry="8" fill="var(--fur)"/>',
  '<path d="M42 30 l-10 4 10 4z" fill="#e0973f"/>',
  '<circle cx="50" cy="28" r="2.2" fill="var(--eye)"/><circle cx="49.4" cy="27.2" r=".8" fill="#fff" opacity=".9"/>',
  '<path d="M32 70 q12 -10 24 -2 q-12 10 -24 2z" fill="var(--fur2)" opacity=".55"/>'
].join('');


ART.turtle = [
  '<ellipse cx="26" cy="80" rx="9" ry="4" fill="var(--fur2)"/>',
  '<ellipse cx="70" cy="80" rx="9" ry="4" fill="var(--fur2)"/>',
  '<path d="M18 74 a32 26 0 0 1 64 0z" fill="var(--fur2)"/>',
  '<path d="M18 74 h64" stroke="var(--fur)" stroke-width="3" opacity=".55"/>',
  '<path d="M50 48 v26 M34 54 l-8 20 M66 54 l8 20" stroke="var(--fur)" stroke-width="2.2" opacity=".55" fill="none"/>',
  '<path d="M74 70 q12 -2 12 8 q0 9 -12 7z" fill="var(--fur)"/>',
  '<circle cx="82" cy="74" r="2.2" fill="var(--eye)"/><circle cx="81.4" cy="73.4" r=".8" fill="#fff" opacity=".9"/>',
  '<path d="M85 78 q3 3 0 5" stroke="var(--fur2)" stroke-width="1.2" fill="none" stroke-linecap="round"/>'
].join('');

ART.panda = [
  '<circle cx="33" cy="30" r="10" fill="#2c2b30"/><circle cx="67" cy="30" r="10" fill="#2c2b30"/>',
  '<ellipse cx="50" cy="74" rx="23" ry="17" fill="var(--fur)"/>',
  '<ellipse cx="33" cy="85" rx="10" ry="6.5" fill="#2c2b30"/><ellipse cx="67" cy="85" rx="10" ry="6.5" fill="#2c2b30"/>',
  '<circle cx="50" cy="47" r="19" fill="var(--fur)"/>',
  '<ellipse cx="41" cy="45" rx="6.5" ry="8" fill="#2c2b30" transform="rotate(-15 41 45)"/>',
  '<ellipse cx="59" cy="45" rx="6.5" ry="8" fill="#2c2b30" transform="rotate(15 59 45)"/>',
  '<circle cx="41" cy="45" r="2.6" fill="#fff"/><circle cx="59" cy="45" r="2.6" fill="#fff"/>',
  '<circle cx="41" cy="45" r="1.4" fill="#1d1c20"/><circle cx="59" cy="45" r="1.4" fill="#1d1c20"/>',
  '<ellipse cx="50" cy="57" rx="3.2" ry="2.4" fill="#2c2b30"/>',
  '<path d="M50 60 v3 q-3 2.5 -6 0 M50 63 q3 2.5 6 0" stroke="#2c2b30" stroke-width="1.2" fill="none" stroke-linecap="round"/>'
].join('');

ART.penguin = [
  '<ellipse cx="50" cy="66" rx="21" ry="26" fill="#2b3038"/>',
  '<ellipse cx="50" cy="70" rx="13" ry="19" fill="#fdfbf5"/>',
  '<path d="M30 58 q-9 10 -2 18" stroke="#2b3038" stroke-width="7" fill="none" stroke-linecap="round"/>',
  '<circle cx="50" cy="38" r="15" fill="#2b3038"/>',
  '<circle cx="45" cy="36" r="3" fill="#fff"/><circle cx="55" cy="36" r="3" fill="#fff"/>',
  '<circle cx="45" cy="36" r="1.5" fill="#22262c"/><circle cx="55" cy="36" r="1.5" fill="#22262c"/>',
  '<path d="M50 41 l6.5 4 -6.5 3.5 -6.5 -3.5z" fill="#f0a53f"/>',
  '<ellipse cx="39" cy="90" rx="7" ry="3" fill="#f0a53f"/><ellipse cx="61" cy="90" rx="7" ry="3" fill="#f0a53f"/>'
].join('');

ART.hedgehog = [
  '<g fill="var(--fur2)"><path d="M28 64 l-8 -14 12 5z"/><path d="M38 54 l-3 -16 11 9z"/><path d="M50 50 l2 -15 7 12z"/><path d="M62 52 l9 -12 1 14z"/><path d="M72 62 l11 -5 -3 13z"/></g>',
  '<ellipse cx="50" cy="74" rx="26" ry="16" fill="var(--fur2)"/>',
  '<ellipse cx="36" cy="76" rx="16" ry="12" fill="var(--fur)"/>',
  '<circle cx="33" cy="72" r="2.6" fill="var(--eye)"/><circle cx="32.4" cy="71.4" r=".9" fill="#fff" opacity=".9"/>',
  '<ellipse cx="23" cy="78" rx="3.4" ry="2.6" fill="var(--fur2)"/>',
  '<path d="M20 82 q-5 2 -8 -1" stroke="var(--fur2)" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
  '<ellipse cx="40" cy="88" rx="6" ry="3" fill="var(--fur2)"/><ellipse cx="64" cy="88" rx="6" ry="3" fill="var(--fur2)"/>'
].join('');

ART.frog = [
  '<ellipse cx="50" cy="78" rx="27" ry="13" fill="var(--fur)"/>',
  '<ellipse cx="50" cy="66" rx="20" ry="14" fill="var(--fur)"/>',
  '<circle cx="37" cy="46" r="9" fill="var(--fur)"/><circle cx="63" cy="46" r="9" fill="var(--fur)"/>',
  '<circle cx="37" cy="46" r="5.5" fill="#fff"/><circle cx="63" cy="46" r="5.5" fill="#fff"/>',
  '<circle cx="37" cy="46" r="2.6" fill="var(--eye)"/><circle cx="63" cy="46" r="2.6" fill="var(--eye)"/>',
  '<path d="M30 66 q20 10 40 0" stroke="var(--fur2)" stroke-width="1.8" fill="none"/>',
  '<ellipse cx="28" cy="86" rx="9" ry="4.4" fill="var(--fur2)"/><ellipse cx="72" cy="86" rx="9" ry="4.4" fill="var(--fur2)"/>'
].join('');

ART.koala = [
  '<circle cx="29" cy="32" r="12" fill="var(--fur2)"/><circle cx="71" cy="32" r="12" fill="var(--fur2)"/>',
  '<circle cx="29" cy="32" r="6.5" fill="var(--fur)"/><circle cx="71" cy="32" r="6.5" fill="var(--fur)"/>',
  '<ellipse cx="50" cy="74" rx="22" ry="17" fill="var(--fur)"/>',
  '<circle cx="50" cy="46" r="19" fill="var(--fur)"/>',
  '<ellipse cx="50" cy="52" rx="6" ry="7.5" fill="#4a4550"/>',
  '<circle cx="41" cy="42" r="3" fill="var(--eye)"/><circle cx="59" cy="42" r="3" fill="var(--eye)"/>',
  '<path d="M50 60 v3" stroke="var(--fur2)" stroke-width="1.4" stroke-linecap="round"/>',
  '<ellipse cx="35" cy="88" rx="7" ry="3.4" fill="var(--fur2)"/><ellipse cx="65" cy="88" rx="7" ry="3.4" fill="var(--fur2)"/>'
].join('');

ART.peacock = [
  '<g opacity=".9">',
  '  <path d="M50 72 L14 34 A50 50 0 0 1 86 34z" fill="var(--fur2)" opacity=".45"/>',
  '  <circle cx="50" cy="18" r="5" fill="#4fb3c9"/><circle cx="50" cy="18" r="2" fill="#f0d264"/>',
  '  <circle cx="29" cy="29" r="5" fill="#4fb3c9"/><circle cx="29" cy="29" r="2" fill="#f0d264"/>',
  '  <circle cx="71" cy="29" r="5" fill="#4fb3c9"/><circle cx="71" cy="29" r="2" fill="#f0d264"/>',
  '  <circle cx="17" cy="46" r="4.4" fill="#4fb3c9"/><circle cx="17" cy="46" r="1.8" fill="#f0d264"/>',
  '  <circle cx="83" cy="46" r="4.4" fill="#4fb3c9"/><circle cx="83" cy="46" r="1.8" fill="#f0d264"/>',
  '</g>',
  '<ellipse cx="50" cy="78" rx="13" ry="12" fill="var(--fur)"/>',
  '<circle cx="50" cy="60" r="10" fill="var(--fur)"/>',
  '<path d="M47 51 l-2 -7 5 -2 1 6z" fill="#4fb3c9"/><path d="M53 51 l2 -7 -5 -2 -1 6z" fill="#4fb3c9"/>',
  '<circle cx="46" cy="58" r="2" fill="var(--eye)"/><circle cx="54" cy="58" r="2" fill="var(--eye)"/>',
  '<path d="M50 64 l-3 3 h6z" fill="#e8a33f"/>',
  '<rect x="45" y="86" width="4" height="6" rx="1.6" fill="#c99a3f"/><rect x="53" y="86" width="4" height="6" rx="1.6" fill="#c99a3f"/>'
].join('');

ART.otter = [
  '<path d="M24 74 q-14 6 -8 14 q9 4 14 -6z" fill="var(--fur2)"/>',
  '<ellipse cx="50" cy="76" rx="20" ry="15" fill="var(--fur)"/>',
  '<ellipse cx="48" cy="82" rx="12" ry="8" fill="#f2e3c9" opacity=".85"/>',
  '<circle cx="44" cy="48" r="15" fill="var(--fur)"/>',
  '<ellipse cx="29" cy="46" rx="5" ry="6" fill="var(--fur2)"/><ellipse cx="59" cy="46" rx="5" ry="6" fill="var(--fur2)"/>',
  '<ellipse cx="44" cy="56" rx="8" ry="5.5" fill="#f6ecd8"/>',
  '<ellipse cx="44" cy="52" rx="2.8" ry="2" fill="var(--fur2)"/>',
  '<circle cx="38" cy="45" r="2.8" fill="var(--eye)"/><circle cx="50" cy="45" r="2.8" fill="var(--eye)"/>',
  '<path d="M44 58 v2.5 M44 60.5 q-2.5 2 -5 0 M44 60.5 q2.5 2 5 0" stroke="var(--fur2)" stroke-width="1.2" fill="none" stroke-linecap="round"/>',
  '<ellipse cx="40" cy="88" rx="6" ry="3" fill="var(--fur2)"/><ellipse cx="60" cy="88" rx="6" ry="3" fill="var(--fur2)"/>'
].join('');

ART.bat = [
  '<path d="M38 42 q-16 -16 -30 -6 q11 3 11 13 q8 -8 18 -3z" fill="var(--fur2)"/>',
  '<path d="M62 42 q16 -16 30 -6 q-11 3 -11 13 q-8 -8 -18 -3z" fill="var(--fur2)"/>',
  '<ellipse cx="50" cy="44" rx="13" ry="15" fill="var(--fur)"/>',
  '<circle cx="50" cy="68" r="12" fill="var(--fur)"/>',
  '<path d="M40 74 l-4 9 9 -5z" fill="var(--fur)"/><path d="M60 74 l4 9 -9 -5z" fill="var(--fur)"/>',
  '<circle cx="44" cy="67" r="2.4" fill="var(--eye)"/><circle cx="56" cy="67" r="2.4" fill="var(--eye)"/>',
  '<path d="M46 75 l4 3 4 -3" stroke="var(--fur2)" stroke-width="1.4" fill="none" stroke-linecap="round"/>',
  '<path d="M50 29 v-7" stroke="var(--fur2)" stroke-width="1.6"/>'
].join('');

ART.hamster = [
  '<circle cx="32" cy="40" r="8" fill="var(--fur2)"/><circle cx="68" cy="40" r="8" fill="var(--fur2)"/>',
  '<ellipse cx="50" cy="74" rx="24" ry="18" fill="var(--fur)"/>',
  '<ellipse cx="50" cy="76" rx="16" ry="13" fill="#fff6ea"/>',
  '<circle cx="50" cy="52" r="16" fill="var(--fur)"/>',
  '<ellipse cx="36" cy="61" rx="8" ry="7" fill="#fff6ea"/><ellipse cx="64" cy="61" rx="8" ry="7" fill="#fff6ea"/>',
  '<circle cx="44" cy="48" r="2.6" fill="var(--eye)"/><circle cx="56" cy="48" r="2.6" fill="var(--eye)"/>',
  '<ellipse cx="50" cy="55" rx="2.4" ry="1.8" fill="#e08f9a"/>',
  '<path d="M50 57 v2 q-2.5 2 -5 0 M50 59 q2.5 2 5 0" stroke="var(--fur2)" stroke-width="1.1" fill="none" stroke-linecap="round"/>',
  '<ellipse cx="38" cy="89" rx="6" ry="3" fill="var(--fur2)"/><ellipse cx="62" cy="89" rx="6" ry="3" fill="var(--fur2)"/>'
].join('');

/* ---- эффекты корма ---- */
const OVER = {
  back: {
    kind: '<path d="M50 62 q-34 -22 -38 6 q16 12 38 4z" fill="#fff" opacity=".95"/><path d="M50 62 q34 -22 38 6 q-16 12 -38 4z" fill="#fff" opacity=".95"/>',
    human: '<rect x="40" y="80" width="7" height="14" rx="3.5" fill="var(--fur2)"/><rect x="53" y="80" width="7" height="14" rx="3.5" fill="var(--fur2)"/>',
    rainbow: '<g fill="none" opacity=".55">' +
             '<path d="M6 90 a44 44 0 0 1 88 0" stroke="#f28f8f" stroke-width="4"/>' +
             '<path d="M15 90 a35 35 0 0 1 70 0" stroke="#f6c66d" stroke-width="4"/>' +
             '<path d="M24 90 a26 26 0 0 1 52 0" stroke="#8fd0a8" stroke-width="4"/>' +
             '<path d="M33 90 a17 17 0 0 1 34 0" stroke="#8fb8e8" stroke-width="4"/></g>',
    fire: '<circle cx="50" cy="62" r="34" fill="#ff8a3d" opacity=".16"/>' +
          '<g fill="#ffb066" opacity=".6"><circle cx="16" cy="36" r="2"/><circle cx="86" cy="44" r="2.4"/>' +
          '<circle cx="78" cy="18" r="1.6"/><circle cx="22" cy="20" r="1.6"/></g>',
    sea: '<g fill="#bfe8f7" opacity=".8"><circle cx="18" cy="42" r="4"/><circle cx="12" cy="58" r="2.6"/>' +
         '<circle cx="84" cy="34" r="3.2"/><circle cx="90" cy="54" r="2"/><circle cx="26" cy="22" r="2"/></g>',
    storm: '<path d="M20 26 q2 -12 14 -12 q4 -10 16 -6 q12 -2 14 8 q12 1 10 11 q0 6 -10 6 h-38 q-10 0 -6 -7z" fill="#8b95ae" opacity=".7"/>',
    crystal: '<g fill="#bfeaf5" opacity=".85" stroke="#8fd3e5" stroke-width="1"><path d="M16 64 l6 -20 6 20z"/>' +
             '<path d="M72 60 l7 -22 7 22z"/><path d="M30 72 l5 -14 5 14z"/><path d="M62 72 l5 -15 5 15z"/></g>',
    choco: '<g fill="#8a5c3c" opacity=".22"><circle cx="20" cy="34" r="9"/><circle cx="32" cy="24" r="7"/>' +
           '<circle cx="80" cy="40" r="8"/><circle cx="70" cy="28" r="6"/></g>'
  },
  front: {
    kind: '<ellipse cx="50" cy="13" rx="12" ry="3.6" fill="none" stroke="#ffd76a" stroke-width="3"/>',
    sun: '<circle cx="50" cy="11" r="7" fill="#ffd15c"/><g stroke="#ffd15c" stroke-width="2" stroke-linecap="round">' +
         '<path d="M50 1 v-3 M50 21 v3 M40 11 h-3 M60 11 h3 M43 4 l-2 -2 M57 4 l2 -2 M43 18 l-2 2 M57 18 l2 2"/></g>',
    green: '<ellipse cx="30" cy="66" rx="6" ry="3.4" fill="#5f8a3f" transform="rotate(-28 30 66)"/>' +
           '<ellipse cx="70" cy="68" rx="6" ry="3.4" fill="#5f8a3f" transform="rotate(26 70 68)"/>' +
           '<ellipse cx="50" cy="58" rx="5" ry="3" fill="#79a856"/>' +
           '<path d="M70 68 q4 -8 10 -10" stroke="#5f8a3f" stroke-width="1.6" fill="none"/>',
    frost: '<g fill="#eafaff" opacity=".95"><circle cx="26" cy="52" r="1.6"/><circle cx="74" cy="48" r="1.6"/>' +
           '<circle cx="34" cy="66" r="1.2"/><circle cx="66" cy="64" r="1.2"/><circle cx="50" cy="30" r="1.3"/></g>' +
           '<path d="M50 24 v6 M47 27 h6" stroke="#eafaff" stroke-width="1.2"/>',
    cherry: '<path d="M50 30 q-4 -10 2 -18" stroke="#8c5a34" stroke-width="3" fill="none" stroke-linecap="round"/>' +
            '<circle cx="53" cy="10" r="6" fill="#f0b6cd"/><circle cx="45" cy="13" r="5" fill="#e79dbc"/>' +
            '<circle cx="59" cy="14" r="4.5" fill="#f5c6d9"/><circle cx="50" cy="6" r="4" fill="#f7d3e2"/>',
    gold: '<g fill="#fff3c4"><path d="M24 40 l1.4 3.4 3.4 1.4 -3.4 1.4 -1.4 3.4 -1.4 -3.4 -3.4 -1.4 3.4 -1.4z"/>' +
          '<path d="M76 52 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2z"/></g>',
    dark: '<g fill="#ff9a5a" opacity=".28"><circle cx="50" cy="45" r="12"/></g>',
    rainbow: '<path d="M38 30 a12 12 0 0 1 24 0" fill="none" stroke="#f28f8f" stroke-width="3" opacity=".95"/>' +
             '<path d="M42 30 a8 8 0 0 1 16 0" fill="none" stroke="#8fd0a8" stroke-width="3" opacity=".95"/>' +
             '<path d="M46 30 a4 4 0 0 1 8 0" fill="none" stroke="#8fb8e8" stroke-width="2.4" opacity=".95"/>',
    fire: '<path d="M50 28 q-7 -9 0 -18 q7 9 0 18z" fill="#ff8a3d" opacity=".92"/>' +
          '<path d="M50 25 q-3.5 -5 0 -10 q3.5 5 0 10z" fill="#ffd76a"/>' +
          '<path d="M78 72 q9 -10 3 -19 q-2 8 -9 11z" fill="#ff9a4d" opacity=".8"/>',
    sea: '<path d="M60 42 q11 -7 15 4 q-9 5 -15 -4z" fill="#7fc9e0" opacity=".85"/>' +
         '<g fill="#eaf9ff" opacity=".95"><circle cx="66" cy="30" r="2.4"/><circle cx="75" cy="24" r="1.6"/>' +
         '<circle cx="58" cy="22" r="1.2"/></g>',
    storm: '<path d="M66 38 l-9 11 h7 l-6 13 14 -16 h-7z" fill="#ffe066"/>',
    moon: '<path d="M70 20 a10 10 0 1 0 8 17 a8 8 0 1 1 -8 -17z" fill="#f4e6a8"/>' +
          '<g fill="#fff3c4"><path d="M28 22 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2z"/>' +
          '<path d="M50 12 l1 2.5 2.5 1 -2.5 1 -1 2.5 -1 -2.5 -2.5 -1 2.5 -1z"/>' +
          '<path d="M86 42 l1 2.5 2.5 1 -2.5 1 -1 2.5 -1 -2.5 -2.5 -1 2.5 -1z"/></g>',
    crystal: '<g fill="#d9f5fd" stroke="#8fd3e5" stroke-width="1"><path d="M34 46 l5 -15 5 15z"/>' +
             '<path d="M58 40 l4 -11 4 11z"/></g>' +
             '<g fill="#fff" opacity=".95"><circle cx="28" cy="30" r="1.8"/><circle cx="72" cy="58" r="1.4"/>' +
             '<circle cx="84" cy="26" r="1.2"/></g>',
    choco: '<g fill="#6b432c" opacity=".9"><circle cx="28" cy="34" r="4"/><circle cx="37" cy="27" r="3"/>' +
           '<circle cx="72" cy="30" r="3.4"/></g>' +
           '<ellipse cx="50" cy="24" rx="9" ry="3.4" fill="#a9714f" opacity=".8"/>',
    mushroom: '<path d="M34 28 q16 -18 32 0z" fill="#e05b5b"/><path d="M33 28 h34" stroke="#f6e6d8" stroke-width="2"/>' +
              '<g fill="#fff6ea"><circle cx="44" cy="22" r="2.2"/><circle cx="55" cy="20" r="1.8"/><circle cx="61" cy="25" r="1.5"/></g>' +
              '<rect x="45" y="28" width="10" height="7" rx="2.4" fill="#f1e2cd"/>' +
              '<g fill="#6f9c4c" opacity=".9"><ellipse cx="26" cy="88" rx="6" ry="2.6"/><ellipse cx="74" cy="88" rx="6" ry="2.6"/></g>',
    flower: '<g><circle cx="32" cy="52" r="4.2" fill="#f6a8c4"/><circle cx="32" cy="52" r="1.7" fill="#ffe066"/>' +
            '<circle cx="68" cy="58" r="3.6" fill="#c9a6e6"/><circle cx="68" cy="58" r="1.5" fill="#ffe066"/>' +
            '<circle cx="50" cy="34" r="3.2" fill="#ffd1e0"/><circle cx="50" cy="34" r="1.3" fill="#ffd76a"/>' +
            '<path d="M32 57 q2 8 -2 12" stroke="#6f9c4c" stroke-width="1.6" fill="none"/></g>'
  }
};

function petSVG(petId, feed, size, level, traces){
  var pet = PET_MAP[petId] || PETS[0];
  var c = palette(feed, pet);
  var n = Math.max(1, Math.min(level || 1, 8));
  var k = 0.9 + (n - 1) * 0.012;
  /* Следы прошлых кормов: тело берёт цвет последнего, а детали копятся. */
  var list = (traces && traces.length) ? traces.slice() : (feed ? [feed] : []);
  if(feed && list.indexOf(feed) < 0) list.push(feed);
  var seen = {}, marks = [];
  list.forEach(function(f){ if(f && !seen[f]){ seen[f] = 1; marks.push(f); } });
  var human = !!seen.human;
  var lift = human ? -3 : 0;
  var style = '--fur:' + c.fur + ';--fur2:' + c.fur2 + ';--eye:' + c.eye + ';';
  if (seen.gold) style += 'filter:drop-shadow(0 0 6px rgba(255,205,90,.9));';
  var s = '<svg viewBox="0 0 100 100" width="' + size + '" height="' + size + '" style="' + style + '">';
  s += '<ellipse cx="50" cy="93" rx="19" ry="3.4" fill="rgba(0,0,0,.09)"/>';
  s += '<g transform="translate(50 92) scale(' + k.toFixed(3) + ') translate(-50 -92)">';
  marks.forEach(function(f){ s += (OVER.back[f] || ''); });
  s += '<g transform="translate(0 ' + lift + ')">' + ART[pet.id] + '</g>';
  marks.forEach(function(f){ s += (OVER.front[f] || ''); });
  s += '</g></svg>';
  return s;
}
