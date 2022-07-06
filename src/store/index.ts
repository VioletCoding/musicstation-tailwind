import { createStore } from "vuex"

export default createStore({
    state: {
        isSongPlaying: false
    },
    mutations: {
        changePlayingState(state, payload: boolean) {
            state.isSongPlaying = payload
        }
    },
    actions: {},
    modules: {}
})