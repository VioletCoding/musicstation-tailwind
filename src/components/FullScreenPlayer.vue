<template>
    <div class="w-screen h-screen flex flex-col p-4 bg-gradient-to-b from-gray-600 via-gary-100 to-gray-400">
        <!-- Header -->
        <div class="flex justify-between items-center h-12">
            <chevron-down-icon class="w-6 h-6 text-white" @click="handlerChevronDownIconClick()" />
            <div class="inline-flex flex-col justify-center items-center font-extrabold text-white">
                <div>歌曲名</div>
                <div class="text-gray-400">歌手</div>
            </div>
            <external-link-icon class="w-6 h-6 text-white" />
        </div>

        <!-- Main body -->
        <div></div>

        <!-- Footer -->
        <div>
            <!-- Operation button -->
            <div></div>

            <!-- Slider control bar -->
            <div></div>

            <!-- Button control area -->
            <div></div>
        </div>

    </div>
</template>

<script setup lang='ts'>

import { ChevronDownIcon, ExternalLinkIcon } from '@heroicons/vue/outline'

const emit = defineEmits(['minimalPlayer'])

const handlerChevronDownIconClick = () => {
    emit('minimalPlayer')
}

</script>
<style scoped lang='less'>
</style>