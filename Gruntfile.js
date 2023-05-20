/*
 * Grunt Build System Excute File
 * License: SK planet wholly owned
 * Dependency : Grunt module and NPM Package
 */

/*jshint node:true */
module.exports = function (grunt) {
    "use strict";

    require("load-grunt-tasks")(grunt, {pattern: ["grunt-*", "assemble"]});
    require("time-grunt")(grunt);

    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var curtime = year + month + day + "_" + hour + min + sec;

    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');

    var middleware = function (connect, options) {
        if (!Array.isArray(options.base)) {
            options.base = [options.base];
        }

        // Setup the proxy
        var middlewares = [require('grunt-connect-proxy3/lib/utils').proxyRequest];

        // Serve static files.
        options.base.forEach(function(base) {
            middlewares.push(serveStatic(base));
        });

        // Make directory browse-able.
        var directory = options.base[0];
        middlewares.push(serveIndex(directory));

        return middlewares;
    };

    var isWin = /^win/.test(process.platform);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        assemble: {
            options: {
                helpers: ["conf/helpers/*.js"]
            },
            adreport: {
                options: {
                    layoutdir: "adreport/layouts",
                    //layout: "default.hbs",
                    partials: ["adreport/**/includes/**/*.hbs"]
                },
                files: [
                    {expand: true, cwd: "adreport/pages", src: ["**/*.hbs"], dest: "dist/adreport/"}
                ]
            }
        },
        connect: {
            "local-server": {
                options: {
                    //hostname: ["10.202.215.137", "localhost"],
                    port: 8081,
                    protocol: "https",
                    base: "dist/adreport",
                    middleware: middleware
                }
            },
            proxies: [
                {
                    context: ["/api"],
                    host: "adreportdev.syrup.co.kr",
                    //host: "127.0.0.1",
                    port: 80,
                    //port: 8080,
                    https: false,
                    changeOrigin: true,
                    xforward: false,
                    debug: false,
                    headers: {
                        "host":"adreportdev.syrup.co.kr"
                    }
                }
            ]

        },
        watch: {
            options: {
                interrupt: true,
                livereload: 12345 // grunt를2개돌릴때 conflict 을막기위해서..
            },
            adreport: {
                files: ["adreport/**/*", "common/**/*", "components/**/*"],
                tasks: [
                    "copy:toTmp4Build",
                    "replace:adreport-prebuild",
                    "newer:assemble:adreport",
                    "copy:toDistResourcesAll",
                    "copy:toDistResources4Dev",
                    "replace:adreport-postbuild",
                    "copy:arphoto"
                ]
            }
        },
        useminPrepare: {
            adreport: {
                src: [".tmp/adreport/layouts/**/*.hbs"],
                options: {
                    dest: "dist/adreport"
                }
            }
        },
        /*        cssmin: {
                    target: {
                        files: [{
                            expand: true,
                            cwd: "adreport/resources/css",
                            src: ['*.css', '!*.min.css'],
                            dest: "dist/adreport/resources/css",
                            ext: ".min.css"
                        }]
                    }
                },
        */
        usemin: {
            html: "dist/**/*.html",
            options: {
                blockReplacements: {
                    css: function (block) {
                        return "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + block.dest + "\"/>";
                    }, js: function (block) {
                        return "<script src=\"" + block.dest + "\"></script>";
                    }
                }
            }
        },
        copy: {
            toTmp4Build: {
                expand: true,
                cwd: "adreport",
                src: ["**/*.js", "**/*.css", "**/*.hbs", "**/*.html", "**/*.png", "**/*.svg", "**/*.gltf", "**/*.otf"],
                dest: ".tmp/adreport"
            },
            adreport: {
                expand: true,
                cwd: "adreport/resources",
                src: ["**/*"],
                dest: "dist/adreport/resources"
            },
            toDistResourcesAll: {
                expand: true,
                cwd: "adreport/resources",
                src: ["**", "!**/*.css", "!**/*.js"],
                dest: "dist/adreport/resources"
            },
            toDistResources4Dev: {
                files: [
                    {
                        expand: true,
                        cwd: ".tmp/concat/resources",
                        src: ["**/*.js", "**/*.css"],
                        dest: "dist/adreport/resources"
                    },
                    {
                        expand: true,
                        cwd: ".tmp/adreport/resources",
                        src: ["**/*"],
                        dest: "dist/adreport/resources"
                    },
                    {
                        expand: true,
                        cwd: "common",
                        src: ["**/*.js", "**.css"],
                        dest: "dist/adreport/resources/common"
                    },
                    {
                        expand: true,
                        cwd: "components",
                        src: ["**/*.js", "**.css"],
                        dest: "dist/adreport/resources/components"
                    },
                ]
            },
            webAr: {
                files: [
                    {
                        expand: true,
                        cwd: "webar/dist/",
                        src: "*.html",
                        dest: "dist/adreport/webar/",
                    },
                    {
                        expand: true,
                        cwd: "webar/dist/",
                        src: ["**/*", "!**/*.html", "!**/*.ico"],
                        dest: "dist/adreport/resources/webar/",
                    }
                ]
            },
            gifShader: {
                expand: true,
                cwd: "webar/aframe-gif-shader/",
                src: ["**/*"],
                dest: "webar/node_modules/aframe-gif-shader/",
            },
            kculture: {
                expand: true,
                cwd: ".tmp/adreport/pages/expo",
                src: ["**/*"],
                dest: "dist/adreport/expo"
            },
            arphoto: {
                expand: true,
                cwd: ".tmp/adreport/pages/arphoto",
                src: ["**/*"],
                dest: "dist/adreport/arphoto"
            },

        },
        clean: {
            adreport: ["dist", ".tmp"]
        },
        uglify: {
            options: {
                mangle: false
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: ".tmp/concat/resources/js",
                        src: "**/*.js",
                        dest: "dist/adreport/resources/js"
                    },
                    {
                        expand: true,
                        cwd: ".tmp/adreport/resources/js",
                        src: "**/*.js",
                        dest: "dist/adreport/resources/js"
                    }
                ]
            }
        },
        replace: {
            "adreport-prebuild": {
                options: {
                    patterns: [
                        {match: /\/?dist\/adreport/g, replacement: ""},
                        {match: /{{path dirname '(.*)'}}/g, replacement: "$1"},
                        /*
                                                {match: /script\.min\.js/g, replacement: "script." + curtime + ".min.js"},
                                                {match: /style\.min\.css/g, replacement: "style." + curtime + ".min.css"},
                                                {match: /style78\.min\.css/g, replacement: "style78." + curtime + ".min.css"},
                                                {match: /system\.min\.css/g, replacement: "system." + curtime + ".min.css"},
                                                {match: /system78\.min\.css/g, replacement: "system78." + curtime + ".min.css"},
                                                {match: /index\.min\.css/g, replacement: "index." + curtime + ".min.css"},
                                                {match: /index78\.min\.css/g, replacement: "index78." + curtime + ".min.css"}
                        */
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [".tmp/adreport/layouts/**/*.hbs"],
                        dest: ".tmp/adreport/layouts/"
                    }
                ]
            },
            "adreport-postbuild": {
                options: {
                    patterns: [
                        {match: /src="\.\.\/(.+)\/adreport\/resources/g, replacement: 'src="/resources'},
                        {match: /src="\.\.\/(.+)\/common/g, replacement: 'src="/resources/common'},
                        {match: /src="\.\.\/(.+)\/components/g, replacement: "src=\"/resources/components"},
                        {match: /href="\.\.\/(.+)\/adreport\/resources/g, replacement: "href=\"/resources"},

                        {match: /src="\/resources(.+)\.js/g, replacement: 'src="/resources$1.js?timestamp=' + curtime},
                        //{match: /src="(.+)\.js/g, replacement: 'src="$1.js?timestamp=' + curtime},
                        {match: /href="\/resources(.+)\.css/g, replacement: 'href="/resources$1.css?timestamp=' + curtime},
                        {match: /href="\/resources(.+)\.ico/g, replacement: 'href="/resources$1.ico?timestamp=' + curtime},
                        {match: /src="\.\.\/(.+)\/common/g, replacement: 'src="/resources/common'},
                    ]
                },
                files: [
                    {expand: true, cwd: "dist/adreport/", src: ["**/*.html"], dest: "dist/adreport/"}
                ]
            }
        },
        plato: {
            options: {
                jshint: grunt.file.readJSON(".jshintrc")
            },
            "adreport": {
                files: {
                    "plato_reports/adreport/": ["adreport/resources/js/**/*.js"]
                }
            }
        },
        auto_install: {
            local: {
                options: {
                    cwd: "",
                    stdout: true,
                    stderr: true,
                    failOnError: true,
                    npm: "--production",
                    bower: "--allow-root"
                }
            }
        },
        run: {
            options: {
                wait: true
            },
            "install-webar": {
                // cwd: "webar",
                exec: "cd ./webar && npm install"
            },
            "build-webar": {
                // cwd: "webar",
                exec: "cd ./webar && npm run build"
            },
        },
    });

    // web ar옵션
    var webarBuildOption = ["run:install-webar", "copy:gifShader", "run:build-webar", "copy:webAr"];

    // build 옵션
    var adreportClean = ["clean:adreport"];
    var adreportInitTasks = [
        "copy:toTmp4Build",
        "replace:adreport-prebuild",
        "assemble:adreport",
        "copy:toDistResourcesAll",
        "copy:kculture",
        "copy:arphoto",
    ];
    var adreportBuildMin =  [
        "useminPrepare:adreport",
        "concat",
        "cssmin",
        "usemin",
        "uglify:build",
    ];
    var adreportBuildNotMin = [
        "useminPrepare:adreport",
        "concat",
        // "cssmin",
        "usemin",
        // "uglify:build",
        "copy:toDistResources4Dev",
        "copy:kculture",
        "copy:arphoto"
    ];
    var adreportPostBuild = [
        "replace:adreport-postbuild",
    ];
    var adreportDevLocalServer = [
        "configureProxies:local-server",
        "connect:local-server",
        "watch"
    ];
    var adreportBuildOption = [
        ...adreportClean,
        ...adreportInitTasks,
        ...adreportBuildMin,
        ...webarBuildOption,
        ...adreportPostBuild
    ];
    var adreportBuildTestOption = [
        ...adreportClean,
        ...adreportInitTasks,
        ...adreportBuildNotMin,
        ...webarBuildOption,
        ...adreportPostBuild,
        ...adreportDevLocalServer
    ];
    var adreportDevTasks = [
        ...adreportClean,
        ...adreportInitTasks,
        ...["copy:toDistResources4Dev", "copy:kculture", "copy:arphoto"],
        ...webarBuildOption,
        ...adreportPostBuild,
        ...adreportDevLocalServer
    ];
    var adreportDevWatchTasks = [
        ...adreportInitTasks,
        ...["copy:toDistResources4Dev"],
        ...adreportPostBuild,
    ];
    var adreportDevWinOption = adreportDevTasks;
    var adreportDevOption = ["auto_install", ...adreportDevTasks];

    // Default task.
    grunt.registerTask("default", []);
    if (isWin) {
        grunt.registerTask("dev:adreport", adreportDevWinOption);
        grunt.registerTask("dev", adreportDevWinOption);
    } else {
        grunt.registerTask("dev:adreport", adreportDevOption);
        grunt.registerTask("dev", adreportDevOption);
    }

    grunt.registerTask("build:webar", webarBuildOption);
    grunt.registerTask("build:adreport", adreportBuildOption);
    grunt.registerTask("buildTest:adreport", adreportBuildTestOption);

    grunt.registerTask("build", ["build:adreport"]);

    grunt.registerTask("plato", ["plato:adreport"]);
};
