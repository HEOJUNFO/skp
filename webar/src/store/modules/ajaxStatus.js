export const ajaxStatus = {
  namespaced: true,
  state: () => ({
    resultCode: null,
    resultMessage: null,
  }),
  mutations: {
    //
    ['SET_RESULT_CODE'](state, payload) {
      state.resultCode = payload
    },
    ['SET_RESULT_MESSAGE'](state, payload) {
      state.resultMessage = payload
    },
  },
  getters: {
    //
    resultCode(state) {
      return state.resultCode;
    },
    resultMessage(state) {
      return state.resultMessage;
    }
  },
  actions: {
    // main redirect
    setResponse({commit, dispatch}, {resultCode, resultMessage}) {
      commit('SET_RESULT_CODE', resultCode);
      commit('SET_RESULT_MESSAGE', resultMessage);
      
      switch (resultCode) {
        case 200:
          break;
        // case 801:
        //   // 이벤트 ID없음
        //   break;
        // case 802:
        //   // AR_EVENT 정보 없음
        //   break;
        case 805:
          alert('AR화면에 노출할 오브젝트가 없습니다. \r참여지역 다를경우 혹은 선착순 마감된 경우일 수 있으니 이벤트 참여조건을 다시 확인해 보세요.')
          dispatch('url/redirectToMain', null, {root: true})
          break;
        // case 809:
        //   // 이미 사용된 이벤트 코드
        //   break;
        default:
          alert('잠깜만요!\n시스템점검으로 서비스접속이 불안정합니다.\n잠시후에 다시 접속해주세요')
          // dispatch('url/redirectToMain', null, {root: true})
          break;
      }

    },
  }
}