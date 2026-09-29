# Nely Hampers 🎁

A premium, full-stack web application for a luxury gifting business.

## Project Overview

Nely Hampers allows customers to browse thoughtfully curated gift hampers, or build their own completely custom hamper by selecting specific items like boxes, chocolates, and flowers based on their budget. The application features a beautiful storefront for customers and a secure dashboard for administrators to manage orders, categories, and products.

## Technology Stack

- **Frontend:** Next.js (App Router), React, Vanilla CSS (CSS Modules)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs

## Folder Structure

```
nely-hampers/
├── frontend/        # Next.js application (Port 3000)
│   ├── src/app/     # Pages & Routes
│   └── src/components/ # Reusable UI components
├── backend/         # Express server (Port 5000)
│   ├── config/      # DB Connection
│   ├── controllers/ # Route Logic
│   ├── models/      # Mongoose Schemas
│   └── routes/      # Express Routes
└── .env             # Global Environment Variables
```

## Features

**Customer Experience:**
- Premium, elegant UI adhering strictly to the Nely Hampers brand palette (Cream, Sage Green, Deep Olive, Soft Gold, Charcoal).
- Custom Hamper Builder with budget calculation.
- Authentication (Register & Login).
- Checkout flow generating a WhatsApp order format.

**Admin Experience:**
- Secure admin login portal.
- Dashboard with total orders, new enquiries, and recent sales.
- Full CRUD APIs for Categories, Products, Orders, and Customers.

## Environment Setup

1. Make sure you have Node.js and MongoDB installed locally.
2. The root directory contains a `.env` file that configures ports, secrets, and the MongoDB connection string. Ensure `MONGODB_URI` is correct for your local or Atlas instance.

## Backend Installation & Setup

```bash
cd backend
npm install
npm run seed:admin
npm run dev
```

*Note: The `seed:admin` script will automatically create the initial administrator account in your database if one does not exist.*

### Default Development Admin Login

- **Username:** admin
- **Password:** 12345

> [!WARNING]
> This credential is for development only! Ensure you change it in production and configure your `.env` securely.

## Frontend Installation & Setup

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## API Documentation

The REST APIs are mounted at `http://localhost:5000/api`.
- `POST /api/auth/login` (Customer login)
- `POST /api/auth/admin-login` (Admin login)
- `GET /api/categories` (Fetch active categories)
- `GET /api/products` (Fetch products, supports `?isCustomizable=true`)
- `POST /api/orders` (Submit an order)
- `PUT /api/orders/:id/status` (Update order status - Admin)

## Production Security Notes

- Do not commit `.env` to source control.
- Ensure `JWT_SECRET` is long, random, and securely stored.
- Restrict MongoDB network access.
- Deploy frontend and backend separately (e.g. Vercel for Next.js, Render/Heroku for Node.js).
