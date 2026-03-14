# HRelper Frontend

## Overview

**HRelperFE** is the frontend application for the **[HRelper](https://github.com/Vasile07/HRelper)** platform.
It is built using **React** and **Vite**, and it communicates with the **HRelper Backend API** to provide users with an interactive web interface.

The frontend is responsible for:

* Rendering the user interface
* Handling client-side navigation
* Communicating with the backend API
* Managing authentication tokens
* Displaying application data

This project is part of the **HRelper ecosystem**, which includes:

* **HRelperFE** – React frontend application
* **HRelperBE** – Spring Boot backend API
* **Supabase** – PostgreSQL database hosting

---

# Technologies Used

* React
* Vite
* JavaScript (ES6+)
* Axios (API communication)
* React Router (navigation)
* CSS

---

# Requirements

Before running the project, make sure you have installed:

* Node.js (v20.19+ or v22+ recommended)
* npm

Check versions:

```
node -v
npm -v
```

---

# Installation

Clone the repository:

```
git clone https://github.com/<your-username>/HRelperFE.git
cd HRelperFE
```

Install dependencies:

```
npm install
```

---

# Running the Application

Start the development server:

```
npm run dev
```

The application will run at:

```
http://localhost:5173
```

---

# Backend API Connection

The frontend communicates with the **HRelper Backend API**.

Backend base URL:

```
https://hrelperbe.onrender.com
```

Example API request:

```
https://hrelperbe.onrender.com/<endpoint>
```

During development, API calls are typically made using **Axios**.

Example:

```javascript
import axios from "axios";

axios.get("https://hrelperbe.onrender.com/health")
     .then(response => console.log(response.data));
```

---

# Authentication

The application uses **JWT authentication** provided by the backend.

Typical flow:

1. User logs in
2. Backend returns a JWT token
3. Token is stored on the client
4. Token is sent in the Authorization header

Example header:

```
Authorization: Bearer <token>
```

---

# Related Projects

This frontend is part of the **HRelper ecosystem**:

* **[HRelper](https://github.com/Vasile07/HRelper)** – Landing page and project overview
* **[HRelperFE](https://github.com/Vasile07/HRelperFE)** – React frontend application
* **[HRelperBE](https://github.com/Vasile07/HRelperBE)** – Spring Boot backend API
---

# License

This project is part of an academic / learning project and is intended for educational purposes.
