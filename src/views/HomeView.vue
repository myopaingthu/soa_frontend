<template>
  <div>
    <!-- banner -->
    <div class="bg-cover bg-no-repeat bg-center py-36" style="background-image: url('/assets/images/banner-bg.jpg')">
      <div class="container">
        <h1 class="text-6xl text-gray-800 font-medium mb-4 capitalize">
          best collection for <br />
          home decoration
        </h1>
        <p>
          Revamp Your Space with Style!
          <br />
          Explore our handpicked collection of exquisite furniture pieces designed to elevate your home.
          <br />
          Shop now for exclusive deals and transform your living spaces into inviting sanctuaries of comfort and elegance!
        </p>
        <div class="mt-12">
          <router-link :to="{ name: 'shop' }" class="bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary">Shop Now</router-link>
        </div>
      </div>
    </div>
    <!-- ./banner -->

    <!-- features -->
    <div class="container py-16">
      <div class="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
        <div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <img src="/assets/images/icons/delivery-van.svg" alt="Delivery" class="w-12 h-12 object-contain" />
          <div>
            <h4 class="font-medium capitalize text-lg">Free Shipping</h4>
            <p class="text-gray-500 text-sm">Order over $200</p>
          </div>
        </div>
        <div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <img src="/assets/images/icons/money-back.svg" alt="Delivery" class="w-12 h-12 object-contain" />
          <div>
            <h4 class="font-medium capitalize text-lg">Money Rturns</h4>
            <p class="text-gray-500 text-sm">30 days money returs</p>
          </div>
        </div>
        <div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <img src="/assets/images/icons/service-hours.svg" alt="Delivery" class="w-12 h-12 object-contain" />
          <div>
            <h4 class="font-medium capitalize text-lg">24/7 Support</h4>
            <p class="text-gray-500 text-sm">Customer support</p>
          </div>
        </div>
      </div>
    </div>
    <!-- ./features -->

    <!-- categories -->
    <div class="container py-16">
      <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">
        shop by category
      </h2>
      <div class="grid grid-cols-3 gap-3">
        <div class="relative rounded-sm overflow-hidden group" v-for="category in categories.value">
          <img :src="imageUrl(category.cover_image)" alt="category 1" style="width: 100% !important; height: 300px !important;"/>
          <router-link :to="{ name: 'category-detail', params: { id: category.id } }" class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">{{ category.name }}</router-link>
        </div>
      </div>
    </div>
    <!-- ./categories -->

    <!-- new arrival -->
    <div class="container pb-16">
      <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">
        top new arrival
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white shadow rounded overflow-hidden group" v-for="(product, index) in new_arrival_products.value">
          <div class="relative">
            <img :src="productimageUrl(product.id)" alt="product 1" style="width: 100% !important; height: 180px !important;"/>
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
              <router-link :to="{ name: 'product-detail', params: { id: product.id } }" class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="view product"><i class="fa-solid fa-magnifying-glass"></i></router-link>
            </div>
          </div>
          <div class="pt-4 pb-3 px-4">
            <router-link :to="{ name: 'product-detail', params: { id: product.id } }">
              <h4 class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                {{ product.name }}
              </h4>
            </router-link>
            <div class="flex items-baseline mb-1 space-x-2">
              <p class="text-xl text-primary font-semibold">$ {{ product.price }}</p>
            </div>
            <div class="flex items-center">
              <div class="flex gap-1 text-sm text-yellow-400">
                <span><i class="fa-solid fa-star"></i></span>
                <span><i class="fa-solid fa-star"></i></span>
                <span><i class="fa-solid fa-star"></i></span>
                <span><i class="fa-solid fa-star"></i></span>
                <span><i class="fa-solid fa-star"></i></span>
              </div>
              <div class="text-xs text-gray-500 ml-3">({{ (product.review_count != null) ? product.review_count : 0 }})</div>
            </div>
          </div>
          <a @click="addToCart(product, 1)" class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">Add to cart</a>
        </div>
      </div>
    </div>
    <!-- ./new arrival -->

    <!-- ads -->
    <div class="container pb-16">
      <a href="#">
        <img src="/assets/images/offer.jpg" alt="ads" class="w-full" />
      </a>
    </div>
    <!-- ./ads -->

    <!-- product -->
    <div class="container pb-16">
      <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">
        recomended for you
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="bg-white shadow rounded overflow-hidden group" v-for="(product, index) in recomended_products.value">
          <div class="relative">
            <img :src="productimageUrl(product.id)" alt="product 1" style="width: 100% !important; height: 180px !important;" />
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
              <router-link :to="{ name: 'product-detail', params: { id: product.id } }" class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="view product"><i class="fa-solid fa-magnifying-glass"></i></router-link>
            </div>
          </div>
          <div class="pt-4 pb-3 px-4">
            <a href="#">
              <h4 class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                {{ product.name }}
              </h4>
            </a>
            <div class="flex items-baseline mb-1 space-x-2">
              <p class="text-xl text-primary font-semibold">$ {{ product.price }}</p>
            </div>
            <div class="flex items-center">
              <div class="flex gap-1 text-sm text-yellow-400">
                <span><i class="fa-solid fa-star"></i></span>
                <span><i class="fa-solid fa-star"></i></span>
                <span><i class="fa-solid fa-star"></i></span>
                <span><i class="fa-solid fa-star"></i></span>
                <span><i class="fa-solid fa-star"></i></span>
              </div>
              <div class="text-xs text-gray-500 ml-3">({{ (product.review_count != null) ? product.review_count : 0 }})</div>
            </div>
          </div>
          <button @click="addToCart(product, 1)" class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">Add to cart</button>
        </div>
      </div>
    </div>
    <!-- ./product -->
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { useCart } from '../stores/cartstore.js';
import { Http } from '../services/http-common.js';
const new_arrival_products = reactive([]);
const recomended_products = reactive([]);
const categories = reactive([]);

const { addToCart } = useCart();
const imageUrl = ((image_path) => {
  return `http://localhost:9000/javabuck/ecom/${image_path}`;
})
const productimageUrl = ((image_path) => {
  return `/assets/images/products/${image_path}.jpg`;
})
const getProducts = async () => {
  const { data } = await Http.get('/products');
  console.log(data);
  new_arrival_products.value = data.slice(0, 4);
  recomended_products.value = data.slice(4, 12);
};

const getCategories = async () => {
  const { data } = await Http.get('/categories');
  categories.value = data.slice(0, 3);
};

onMounted(() => {
  getProducts();
  getCategories();
})
</script>
