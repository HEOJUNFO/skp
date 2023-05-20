export const loading = {
  namespaced: true,
  state: () => ({
    loadingState: "",
    loadingDone: null,
  }),
  mutations: {
    ["SET_LOADING_STATE"](state, payload) {
      state.loadingState = payload;
    },
  },
  getters: {
    // loading state
    loadingState({loadingState}) {
      return loadingState;
    },
  },
  actions: {
    startLoading({commit}) {
      commit("SET_LOADING_STATE", "LOADING");
    },
    startCounting({commit}) {
      commit("SET_LOADING_STATE", "COUNTING");
    },
    completeLoading({commit}) {
      commit("SET_LOADING_STATE", "COMPLETE");
    }
  }
};