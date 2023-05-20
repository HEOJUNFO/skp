import {computed} from "vue";
import {useStore} from "vuex";

export default function useLoading() {
  const {dispatch, getters} = useStore();
  const loadingState = computed(() => {
    return getters["loading/loadingState"];
  });

  const startLoading = () => {
    dispatch("loading/startLoading");
  }

  const startCounting = () => {
    dispatch("loading/startCounting");
  }

  const completeLoading = () => {
    dispatch("loading/completeLoading");
  }

  return {
    loadingState,

    startLoading,
    startCounting,
    completeLoading,
  }
}