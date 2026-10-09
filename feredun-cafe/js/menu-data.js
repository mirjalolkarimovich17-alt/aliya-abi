/*
 * Feredun Cafe — menyu ma'lumotlari.
 *
 * RASMLAR: har bir taom uchun avval `images/menu/<id>.jpg` fayli qidiriladi.
 * Restoranning haqiqiy taom rasmlarini shu nom bilan `images/menu/` papkasiga
 * joylashtiring (masalan: images/menu/urama-shashlik.jpg) — sayt avtomatik
 * ularni ko'rsatadi. Fayl topilmasa, `fallback` dagi onlayn rasm ishlatiladi.
 *
 * NARXLAR: taxminiy, restoranning amaldagi narxlari bilan almashtiring.
 */

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=75`;

window.MENU_CATEGORIES = [
  { id: "all", name: "Barchasi", icon: "✦" },
  { id: "shashlik", name: "Shashliklar", icon: "🔥" },
  { id: "hot", name: "Issiq taomlar", icon: "🍲" },
  { id: "national", name: "Milliy taomlar", icon: "🫓" },
  { id: "salad", name: "Salatlar", icon: "🥗" },
  { id: "soup", name: "Sho'rvalar", icon: "🥣" },
  { id: "dessert", name: "Shirinliklar", icon: "🍰" },
  { id: "drinks", name: "Ichimliklar", icon: "🍹" },
];

window.MENU_ITEMS = [
  // --- Shashliklar ---
  { id: "urama-shashlik", cat: "shashlik", name: "Urama shashlik", desc: "Qo'y go'shti qiymasi, maxsus ziravorlar bilan ko'mirda pishirilgan. Restoranning eng mashhur taomi.", price: 28000, unit: "1 six", badge: "Xit", fallback: U("photo-1529193591184-b1d58069ecdd") },
  { id: "qoy-shashlik", cat: "shashlik", name: "Qo'y go'shtidan shashlik", desc: "Yumshoq qo'y go'shti bo'laklari, piyoz va zira bilan.", price: 30000, unit: "1 six", fallback: U("photo-1555939594-58d7cb561ad1") },
  { id: "mol-shashlik", cat: "shashlik", name: "Mol go'shtidan shashlik", desc: "Marinadlangan mol go'shti, olovda tayyorlangan.", price: 30000, unit: "1 six", fallback: U("photo-1603360946369-dc9bb6258143") },
  { id: "jigar-shashlik", cat: "shashlik", name: "Jigar shashlik", desc: "Dumba bilan o'ralgan yangi jigar.", price: 25000, unit: "1 six", fallback: U("photo-1544025162-d76694265947") },
  { id: "tovuq-shashlik", cat: "shashlik", name: "Tovuq shashlik", desc: "Tovuq soni go'shti, sarimsoqli sous bilan.", price: 22000, unit: "1 six", fallback: U("photo-1599487488170-d11ec9c172f0") },
  { id: "assorti-shashlik", cat: "shashlik", name: "Shashlik assorti", desc: "Urama, qo'y, mol, tovuq va jigar — 4–5 kishilik katta laganda.", price: 240000, unit: "lagan", badge: "Oilaviy", fallback: U("photo-1504674900247-0877df9cc836") },

  // --- Issiq taomlar ---
  { id: "joja-tabaka", cat: "hot", name: "Jo'ja tabaka", desc: "Butun jo'ja, qarsildoq qilib qovurilgan, sarimsoqli sous va garnir bilan.", price: 75000, unit: "1 dona", badge: "Xit", fallback: U("photo-1598103442097-8b74394b95c6") },
  { id: "barra", cat: "hot", name: "Barra", desc: "Tandirda sekin pishirilgan yosh qo'zichoq go'shti — Feredunning o'ziga xos taomi.", price: 180000, unit: "1 kg", badge: "Maxsus", fallback: U("photo-1600891964092-4316c288032e") },
  { id: "qozon-kabob", cat: "hot", name: "Qozon kabob", desc: "Qo'y go'shti va kartoshka qozonda qovurilgan.", price: 85000, unit: "porsiya", fallback: U("photo-1544025162-d76694265947") },
  { id: "steyk", cat: "hot", name: "Mol go'shtidan steyk", desc: "Grilda pishirilgan steyk, sabzavotlar va sous bilan.", price: 120000, unit: "porsiya", fallback: U("photo-1600891964092-4316c288032e") },
  { id: "gril-sabzavot", cat: "hot", name: "Grilda sabzavotlar", desc: "Bulg'or qalampiri, baqlajon, pomidor va qo'ziqorin.", price: 35000, unit: "porsiya", fallback: U("photo-1540420773420-3366772f4999") },

  // --- Milliy taomlar ---
  { id: "osh", cat: "national", name: "To'y oshi", desc: "Devzira guruch, qo'y go'shti, sabzi va no'xat bilan.", price: 45000, unit: "porsiya", fallback: U("photo-1633945274405-b6c8069047b0") },
  { id: "manti", cat: "national", name: "Manti", desc: "Qo'y go'shti va piyozli bug'da pishgan manti, qatiq bilan.", price: 35000, unit: "5 dona", fallback: U("photo-1496116218417-1a781b1c416c") },
  { id: "somsa", cat: "national", name: "Tandir somsa", desc: "Tandirda yopilgan, go'shtli qatlamali somsa.", price: 12000, unit: "1 dona", fallback: U("photo-1601050690597-df0568f70950") },
  { id: "lagmon", cat: "national", name: "Lag'mon", desc: "Qo'lda cho'zilgan lag'mon, go'sht va sabzavotli sous bilan.", price: 38000, unit: "porsiya", fallback: U("photo-1585032226651-759b368d7246") },

  // --- Salatlar ---
  { id: "achchiq-chuchuk", cat: "salad", name: "Achchiq-chuchuk", desc: "Pomidor, piyoz va achchiq qalampir — shashlikka eng yaxshi hamroh.", price: 15000, unit: "porsiya", fallback: U("photo-1592417817098-8fd3d9eb14a5") },
  { id: "sezar", cat: "salad", name: "Sezar salati", desc: "Tovuq, aysberg, parmezan, krutonlar va Sezar sousi.", price: 42000, unit: "porsiya", fallback: U("photo-1550304943-4f24f54ddde9") },
  { id: "grek", cat: "salad", name: "Grek salati", desc: "Bodring, pomidor, qalampir, zaytun va feta pishlog'i.", price: 38000, unit: "porsiya", fallback: U("photo-1540189549336-e6e99c3679fe") },
  { id: "feredun-salat", cat: "salad", name: "Feredun salati", desc: "Mol go'shti, ko'katlar va oshpazning maxsus sousi bilan.", price: 45000, unit: "porsiya", badge: "Maxsus", fallback: U("photo-1512621776951-a57141f2eefd") },

  // --- Sho'rvalar ---
  { id: "shorva", cat: "soup", name: "Qo'y sho'rva", desc: "Qo'y go'shti, no'xat va sabzavotli tiniq sho'rva.", price: 35000, unit: "porsiya", fallback: U("photo-1547592166-23ac45744acd") },
  { id: "mastava", cat: "soup", name: "Mastava", desc: "Guruchli quyuq sho'rva, qatiq va ko'katlar bilan.", price: 30000, unit: "porsiya", fallback: U("photo-1604152135912-04a022e23696") },

  // --- Shirinliklar ---
  { id: "chak-chak", cat: "dessert", name: "Chak-chak", desc: "Asalli milliy shirinlik.", price: 25000, unit: "porsiya", fallback: U("photo-1551024601-bec78aea704b") },
  { id: "tort", cat: "dessert", name: "Kun torti", desc: "Har kuni yangi pishiriladigan tort bo'lagi.", price: 28000, unit: "bo'lak", fallback: U("photo-1578985545062-69928b1d9587") },
  { id: "muzqaymoq", cat: "dessert", name: "Muzqaymoq", desc: "3 shar, meva va shokolad sousi bilan.", price: 22000, unit: "porsiya", fallback: U("photo-1497034825429-c343d7c6a68f") },

  // --- Ichimliklar ---
  { id: "kok-choy", cat: "drinks", name: "Ko'k choy", desc: "Choynakda, limon va navvot bilan.", price: 8000, unit: "choynak", fallback: U("photo-1556679343-c7306c1976bc") },
  { id: "limonad", cat: "drinks", name: "Uy limonadi", desc: "Yalpiz, limon va rezavorlar bilan — 1 litr.", price: 35000, unit: "1 l", fallback: U("photo-1513558161293-cdaf765ed2fd") },
  { id: "mojito", cat: "drinks", name: "Mojito (alkogolsiz)", desc: "Laym, yalpiz va gazli suv.", price: 25000, unit: "stakan", fallback: U("photo-1470337458703-46ad1756a187") },
  { id: "kofe", cat: "drinks", name: "Kapuchino", desc: "Yangi tortilgan qahva, sut ko'pigi bilan.", price: 18000, unit: "stakan", fallback: U("photo-1509042239860-f550ce710b93") },
];

window.GALLERY = [
  { src: "images/gallery/1.jpg", fallback: U("photo-1517248135467-4c7edcad34c4"), title: "Asosiy zal" },
  { src: "images/gallery/2.jpg", fallback: U("photo-1519671482749-fd09be7ccebf"), title: "Banket zali" },
  { src: "images/gallery/3.jpg", fallback: U("photo-1555396273-367ea4eb4db5"), title: "Shinam kabinalar" },
  { src: "images/gallery/4.jpg", fallback: U("photo-1555939594-58d7cb561ad1"), title: "Mangal" },
  { src: "images/gallery/5.jpg", fallback: U("photo-1516450360452-9312f5e86fc7"), title: "Disko bar" },
  { src: "images/gallery/6.jpg", fallback: U("photo-1414235077428-338989a2e8c0"), title: "Dasturxon" },
];
