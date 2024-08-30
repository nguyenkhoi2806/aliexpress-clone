<template>
  <div>
    <div class="bg-[#FAFAFA]" />
    <MainLayout v-if="!isAuthRoute">
      <NuxtPage />
    </MainLayout>
    <NuxtPage v-else />
    <MenuOverlay
      :class="[
        {
          'max-h-[100vh] transition-all duration-200 ease-in visible':
            userStore.isMenuOverlay,
        },
        {
          'max-h-0 transition-all duration-200 ease-out invisible':
            !userStore.isMenuOverlay,
        },
      ]"
    />
  </div>
</template>

<script setup>
  import { useUserStore } from '~/stores/user';
  import MainLayout from './layouts/main-layout.vue';
  const userStore = useUserStore();
  const route = useRoute();

  const isAuthRoute = computed(() => {
    return ['/auth'].includes(route.path);
  });

  const windowWidth = ref(process.client ? window.innerWidth : '');

  onMounted(() => {
    userStore.isLoading = true;
    window.addEventListener('resize', function () {
      windowWidth.value = window.innerWidth;
    });
  });

  watch(
    () => windowWidth.value,
    () => {
      if (windowWidth.value >= 767) {
        userStore.isMenuOverlay = false;
      }
    }
  );

  watch(
    () => route.fullPath,
    () => {
      userStore.isLoading = true;
    }
  );
</script>
