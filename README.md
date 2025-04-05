# 📝 Task Management System

A full-stack task management system built with **Node.js**, **Express**, **MySQL**, **React.js**, and **Material UI**. It allows users to sign up, log in, and manage their tasks efficiently with due dates, status updates, and pagination.

---

## 🚀 Features

- ✅ User Authentication (JWT-based)
- ✅ Create, update, delete tasks
- ✅ View tasks with pagination
- ✅ Filter and sort tasks by **status** and **due date**
- ✅ Responsive UI built with **Material UI**
- ✅ Secure API endpoints
- ✅ Input validations and error handling

---

## 🛠️ Tech Stack

| Frontend       | Backend         | Database |
|----------------|------------------|-----------|
| React.js       | Node.js          | MySQL     |
| Material UI    | Express.js       | Sequelize |
| Axios          | JWT Auth         |           |

---

## 📦 Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/task-management-system.git
cd task-management-system
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
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
```

Then run migrations and start the server:

```bash
npx sequelize db:create
npx sequelize db:migrate
npm start
```

---

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

> _You can add screenshots or a GIF here showing login, adding task, etc._

---

## 📁 Project Structure

```
.
├── backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend
│   ├── src/
│   │   ├── components/
│   │   └── context/
│   └── App.js
```

---

## 🧹 Future Improvements

- Add due date reminders
- Add drag-and-drop for task sorting
- Allow file attachments
- Role-based access

---

## 🤝 Author

Made with ❤️ by **Ritesh Yadav**

> [ritesh.yadav@example.com](mailto:ritesh.yadav@example.com)  
> GitHub: [@riteshyadav](https://github.com/riteshyadav)
