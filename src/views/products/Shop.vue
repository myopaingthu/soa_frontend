<template>
  <div>
    <div class="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
      <div class="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
        <div class="divide-y divide-gray-200 space-y-5">
          <div>
            <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
            <div class="space-y-2">
              <div class="flex items-center" v-for="category in categories.value">
                <input type="checkbox" v-model="categoryIds" :value="category.id" class="text-primary focus:ring-0 rounded-sm cursor-pointer">
                <label for="cat-1" class="text-gray-600 ml-3 cusror-pointer">{{ category.name }}</label>
              </div>
            </div>
          </div>

          <div class="pt-4">
            <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Brands</h3>
            <div class="space-y-2">
              <div class="flex items-center" v-for="brand in brands.value">
                <input type="checkbox" name="brand-1" :value="brand.id" v-model="brandIds" class="text-primary focus:ring-0 rounded-sm cursor-pointer">
                <label for="brand-1" class="text-gray-600 ml-3 cusror-pointer">{{ brand.name }}</label>
              </div>
            </div>
          </div>

          <div class="pt-4">
            <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Price</h3>
            <div class="mt-4 flex items-center">
              <input type="text" name="min" v-model="minPrice" class="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm" placeholder="min">
              <span class="mx-3 text-gray-500">-</span>
              <input type="text" name="max" v-model="maxPrice" class="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm" placeholder="max">
            </div>
          </div>

          <div class="pt-4">
            <div class="mt-4 flex items-center">
              <button @click="getProducts()" class="mb-3 py-1 px-2 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition">
                Filter
              </button>
              <button @click="clearFilter()" class="ms-5 mb-3 py-1 px-2 text-center text-primary bg-white border border-primary rounded-md">
                Clear
              </button>
            </div>
          </div>

        </div>
      </div>
      <div class="col-span-3">
        <div class="grid md:grid-cols-3 grid-cols-2 gap-6">
          <div class="flex items-center mb-4">
            <select name="sort" v-model="sort" class="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
              <option value="">Default sorting</option>
              <option value="asc">Price low to high</option>
              <option value="desc">Price high to low</option>
            </select>
          </div>
          <div class="flex items-center mb-4"></div>
          <div class="flex items-center mb-4">
            <div class="w-full max-w-xl relative flex">
              <span class="absolute left-4 top-3 text-lg text-gray-400">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
              <input type="text" name="search" v-model="search" class="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none" placeholder="search" />
              <button @click="getProducts()" class="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">
                Search
              </button>
            </div>
          </div>

        </div>
        <div class="grid md:grid-cols-3 grid-cols-2 gap-6">
          <div class="bg-white shadow rounded overflow-hidden group" v-for="(product, index) in products.value">
            <div class="relative">
              <img :src="productimageUrl(product.id)" alt="product 1" style="width: 100% !important; height: 250px !important;" />
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
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, watch } from 'vue';
import { useCart } from '../../stores/cartstore.js';
import { Http } from '../../services/http-common.js';
const products = reactive([]);
const categories = reactive([]);
const brandIds = ref([]);
const categoryIds = ref([]);
const minPrice = ref("");
const search = ref("");
const maxPrice = ref("");
const brands = reactive([]);
const sort = ref('asc');
const { addToCart } = useCart();

const getProducts = async () => {
  let param_brands = "";
  let param_categories = "";
  if (brandIds.value.length > 0) {
    param_brands = brandIds.value;
    param_brands = param_brands.join(',');
  }
  if (categoryIds.value.length > 0) {
    param_categories = categoryIds.value;
    param_categories = param_categories.join(',');
  }
  let param_data = {
    sortOrder: sort.value,
    brandIds: param_brands,
    categoryIds: param_categories,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
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
const clearFilter = () => {
  sort.value = "asc";
  brandIds.value = [];
  categoryIds.value = [];
  minPrice.value = "";
  maxPrice.value = "";
  getProducts();
}
const getCategories = async () => {
  const { data } = await Http.get('/categories');
  categories.value = data;
};
const productimageUrl = ((image_path) => {
  return `/assets/images/products/${image_path}.jpg`;
})
watch(sort, (value) => {
  sort.value = value;
  getProducts();
});
const getBrands = async () => {
  const { data } = await Http.get('/brands');
  brands.value = data;
};
onMounted(() => {
  getProducts();
  getCategories();
  getBrands();
})
</script>
