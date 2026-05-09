<template>
  <div class="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
      Welcome Back
    </h2>
    <div
      v-if="error"
      class="bg-red-50 text-red-500 text-sm px-4 py-2 rounded mb-4"
    >
      {{ error }}
    </div>

    <input
      v-model="form.email"
      type="email"
      placeholder="Email"
      class="w-full border rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-shown:placeholder-gray-400 text-gray-600"
    />
    <input
      v-model="form.password"
      type="password"
      placeholder="Password"
      class="w-full border rounded-lg px-4 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-shown:placeholder-gray-400 text-gray-600"
    />

    <button
      @click="submit"
      :disabled="loading"
      class="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
    >
      {{ loading ? "Logging in..." : "Login" }}
    </button>
    <p class="text-sm text-center mt-4 text-gray-500">
      No account yet?
      <RouterLink to="/register" class="text-orange-500 hover:underline"
        >Register</RouterLink
      >
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const form = ref({ email: "", password: "" });
const error = ref("");
const loading = ref(false);
const auth = useAuthStore();
const router = useRouter();

const submit = async () => {
  error.value = "";
  loading.value = true;
  try {
    await auth.login(form.value);
    router.push("/");
  } catch (e) {
    error.value = e.message || "Invalid email or password.";
  } finally {
    loading.value = false;
  }
};
</script>
