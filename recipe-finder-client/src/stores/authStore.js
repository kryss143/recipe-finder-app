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
    username: (state) => state.user?.get("username") || "",
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
