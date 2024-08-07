<template>
    <MainLayout>
        <div id="ShoppingCartPage" class="mt-4 max-w-[1200px] mx-auto px-2">
            <div v-if="false" class="h-[500px] flex items-center justify-center flex-col">
                <div class="pt-20"></div>
                <img class="mx-auto" width="250" src="/cart-empty.png" />
                <div class="text-xl text-center mt-4">
                    No items yet ?
                </div>
                <div v-if="true" class="flex text-center w-[300px]">
                    <NuxtLink to="/auth" class="
                                bg-[#FD374F] 
                                w-full 
                                text-white 
                                text-[18px] 
                                font-semibold 
                                p-1.5 
                                rounded-full
                                mt-4
                            ">
                        Sign in
                    </NuxtLink>
                </div>
            </div>
            <div v-if="true" class="md:flex gap-4 justify-between mx-auto w-full">
                <div class="md:w-[65%]">
                    <div class="bg-white rounded-lg p-4">
                        <div class="text-2xl font-bold mb-2">
                            Shopping Cart (0)
                        </div>
                    </div>
                    <div class="bg-[#FEEEEF] rounded-lg p-4 mt-4">
                        <div class="text-red-500 font-bold">
                            Welcome Deal applicable on 1 item only
                        </div>
                    </div>
                    <div id="Items" class="bg-white rounded-lg p-4 mt-4">
                        <div v-for="product in products" v-bind:key="product.id">
                            <CartItem :product="product" :selectedArray="selectedArray"
                                @selectedRadio="selectedRadioFunc" />
                        </div>
                    </div>
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
]

</script>