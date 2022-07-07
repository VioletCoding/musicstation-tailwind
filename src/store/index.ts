import { InjectionKey } from "vue"
import { createStore, Store, useStore as baseUseStore } from "vuex"
import { Song } from "../types/song"

/**
 * 声明state类型
 */
export interface State {
    isSongPlaying: boolean,
    playingSongInfo: Song | null | undefined
}

// ts 支持
export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
    state: {
        // 歌曲是否正在播放
        isSongPlaying: false,
        // 正在播放的歌曲
        playingSongInfo: null
    },
    mutations: {
        /**
         * 变更全局播放状态
         * @param state the state
         * @param payload 是否播放
         */
        changePlayingState(state: State, payload: boolean) {
            state.isSongPlaying = payload
        },
        /**
         * 改变歌曲信息 
         * @param state the state
         * @param payload 歌曲信息
         */
        changePlayingSongInfo(state: State, payload: Song) {
            state.playingSongInfo = payload
        }
    },
    actions: {},
    modules: {}
})

// 定义 自定义的 useStore
export function useStore() {
    return baseUseStore(key)
}