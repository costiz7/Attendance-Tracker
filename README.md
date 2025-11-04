# 🕒 Attendance Tracker

Aplicație web pentru monitorizarea prezenței la evenimente, destinată atât organizatorilor cât și participanților.  
Proiect realizat pentru disciplina **Tehnologii Web**.

---

## 🎯 Obiectiv

Realizarea unei aplicații **Single Page Application (SPA)** care permite:
- înregistrarea evenimentelor și a grupurilor de evenimente;
- generarea automată de coduri / QR pentru acces;
- confirmarea prezenței participanților;
- exportul listelor de prezență în formate CSV/XLSX.

---

## ⚙️ Tehnologii utilizate

| Componentă | Tehnologie |
|-------------|-------------|
| **Frontend** | React.js |
| **Backend** | Node.js + Express |
| **Bază de date** | MySQL |
| **ORM** | Sequelize |
| **Export date** | XLSX / CSV |
| **Coduri QR** | NPM package `qrcode` |

---

## 🧩 Arhitectură generală

Aplicația este formată din două componente principale:

- **Frontend (SPA)** – React.js, comunică cu API-ul REST prin `fetch`
- **Backend (API REST)** – Express + Sequelize, conectat la baza de date MySQL

---

## 👥 Tipuri de utilizatori

### 🔹 Organizator
- se conectează în aplicație;
- creează evenimente sau grupuri de evenimente;
- obține codul / QR-ul pentru accesul participanților;
- vizualizează lista de participanți prezenți în timp real;
- exportă listele în format CSV/XLSX.

### 🔹 Participant
- se conectează în aplicație;
- introduce codul sau scanează QR-ul pentru a marca prezența;
- poate consulta istoricul propriu al prezențelor (opțional).

---

## 📄 Flux de utilizare

1. Utilizatorul accesează aplicația → pagina **Login**  
2. În funcție de rolul selectat (`organizer` / `participant`), este redirecționat spre:
   - `/organizer/dashboard` – interfață pentru gestionarea evenimentelor
   - `/participant/join` – interfață pentru introducerea codului de prezență
3. Backend-ul gestionează autentificarea și persistă datele în MySQL prin Sequelize.
4. La final, organizatorul poate exporta prezențele.

---

## 🧱 Modelul bazei de date

| Tabel | Câmpuri principale | Relații |
|-------|--------------------|----------|
| **users** | id, name, email, password, role | 1–n cu `events` (organizatorul) |
| **events** | id, name, code, status, start_time, end_time, organizer_id | n–n cu `users` prin `attendance` |
| **attendance** | id, user_id, event_id, timestamp | legătură many-to-many |
