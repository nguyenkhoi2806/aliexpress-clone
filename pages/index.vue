<template>
  <MainLayout>
    <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div
        v-if="products"
        class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4"
      >
        <div v-for="product in products.data" :key="product.id">
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onUnmounted } from 'vue';
import MainLayout from '~/layouts/main-layout.vue';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();
const products = ref({ data: [], page: 1 });

const fetchProducts = async (page = 1) => {
  try {
    const response = await useFetch(`/api/get-all-product?page=${page}`);
    console.log(response.data._rawValue);
    products.value.data.push(...response.data._rawValue);
    products.value.page = page;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const handleScroll = async () => {
  const bottomOfWindow =
    window.innerHeight + window.scrollY >=
    document.documentElement.offsetHeight - 100;
  if (bottomOfWindow && !useUserStore.isLoading) {
    useUserStore.isLoading = true;
    await fetchProducts(products.value.page + 1);
    setTimeout(() => (userStore.isLoading = false), 500);
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

onBeforeMount(async () => {
  userStore.isLoading = true;
  await fetchProducts();
  setTimeout(() => (userStore.isLoading = false), 500);
});
</script>
