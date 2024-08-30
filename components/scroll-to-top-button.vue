<template>
  <button
    @click="scrollToTop"
    :class="[
      'fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded-full transition-opacity duration-300',
      { 'opacity-100': isVisible, 'opacity-0': !isVisible },
    ]"
    aria-label="Scroll to top"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  </button>
</template>

<script>
  import { ref, onMounted, onUnmounted } from 'vue';

  export default {
    name: 'ScrollToTopButton',
    setup() {
      const isVisible = ref(false);

      const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
          isVisible.value = true;
        } else {
          isVisible.value = false;
        }
      };

      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };

      onMounted(() => {
        window.addEventListener('scroll', toggleVisibility);
      });

      onUnmounted(() => {
        window.removeEventListener('scroll', toggleVisibility);
      });

      return {
        isVisible,
        scrollToTop,
      };
    },
  };
</script>
