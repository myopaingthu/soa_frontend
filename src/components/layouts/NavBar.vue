<template>
  <nav class="bg-gray-800">
    <div class="container flex">
      <div v-if="!isActive(['/shop'])" class="px-8 py-4 bg-primary flex items-center cursor-pointer relative group">
        <span class="text-white">
          <i class="fa-solid fa-bars"></i>
        </span>
        <span class="capitalize ml-2 text-white">All Categories</span>
        <!-- dropdown -->
        <div class="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
          <div v-for="category in categories.value">
            <router-link :to="{ name: 'category-detail', params: { id: category.id } }" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">{{ category.name }}</router-link>
          </div>
        </div>
      </div>
      <div class="ms-5 flex items-center justify-between flex-grow h-14">
        <div class="flex items-center space-x-6 capitalize">
          <router-link :to="{ name: 'home' }" class="text-gray-200 hover:text-white transition" :class="{
            'text-white': isActive(['/']),
          }">Home</router-link>
          <router-link :to="{ name: 'shop' }" class="text-gray-200 hover:text-white transition" :class="{
            'text-white': isActive(['/shop']),
          }">Shop</router-link>
          <router-link :to="{ name: 'about' }" class="text-gray-200 hover:text-white transition" :class="{
            'text-white': isActive(['/about']),
          }">About us</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, reactive, computed } from 'vue';
import { Http } from '../../services/http-common.js';

const categories = reactive([])
const route = useRoute();

const isActive = (paths) => {
  let value = paths.filter((path) => {
    return route.path.startsWith(path);
  });

  if (value.length) return true;
};
const getCategories = async () => {
  const { data } = await Http.get('/categories');
  categories.value = data;
};
onMounted(() => {
  getCategories();
})
</script>
