import { ref, computed } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const count = ref(0)
    const setCount = () => {
      count.value++
    }
    return {
      count,
      setCount,
    }
  },
  {
    persist: {
      key: 'test-key',
    },
  }
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
