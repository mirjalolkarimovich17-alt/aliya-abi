# Feredun Cafe — veb-sayt

Termiz shahridagi **Feredun Cafe (Sharqona oilaviy restoran)** uchun bir sahifali, mobilga moslashgan sayt.
Butun sayt bitta fayl: `index.html` (CSS va JS ichida).

## Ishga tushirish
`index.html` ni brauzerda oching yoki:
```bash
cd feredun-cafe && python3 -m http.server 8080
# http://localhost:8080
```
GitHub Pages / Netlify / Vercel'ga to'g'ridan-to'g'ri joylash mumkin.

## Bo'limlar
Hero · Biz haqimizda · Menyu (kategoriyalar, qidiruv, taom oynasi, savatcha) · Zallar (banket, kabinalar, karaoke/disko bar) · Galereya · Joy band qilish · Aloqa + Yandex xarita.

## Haqiqiy menyu rasmlarini qo'yish
Sayt har bir taom uchun avval **`images/menu/<id>.jpg`** faylini qidiradi; topilmasa — vaqtinchalik onlayn rasm ko'rsatiladi.
Restoranning haqiqiy rasmlarini (Instagram'dan yoki o'zingiz suratga olgan) quyidagi nomlar bilan saqlang:

| Taom | Fayl |
|---|---|
| Urama shashlik | `images/menu/urama-shashlik.jpg` |
| Qo'y shashlik | `images/menu/qoy-shashlik.jpg` |
| Mol shashlik | `images/menu/mol-shashlik.jpg` |
| Jigar shashlik | `images/menu/jigar-shashlik.jpg` |
| Tovuq shashlik | `images/menu/tovuq-shashlik.jpg` |
| Shashlik assorti | `images/menu/assorti-shashlik.jpg` |
| Jo'ja tabaka | `images/menu/joja-tabaka.jpg` |
| Barra | `images/menu/barra.jpg` |
| ... | to'liq ro'yxat: `index.html` ichidagi `MENU_ITEMS` dagi `id` maydoni |

Galereya rasmlari: `images/gallery/1.jpg` … `6.jpg`.

## Menyu va narxlarni tahrirlash
Barcha taomlar, tavsiflar va narxlar `index.html` ichidagi `MENU_ITEMS` ro'yxatida.
**Diqqat:** hozirgi narxlar taxminiy — restoranning amaldagi narxlari bilan almashtiring.

## Aloqa ma'lumotlari
- Manzil: Termiz sh., 5-kichik daha, Alisher Navoiy ko'chasi, 16A ("Serenada" to'yxonasi ro'parasi)
- Tel: +998 (99) 034-95-95, +998 (90) 294-36-38
- Ish vaqti: har kuni 10:00–23:00
- Instagram: [@feredun.restaurant](https://www.instagram.com/feredun.restaurant/)
