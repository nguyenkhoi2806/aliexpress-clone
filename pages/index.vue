<template>
  <div
    id="IndexPage"
    class="mt-4 max-w-[1200px] mx-auto px-2"
    @scroll="handleScroll"
  >
    <div
      v-if="products"
      class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4"
    >
      <div
        v-for="product in products.data"
        :key="product.id"
      >
        <ProductCard :product="product" />
      </div>
    </div>
    <ScrollToTopButton />
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useUserStore } from '~/stores/user';

  const userStore = useUserStore();
  const products = ref({ data: [], page: 1 });

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  const fetchProducts = async (page = 1) => {
    try {
      const response = await useFetch(`/api/get-all-product?page=${page}`);
      products.value.data = products.value.data.concat(response.data._rawValue);
      products.value.page = page;
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setTimeout(() => (userStore.isLoading = false), 500);
    }
  };

  fetchProducts(1);

  const handleScroll = async () => {
    if (userStore.isLoading) {
      return;
    }

    const scrollTop = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;

    const bottomOfWindow = scrollTop + windowHeight >= documentHeight - 10;

    if (bottomOfWindow) {
      userStore.isLoading = true;
      products.value.page = products.value.page + 1;
      await fetchProducts(products.value.page);
      setTimeout(() => (userStore.isLoading = false), 500);
    }
  };
</script>
