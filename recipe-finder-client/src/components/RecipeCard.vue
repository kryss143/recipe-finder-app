<template>
  <div
    class="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
    @click="$router.push(`/recipe/${meal.idMeal}`)"
  >
    <img
      :src="meal.strMealThumb"
      :alt="meal.strMeal"
      class="w-full h-48 object-cover"
    />
    <div class="p-3">
      <h3 class="font-semibold text-gray-800 truncate">{{ meal.strMeal }}</h3>
      <p class="text-sm text-gray-400 mt-1">
        {{ meal.strCategory || "View Recipe →" }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({ meal: Object });
</script>
