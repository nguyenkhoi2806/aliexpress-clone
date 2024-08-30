<template>
  <div id="AddressPage" class="mt-4 max-w-[500px] mx-auto px-2">
    <div class="mx-auto bg-white rounded-lg p-3">
      <div class="text-xl text-bold mb-2">Address Details</div>
      <form @submit.prevent="submit()" class="flex flex-col gap-5">
        <!-- eslint-disable vue/no-v-model-argument -->
        <TextInput class="w-full" placeholder="Contact Name" v-model:input="addressInfo.contactName" inputType="input"
          :error="error && error.type == 'contactName' ? error.message : ''" />
        <TextInput class="w-full mt-2" placeholder="Address" v-model:input="addressInfo.address" inputType="input"
          :error="error && error.type == 'address' ? error.message : ''" />
        <TextInput class="w-full" placeholder="Zip Code" v-model:input="addressInfo.zipCode" inputType="input"
          :error="error && error.type == 'zipCode' ? error.message : ''" />
        <TextInput class="w-full" placeholder="City" v-model:input="addressInfo.city" inputType="input"
          :error="error && error.type == 'city' ? error.message : ''" />
        <TextInput class="w-full" placeholder="Country" v-model:input="addressInfo.country" inputType="input"
          :error="error && error.type == 'country' ? error.message : ''" />
        <div v-if="error && error.type === 'api'" class="text-red-500 mb-4">
          {{ error.message }}
        </div>
        <button :disabled="isWorking" type="submit"
          class="mt-6 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[18px] font-semibold p-1.5 rounded-full">
          <div v-if="!isWorking">Update Address</div>
          <Icon v-else name="eos-icons:loading" size="25" class="mr-2" />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
import { ref, onBeforeMount } from 'vue';

const userStore = useUserStore();
const user = useSupabaseUser();

const addressInfo = ref({
  contactName: '',
  address: '',
  zipCode: '',
  city: '',
  country: ''
});

const currentAddress = ref(null);
const isUpdate = ref(false);
const isWorking = ref(false);
const error = ref(null);

onBeforeMount(async () => {
  const { data, error, status } = await useFetch(`/api/get-address-by-user/${user.value.id}`);
  if (status.value === 204) {
    currentAddress.value = null;
  } else if (error.value) {
    console.error('Error fetching address:', error.value);
  } else if (data.value) {
    currentAddress.value = data.value;
    if (currentAddress.value?.name) {
      addressInfo.value = {
        contactName: currentAddress.value.name,
        address: currentAddress.value.address,
        zipCode: currentAddress.value.zipcode,
        city: currentAddress.value.city,
        country: currentAddress.value.country
      };
      isUpdate.value = true;
    }
  }
  setTimeout(() => (userStore.isLoading = false), 500);
});

const submit = async () => {
  isWorking.value = true;
  error.value = null;

  const fields = [
    { key: 'contactName', label: 'Contact Name' },
    { key: 'address', label: 'Address' },
    { key: 'zipCode', label: 'Zip Code' },
    { key: 'city', label: 'City' },
    { key: 'country', label: 'Country' }
  ];

  for (const field of fields) {
    if (!addressInfo.value[field.key]) {
      error.value = {
        type: field.key,
        message: `A ${field.label} is required`,
      };
      break;
    }
  }

  if (error.value) {
    isWorking.value = false;
    return;
  }

  const body = {
    name: addressInfo.value.contactName,
    address: addressInfo.value.address,
    zipcode: addressInfo.value.zipCode,
    city: addressInfo.value.city,
    country: addressInfo.value.country,
    userId: user.value.id,
  };

  let response;
  if (isUpdate.value) {
    response = await useFetch(`/api/update-address/${currentAddress.value.data.id}`, {
      method: 'PATCH',
      body,
    });
  } else {
    response = await useFetch(`/api/add-address`, {
      method: 'POST',
      body,
    });
  }

  isWorking.value = false;

  if (response.status.value === 200) {
    return navigateTo('/checkout');
  } else {
    error.value = {
      type: 'api',
      message: 'Failed to update address. Please try again.',
    };
  }
};
</script>
