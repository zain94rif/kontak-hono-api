# 🚀 Nama Proyek Anda

Deskripsi singkat tentang apa yang dilakukan aplikasi ini. Misalnya: "API berperforma tinggi yang dibangun menggunakan Bun runtime dan framework Hono."

## 🛠️ Fitur
- **Bun Runtime:** Eksekusi JavaScript & TypeScript yang sangat cepat.
- **Hono Framework:** Framework web kecil, sederhana, dan super cepat.
- **TypeScript:** Keamanan tipe data sejak awal.
- [Tambahkan fitur lain di sini, misal: Drizzle ORM, Zod validation, dll.]

## 📋 Prasyarat
Pastikan Anda sudah menginstal [Bun](https://bun.sh/) di sistem Anda.
```bash
curl -fsSL https://bun.sh | bash

## 🚀 Cara Menjalankan Project
Ikuti langkah-langkah di bawah ini untuk menyiapkan lingkungan pengembangan:

### 1. Instalasi Dependensi
Instal semua library yang dibutuhkan menggunakan Bun:
```bash
bun install

### 2. Generate Prisma
```bash
bunx prisma generate

### 3. Migrate Database
```bash
bunx prisma migrate dev

### 4. Jalankan Test
```bash
bun test test/user.test.ts
bun test test/address.test.ts
bun test test/contact.test.ts


### . Jalankan Secara Local
Jalankan BUN Hono di Local:
```bash
bun run dev

open http://localhost:3000
