//import querystring from "querystring";

export const url = {
  namespaced: true,
  state: () => ({
    eventMainUrl: '/web-event/main.html',
    eventWinningFormUrl: '/web-event/give-away.html'
  }),
  getters: {},
  mutations: {},
  actions: {
    // main redirect
    redirectToMain({state}, success) {
      const container = window.top;
      const query = (container.location.href).split('?')[1] || "";
      if(success){
        container.location.href = `${state.eventMainUrl}?redirect=true&${query}`;
      }else{
        container.location.href = `${state.eventMainUrl}?${query}`;
      }
    },
    // 당첨 정보 팝업
    openWinningFormPopup({state}, {eventId, arEventWinningId, arEventWinningButtonId, eventLogWinningId}) {
      if(!(eventId && arEventWinningId && arEventWinningButtonId)) {
        alert(`eventId, arEventWinningId, arEventWinningButtonId must be required!`);
      }
      // const query = querystring.stringify({eventId, arEventWinningId, arEventWinningButtonId, eventLogWinningId});
      // const url = `${state.eventWinningFormUrl}?${query}`;
      //sessionStorage 설정
      const eventWinningData = {eventId, arEventWinningId, arEventWinningButtonId, eventLogWinningId};
      console.log("eventWinningData : "+JSON.stringify(eventWinningData))
      sessionStorage.setItem('eventWinningData', JSON.stringify(eventWinningData));
      const url = `${state.eventWinningFormUrl}`;
      parent.open(url, "_blank");
    },
    // 윈도우 닫기
    closeWindow() {
      const container = window.top;
      container.close();
    }
  }
};