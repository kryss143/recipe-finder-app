import { defineStore } from "pinia";
import {
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favoriteService";

export const useFavoriteStore = defineStore("favorites", {
  state: () => ({ favorites: [] }),
  getters: {
    isFavorite: (state) => (mealId) =>
      state.favorites.some((f) => f.get("mealId") === mealId),
  },
  actions: {
    async fetch() {
      this.favorites = await fetchFavorites();
    },
    async add(meal) {
      const saved = await addFavorite(meal);
      this.favorites.unshift(saved);
    },
    async remove(mealId) {
      await removeFavorite(mealId);
      this.favorites = this.favorites.filter((f) => f.get("mealId") !== mealId);
    },
  },
});
