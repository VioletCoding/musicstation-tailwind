<template>
    <div id="station-wrapper" class="w-screen flex flex-col bg-slate-50">

        <div class="grow overflow-y-auto">
            <router-view />
        </div>

        <!-- fixed bottom music player -->
        <div class="h-28 px-2 flex items-center bg-white border-t border-slate-100">
            <img :src="avatar" alt="" class="w-14 h-14 object-cover rounded-full ring-2 ring-blue-200">
            <div class="ml-2 line-clamp-1 text-sm font-extrabold grow">{{ playingSong.name ? playingSong.name : '没有播放歌曲'
            }}
            </div>
            <div class="w-20 flex justify-end ml-2">
                <play-icon class="w-6 h-6 text-black" />
                <menu-alt3-icon class="w-6 h-6 text-black ml-4" @click="handlerPlayList()" />
            </div>
        </div>

        <!-- Selected playlist popup -->

        <van-popup v-model:show="showPopup" position="bottom" round :style="{ height: '60%' }">
            <div class="w-full h-full p-4 flex flex-col">

                <div class="h-16 w-full">
                    <div class="w-full h-8 flex items-center">
                        <span class="font-semibold text-lg">当前播放</span>
                        <span class="text-xs text-gray-400">（{{ songList.length }}）</span>
                    </div>
                    <div class="flex items-center justify-between mt-2">
                        <div class="inline-flex items-center">
                            <svg class="h-4 w-4 text-gray-400 mr-2" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="23 4 23 10 17 10" />
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                            </svg>
                            <p class="font-semibold text-sm">列表循环</p>
                        </div>
                        <div class="inline-flex justify-between w-20">
                            <download-icon class="w-4 h-4 text-gray-400" />
                            <folder-add-icon class="w-4 h-4 text-gray-400" />
                            <trash-icon class="w-4 h-4 text-gray-400" @click="handlerRemoveAll()" />
                        </div>
                    </div>
                </div>

                <!-- Scroll song list -->
                <div class="grow overflow-y-auto w-full mt-2">
                    <!-- Single song line -->
                    <transition-group name="slide-fade" tag="div">
                        <div class="flex items-center h-12 justify-between" v-for="song in songList" :key="song.id"
                            @click="handlerClickSong(song)">
                            <div
                                :class="'font-semibold inline-flex items-center ' + (isPlayingSong(song.id) ? 'text-red-500' : '')">
                                <chart-bar-icon v-if="isPlayingSong(song.id)" class="w-4 h-4 text-red-500 mr-2" />
                                <div>{{ song.name }}</div>
                                <div class="text-sm text-gray-400 font-normal">&nbsp;-&nbsp;{{ song.singer }}</div>
                            </div>
                            <x-icon class="w-4 h-4 text-gray-400" @click="handlerRemoveSong(song)" />
                        </div>
                    </transition-group>
                </div>

            </div>
        </van-popup>
    </div>

</template>

<script setup lang='ts'>
import { DownloadIcon, FolderAddIcon, TrashIcon, XIcon } from '@heroicons/vue/outline'
import { ChartBarIcon, MenuAlt3Icon, PlayIcon } from '@heroicons/vue/solid'
import { Dialog } from 'vant'
import { onMounted, onUpdated, ref } from 'vue'

const avatar = ref('http://big-bird.buzz:9519/music-station/avatar.jpg')

const showPopup = ref(false)

const playingSong = ref<any>({})

/**
 * 点击想播放的歌曲时
 * @param song 歌曲
 */
const handlerClickSong = (song: object) => {
    playingSong.value = song
    showPopup.value = false
}

const isPlayingSong = (id: string): boolean => {
    return id === playingSong.value.id
}

const handlerRemoveSong = (song: any) => {
    const index = songList.value.indexOf(song)
    if (index > -1) {
        songList.value.splice(index, 1)
    }
}

const handlerRemoveAll = () => {
    if (songList.value.length === 0) {
        return false
    }
    Dialog.confirm({
        message: '确定要清空播放列表嘛?',
        theme: 'round-button',
        confirmButtonColor: '#ef4444',
        cancelButtonColor: 'gray'
    }).then(() => songList.value = []).catch(() => { })

}

const songList = ref([{
    id: '0',
    name: '哪里都是你',
    singer: '队长'
}])

const addSong = () => {
    for (let i = 1; i < 20; i++) {
        songList.value.push({
            id: String(i),
            name: '歌曲名' + i,
            singer: '歌手' + i
        })
    }
}

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
    addSong()
})

onUpdated(() => {
    setClientHeight()
})
</script>
<style scoped lang='less'>
::-webkit-scrollbar {
    display: none;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
    transition: all .3s ease-out;
}

.slide-fade-leave-active {
    transition: all .3s cubic-bezier(0.5, 0.5, 0.5, 0.5);
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>