<template>
  <!-- header -->
  <header class="py-4 shadow-sm bg-white">
    <div class="container flex items-center justify-between">
      <router-link :to="{ name: 'home' }">
        <h1 class="text-3xl text-gray-800 font-medium mb-4 capitalize"><span style="color:red">FURNI</span>STYLE</h1>
      </router-link>
      <div class="flex items-center space-x-4">
        <router-link :to="{ name: 'checkout' }" class="text-center text-gray-700 hover:text-primary transition relative">
          <div class="text-2xl">
            <i class="fa-solid fa-bag-shopping"></i>
          </div>
          <div class="text-xs leading-3">Cart</div>
          <div class="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
            {{ store.getTotalItems }}
          </div>
        </router-link>
      </div>
    </div>
  </header>
</template>
<script setup>
import { useCart } from '../../stores/cartstore.js';

const store = useCart();

import { useRoute } from "vue-router";
</script>
