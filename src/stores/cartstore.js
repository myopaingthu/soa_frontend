import { defineStore } from "pinia";
import { inject } from "vue";
import { createPersistedState } from "pinia-plugin-persistedstate";

export const useCart = defineStore("auth", {
  state: () => {
    return {
      items: []
    };
  },
  getters: {
    getTotalItems(state) {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    getTotalPrices(state) {
      let total = 0;
      state.items.forEach((item) => {
        total += item.product.price * item.quantity;
      }, 0);
      return total;
    },
    getCartItems(state) {
      return state.items;
    },
  },
  actions: {
    addToCart(product, quantity) {
      var existingItem = null;
      this.items.forEach((item) => {
        if (item.product.id == product.id) {
          existingItem = item;
        }
      });
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
    },
    removeFromCart(productId) {
      const index = this.items.findIndex(
        (item) => item.product.id === productId
      );
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
    clearCart() {
      this.items = [];
    },
  },
  plugins: [createPersistedState()],
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["items"],
      },
    ],
  },
});
export const injectCart = () => {
  const cartState = inject("cartState");
  if (!cartState) {
    throw new Error("useCart must be called within a Vue component");
  }
  return cartState;
};
