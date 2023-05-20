"use strict";

import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

let vue = null;
let loader = null;
function showLoader() {
  loader = vue.config.globalProperties.$loading.show();
}
function hideLoader() {
  loader && loader.hide();
  loader = null;
}


const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    showLoader()
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    hideLoader()
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

// console.log('Plugin', Plugin)
//
// Plugin.install = function(Vue/*, options*/) {
//   Vue.axios = _axios;
//   window.axios = _axios;
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get() {
//         return _axios;
//       }
//     },
//     $axios: {
//       get() {
//         return _axios;
//       }
//     },
//   });
// };

// export default Plugin;

export {_axios};

const AxiosPlugin = {
  install: (app) => {
    app.config.globalProperties.axios = _axios;
    app.config.globalProperties.$axios = _axios;
    vue = app
  }
}

export default AxiosPlugin;
