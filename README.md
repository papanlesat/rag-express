# 🧠 AI Question Answering API with LangChain, Ollama & Tavily

## 📌 Deskripsi Singkat

API backend yang dibangun dengan **Node.js (Express)** dan terintegrasi dengan **LangChain**, **Ollama**, dan **Tavily**. Proyek ini menyediakan layanan **tanya-jawab berbasis AI**, mendukung mode **streaming**, **RAG (Retrieval-Augmented Generation)**, serta pencarian informasi dari web.


## 📚 Daftar Isi

- [🧰 Instalasi](#-instalasi)
- [🚀 Penggunaan](#-penggunaan)
- [🤝 Kontribusi](#-kontribusi)
- [📄 Lisensi](#-lisensi)
- [📬 Kontak](#-kontak)

## 🧰 Instalasi

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan proyek:

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/nama-proyek.git
   cd nama-proyek
   ```

2. **Instal dependensi**
   ```bash
   npm install
   ```

3. **Buat file `.env`**
   Tambahkan konfigurasi berikut:
   ```
   OLLAMA_HOST=http://localhost:11434
   OLLAMA_MODEL=llama2
   TAVILY_API_KEY=your_tavily_api_key
   ```

4. **Jalankan aplikasi**
   ```bash
   node index.js
   ```

## 🚀 Penggunaan

### 🔍 1. Ajukan Pertanyaan
- **Endpoint**: `POST /api/ai/ask`
- **Body**:
  ```json
  {
    "question": "Apa itu LangChain?"
  }
  ```

### 📡 2. Streaming Jawaban
- **Endpoint**: `POST /api/ai/ask-stream`
- **Deskripsi**: Mengembalikan hasil jawaban secara real-time (streaming).

### 📚 3. Siapkan Dokumen RAG
- **Endpoint**: `POST /api/ai/prepare-rag`
- **Body**:
  ```json
  {
    "documents": ["LangChain adalah framework sumber terbuka...", "Ollama menjalankan LLM secara lokal..."]
  }
  ```

### 🔄 4. Aktifkan/Nonaktifkan RAG
- **Endpoint**: `POST /api/ai/toggle-rag`
- **Body**:
  ```json
  {
    "enabled": true
  }
  ```

### 🌐 5. Pencarian Web (Tavily)
- **Endpoint**: `POST /api/ai/search`
- **Body**:
  ```json
  {
    "question": "What is the latest version of Node.js?"
  }
  ```

## 🤝 Kontribusi

Kami menyambut kontribusi dari komunitas!

Untuk berkontribusi:

1. Fork repository ini.
2. Buat branch fitur: `git checkout -b fitur-baru`.
3. Commit perubahan Anda: `git commit -m 'Tambah fitur baru'`.
4. Push ke branch Anda: `git push origin fitur-baru`.
5. Buat Pull Request.

Pastikan kode Anda mengikuti struktur dan gaya proyek yang ada.

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).  
Bebas digunakan dan dimodifikasi, dengan tetap mencantumkan atribusi yang sesuai.

## 📬 Kontak

Jika ada pertanyaan atau saran, silakan hubungi:

- ✉️ Email: [papanlesat@gmail.com](mailto:papanlesat@gmail.com)
- 🐙 GitHub: [@papanlesat](https://github.com/papanlesat)

> Made with ❤️ by [papanlesat]