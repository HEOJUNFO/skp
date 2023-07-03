import { _axios } from "@/plugins/axios";

export async function getEventData(params) {
  console.log("getEventData", params)
  const res = await _axios.post("/api/v1/web-event-front/ar-event-meta/detail", params);
  console.log("getEventData", res)
  return res;
}

export async function getEventResult(params) {
  const res = await _axios.post("/api/v1/web-event-front/winning-process", params);
  return res;
}

export async function setPvLog(params) {
  const res = await _axios.post("/api/v1/web-event-front/pv-log/save", params);
  return res;
}

export async function setLogPersonAgree(params) {
  const res = await _axios.post("/api/v1/web-event-open/log-person-agree/save", params);
  return res;
}

export async function getEventPhotoBox(params) {
  const res = await _axios.post("/api/v1/web-event-front-photo/photobox/detail", params);
  return res;
}
