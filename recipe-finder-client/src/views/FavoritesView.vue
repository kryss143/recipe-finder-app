<template>
  <div class="max-w-5xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">❤️ My Favorites</h1>

    <div
      v-if="favStore.favorites.length === 0"
      class="text-center text-gray-400 py-20"
    >
      No favorites saved yet. Find a recipe and add it!
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <div
        v-for="fav in favStore.favorites"
        :key="favoriteValue(fav, 'objectId')"
        class="bg-white rounded-xl shadow overflow-hidden"
      >
        <img
          :src="favoriteValue(fav, 'mealThumb')"
          class="w-full h-40 object-cover cursor-pointer"
          @click="$router.push(`/recipe/${favoriteValue(fav, 'mealId')}`)"
        />
        <div class="p-3 flex justify-between items-center">
          <span class="font-medium text-gray-500 text-sm truncate">{{
            favoriteValue(fav, "mealName")
          }}</span>
          <button
            @click="favStore.remove(favoriteValue(fav, 'mealId'))"
            class="text-red-400 hover:text-red-600 ml-2 text-sm font-bold"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useFavoriteStore } from "../stores/favoriteStore";
const favStore = useFavoriteStore();
const favoriteValue = (favorite, key) => {
  if (typeof favorite?.get === "function") return favorite.get(key);
  return favorite?.[key];
};
onMounted(() => favStore.fetch());
</script>
