# 🚀 CBbackend

A high-performance RESTful API backend built with **Node.js** and **Express.js**.
It features secure OTP-based registration with Redis caching, dual-token JWT authentication, and Cloudinary-powered media management.

---

## ✨ Features

* 🔐 **OTP-Based Registration**

  * Email OTP verification
  * Stored in Upstash Redis with 5-minute expiry

* 🔑 **Secure Authentication**

  * JWT Access & Refresh tokens
  * Configurable expiry system

* 🗄 **Database Management**

  * MongoDB with multi-environment support
  * (Development, Staging, Production)

* ☁️ **Media Storage**

  * Cloudinary integration for file/image uploads

* 📧 **Mailing System**

  * SMTP-based transactional emails using Nodemailer

* 🧱 **Clean Architecture**

  * Versioned API routes (`/api/v1/pr`)
  * Environment-based configuration

---

## 🛠 Tech Stack

| Category       | Technology         |
| -------------- | ------------------ |
| Runtime        | Node.js            |
| Framework      | Express.js         |
| Database       | MongoDB (Mongoose) |
| Caching        | Redis (Upstash)    |
| Email          | Nodemailer (SMTP)  |
| Storage        | Cloudinary         |
| Authentication | JWT & Bcrypt       |

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory and add the following:

```env
# Server Config
ORIGIN=http://localhost:8000
PORT=8000
API_PREFIX=/api/v1/pr
NODE_ENV=development

# Database Config
MONGO_URL=your_mongodb_connection_string
DEV_DB_NAME=cb_dev
STAGING_DB_NAME=cb_staging
PROD_DB_NAME=cb_prod

# Authentication
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=your_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_redis_rest_token

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password

# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/PriyanshuGo/CBbackend.git
cd CBbackend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Application

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm start
```

---

## 🔐 Authentication Flow (OTP System)

This project uses a secure OTP-based registration process:

1. **User Registration**

   * User submits registration data

2. **OTP Generation**

   * Server generates a numeric OTP
   * Sent via email using SMTP

3. **Redis Caching**

   * OTP stored in Redis (TTL: 5 minutes)

4. **Verification**

   * User submits OTP
   * On success → user is saved in MongoDB

---

## 📑 API Endpoints

| Method | Endpoint                        | Description                             |
| ------ | ------------------------------- | --------------------------------------- |
| POST   | `/api/v1/pr/auth/register`      | Send OTP to email & cache in Redis      |
| POST   | `/api/v1/pr/auth/verify-otp`    | Verify OTP & create user                |
| POST   | `/api/v1/pr/auth/login`         | Login & receive JWT tokens              |
| POST   | `/api/v1/pr/auth/refresh-token` | Generate new access token using refresh |

---

## 🚀 Deployment

### ✅ Steps

* Add all `.env` variables to your deployment platform:

  * Vercel / Render / Railway

* Install dependencies:

```bash
npm install
```

* Start server:

```bash
node src/index.js
```

---

### ⚠️ Important Notes

* Ensure MongoDB Atlas allows your deployment IP
* Keep secrets secure (never commit `.env`)
* Use strong JWT secrets in production

---

⭐ If you found this project helpful, consider giving it a star!
