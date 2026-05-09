<template>
  <div class="max-w-3xl mx-auto p-6">
    <button
      @click="$router.back()"
      class="text-orange-500 mb-4 hover:underline"
    >
      ← Back
    </button>

    <div v-if="loading" class="text-center text-gray-400 py-20">
      Loading recipe...
    </div>

    <div v-else-if="recipe">
      <h1 class="text-3xl font-bold mb-1">{{ recipe.strMeal }}</h1>
      <p class="text-gray-400 mb-4">
        {{ recipe.strCategory }} · {{ recipe.strArea }}
      </p>
      <img
        :src="recipe.strMealThumb"
        class="w-full rounded-xl mb-6 shadow-md"
      />

      <button
        @click="toggleFavorite"
        class="mb-6 px-5 py-2 rounded-lg text-white font-medium transition"
        :class="
          isFav
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-orange-500 hover:bg-orange-600'
        "
      >
        {{ isFav ? "❤️ Remove from Favorites" : "🤍 Add to Favorites" }}
      </button>

      <h2 class="text-xl font-semibold mb-2">Ingredients</h2>
      <ul class="list-disc list-inside mb-6 text-gray-400 space-y-1">
        <li v-for="(item, i) in ingredients" :key="i">{{ item }}</li>
      </ul>

      <h2 class="text-xl font-semibold mb-2">Instructions</h2>
      <p class="text-gray-400 whitespace-pre-line leading-relaxed">
        {{ recipe.strInstructions }}
      </p>

      <div v-if="recipe.strYoutube" class="mt-6">
        <a
          :href="recipe.strYoutube"
          target="_blank"
          class="inline-block text-orange-500 underline font-medium"
        >
          ▶ Watch Video Tutorial
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getRecipeById } from "../services/recipeService";
import { useFavoriteStore } from "../stores/favoriteStore";
import { useAuthStore } from "../stores/authStore";

const route = useRoute();
const recipe = ref(null);
const loading = ref(true);
const favStore = useFavoriteStore();
const authStore = useAuthStore();

const isFav = computed(() => favStore.isFavorite(route.params.id));

const ingredients = computed(() => {
  if (!recipe.value) return [];
  return Array.from({ length: 20 }, (_, i) => {
    const ing = recipe.value[`strIngredient${i + 1}`];
    const measure = recipe.value[`strMeasure${i + 1}`];
    return ing?.trim() ? `${measure?.trim() || ""} ${ing}`.trim() : null;
  }).filter(Boolean);
});

const toggleFavorite = async () => {
  if (!authStore.isAuthenticated) {
    alert("Please login to save favorites.");
    return;
  }
  if (isFav.value) {
    await favStore.remove(recipe.value.idMeal);
  } else {
    await favStore.add({
      mealId: recipe.value.idMeal,
      mealName: recipe.value.strMeal,
      mealThumb: recipe.value.strMealThumb,
    });
  }
};

onMounted(async () => {
  const { data } = await getRecipeById(route.params.id);
  recipe.value = data.meals?.[0] || null;
  loading.value = false;
  if (authStore.isAuthenticated) await favStore.fetch();
});
</script>
