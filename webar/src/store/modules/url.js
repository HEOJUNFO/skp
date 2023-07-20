//import querystring from "querystring";

export const url = {
  namespaced: true,
  state: () => ({
    eventMainUrl: "/web-event/main2.html",
    eventWinningFormUrl: "/web-event/give-away.html",
    eventAppUrl: "ocbt://com.skmc.okcashbag.home_google/",
    actionType: "WEB",
  }),
  getters: {
    actionType({ actionType }) {
      return actionType;
    },
  },
  mutations: {
    ["SET_ACTION_TYPE"](state, payload) {
      state.actionType = payload;
    },
  },
  actions: {
    // main redirect
    redirectToMain({ state }, success) {
      const container = window.top;
      const query = container.location.href.split("?")[1] || "";
      if (state.actionType === "OCB") {
        container.location.href = state.eventAppUrl;
      } else {
        if (success) {
          container.location.href = `${state.eventMainUrl}?redirect=true&${query}`;
        } else {
          container.location.href = `${state.eventMainUrl}?${query}`;
        }
      }
    },
    // 당첨 정보 팝업
    openWinningFormPopup({ state }, { eventId, arEventWinningId, arEventWinningButtonId, eventLogWinningId }) {
      if (!(eventId && arEventWinningId && arEventWinningButtonId)) {
        alert(`eventId, arEventWinningId, arEventWinningButtonId must be required!`);
      }
      // const query = querystring.stringify({eventId, arEventWinningId, arEventWinningButtonId, eventLogWinningId});
      // const url = `${state.eventWinningFormUrl}?${query}`;
      //sessionStorage 설정

      const eventWinningData = { eventId, arEventWinningId, arEventWinningButtonId, eventLogWinningId };
      sessionStorage.setItem("eventWinningData", JSON.stringify(eventWinningData));
      const url = `${state.eventWinningFormUrl}`;
      parent.open(url, "_blank");
    },
    // 윈도우 닫기
    closeWindow() {
      const container = window.top;
      container.close();
    },
    // 인입 경로 (WEB: 오픈웹, OCB: OCB)
    setActionType({ commit }, param) {
      commit("SET_ACTION_TYPE", param);
    },
  },
};