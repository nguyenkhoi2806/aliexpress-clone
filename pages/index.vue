<template>
    <MainLayout>
        <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
            <div v-if="products.length > 0"
                class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                <div v-for="product in products" :key="product">
                    <ProductCard :product="product" />
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/main-layout.vue';
const products = [
    {
        "id": 1,
        "title": "Product 1",
        "description": "Description 1",
        "price": 100,
        "url": "https://picsum.photos/200/300"
    },
    {
        "id": 2,
        "title": "Product 2",
        "description": "Description 2",
        "price": 200,
        "url": "https://picsum.photos/200/301"
    },
    {
        "id": 3,
        "title": "Product 3",
        "description": "Description 3",
        "price": 300,
        "url": "https://picsum.photos/200/302"
    },
    {
        "id": 4,
        "title": "Product 4",
        "description": "Description 4",
        "price": 400,
        "url": "https://picsum.photos/200/303"
    },
    {
        "id": 5,
        "title": "Product 5",
        "description": "Description 5",
        "price": 500,
        "url": "https://picsum.photos/200/304"
    },
    {
        "id": 6,
        "title": "Product 6",
        "description": "Description 6",
        "price": 600,
        "url": "https://picsum.photos/200/305"
    },
    {
        "id": 7,
        "title": "Product 7",
        "description": "Description 7",
        "price": 700,
        "url": "https://picsum.photos/200/306"
    },
    {
        "id": 8,
        "title": "Product 8",
        "description": "Description 8",
        "price": 800,
        "url": "https://picsum.photos/200/307"
    },
    {
        "id": 9,
        "title": "Product 9",
        "description": "Description 9",
        "price": 900,
        "url": "https://picsum.photos/200/308"
    },
    {
        "id": 10,
        "title": "Product 10",
        "description": "Description 10",
        "price": 1000,
        "url": "https://picsum.photos/200/309"
    }
]

</script>
