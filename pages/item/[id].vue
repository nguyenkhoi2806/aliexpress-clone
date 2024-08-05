<template>
    <MainLayout>
        <div id="ItemPage" class="mt-4 max-w-[1200px] mx-auto px-2">
            <div class="md:flex gap-4 justify-between mx-auto w-full">
                <div class="md:w-[40%] flex flex-col gap-2">
                    <img class="rounded-lg object-fit" src="https://picsum.photos/id/77/400/300" />
                    <div v-if="images[0] !== ''" class="flex items-center justify-center gap-3">
                        <div v-for="image in images" :key="image">
                            <img @mouseover="currentImage = image" @click="currentImage = image" width="70"
                                class="rounded-md object-fit border-[3px] cursor-pointer"
                                :class="currentImage === image ? 'border-[#FF5353]' : ''" :src="image" />
                        </div>
                    </div>
                </div>
                <div class="md:w-[60%] bg-white p-3 rounded-lg">
                    <div v-if="true">
                        <p class="mb-2">
                            Title
                        </p>
                        <p class="font-light text-[12px] mb-2">
                            Description Section
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/main-layout.vue';

onMounted(() => {
    watchEffect(() => {
        images.value[0] = 'https://picsum.photos/id/77/200/300'
    });
})

const images = ref([
    '',
    'https://picsum.photos/id/77/200/300',
    'https://picsum.photos/id/78/200/300',
    'https://picsum.photos/id/79/200/300',
    'https://picsum.photos/id/80/200/300',
    'https://picsum.photos/id/81/200/300',
])
</script>
