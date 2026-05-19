# 🍽️ Recipe Finder App

A full-stack recipe discovery web application built with **Vue 3**, **Back4App**, and the **MealDB REST API**. Search thousands of real-world recipes, view detailed cooking instructions, and persist your favorites — all in one clean, reactive interface.

---

## ✨ Features

- 🔍 **Search Recipes** — Find meals by name using the MealDB REST API
- 📖 **Recipe Details** — View full ingredients, measurements, and step-by-step instructions
- ❤️ **Save Favorites** — Store and manage your favorite recipes via Back4App's cloud database
- 📱 **Responsive Design** — Works seamlessly across desktop and mobile devices
- ⚡ **Reactive UI** — Built with Vue 3's Composition API for a smooth, dynamic experience

---

## 🛠️ Tech Stack

| Layer       | Technology                                      |
|-------------|------------------------------------------------|
| Frontend    | [Vue 3](https://vuejs.org/) + JavaScript       |
| Backend/BaaS| [Back4App](https://www.back4app.com/) (Parse)  |
| Recipe Data | [TheMealDB REST API](https://www.themealdb.com/api.php) |
| Styling     | CSS                                             |

---

## 📁 Project Structure

```
recipe-finder-app/
└── recipe-finder-client/    # Vue 3 frontend application
    ├── src/
    │   ├── components/      # Reusable Vue components
    │   ├── views/           # Page-level views
    │   ├── router/          # Vue Router configuration
    │   ├── App.vue          # Root component
    │   └── main.js          # App entry point
    ├── public/
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- npm or yarn
- A free [Back4App](https://www.back4app.com/) account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kryss143/recipe-finder-app.git
   cd recipe-finder-app/recipe-finder-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Back4App**

   Create a `.env` file in the `recipe-finder-client` directory and add your Back4App credentials:
   ```env
   VUE_APP_BACK4APP_APP_ID=your_app_id_here
   VUE_APP_BACK4APP_JS_KEY=your_js_key_here
   ```
   You can find these in your Back4App dashboard under **App Settings → Security & Keys**.

4. **Run the development server**
   ```bash
   npm run serve
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser.

### Build for Production

```bash
npm run build
```
The compiled output will be in the `dist/` folder, ready to deploy to any static host (Netlify, Vercel, etc.).

---

## 🌐 API Reference

This app uses the free [TheMealDB API](https://www.themealdb.com/api.php). No API key is required for the free tier.

**Key endpoints used:**

| Endpoint | Description |
|----------|-------------|
| `GET /search.php?s={name}` | Search meals by name |
| `GET /lookup.php?i={id}` | Get full meal details by ID |
| `GET /categories.php` | List all meal categories |
| `GET /filter.php?c={category}` | Filter meals by category |

---

## ☁️ Back4App Integration

Back4App is used as the Backend-as-a-Service (BaaS) layer, powered by the [Parse Platform](https://parseplatform.org/). It handles:

- **User authentication** — Sign up / log in
- **Favorites storage** — Saving and retrieving a user's favorite recipes to the cloud database

To set up your Back4App database:
1. Create a new app on [back4app.com](https://www.back4app.com/)
2. Add a `Favorites` class with columns: `userId` (String), `mealId` (String), `mealName` (String), `mealThumb` (String)
3. Paste your App ID and JS Key into your `.env` file

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [TheMealDB](https://www.themealdb.com/) for the free recipe API
- [Back4App](https://www.back4app.com/) for the cloud backend platform
- [Vue.js](https://vuejs.org/) for the progressive JavaScript framework
