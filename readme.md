# Casino Web Application

A lightweight, interactive casino web application built with PHP (Laravel) and JavaScript (Vue.js). It features classic casino games, user authentication, and a balance management system.

## 🚀 Play Live Demo on GitHub Pages
You can play the fully functional client-side version of this game online without installing anything!
👉 **[Play Live Demo Here](https://vijaymahes9080.github.io/casino_php_vue/)**

*This static demo stores all profiles and cash balances locally in your browser's LocalStorage.*

---

## 🚀 Technologies Used

### Backend (Server-side)
*   **PHP (version 7.1+)**: Core programming language.
*   **Laravel Framework (version 5.7)**: Handles routing, controllers, authentication, and database ORM (Eloquent).
*   **Composer**: Dependency manager for PHP.

### Frontend (Client-side)
*   **Vue.js (version 2.5)**: Powers the interactive game components (Blackjack and Slots).
*   **Bootstrap (version 4.0)**: Used for responsive layout and UI styling.
*   **Axios**: Manages asynchronous API calls between Vue.js and the Laravel backend.
*   **jQuery**: Used for page interactivity.
*   **SweetAlert2 / Animate.css**: Provides styled popup alerts and animations for wins and losses.
*   **Laravel Mix**: Built on Webpack, compiles and bundles the asset files.

### Database
*   **MySQL**: Relational database storing user details, credentials, and balances.

---

## 🎮 Features

*   **User Authentication**: Built-in login and registration system.
*   **Blackjack**: A full card game interface with custom hit/stand actions and score calculations.
*   **Slot Machine**: A responsive spinner game with visual reels and winning line payouts.
*   **Balance Management**: Interface for users to view and top up their in-game cash balance.

---

## 🛠️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/vijaymahes9080/casino_php_vue.git
   cd casino
   ```

2. **Install PHP Dependencies**
   ```bash
   composer install
   ```

3. **Install JavaScript Dependencies**
   ```bash
   npm install
   ```

4. **Configure Environment File**
   * Copy the example file to `.env`:
     ```bash
     cp .env.example .env
     ```
   * Set up your database details inside `.env`:
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=casino
     DB_USERNAME=root
     DB_PASSWORD=
     ```

5. **Generate Application Key**
   ```bash
   php artisan key:generate
   ```

6. **Set Up Database**
   * Create a database named `casino` in your MySQL server.
   * Import the database structure and initial data from `sql file/lara_casino.sql`.

7. **Compile Assets**
   ```bash
   npm run dev
   ```

8. **Run the Application**
   ```bash
   php artisan serve
   ```
   Access the app in your browser at `http://127.0.0.1:8000`.
