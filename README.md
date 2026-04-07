CBbackend
A high-performance RESTful API backend built with Node.js and Express. It features secure OTP-based registration cached via Redis, dual-token JWT authentication, and integrated Cloudinary media management.

🚀 Features
OTP Registration: User registration validated via Email OTP, stored in Upstash Redis with a 5-minute expiration policy.
Secure Authentication: Implements JWT Access and Refresh tokens with configurable expiry.
Database Management: Multi-environment MongoDB support (Development, Staging, Production).
Media Storage: Integrated Cloudinary API for handling file and image uploads.
Mailing System: SMTP integration for automated transactional emails.
Clean Architecture: Prefixed API routes (/api/v1/pr) and environment-driven configuration.
🛠 Tech Stack
Runtime: Node.js
Framework: Express.js
Database: MongoDB (Mongoose)
Caching: Redis (Upstash)
Email: Nodemailer (SMTP)
Storage: Cloudinary
Auth: JSON Web Tokens (JWT) & Bcrypt
⚙️ Configuration
Create a .env file in the root directory and populate it with the following variables:

 copy
dotenv

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
 copy
📦 Installation
Clone the repository:

 copy
bash

git clone https://github.com/PriyanshuGo/CBbackend.git
cd CBbackend
Install dependencies:

 copy
bash

npm install
Start the application:

 copy
bash

# Development mode
npm run dev

# Production mode
npm start
🔑 Registration Flow (OTP Logic)
This project uses a secure verification flow for new users:

Submission: User sends registration details to the register endpoint.
OTP Generation: The system generates a numeric OTP and sends it via SMTP.
Redis Caching: The OTP is stored in Redis with the user's email as the key and a 5-minute (300s) TTL.
Verification: The user must provide the OTP within the timeframe to persist their data into MongoDB and finalize registration.
📑 API Endpoints
| Method | Endpoint | Description | | :--- | :--- | :--- | | POST | /api/v1/pr/auth/register | Send OTP to email & cache in Redis | | POST | /api/v1/pr/auth/verify-otp | Verify OTP and create user in DB | | POST | /api/v1/pr/auth/login | Log in and receive JWT tokens | | POST | /api/v1/pr/auth/refresh-token | Generate new access token using refresh token |

🚀 Deployment
Environment Variables: Ensure all keys from the .env section are added to your deployment platform (e.g., Vercel, Render, or Railway).
Build & Start:
Build: npm install
Start: node src/index.js
Database Whitelisting: Ensure your MongoDB Atlas cluster whitelists the IP address of your deployment server.
