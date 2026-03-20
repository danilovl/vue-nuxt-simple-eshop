# vue-nuxt-simple-eshop

A simple demo e-shop built with **Nuxt 3**, **Pinia**, and **TypeScript**. The project includes a product showcase, shopping cart, favorites list, checkout, and an admin panel for content management.

![Alt text](/git/demo.gif?raw=true "E-shop demo")

## ✨ Key Features

### Showcase and Products
*   **Product Catalog**: View the list of available products with images, descriptions, and prices.
*   **Search**: Quickly find products by name.
*   **Pagination**: Easy navigation through a large number of products.
*   **Detail Page**: Detailed information about each product.

### Shopping and Favorites
*   **Shopping Cart**: Add products, manage quantities, remove items.
*   **Favorites**: Save your favorite products to a separate list.
*   **Checkout**: A full checkout form with data validation.
*   **Order History**: View order status after placement.

### Admin Panel
*   **Product Management**: Create, edit, and delete products from the catalog.
*   **Order Management**: View the list of all incoming orders.
*   **Authorization**: Secure login to the admin panel using JWT (simulated via localStorage).

### Miscellaneous
*   **Localization (I18n)**: Support for Russian and English languages (RU/EN).
*   **Responsiveness**: Bootstrap 5-based interface displays correctly on various devices.

---

## 🛠 Technology Stack

*   **Frontend**: [Nuxt 3](https://nuxt.com/) (Vue 3 Composition API)
*   **State Management**: [Pinia](https://pinia.vuejs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Bootstrap 5](https://getbootstrap.com/), [SCSS](https://sass-lang.com/), [Font Awesome 6](https://fontawesome.com/)
*   **Validation**: [Vuelidate](https://vuelidate-js.netlify.app/), [Vee-validate](https://vee-validate.logaretm.com/v4/)
*   **HTTP Client**: [Axios](https://axios-http.com/)
*   **Backend Simulation**: [json-server](https://github.com/typicode/json-server) + JWT Auth Middleware

---

## 🚀 Quick Start

**Node.js** (version 24+) or **Docker** is required to run the project.

### Option 1: Local Setup (npm)

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run backend simulation** (will open on port 3555):
    ```bash
    npm run json
    ```

3.  **Run Nuxt application** (in another terminal window, will open on port 5111):
    ```bash
    npm run dev
    ```

### Option 2: Run via Docker

If you have Docker and Docker Compose installed:

```bash
docker-compose up --build
```

After startup, the application will be available at `http://localhost:5111`.

---

## 📜 Available Scripts

*   `npm run dev` — starts the Nuxt development server.
*   `npm run json` — starts `json-server` for working with data (`data.js`).
*   `npm run build` — builds the project for production.
*   `npm run generate` — static site generation.
*   `npm run preview` — locally preview the production build.
*   `npm run lint` — checks and fixes code formatting issues via ESLint.

---

## 🔒 Admin Credentials

To access the admin panel, you can use any data (simulated authorization) or check `authMiddleware.js` for the validation logic.

---

Developed as a demo project to explore the capabilities of Nuxt 3 and Pinia.
