# Tracking Baraka Otomatis

Target: cloud/VPS, jalan harian pukul 17:00 WIB, agen G-005TAM, maksimal 150 resi, batch 3.

## Tahap saat ini
Engine browser + generator + report + email sudah disiapkan. Parser hasil tracking masih sengaja konservatif: struktur HTML live Baraka harus dikunci lewat satu test browser nyata agar tidak salah mengambil data.

## Instalasi
npm install
npx playwright install chromium
cp .env.example .env

## Test 1 resi
npm test -- G-005TAM/2609280009

## Catatan
Jangan jalankan runner produksi sebelum test-one berhasil dan selector/parser dikunci.
