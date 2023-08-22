export const selectObject = {
    namespaced: true,
    state: {
        selectedModelId: 1,
      },
      getters: {
        getSelectedModelId(state) {
            console.log(state.selectedModelId)
            return state.selectedModelId;
            }
      },
      mutations: {
        setSelectedModelId(state, modelId) {
          state.selectedModelId = modelId;
        },
      },
        actions: {
        setSelectedModelId({commit}, modelId) {
            commit("setSelectedModelId", modelId);
            }
        }
    }