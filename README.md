# 📝 Task Management System

A full-stack task management system built with **Node.js**, **Express**, **PostgreSQL**, **React.js**, and **Material UI**. It allows users to sign up, log in, and manage their tasks efficiently with due dates, status updates, and pagination.

---

## 🚀 Features

- ✅ User Authentication (JWT-based)
- ✅ Create, update, delete tasks
- ✅ View tasks with pagination
- ✅ Filter and sort tasks by **status** ,  **Created date** and **due date**
- ✅ Responsive UI built with **Material UI**
- ✅ Secure API endpoints
- ✅ Input validations and error handling

---

## 🛠️ Tech Stack

| Frontend       | Backend         | Database |
|----------------|------------------|------------|
| React.js       | Node.js          | PostgreSQL |
| Material UI    | Express.js       | Sequelize  |
| Axios          | JWT Auth         |            |

---

## 📦 Installation

### 1. Clone the repo

```bash
git clone https://github.com/ritesh-2124/Task-Management-System-Systra.git
cd Task-Management-System-Systra
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
DB_NAME=your_db_name
DB_USER=your_PostgreSQL_user
DB_PASSWORD=your_PostgreSQL_password
DB_HOST=localhost
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000)

---

## 🔐 Authentication

- Login required for all task-related routes.
- JWT token stored in context and passed via `Authorization` header.

---

## 🧪 Sample `.env` (Backend)

```env
PORT=5000
JWT_SECRET=mySuperSecretKey
DB_NAME=task_db
DB_USER=root
DB_PASSWORD=password123
DB_HOST=localhost
```

---

## 📷 Screenshots
### Ragister Page
<img width="1709" alt="Screenshot 2025-04-05 at 10 28 35 PM" src="https://github.com/user-attachments/assets/a8832f4b-155f-464e-9021-beee5078a25c" />

### Login Page
<img width="1709" alt="Screenshot 2025-04-05 at 10 28 25 PM" src="https://github.com/user-attachments/assets/efef23fa-7ea5-4309-b3c1-ede5e13d08e7" />

### Task Page
<img width="1709" alt="Screenshot 2025-04-05 at 10 29 10 PM" src="https://github.com/user-attachments/assets/c3aa6664-4111-4974-be81-4d01f3f6cc2c" />




---

## 📁 Project Structure

```
.
├── backend
│   ├── src
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── server.js
│   │   └── app.js

├── frontend
│   ├── src/
│   │   ├── components/
│   │   └── context/
│   └── App.js
```

---

## 🧹 Future Improvements

- Add due date reminders
- Send a mail if user is missing a due date
---

## 🤝 Author

Made by **Ritesh Yadav**

> [riteshyad222000@gmail.com](mailto:riteshyad222000@gmail.com)  
> GitHub: [@ritesh-2124](https://github.com/ritesh-2124)
