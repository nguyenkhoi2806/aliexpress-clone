<template>
    <div id="ShoppingCartPage" class="mt-4 max-w-[1200px] mx-auto px-2">
        <div v-if="!userStore.cart.length" class="h-[500px] flex items-center justify-center flex-col">
            <div class="pt-20"></div>
            <img class="mx-auto" width="250" src="/cart-empty.png" />
            <div class="text-xl text-center mt-4">
                No items yet ?
            </div>
            <div v-if="!user" class="flex text-center w-[300px]">
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
        <div v-else class="md:flex gap-4 justify-between mx-auto w-full">
            <div class="md:w-[65%]">
                <div class="bg-white rounded-lg p-4">
                    <div class="text-2xl font-bold mb-2">
                        Shopping Cart ({{ userStore.cart.length }})
                    </div>
                </div>
                <div class="bg-[#FEEEEF] rounded-lg p-4 mt-4">
                    <div class="text-red-500 font-bold">
                        Welcome Deal applicable on 1 item only
                    </div>
                </div>
                <div id="Items" class="bg-white rounded-lg p-4 mt-4">
                    <div v-for="product in userStore.cart" v-bind:key="product.id">
                        <CartItem :product="product" />
                    </div>
                </div>
            </div>

            <div class="md:hidden block my-4" />

            <div class="md:w-[35%]">
                <div id="Summary" class="bg-white rounded-lg p-4">
                    <div class="text-2xl font-extrabold mb-2">Summary</div>
                    <div class="flex items-center justify-between my-4">
                        <div class="font-semibold">Total</div>
                        <div class="text-2xl font-semibold">
                            $ <span class="font-extrabold">{{ totalPriceComputed }}</span>
                        </div>
                    </div>
                    <button @click="goToCheckout" class="
                                flex
                                items-center
                                justify-center
                                bg-[#FD374F] 
                                w-full 
                                text-white 
                                text-[18px] 
                                font-semibold 
                                p-1.5 
                                rounded-full
                                mt-4
                            ">
                        Checkout
                    </button>
                </div>
                <div id="PaymentProtection" class="bg-white rounded-lg p-4 mt-4">
                    <div class="text-lg font-semibold mb-2">Payment methods</div>
                    <div class="flex items-center justify-start gap-8 my-4">
                        <div v-for="card in cards" v-bind:key="card">
                            <img class="h-6" :src="card">
                        </div>
                    </div>

                    <div class="border-b" />

                    <div class="text-lg font-semibold mb-2 mt-2">Buyer Protection</div>
                    <p class="my-2">
                        Get full refund if the item is not as described or if is not delivered
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore();
const user = useSupabaseUser();

onMounted(() => {
    setTimeout(() => userStore.isLoading = false, 200)
})

const cards = ref([
    'visa.png',
    'mastercard.png',
    'paypal.png',
    'applepay.png',
])

const totalPriceComputed = computed(() => {
    const price = userStore.cart.reduce((total, prod) => total + prod.price, 0);
    return price / 100;
})

const goToCheckout = () => {
    userStore.checkout = userStore.cart
    return navigateTo('/checkout')
}

</script>