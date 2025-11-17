# BarberQueue

![Status](https://img.shields.io/badge/status-In%20Progress-yellow)
![License](https://img.shields.io/badge/license-MIT-green)
![Stack](https://img.shields.io/badge/stack-Angular%20%7C%20Node.js%20%7C%20Express%20%7C%20WebSockets-blue)

---

## 📖 About

BarberQueue is a **barber shop appointment management system** that allows real-time queue management:  

- **Clients** can view the queue from their mobile devices and take turns manually.  
- **Barbers** manage the service order using an internal dashboard.  
- The **barber shop** can display the current turn on a screen.  
- Includes an **admin panel** to configure services, prices, and schedules.  

---

## 🛠 Technologies

- **Frontend:** Angular  
- **Backend:** Node.js / Express  
- **Real-time updates:** WebSockets  

---

## ✨ Features

- Role-based authentication: client, barber, admin  
- Real-time queue updates for all users  
- Admin panel for managing services, prices, and schedules  
- Mobile-friendly interface for clients  

---

## 🚀 Installation


# Clone the repository
```bash
git clone https://github.com/ZGuillerX/BarberQueue.git
```

# Backend setup

```bash
cd backend-barberqueue
npm install
```

# Frontend setup
```bash
cd ../frontend-barberqueue
npm install
```

## 🌐 Environment Variables

## Frontend (Angular)
Create a `enviroment` and use `environment.ts` :

```bash
API_URL=http://localhost:your_port
```

## Backend (NodeJs/Express)
Create a `.env` 

```bash
DB_NAME=barberqueue_db
DB_HOST=your_host
DB_USER=ryour_user
DB_PASSWORD=your_password
DB_PORT=your_port
JWT_SECRET='your_secret_key'
```

## Run backend
```bash
cd ../backend-barberqueue
npm start
```

## Run frontend
```bash
cd ../frontend-barberqueue
ng serve
```
