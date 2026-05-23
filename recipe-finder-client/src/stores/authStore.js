import { defineStore } from "pinia";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "../services/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: getCurrentUser(),
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    username: (state) => {
      if (!state.user) return "";
      if (typeof state.user.get === "function") return state.user.get("username") || "";
      return state.user.username || state.user.email || "";
    },
  },
  actions: {
    async login(credentials) {
      this.user = await loginUser(credentials);
    },
    async register(credentials) {
      this.user = await registerUser(credentials);
    },
    async logout() {
      await logoutUser();
      this.user = null;
    },
  },
});
