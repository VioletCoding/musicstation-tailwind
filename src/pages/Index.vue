<template>
    <div id="station-wrapper" class="w-screen flex flex-col bg-slate-50">

        <div class="grow overflow-y-auto">
            <!-- 所有展示内容放在router-view中 -->
            <router-view />
        </div>

        <!-- 这是一个底部的固定播放器 -->
        <div class="h-28 px-2 flex items-center bg-white border-t border-slate-100">
            <img :src="avatar" alt="" class="w-14 h-14 object-cover rounded-full ring-2 ring-blue-200">
            <div class="ml-2 line-clamp-1 text-sm font-extrabold">Departures~巴拉巴拉巴拉巴拉啦aaaaaaa啊</div>
            <div class="w-20 flex justify-between ml-2">
                <play-icon class="w-6 h-6 text-black" />
                <menu-alt3-icon class="w-6 h-6 text-black" @click="handlerPlayList()" />
            </div>
        </div>


        <van-popup v-model:show="showPopup" position="bottom" round :style="{ height: '60%' }">
            <div class="p-4">这是一些没用的功能</div>
        </van-popup>
    </div>

</template>

<script setup lang='ts'>
import { MenuAlt3Icon, PlayIcon } from '@heroicons/vue/solid'
import { onMounted, onUpdated, ref } from 'vue'

const avatar = ref('http://big-bird.buzz:9519/music-station/avatar.jpg')

const showPopup = ref(false)

/**
 * 获取浏览器可视窗口的大小，主要是作用域类似于Safari浏览器底部工具栏的问题（Safari浏览器可以把工具栏设置到底部）
 */
const setClientHeight = () => {
    const el = document.getElementById('station-wrapper')
    if (el) {
        const h = (document.documentElement.clientHeight) + 'px'
        el.style.minHeight = h
        el.style.height = h
    }
}

const handlerPlayList = () => {
    showPopup.value = true
}

onMounted(() => {
    setClientHeight()
})

onUpdated(() => {
    setClientHeight()
})
</script>
<style scoped lang='less'>
</style>