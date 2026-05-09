<template>
  <nav
    class="bg-orange-500 text-white px-6 py-4 flex justify-between items-center shadow relative"
  >
    <RouterLink to="/" class="text-xl font-bold tracking-tight">
      <img
        src="/recipe_finder_favicon.svg"
        alt="Recipe Finder Favicon"
        class="w-8 h-8 inline mr-2"
      />Recipe Finder</RouterLink
    >

    <div class="flex items-center gap-5 text-sm font-medium">
      <!-- Desktop links -->
      <div class="hidden md:flex items-center gap-5 text-lg">
        <RouterLink to="/" class="hover:underline">Search</RouterLink>
        <RouterLink
          to="/favorites"
          v-if="auth.isAuthenticated"
          class="hover:underline"
        >
          ❤️ Favorites
        </RouterLink>
        <span v-if="auth.isAuthenticated" class="text-orange-100 font-bold">{{
          auth.username
        }}</span>
        <RouterLink
          v-if="!auth.isAuthenticated"
          to="/login"
          class="bg-white text-orange-500 px-3 py-1 rounded-lg hover:bg-orange-50"
          >Login</RouterLink
        >
        <button
          v-else
          @click="handleLogout"
          class="bg-white text-orange-500 px-3 py-1 rounded-lg hover:bg-orange-50"
        >
          Logout
        </button>
      </div>

      <!-- Mobile hamburger -->
      <button
        @click="showMobile = !showMobile"
        class="md:hidden p-2 rounded-md bg-white/10 hover:bg-white/20"
        aria-label="Toggle menu"
      >
        <svg
          v-if="!showMobile"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="showMobile"
      class="md:hidden absolute right-4 top-full mt-2 w-48 bg-white text-orange-500 rounded-lg shadow-lg p-3 z-50"
    >
      <RouterLink to="/" class="block hover:underline">Search</RouterLink>
      <RouterLink
        to="/favorites"
        v-if="auth.isAuthenticated"
        class="block mt-2 hover:underline"
        >❤️ Favorites</RouterLink
      >
      <div v-if="auth.isAuthenticated" class="mt-2 text-md font-bold">
        {{ auth.username }}
      </div>
      <RouterLink
        v-if="!auth.isAuthenticated"
        to="/login"
        class="block mt-3 bg-white text-orange-500 px-3 py-1 rounded-lg hover:bg-orange-50"
        >Login</RouterLink
      >
      <button
        v-else
        @click="handleLogout"
        class="block mt-2 bg-white text-orange-500 py-1 rounded-lg hover:bg-orange-50"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const showMobile = ref(false);

const handleLogout = async () => {
  await auth.logout();
  showMobile.value = false;
  router.push("/");
};
</script>
