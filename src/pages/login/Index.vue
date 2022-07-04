<template>
    <div class="w-full h-full">
        <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8">
                <div>
                    <div class="w-24 h-24 bg-blue-600 rounded-full mb-24 flex items-center justify-center mx-auto">
                        <p class="text-white text-6xl font-semibold">M</p>
                    </div>
                </div>
                <div class="mt-8 space-y-6">
                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input v-model="username" type="text" required
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="请输入账号" />
                        </div>
                        <div>
                            <input v-model="password" type="password" required
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="请输入密码" />
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" v-model="rememberMe" type="checkbox"
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900">自动登录</label>
                        </div>

                        <div class="text-sm">
                            <a href="#" class="font-medium text-blue-600 hover:text-blue-500"
                                @click="handlerUselessClick()">忘记密码？</a>
                        </div>
                    </div>

                    <div>
                        <button type="button" @click="handlerLoginBtn()"
                            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2">
                            <Loading v-if="loading" />
                            登录
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Loading from '../../components/loading/Index.vue'
import Toast from '../../components/toast'

const loading = ref<boolean>(false)

const username = ref<string>('')
const password = ref<string>('')
const rememberMe = ref<boolean>(true)

const handlerLoginBtn = () => {
    if (!username.value || !password.value) {
        Toast('请输入用户名密码')
        return false
    }
    loading.value = true

    setTimeout(() => {
        Toast('登录成功')
        loading.value = false
    }, 500)
}

const handlerUselessClick = () => {
    Toast('还没实现')
}



</script>
<style scoped lang='less'>
</style>