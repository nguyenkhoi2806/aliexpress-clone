<template>
  <MainLayout>
    <div></div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/main-layout.vue';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore();
const route = useRoute();

let stripe = null;
let elements = null;
let card = null;
let form = null;
let total = ref(0);
let clientSecret = null;
let currentAddress = ref(null);
let isProcessing = ref(false);

onMounted(async () => {
  isProcessing.value = true;

  userStore.checkout.forEach((item) => {
    total.value += item.price;
  });
});
</script>
