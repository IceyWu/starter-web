export const useUserStore = defineStore(
  "user",
  () => {
    // 用户信息
    const userInfo = ref({});

    // 设置用户信息
    const setUserInfo = (info) => {
      userInfo.value = info;
    };

    return {
      userInfo,
      setUserInfo,
    };
  },

  {
    persist: {
      key: "user-key",
    },
  }
);
