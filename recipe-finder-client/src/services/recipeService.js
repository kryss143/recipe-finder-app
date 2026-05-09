import axios from "axios";

const BASE = import.meta.env.VITE_MEALDB_BASE_URL;

export const searchByName = (query) =>
  axios.get(`${BASE}/search.php?s=${query}`);

export const searchByIngredient = (ingredient) =>
  axios.get(`${BASE}/filter.php?i=${ingredient}`);

export const filterByCategory = (category) =>
  axios.get(`${BASE}/filter.php?c=${category}`);

export const getRecipeById = (id) => axios.get(`${BASE}/lookup.php?i=${id}`);
