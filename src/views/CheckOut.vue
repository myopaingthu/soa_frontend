<template>
  <div>
    <div class="container grid grid-cols-12 items-start pb-16 pt-4 gap-6" v-if="cartScreem">
      <div class="col-span-8 border border-gray-200 p-4 rounded">
        <h3 class="text-lg font-medium capitalize mb-4">Checkout</h3>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="first-name" class="text-gray-600">First Name <span class="text-primary">*</span></label>
              <input type="text" name="first-name" id="first-name" class="input-box">
            </div>
            <div>
              <label for="last-name" class="text-gray-600">Last Name <span class="text-primary">*</span></label>
              <input type="text" name="last-name" id="last-name" class="input-box">
            </div>
          </div>
          <div>
            <label for="company" class="text-gray-600">Company</label>
            <input type="text" name="company" id="company" class="input-box">
          </div>
          <div>
            <label for="region" class="text-gray-600">Country/Region</label>
            <input type="text" name="region" id="region" class="input-box">
          </div>
          <div>
            <label for="address" class="text-gray-600">Street address</label>
            <input type="text" name="address" id="address" class="input-box">
          </div>
          <div>
            <label for="city" class="text-gray-600">City</label>
            <input type="text" name="city" id="city" class="input-box">
          </div>
          <div>
            <label for="phone" class="text-gray-600">Phone number</label>
            <input type="text" name="phone" id="phone" class="input-box">
          </div>
          <div>
            <label for="email" class="text-gray-600">Email address</label>
            <input type="email" name="email" id="email" class="input-box">
          </div>
          <div>
            <label for="company" class="text-gray-600">Company</label>
            <input type="text" name="company" id="company" class="input-box">
          </div>
        </div>

      </div>

      <div class="col-span-4 border border-gray-200 p-4 rounded">
        <h4 class="text-gray-800 text-lg mb-4 font-medium uppercase">order summary</h4>
        <button @click="clearCart()" class="mb-3 py-1 px-2 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition">
          Clear Cart
        </button>
        <div class="space-y-2">
          <div class="flex justify-between" v-for="item in items.value">
            <div>
              <h5 class="text-gray-800 font-medium"><button @click="removeFromCart(item.product.id)"><span class="fa fa-trash mr-3"></span></button>{{ item.product.name }}</h5>
            </div>
            <p class="text-gray-600">
              x{{ item.quantity }}
            </p>
            <p class="text-gray-800 font-medium">$ {{ item.product.price * item.quantity }}</p>
          </div>
        </div>

        <div class="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
          <p>subtotal</p>
          <p>$ {{ store.getTotalPrices }}</p>
        </div>

        <div class="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
          <p>shipping</p>
          <p>Free</p>
        </div>

        <div class="flex justify-between text-gray-800 font-medium py-3 uppercas">
          <p class="font-semibold">Total</p>
          <p>$ {{ store.getTotalPrices }}</p>
        </div>

        <div class="flex items-center mb-4 mt-2">
          <input type="checkbox" name="aggrement" id="aggrement" class="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3">
          <label for="aggrement" class="text-gray-600 ml-3 cursor-pointer text-sm">I agree to the <a href="#" class="text-primary">terms & conditions</a></label>
        </div>

        <a @click="placeOrder" class="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">Place
          order</a>
      </div>

    </div>
    <div v-else>
      <div class=" mt-5">
        <div class="cart-container">
          <p class="shop-button">Oops! It seems like your cart is empty. </p>
          <p>No worries, let's fill it up with some amazing products! </p>
          <p>Head back to the shopping index to explore our wide range of items and add them to your cart for a delightful shopping experience.</p>
          <div class="shop-button">
            <router-link :to="{ name: 'shop' }" class=" py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">
              Go Shopping!</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCart } from '../stores/cartstore.js';
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from "vue-router";
import { Http } from '../services/http-common.js';

const items = reactive([]);
const store = useCart();
const cartScreem = ref(false);
const router = useRouter();

const getItems = () => {
  items.value = store.getCartItems;
  if (items.value.length > 0) {
    cartScreem.value = true;
  }
}
const clearCart = () => {
  store.clearCart();
  cartScreem.value = false;
}
const placeOrder = async () => {
  const data_array = [];
  store.getCartItems.forEach(item => {
    data_array.push({
      "skuCode": item.product.sku,
      "price": item.product.price,
      "quantity": item.quantity
    })
  })
  let fd = new FormData();
  fd.append("orderLineItemsDtoList", [data_array]);
  console.log(fd)
  await Http.post("order", fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then(() => {
      store.clearCart();
      cartScreem.value = false;
      router.push({ name: "shop" });
    });
}
const removeFromCart = (itemId) => {
  store.removeFromCart(itemId);
  if (store.getCartItems.length == 0) {
    cartScreem.value = false;
  }
}

onMounted(() => {
  getItems();
})
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  min-height: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 20px;
}


.cart-container p {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 10px;
}

.shop-button {
  margin-top: 60px;
}
</style>
