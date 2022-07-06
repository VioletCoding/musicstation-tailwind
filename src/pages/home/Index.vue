<template>
    <div class="w-full p-4">
        <!-- User Info Card -->
        <div
            class="w-full h-32 bg-white drop-shadow-sm rounded-xl flex flex-col items-center justify-center mt-8 relative">
            <img :src="avatar" alt=""
                class="w-20 h-20 rounded-full absolute -top-10 object-cover ring-2 ring-offset-2 ring-blue-200">
            <div class="w-full font-semibold text-lg text-center mt-6">薇尔莉特</div>
            <div class="w-full text-center font-semibold text-xs text-gray-400 line-clamp-2 px-4">
                这个人很懒，什么也没写这个人很懒，什么也没写这个人很懒，什么也没写这个人很懒，什么也没写这个人很懒，什么也没写这个人很懒，什么也没写
            </div>
        </div>

        <!-- Create Sheets -->
        <div class="grow rounded-xl drop-shadow-sm bg-white p-4 mt-4">

            <div class="w-full h-6 flex justify-between mb-4">
                <div class="font-semibold text-sm text-gray-400">创建歌单（{{ sheetList.length }}个）</div>
                <div class="flex w-16 space-x-4">
                    <plus-icon class="h-6 w-6 text-gray-400" />
                    <dots-vertical-icon class="h-6 w-6 text-gray-400" />
                </div>
            </div>

            <!-- Scroll View -->
            <div class="w-full flex">

                <!-- Horizontal sheet card -->
                <div class="grow overflow-x-hidden">
                    <div class="flex mb-2" v-for="sheet in sheetList" :key="sheet.name"
                        @click="handlerClickSheetCard(sheet.name)" v-lazy>
                        <img :src="avatar" alt="" class="h-16 w-16 rounded-xl mr-4 object-cover">
                        <div class="flex flex-col w-full justify-around py-2">
                            <div class="font-extrabold text-sm line-clamp-1">{{ sheet.name }}</div>
                            <div class="text-xs text-gray-400">{{ sheet.count }} 首</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <div class="h-4 w-full">
            <!-- just a placeholder -->
        </div>

    </div>
</template>

<script setup lang='ts'>
import { DotsVerticalIcon, PlusIcon } from '@heroicons/vue/solid'
import { Toast } from 'vant'
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
    for (let i = 1; i < 20; i++) {
        const random = Math.round(Math.random() * 100)
        sheetList.value.push({
            count: random,
            name: 'Sheet' + i,
            cover: avatar.value
        })
    }
}

const handlerClickSheetCard = (name: string) => {
    Toast('你点击了' + name)
}



onMounted(() => {
    addData()
})

</script>
<style scoped lang='less'>
</style>