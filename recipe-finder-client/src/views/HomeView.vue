<template>
  <div class="max-w-5xl mx-auto p-6">
    <div class="flex p-6 justify-center mb-5">
      <img
        src="/recipe_finder_logo.svg"
        alt="Reciper Finder Logo"
        class="h-90 w-auto"
      />
    </div>
    <h1 class="text-3xl font-bold mb-2 text-center text-gray-400">
      Find Your Next Recipe
    </h1>
    <p class="text-center text-gray-400 mb-8">
      Search by name or ingredient using TheMealDB
    </p>

    <div class="flex gap-2 mb-8">
      <input
        v-model="query"
        @keyup.enter="search"
        placeholder="e.g. chicken, pasta, garlic..."
        class="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button
        @click="search"
        class="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
      >
        Search
      </button>
    </div>

    <div v-if="loading" class="text-center text-gray-400 py-20">
      Loading recipes...
    </div>
    <div v-else-if="error" class="text-center text-red-400 py-20">
      {{ error }}
    </div>
    <div
      v-else-if="searched && results.length === 0"
      class="text-center text-gray-400 py-20"
    >
      No recipes found. Try a different keyword!
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <RecipeCard v-for="meal in results" :key="meal.idMeal" :meal="meal" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import RecipeCard from "../components/RecipeCard.vue";
import { searchByName } from "../services/recipeService";

const query = ref("");
const results = ref([]);
const loading = ref(false);
const error = ref("");
const searched = ref(false);

const search = async () => {
  if (!query.value.trim()) return;
  loading.value = true;
  error.value = "";
  searched.value = true;
  try {
    const { data } = await searchByName(query.value);
    results.value = data.meals || [];
  } catch {
    error.value = "Failed to fetch recipes. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
