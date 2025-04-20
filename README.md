# To-Do List Web App

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Made with Next.js](https://img.shields.io/badge/Next.js-React-blue?logo=next.js)

Welcome to the **To-Do List Web App**! This application helps users efficiently manage tasks, organize them by date, and stay productive — all with a modern, responsive interface and user-friendly design.


## Features

- **User Authentication** – Secure login & registration via Firebase Auth.
- **Task Management** – Add, view, mark complete, or delete tasks by date.
- **Date Picker** – Choose the date you're planning for with a built-in selector.
- **Dark/Light Theme Toggle** – Fully themeable interface using CSS variables.
- **Responsive UI** – Designed for both mobile and desktop users.
- **Progress Visualization** – Get feedback on your daily productivity.

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Authentication**: Firebase Authentication
- **Backend**: Node.js, Express
- **Database**: MariaDB (via MySQL2 driver)
- **Styling**: Tailwind CSS + Custom Themes

## Project Structure

To-Do-List-Webpage
    ├── Client
    ├── README.md
    └── Server

## Environment Setup

### Client (`Client/.env`)

Create a file named `.env` inside the `Client/` folder:

```env
NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_REACT_APP_authDomain=your_firebase_project.firebaseapp.com
NEXT_PUBLIC_REACT_APP_projectId=your_firebase_project_id
NEXT_PUBLIC_REACT_APP_storageBucket=your_firebase_project.appspot.com
NEXT_PUBLIC_REACT_APP_messagingSenderId=your_sender_id
NEXT_PUBLIC_REACT_APP_appId=your_app_id

NEXT_PUBLIC_API_URL=http://localhost:1234
```
You can get these from your Firebase Console → Project Settings → General.

### Server (`Server/.env`)

Create a file named `.env` inside the `Server/` folder:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=task_manager
PORT=1234
```

## SQL Table Setup

Use this SQL to create your `tasks` table:

```sql
CREATE DATABASE IF NOT EXISTS task_manager;

USE task_manager;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  task_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Getting Started Locally

1. Install Dependencies

```bash
cd Client
npm install

cd ../Server
npm install
```

2. Start the Server

```bash
cd Server
npm run dev
```

This starts the Express backend on ```http://localhost:1234```

3. Start the client

```bash
cd Client
npm run dev
```

Visit your frontend at ```http://localhost:3000```

## Contact Me

Feel free to reach out to me through:

- **GitHub**: [Kenet Ortiz](https://github.com/KOrtizLedezma)
- **LinkedIn**: [Kenet Ortiz](https://www.linkedin.com/in/kenet-ortiz-ledezma-67a4a421b/)
