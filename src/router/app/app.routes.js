import Home from "@/views/HomeView.vue";
import ProductDetail from "@/views/products/Detail.vue";
import Shop from "@/views/products/Shop.vue";
import About from "@/views/About.vue";
import CheckOut from "@/views/CheckOut.vue";
import List from "@/views/products/List.vue";

const appRoutes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/product/:id", // Dynamic route parameter
    name: "product-detail",
    component: ProductDetail,
  },
  {
    path: "/category/:id",
    name: "category-detail",
    component: List,
  },
  {
    path: "/shop",
    name: "shop",
    component: Shop,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckOut,
  },
];

export default appRoutes;
