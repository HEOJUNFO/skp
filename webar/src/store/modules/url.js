//import querystring from "querystring";

export const url = {
  namespaced: true,
  state: () => ({
    eventMainUrl: "/web-event/main.html",
    eventPhotoBoxUrl: "/webar/index.html#/photo-box",
    eventWinningFormUrl: "/web-event/give-away.html",
    eventAppUrl: "ocbt://com.skmc.okcashbag.home_google/detail/event?url=",
    actionType: "",
  }),
  getters: {
    actionType({ actionType }) {
      return actionType ? actionType : sessionStorage.getItem("actionType");
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
      const actionType = state.actionType ? state.actionType : sessionStorage.getItem("actionType");
      if (actionType === "OCB") {
        const hostNamePrefix = container.location.hostname.split(".")[0];
        const inAppPageUrl = encodeURIComponent(`https://${hostNamePrefix}.syrup.co.kr/web-event/main.html?${query}`);
        // container.location.href = `${state.eventAppUrl}${inAppPageUrl}`;
        window.location.href = `${state.eventAppUrl}${inAppPageUrl}`;
        setTimeout(() => {
          container.location.href = "https://m.okcashbag.com/g/ma/main.mocb";
        }, 1000);
      } else {
        if (success) {
          container.location.href = `${state.eventMainUrl}?redirect=true&${query}`;
        } else {
          container.location.href = `${state.eventMainUrl}?${query}`;
        }
      }
    },
    // photobox redirect
    redirectToPhotoBox({ state }, success) {
      const container = window.top;
      const query = container.location.href.split("?")[1] || "";
      if (success) {
        container.location.href = `${state.eventPhotoBoxUrl}?redirect=true&${query}`;
      } else {
        container.location.href = `${state.eventPhotoBoxUrl}?${query}`;
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
      sessionStorage.setItem("actionType", param);
      commit("SET_ACTION_TYPE", param);
    },
  },
};
