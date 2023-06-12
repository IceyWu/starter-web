import { ref, computed } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";
import { getLogin, refreshTokenApi } from "~/api/admin";
import { setToken, getToken, formatToken } from "~/utils/auth";

export const useUserStore = defineStore(
  "user",
  () => {
    const count = ref(0);
    const setCount = () => {
      count.value++;
    };
    /** 登录 */
    const handLogin = async (data) => {
      return new Promise((resolve, reject) => {
        getLogin(data)
          .then((data) => {
            console.log("登录", data);
            if (data) {
              setToken(data.data);
              resolve(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    /** 刷新`token` */
    const handRefreshToken = async (data) => {
      return new Promise((resolve, reject) => {
        refreshTokenApi(data)
          .then((data) => {
            console.log("刷新token", data);
            if (data) {
              setToken(data.data);
              resolve(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
    return {
      count,
      setCount,
      handRefreshToken,
      handLogin,
    };
  },
  {
    persist: {
      key: "test-key",
    },
  }
);

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
