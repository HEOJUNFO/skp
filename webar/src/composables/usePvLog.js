import { setPvLog } from "@/apis";

const usePvLog = () => {
  navigator.sayswho = (function () {
    var ua = navigator.userAgent;
    var tem;
    // var M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?(\S*)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return "IE " + (tem[1] || "");
    }
    if (M[1] === "Chrome") {
      // tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
      tem = ua.match(/\b(OPR|Edge|Edg|Whale|SamsumgBrowser)\/(\S*)/);
      if (tem != null) return tem.slice(1).join(" ").replace("OPR", "Opera");
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];

    if (M[0] != "Safari") {
      // if((tem= ua.match(/version\/(\S*)/i))!= null) M.splice(1, 1, tem[1]);
      if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    }

    return M.join(" ");
  })();

  const parseQuery = (qs) => {
    qs = qs || location.search || location.href.substring(location.href.indexOf("?"));
    var result = {},
      keyValuePairs = qs.slice(1).split("&");

    for (var i = 0, l = keyValuePairs.length; i < l; i++) {
      var keyValuePair = keyValuePairs[i].split("=");
      if (keyValuePair[0] !== "" && !!keyValuePair[1]) {
        result[keyValuePair[0]] = decodeURIComponent(keyValuePair[1]) || "";
      }
    }
    return result;
  };

  const getPvLogParams = (num, pageId, order, code, type,time) => {
    // const BR_CODE_OCB = "1",
    //   BR_CODE_SYRUP = "2",
    //   BR_CODE_WEB = "3",
    //   BR_CODE_QR = "4";
    const BR_CODE_WEB = "3",
      BR_CODE_QR = "4";

    const BROWSER_TYPE_ETC = "-1",
      BROWSER_TYPE_CHROME = "0",
      BROWSER_TYPE_SAFARI = "1",
      BROWSER_TYPE_SAMSUNG = "2",
      BROWSER_TYPE_NAVER = "3";

    const params = {};
    const qs = parseQuery();

    if (qs.eventId) {
      params.eventId = qs.eventId;
    } else {
      let href = location.href;
      if (href.indexOf("give-away.html") >= 0) {
        let parseEventWinningData = JSON.parse(sessionStorage.getItem("skWebArJson"));
        if (parseEventWinningData && parseEventWinningData.eventId) {
          params.eventId = parseEventWinningData.eventId;
        } else {
          return;
        }
      } else if (href.indexOf("nft-repository.html") >= 0 || href.indexOf("nft-detail.html") > 0) {
        let eventSessionData = JSON.parse(sessionStorage.getItem("eventSessionData"));
        if (eventSessionData && eventSessionData.eventId) {
          params.eventId = eventSessionData.eventId;
        } else {
          return;
        }
      } else {
        return;
      }
    }

    let pvLogType = "";

    let tempPageId = pageId.split("/");
    tempPageId.map((item) => {
      if (item) {
        if (pvLogType) {
          pvLogType = pvLogType + "_";
        }
        pvLogType = pvLogType + item.toUpperCase();
      }
    });

    pvLogType = pvLogType + "_" + num;

    params.pvLogType = pvLogType;
    params.order = order;
    params.code = code;
    params.type = type;
    params.created_time = time;

    if (num === "0" && pageId === "/main") {
      if (qs.trCd) {
        // 진입 채널 기준 (trCd : QR)
        params.br = BR_CODE_QR;
      } else {
        params.br = BR_CODE_WEB;
      }

      console.log(navigator.sayswho); // outputs: `Chrome 62`

      let browserInfo = navigator.sayswho.split(" ");
      let browserType;
      if (browserInfo && browserInfo.length > 0) {
        browserType = browserInfo[0].toLowerCase();
      }

      if (browserInfo && browserInfo.length > 1) {
        params.browserVersion = browserInfo[1];
      }

      // -1 = 기타, 0 = chrome, 1 = safari, 2 = samsung_internet, 3 = naver_br
      switch (browserType) {
        case "chrome":
          params.type = BROWSER_TYPE_CHROME;
          break;
        case "safari":
          params.type = BROWSER_TYPE_SAFARI;
          break;
        case "samsumgbrowser":
          params.type = BROWSER_TYPE_SAMSUNG;
          break;
        case "whale":
          params.type = BROWSER_TYPE_NAVER;
          break;
        default:
          params.type = BROWSER_TYPE_ETC;
          break;
      }
    }

    return params;
  };

  const putPvLog = async (params) => {
    try {
      const res = await setPvLog(params);
      if (res.resultCode === 200) {
        console.log("put log : " + JSON.stringify(params));
      }
    } catch (e) {
      console.log(e.resultMessage);
    }
  };

  return {
    getPvLogParams,
    putPvLog,
  };
};

export default usePvLog;
