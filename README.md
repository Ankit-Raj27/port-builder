#  PortBuilder – Custom Portfolio Generator using Next.js + Tailwind CSS

Too bored to create your own portfolio websites?

Welcome to **Portfolio Builder**, your all-in-one tool to **design**, **customize**, and **download** personal portfolios without writing a single line of code — unless you want to! 🧩

> This project helps you generate stunning developer portfolios using pre-built templates and customizable sections. It supports user authentication, theme toggling, Razorpay payments, and downloadable code.

---

##  Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS, Framer Motion
- **Authentication:** Clerk
- **Payments:** Razorpay
- **UI Library:** shadcn/ui
- **Icons:** Lucide React
- **Dark Mode Support:** `next-themes`

---

##  Features

### 🧭 Navigation
- Responsive sidebar with animated section switching.
- Dynamic hash-based routing to specific documentation sections.

### 🔐 Authentication
- Built-in Clerk auth to log in or sign up via email.
- Subscription tied to authenticated accounts.

### 🎨 Templates & Customization
- Choose from multiple portfolio templates.
- Live customization with real-time preview.
- Editable sections:
  - Hero Section
  - About Section
  - Projects Gallery
  - Contact Form
  - Skills & Experience

### 💾 Portfolio Download
- Authenticated users with active subscriptions can download a fully functional **Next.js + Tailwind CSS** project.
- Users without subscriptions are redirected to the **Pricing Page**.

### 💳 Payments & Subscription
- Integrated Razorpay one-time payment.
- Once subscribed, users get **lifetime access** to portfolio downloads.

### 🌙 Theme Toggle
- Switch between light, dark, and system modes using the dropdown menu.

### 🔍 Command-Based Search
- `⌘ + K` style documentation search using a command dialog.

---

## 📂 What's Inside the Download?

When you download your portfolio, you'll receive a zip with:

portfolio-download/ ├── public/ │ └── assets/ ├── src/ │ ├── components/ │ ├── pages/ │ └── styles/ ├── package.json ├── tailwind.config.js └── README.md

---

## ⚙️ How to Run Downloaded Portfolio Locally

After downloading and extracting the `.zip` file of your desired portfolio:

### 1. Extract the Zip File

Unzip the downloaded project folder.

### 2. Install Dependencies

```bash
npm install
```

## 3. Setup shadcn/ui (Only for First Time)
During installation, you'll be prompted to configure shadcn:

Click Y when asked to proceed with the shadcn installation.

Use the default options provided (just press Enter).

When asked for component selection, press A to select all and hit Enter.

## Run Development Server
```bash
npm run dev
```
Open your browser and visit:
📍 http://localhost:3000

