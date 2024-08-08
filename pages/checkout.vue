<template>
  <MainLayout>
    <div id="CheckoutPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="md:flex gap-4 justify-between mx-auto w-full">
        <div class="md:w-[65%]">
          <div class="bg-white rounded-lg p-4">
            <div class="text-xl font-semibold mb-2">Shipping Address</div>
            <div v-if="true">
              <NuxtLink
                to="/address"
                class="flex items-center pb-2 text-blue-500 hover:text-red-400"
              >
                <Icon name="mdi:plus" size="18" class="mr-2" />
                Update Address
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
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

watch(
  () => total.value,
  () => {
    if (total.value > 0) {
      stripeInit();
    }
  }
);

const stripeInit = async () => {
  const runtimeConfig = useRuntimeConfig();
  stripe = Stripe(runtimeConfig.stripePk);

  let res = await $fetch('/api/stripe/paymentintent', {
    method: 'POST',
    body: {
      amount: total.value,
    },
  });
  clientSecret = res.client_secret;

  elements = stripe.elements();
  const style = {
    base: {
      fontSize: '18px',
    },
    invalid: {
      fontFamily: 'Arial, sans-serif',
      color: '#EE4B2B',
      iconColor: '#EE4B2B',
    },
  };
  card = elements.create('card', {
    hidePostalCode: true,
    style: style,
  });

  card.mount('#card-element');
  card.on('change', function (event) {
    document.querySelector('button').disabled = event.empty;
    document.querySelector('#card-error').textContent = event.error
      ? event.error.message
      : '';
  });

  isProcessing.value = false;
};

const pay = async () => {};

const createOrder = () => {};

const showError = (errorMsgText) => {};
</script>
