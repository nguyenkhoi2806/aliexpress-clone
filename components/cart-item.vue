<template>
    <div id="CartItem" class="flex my-4 justify-start">
        <img class="rounded-md md:w-[150px] w-[90px] h-[120px]" :src="product.url">
        <div class="overflow-hidden pl-2 w-full ">
            <div class="flex items-center justify-between w-full">
                <div class="flex items-center justify-between truncate">
                    <span
                        class="sm:block hidden bg-[#FD374F] text-white text-[9px] font-semibold px-1.5 rounded-sm min-w-[80px]">Welcome
                        Deal</span>
                    <div class="truncate sm:pl-2">{{ product.title }}</div>
                </div>
                <button @click="removeFromCart()" class="mx-3 sm:block hidden -mt-0.5 hover:text-red-500">
                    <Icon name="material-symbols:delete-outline" size="20" />
                </button>
            </div>
            <div class="text-xl font-semibold">
                $ <span class="font-bold">{{ product.price / 100 }}</span>
            </div>
            <p class="text-[#009A66] text-xs font-semibold pt-1">
                Free 11-day delivery over ￡8.28
            </p>

            <p class="text-[#009A66] text-xs font-semibold pt-1">
                Free Shipping
            </p>
            <div class="flex items-center justify-end">
                <button @click="removeFromCart()" class="sm:hidden block -mt-0.5 hover:text-red-500">
                    <Icon name="material-symbols:delete-outline" size="20" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore();

const props = defineProps(['product', 'selectedArray'])
const { product } = toRefs(props)

const emit = defineEmits(['selectedRadio']);

const removeFromCart = () => {
    userStore.cart.forEach((prod, index) => {
        if (prod.id === product.value.id) {
            userStore.cart.splice(index, 1);
        }
    })
}

</script>