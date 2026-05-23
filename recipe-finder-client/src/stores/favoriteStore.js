import { defineStore } from "pinia";
import {
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favoriteService";

const getFavoriteValue = (favorite, key) => {
  if (typeof favorite?.get === "function") return favorite.get(key);
  return favorite?.[key];
};

export const useFavoriteStore = defineStore("favorites", {
  state: () => ({ favorites: [] }),
  getters: {
    isFavorite: (state) => (mealId) =>
      state.favorites.some((favorite) => getFavoriteValue(favorite, "mealId") === mealId),
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
      this.favorites = this.favorites.filter(
        (favorite) => getFavoriteValue(favorite, "mealId") !== mealId,
      );
    },
  },
});
