<template>
    <div id="station-wrapper" class="w-screen flex flex-col bg-slate-50">

        <div class="grow overflow-y-auto">
            <!-- 所有展示内容放在router-view中 -->
            <router-view />
        </div>

        <!-- 这是一个底部的固定播放器 -->
        <div class="w-screen h-16 bg-pink-300">
            Fixed Bottom Player
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, onUpdated } from 'vue'

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

onMounted(() => {
    setClientHeight()
})

onUpdated(() => {
    setClientHeight()
})
</script>
<style scoped lang='less'>
</style>