# Lab 7 - Product Orders Management System
**Deployed Web Application with Authentication (RBAC) & MongoDB Atlas**

---

## 1. Features
- **Authentication & RBAC:**
  - Login / Register / Logout using JWT stored in secure HTTP-only cookie.
  - Roles: `admin` and `staff`.
  - Protected routes: `/orders`, `/orders/create`, `/orders/update/:id`, `/orders/delete/:id`.
  - Top navigation bar showing current username, role, and logout action.
- **Product & Order Management:**
  - View all orders sorted by date.
  - Create new orders with real-time stock-available product list.
  - Update customer name, product, quantity, order date, and auto-recalculate total price.
  - Delete orders.
- **Cloud Database Support:**
  - Fully compatible with **MongoDB Atlas** (`mongodb+srv://...`).
  - Cached connection handler to prevent connection leaks on serverless platforms (Vercel).
- **Deployment Ready:**
  - Pre-configured for **Vercel** (`vercel.json`) and **Render**.

---

## 2. Test Accounts for Lecturer / Evaluator

| Role | Username | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `123456` | Full access: View, create, update, delete orders |
| **Staff** | `staff` | `123456` | Staff access: View, create, update orders |

*(You can also register any new account directly via the `/register` page)*

---

## 3. Environment Variables (`.env`)
```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/lab7?retryWrites=true&w=majority
JWT_SECRET=lab7_orders_management_secret_key_2026
NODE_ENV=production
```

---

## 4. Local Installation & Testing
```bash
# 1. Install dependencies
npm install

# 2. Seed data (Products, Orders, Admin & Staff accounts)
npm run seed

# 3. Start server
npm start
# App running at http://localhost:3000
```

---

## 5. Deployment Guide

### Option A: Deploy to Vercel (Fastest & 100% Free)
1. Push code to your GitHub:
   ```bash
   git init
   git add .
   git commit -m "Lab 7 deployment with Auth and Atlas"
   git remote add origin git@github.com:nguyenvananh24/lab7-orders.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) -> **Add New Project** -> Import your `lab7-orders` repository.
3. Under **Environment Variables**, add:
   - `MONGODB_URI`: your MongoDB Atlas connection string.
   - `JWT_SECRET`: `lab7_orders_management_secret_key_2026`
4. Click **Deploy**. Vercel will give you a live production link (e.g. `https://lab7-orders.vercel.app`).

### Option B: Deploy to Render
1. Push code to GitHub repository.
2. Go to [render.com](https://render.com) -> **New Web Service** -> Select your repo.
3. Settings:
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add Environment Variables:
   - `MONGODB_URI`: your MongoDB Atlas connection string.
   - `JWT_SECRET`: `lab7_orders_management_secret_key_2026`
5. Click **Create Web Service**. Live link: `https://<service-name>.onrender.com`.
