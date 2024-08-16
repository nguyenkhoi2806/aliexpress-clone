<template>
    <MainLayout>
        <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
            <div v-if="products"
                class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                <div v-for="product in products.data" :key="product">
                    <ProductCard :product="product" />
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/main-layout.vue';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();

let products = ref(null)

onBeforeMount(async () => {
    products.value = await useFetch('/api/get-all-product')
    setTimeout(() => userStore.isLoading = false, 200)
})

</script>
