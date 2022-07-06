<template>
    <div class="w-full h-full flex flex-col p-4 bg-gradient-to-b from-gray-600 via-gary-100 to-gray-400">
        <!-- Header -->
        <div class="flex justify-between items-center h-12">
            <chevron-down-icon class="w-6 h-6 text-white" @click="handlerChevronDownIconClick()" />
            <div class="inline-flex flex-col justify-center items-center font-extrabold text-white">
                <div class="font-semibold line-clamp-1">歌曲名</div>
                <div class="text-gray-400 text-sm line-clamp-1">歌手</div>
            </div>
            <external-link-icon class="w-6 h-6 text-white" />
        </div>

        <!-- Main body -->
        <div class="grow inline-flex items-center justify-center">
            <div class="w-56 h-56 rounded-full bg-white">
                <img src="https://images.unsplash.com/photo-1657100759416-152a01077b54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                    alt="" class="w-full h-full rounded-full object-cover">
            </div>
        </div>

        <!-- Footer -->
        <div class="w-full h-44 flex flex-col justify-between">
            <!-- Operation button -->
            <div class="w-full h-12 flex items-center justify-center space-x-20">
                <heart-icon v-if="!love" class="w-8 h-8 text-white" @click="handlerClickLove()" />
                <header-icon-solid v-else class="w-8 h-8 text-red-500" @click="handlerClickLove()" />
                <chat-icon class="w-8 h-8 text-white" />
                <dots-vertical-icon class="w-8 h-8 text-white" />
            </div>

            <!-- Slider control bar -->
            <div class="w-full h-6 bg-violet-300">

            </div>

            <!-- Button control area -->
            <div class="w-full h-16 flex items-center justify-between">
                <svg class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="23 4 23 10 17 10" />
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                </svg>

                <play-icon v-if="!playing" class="h-16 w-16 text-white" @click="handlerPlayChange()" />
                <pause-icon v-else class="h-16 w-16 text-white" @click="handlerPlayChange()" />

                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white rotate-180" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                </svg>
                <menu-alt3-icon class="h-8 w-8 text-white" />
            </div>
        </div>

    </div>
</template>

<script setup lang='ts'>

import { ChatIcon, ChevronDownIcon, DotsVerticalIcon, ExternalLinkIcon, HeartIcon, PauseIcon, PlayIcon } from '@heroicons/vue/outline'
import { HeartIcon as HeaderIconSolid, MenuAlt3Icon } from '@heroicons/vue/solid'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['minimalPlayer', 'playChange'])
const props = defineProps({
    playing: {
        type: Boolean,
        required: true
    }
})
const love = ref(false)
const playing = ref(props.playing)

const handlerChevronDownIconClick = () => {
    emit('minimalPlayer')
}

const handlerClickLove = () => {
    love.value = !love.value
}

const handlerPlayChange = () => {
    playing.value = !playing.value
    emit('playChange', playing.value)
}

onMounted(() => {
    playing.value = props.playing
})

</script>
<style scoped lang='less'>
</style>