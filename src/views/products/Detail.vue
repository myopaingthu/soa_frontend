<template>
  <div>
    <!-- product-detail -->
    <div class="container grid grid-cols-2 gap-6 mt-5">
      <div>

        <img :src="productimageUrl(product.id)" alt="product" class="w-full">
        <div class="grid grid-cols-5 gap-4 mt-4">
          <img src="/assets/images/products/product2.jpg" alt="product2" class="w-full cursor-pointer border border-primary">
          <img src="/assets/images/products/product3.jpg" alt="product2" class="w-full cursor-pointer border">
          <img src="/assets/images/products/product4.jpg" alt="product2" class="w-full cursor-pointer border">
          <img src="/assets/images/products/product5.jpg" alt="product2" class="w-full cursor-pointer border">
          <img src="/assets/images/products/product6.jpg" alt="product2" class="w-full cursor-pointer border">
        </div>
      </div>
      <div>
        <h2 class="text-3xl font-medium uppercase mb-2">{{ product.name }}</h2>
        <div class="flex items-center mb-4">
          <div class="flex gap-1 text-sm text-yellow-400">
            <span><i class="fa-solid fa-star"></i></span>
            <span><i class="fa-solid fa-star"></i></span>
            <span><i class="fa-solid fa-star"></i></span>
            <span><i class="fa-solid fa-star"></i></span>
            <span><i class="fa-solid fa-star"></i></span>
          </div>
          <div class="text-xs text-gray-500 ml-3">({{ (product.review_count != null) ? product.review_count : 0 }} Reviews)</div>
        </div>
        <div class="space-y-2">
          <p class="text-gray-800 font-semibold space-x-2">
            <span>Availability: </span>
            <span class="text-green-600">In Stock</span>
          </p>
          <p class="space-x-2">
            <span class="text-gray-800 font-semibold">Brand: </span>
            <span class="text-gray-600">{{ brand_name.value }}</span>
          </p>
          <p class="space-x-2">
            <span class="text-gray-800 font-semibold">Category: </span>
            <span class="text-gray-600">{{ category_name.value }}</span>
          </p>
          <p class="space-x-2">
            <span class="text-gray-800 font-semibold">SKU: </span>
            <span class="text-gray-600">{{ product.sku }}</span>
          </p>
        </div>
        <div class="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
          <p class="text-xl text-primary font-semibold">$ {{ product.price }}</p>
        </div>

        <p class="mt-4 text-gray-600">{{ product.description }}</p>

        <div class="pt-4">
          <h3 class="text-sm text-gray-800 uppercase mb-1">Size</h3>
          <div class="flex items-center gap-2">
            <div class="size-selector" v-for="productSize in product.sizes">
              <input type="radio" name="size" id="size-xs" class="hidden">
              <label for="size-xs" class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">{{ productSize }}</label>
            </div>

          </div>
        </div>

        <div class="pt-4">
          <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
          <div class="flex items-center gap-2">
            <div class="color-selector">
              <input type="radio" name="color" id="red" class="hidden">
              <label for="red" class="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block" style="background-color: #fc3d57;"></label>
            </div>
            <div class="color-selector">
              <input type="radio" name="color" id="black" class="hidden">
              <label for="black" class="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block" style="background-color: #000;"></label>
            </div>
            <div class="color-selector">
              <input type="radio" name="color" id="white" class="hidden">
              <label for="white" class="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block" style="background-color: #fff;"></label>
            </div>

          </div>
        </div>

        <div class="mt-4">
          <h3 class="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
          <div class="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
            <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">-</div>
            <div class="h-8 w-8 text-base flex items-center justify-center">1</div>
            <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">+</div>
          </div>
        </div>

        <div class="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
          <a @click="addToCart(product, 1)" class="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
            <i class="fa-solid fa-bag-shopping"></i> Add to cart
          </a>
        </div>

        <div class="flex gap-3 mt-4">
          <a href="#" class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
            <i class="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
            <i class="fa-brands fa-twitter"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
            <i class="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- related product -->
    <div class="container pb-16 mt-5">
      <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">Related products</h2>
      <div class="grid grid-cols-4 gap-6">
        <div class="bg-white shadow rounded overflow-hidden group" v-for="(product, index) in products.value">
          <div class="relative">
            <img :src="productimageUrl(product.id)" alt="product 1" style="width: 100% !important; height: 250px !important;" />
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
              <p class="text-xl text-primary font-semibold">{{ product.price }}</p>
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
    <!-- ./related product -->
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue';
import { Http } from '../../services/http-common.js';
import { useCart } from '../../stores/cartstore.js';

const product = ref({});
import { useRoute } from 'vue-router';
const route = useRoute();
const productId = route.params.id;
const products = reactive([]);
const brand = reactive({});
const category = reactive({});
const brand_name = reactive({});
const category_name = reactive({});
const { addToCart } = useCart();

const getProduct = async () => {
  const { data } = await Http.get('/products/' + productId);
  brand.value = data.brands[0];
  brand_name.value = data.brands[0].name;
  category.value = data.categories[0];
  category_name.value = data.categories[0].name;
  product.value = data;
  const results = await Http.get(`/products?brandIds=${brand.value.id}&categoryIds=${category.value.id}`);
  products.value = results.data.slice(0, 4);
};
const productimageUrl = ((image_path) => {
  return `/assets/images/products/${image_path}.jpg`;
})
onMounted(() => {
  getProduct();

})
</script>
