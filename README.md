# 🚀 Hono Bun Contact API

**"API berperforma tinggi yang dibangun menggunakan Bun runtime dan framework Hono."**

---

## 🛠️ Fitur

* **Bun Runtime:** Eksekusi JavaScript & TypeScript yang sangat cepat.
* **Hono Framework:** Framework web kecil, sederhana, dan super cepat.
* **TypeScript:** Keamanan tipe data sejak awal.
* **Prisma 6, PostgreSQL and Zod validation :**

---

## 📋 Prasyarat

Pastikan Anda sudah menginstal **Bun** di sistem Anda.

```bash
curl -fsSL https://bun.sh | bash
```

---

## 🚀 Cara Menjalankan Project

Ikuti langkah-langkah di bawah ini untuk menyiapkan lingkungan pengembangan:

### 1. Instalasi Dependensi

```bash
bun install
```

### 2. Generate Prisma

```bash
bunx prisma generate
```

### 3. Migrate Database

```bash
bunx prisma migrate dev
```

### 4. Jalankan Test

```bash
bun test test/user.test.ts
bun test test/address.test.ts
bun test test/contact.test.ts
```

### 5. Jalankan Secara Local

Jalankan server **Bun + Hono** di local:

```bash
bun run dev
```

Buka di browser:

```
http://localhost:3000
```
