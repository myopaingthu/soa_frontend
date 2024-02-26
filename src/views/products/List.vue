<template>
  <div>
    <!-- new arrival -->
    <div class="container pb-16 mt-5" style="margin-top: 30px !important;">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white shadow rounded overflow-hidden group" v-for="(product, index) in products.value">
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
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useCart } from '../../stores/cartstore.js';
import { Http } from '../../services/http-common.js';

const products = reactive([]);
const sort = ref('asc');
const { addToCart } = useCart();
import { useRoute } from 'vue-router';
const route = useRoute();
const category_id = route.params.id;
const search = ref("");
const productimageUrl = ((image_path) => {
  return `/assets/images/products/${image_path}.jpg`;
})
const getProducts = async () => {
  let param_data = {
    sortOrder: sort.value,
    categoryIds: category_id,
    search: search.value
  }
  for (const key in param_data) {
    if (param_data.hasOwnProperty(key) && param_data[key] == '') {
      delete param_data[key];
    }
  }
  const { data } = await Http.get('/products', {
    params: param_data
  });
  products.value = data;
};

onMounted(() => {
  getProducts();
})
</script>
