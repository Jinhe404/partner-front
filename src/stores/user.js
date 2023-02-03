import { defineStore } from 'pinia'   // 导入 defineStore

export const useUserStore = defineStore('user', {
    // 其他配置...
    state: () => ({user: {}}),
    actions: {
        setUser(user) {
            this.user = user
        }
    },
    // 开启数据持久化
    persist:true

})