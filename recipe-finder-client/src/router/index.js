import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser } from "../services/authService";

import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import RecipeDetailView from "../views/RecipeDetailView.vue";
import FavoritesView from "../views/FavoritesView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/recipe/:id", component: RecipeDetailView },
  {
    path: "/favorites",
    component: FavoritesView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = getCurrentUser();
  if (to.meta.requiresAuth && !user) next("/login");
  else next();
});

export default router;
