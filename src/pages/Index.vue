<template>
    <div id="station-wrapper" class="w-screen flex flex-col bg-slate-50">

        <div class="grow overflow-y-auto">
            <router-view />
        </div>

        <!-- fixed bottom music player -->
        <div class="h-28 px-2 flex items-center bg-white border-t border-slate-100">
            <div class="grow inline-flex items-center" @click="clickPlayer()">
                <img :src="avatar" alt="" class="w-14 h-14 object-cover rounded-full ring-2 ring-blue-200">
                <div class="ml-4 truncate text-md font-extrabold grow">
                    {{ playingSong ? playingSong.name : '没有播放歌曲' }}
                </div>
            </div>
            <div class="w-20 flex space-x-6 ml-2">
                <play-icon v-if="!playingState" class="w-6 h-6 text-black" @click="commitPlayingState()" />
                <pause-icon v-else class="w-6 h-6 text-black" @click="commitPlayingState()" />
                <menu-alt3-icon class="w-6 h-6 text-black ml-4" @click="clickPlaylistIcon()" />
            </div>
        </div>

        <!-- Selected playlist popup -->
        <van-popup v-model:show="showPlaylistPopup" position="bottom" round :style="{ height: '60%' }">
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
                        <div class="inline-flex justify-end w-20">
                            <!-- <download-icon class="w-4 h-4 text-gray-400" />
                            <folder-add-icon class="w-4 h-4 text-gray-400" /> -->
                            <trash-icon class="w-4 h-4 text-gray-400" @click="clearPlaylist()" />
                        </div>
                    </div>
                </div>

                <!-- Scroll song list -->
                <div class="grow overflow-y-auto w-full mt-2 ">
                    <!-- Single song line -->
                    <transition-group name="slide-fade" tag="div">
                        <div class="flex items-center h-12 justify-between " v-for="song in songList" :key="song.id">
                            <div :class="'font-semibold inline-flex items-center ' + (isPlayingSong(song.id) ? 'text-red-500' : '')"
                                @click="clickSong(song)">
                                <chart-bar-icon v-if="isPlayingSong(song.id)" class="w-4 h-4 text-red-500 mr-2" />
                                <div>{{ song.name }}</div>
                                <div class="text-sm text-gray-400 font-normal">&nbsp;-&nbsp;{{ song.singer }}</div>
                            </div>
                            <x-icon class="w-4 h-4 text-gray-400" @click="removeSongFromPlaylist(song)" />
                        </div>
                    </transition-group>
                </div>

            </div>
        </van-popup>


        <van-popup v-model:show="showFullScreenPlayer" position="bottom" :style="{ height: '100%' }">
            <full-screen-player @minimal-player="minimalPlayer()" @play-change="commitPlayingState()" />
        </van-popup>

    </div>

</template>

<script setup lang='ts'>
import { PauseIcon, PlayIcon, TrashIcon, XIcon } from '@heroicons/vue/outline'
import { ChartBarIcon, MenuAlt3Icon } from '@heroicons/vue/solid'
import { Dialog } from 'vant'
import { computed, onMounted, onUpdated, ref } from 'vue'
import { useStore } from 'vuex'
import FullScreenPlayer from '../components/FullScreenPlayer.vue'
import { Song } from '../types/song'
// the store
const store = useStore()
// test avatar
const avatar = ref<string>('http://big-bird.buzz:9519/music-station/avatar.jpg')
// 是否显示播放列表弹出层
const showPlaylistPopup = ref<boolean>(false)
// 正在播放的歌曲
const playingSong = computed<Song>((): Song => store.state.playingSongInfo)
// 是否显示全屏播放器
const showFullScreenPlayer = ref<boolean>(false)
// 从vuex里获取歌曲播放状态，全局同步
const playingState = computed<boolean>((): boolean => store.state.isSongPlaying)

/**
 * 点击歌曲
 * @param song 歌曲
 */
const clickSong = (song: Song): void => {
    store.commit('changePlayingSongInfo', song)
    showPlaylistPopup.value = false
    store.commit('changePlayingState', true)
}
/**
 * 是否为正在播放的歌曲
 * @param  id 歌曲id
 */
const isPlayingSong = (id: string): boolean => {
    if (playingSong.value) {
        return id === playingSong.value.id
    }
    return false
}
/**
 * 从播放列表删除歌曲
 * @param song 歌曲
 */
const removeSongFromPlaylist = (song: Song): void => {
    const index = songList.value.indexOf(song)
    if (index > -1) {
        songList.value.splice(index, 1)
    }
}
/**
 * 清空播放列表
 */
const clearPlaylist = (): void => {
    if (songList.value.length === 0) {
        return
    }
    Dialog.confirm({
        message: '确定要清空播放列表嘛?',
        theme: 'round-button',
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#3778e1'
    }).then(() => songList.value = []).catch(() => { })

}
/**
 * 点击播放或暂停按钮时，控制歌曲播放暂停
 */
const commitPlayingState = (): void => {
    if (playingSong.value.name) {
        commitPlayingStateToStore(!store.state.isSongPlaying)
    }
}

/**
 * 点击底部播放器的非操作按钮区域时
 */
const clickPlayer = (): void => {
    showFullScreenPlayer.value = true
}

/**
 * 最小化播放器
 */
const minimalPlayer = (): void => {
    showFullScreenPlayer.value = false
}

/**
 * 点击播放列表按钮
 */
const clickPlaylistIcon = (): void => {
    showPlaylistPopup.value = true
}

/**
 * 传参的切换状态
 * @param playStatus 播放状态
 */
const commitPlayingStateToStore = (playStatus: boolean): void => {
    store.commit('changePlayingState', playStatus)
}

const songList = ref<Song[]>([{
    id: '0',
    name: '哪里都是你',
    singer: '队长'
}])

const addSong = (): void => {
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
const setClientHeight = (): void => {
    const el = document.getElementById('station-wrapper')
    if (el) {
        const h = (document.documentElement.clientHeight) + 'px'
        el.style.minHeight = h
        el.style.height = h
    }
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