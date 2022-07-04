import ToastTemplate from '@/components/toast/Index.vue'

import { createVNode, render } from 'vue'

export interface ToastProps {
    message?: string,
    duration?: number
}

export interface ResultParams {
    destroy?: () => void
}

// 创建默认参数
const defaultOpt = {
    duration: 1000
}

const Toast = (message?: string, options?: ToastProps): ResultParams => {
    const container = document.createElement('div')
    const opt = { ...defaultOpt, ...options }
    if (message) {
        opt.message = message
    }
    // 创建vNode
    const vm = createVNode(ToastTemplate, opt)
    render(vm, container)
    // 添加到body上
    document.body.appendChild(container)
    const destroy = () => {
        const t = setTimeout(() => {
            render(null, container)
            document.body.removeChild(container)
            clearTimeout(t)
        }, 500)
    }
    if (opt.duration) {
        const timer = setTimeout(() => {
            destroy()
            clearTimeout(timer)
        }, opt.duration)
    }
    // TODO 添加一些方法，区分success、error等
    return {
        destroy
    }
}


export default Toast