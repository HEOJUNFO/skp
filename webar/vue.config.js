// const fs = require('fs')
// require('vue-template-compiler');
module.exports = {
    devServer: {
        https: true,
        // 프록시 설정
        proxy: {
            // 프록시 요청을 보낼 api의 시작 부분
            '/api': {
                // 프록시 요청을 보낼 서버의 주소
                target: process.env.API_PROXY_PATH
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                // modify the options...
                options.compilerOptions = {
                    isCustomElement: tag => tag.startsWith('a-')
                }
                return options
            })
    },
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        },
        basic: {
            entry: 'src/pages/basic/main.js',
            template: 'public/basic.html',
            filename: 'basic.html'
        },
        ar: {
            entry: 'src/pages/ar/main.js',
            template: 'public/ar.html',
            filename: 'ar.html'
        },
    }
}