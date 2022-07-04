<template>
    <div class="w-full p-4">
        <!-- User Info Card -->
        <div class="w-full h-32 bg-white shadow-sm rounded-xl flex flex-col items-center justify-center mt-8 relative">
            <img :src="avatar" alt="" class="w-20 h-20 rounded-full absolute -top-8 object-cover">
            <div class="font-semibold text-lg mt-4">薇尔莉特</div>
        </div>

        <!-- Create Sheets -->
        <div class="grow rounded-xl shadow-sm bg-white p-4 mt-4">

            <div class="w-full h-6 flex justify-between mb-4">
                <div class="font-semibold text-sm text-slate-400">创建歌单（{{ sheetList.length }}个）</div>
                <div class="flex w-16 justify-between">
                    <plus-icon class="h-6 w-6 text-slate-400" />
                    <dots-vertical-icon class="h-6 w-6 text-slate-400" />
                </div>
            </div>

            <!-- Scroll View -->
            <div class="w-full flex">

                <!-- Horizontal sheet card -->
                <div class="grow overflow-x-hidden">
                    <div class="flex mb-2" v-for="sheet in sheetList" :key="sheet.name">
                        <img :src="avatar" alt="" class="h-16 w-16 rounded-xl mr-4 object-cover">
                        <div class="flex flex-col w-full justify-around py-2">
                            <div class="font-semibold text-md line-clamp-1">{{ sheet.name }}</div>
                            <div class="text-xs text-slate-500">{{ sheet.count }} 首</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <div class="h-4 w-full"></div>

    </div>
</template>

<script setup lang='ts'>
import { DotsVerticalIcon, PlusIcon } from '@heroicons/vue/solid'
import { onMounted, ref } from 'vue'

const avatar = ref('http://big-bird.buzz:9519/music-station/avatar.jpg')

const sheetList = ref(
    [
        {
            cover: avatar.value,
            name: 'Relaxing',
            count: 1
        }
    ]
)

const addData = () => {
    for (let i = 1; i < 10; i++) {
        const random = Math.round(Math.random() * 100)
        sheetList.value.push({
            count: random,
            name: 'Sheet' + i,
            cover: avatar.value
        })
    }
}



onMounted(() => {
    addData()
})

</script>
<style scoped lang='less'>
</style>