# FlipShop — Flipkart-Inspired Full-Stack E-Commerce

A responsive, production-oriented e-commerce starter built with React, Tailwind CSS, Redux Toolkit, Node.js, Express, MySQL, JWT authentication, Cloudinary image uploads, and Razorpay payment hooks.

## Features

### Frontend
- React + Vite + Tailwind CSS responsive Flipkart-like UI
- Home banner, categories, featured products
- Product listing with search, filters, sorting, and pagination
- Product details with reviews
- Cart, wishlist, checkout, profile, login/register, order history
- Admin dashboard with analytics, products, orders, and low-stock alerts

### Backend
- Node.js + Express MVC-style architecture
- JWT authentication and user/admin role authorization
- REST APIs with validation, rate limiting, Helmet, CORS, and centralized errors
- Cloudinary multipart image upload endpoint
- Razorpay order creation and payment signature verification
- MySQL schema and seed data with 10 categories and 50 sample products

## Project Structure

```text
backend/
  database/schema.sql
  database/seed.sql
  src/config/*
  src/controllers/*
  src/middleware/*
  src/routes/*
  src/validators/*
frontend/
  src/app/store.js
  src/components/*
  src/features/*
  src/layouts/*
  src/pages/*
  src/services/api.js
docs/API.md
```

## Prerequisites

- Node.js 20+
- MySQL 8+
- Cloudinary account for production image uploads
- Razorpay account for online payments

## Installation

```bash
npm run install:all
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
mysql -u root -p < backend/database/schema.sql
mysql -u root -p < backend/database/seed.sql
npm run dev
```

Default seed accounts use password `Password@123`:

- Admin: `admin@flipkart.test`
- User: `user@flipkart.test`

## Environment

Update `backend/.env` with MySQL, JWT, Cloudinary, and Razorpay values. Update `frontend/.env` with the API URL and Razorpay key.

## Scripts

- `npm run dev` — run frontend and backend together
- `npm run start` — run backend server
- `npm run build` — build frontend assets
- `npm run test` — frontend ESLint and backend syntax checks

## Deployment

1. Provision a MySQL 8 database and run `schema.sql` plus optional `seed.sql`.
2. Deploy `backend` to Render, Railway, Fly.io, AWS, or another Node host.
3. Set production environment variables and a long random `JWT_SECRET`.
4. Build `frontend` with `npm run build --prefix frontend` and deploy `frontend/dist` to Netlify, Vercel, S3, or Nginx.
5. Configure `FRONTEND_URL` on the API and `VITE_API_URL` on the frontend for the deployed domains.
6. Use HTTPS and configure Razorpay webhooks if you extend asynchronous payment reconciliation.

## API Documentation

See [`docs/API.md`](docs/API.md).
