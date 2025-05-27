# E-Strapi Project

## 🧾 Overview

This project consists of a full-stack application using **Nuxt 3** (frontend) and **Strapi** (backend) with integrated **Stripe** payment system.

**Directory Structure:**

```
e-strapi/
├── back/         # Strapi backend
└── frontend/     # Nuxt frontend
```

---

## ⚙️ Backend (Strapi)

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x or yarn

### Installation

```bash
cd back
npm install
```

### Running the Backend

```bash
npm run develop
```

The backend will typically run on [http://localhost:1337](http://localhost:1337)

---

## 🌐 Frontend (Nuxt 3)

### Prerequisites

- Node.js >= 18.x
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Running the Frontend

```bash
npm run dev
```

The frontend will typically run on [http://localhost:3000](http://localhost:3000)

---

## 💳 Stripe Integration

Stripe is used for handling payment functionality. It is integrated using:

- `@stripe/stripe-js`
- `stripe` (Node.js backend package)

Ensure to add your Stripe API keys in the proper configuration files or use environment variables.

---

## 📦 Dependencies (Frontend)

Some of the main Nuxt 3 packages used:

- `@nuxt/ui`
- `@nuxt/image`
- `@nuxt/content`
- `@nuxtjs/strapi`
- `@pinia/nuxt`
- `primevue`
- `@stripe/stripe-js`

---

## 📝 Notes

- Make sure CORS is properly configured in Strapi for frontend requests.
- TailwindCSS and PrimeVue are used for styling and UI components.
- For internationalization, `vue-i18n` and `@intlify/nuxt3` are used.

---

## 📁 Deployment

To deploy this project:

- Deploy Strapi backend to a server (e.g. DigitalOcean, Heroku, Render).
- Deploy Nuxt frontend using services like Vercel, Netlify, or your own VPS.
- Set up proper environment variables for API URLs and Stripe keys.

---
