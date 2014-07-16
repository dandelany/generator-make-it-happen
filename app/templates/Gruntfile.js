var _ = require('underscore');
'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    var config = {
        src: 'src',
        dist: 'dist',
        buildDev: 'build/dev',
        buildDist: 'build/dist',
        filesToCopy: [
            // for performance we only match one level down: 'test/spec/{,*/}*.js'
            // if you want to recursively match all subfolders: 'test/spec/**/*.js'
            '{,*/}*.{gif,jpeg,jpg,png,webp,gif,ico}',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
        ],
        jsToBuild: ['scripts/main.js'],
        lessToBuild: ['styles/main.less']
    };
    var makeFilesObj = function(fileNames, buildDir, srcDir) {
        return _.object(_.map(fileNames, function(fileName) {
            return [buildDir + '/' + fileName, srcDir + '/' + fileName];
        }));
    };
    config.jsFilesDev =    makeFilesObj(config.jsToBuild, config.buildDev, config.src);
    config.jsFilesDist =   makeFilesObj(config.jsToBuild, config.buildDist, config.src);
    config.lessFilesDev =  makeFilesObj(config.lessToBuild, config.buildDev, config.src);
    config.lessFilesDist = makeFilesObj(config.lessToBuild, config.buildDist, config.src);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,

        clean: { // clean out old files from build folders
            dev: {
                files: [{
                    dot: true,
                    src: ['<%%= config.buildDev %>/*', '!<%%= config.buildDev %>/.git*']
                }]
            },
            dist: {
                files: [{
                    dot: true,
                    src: ['<%%= config.buildDist %>/*', '!<%%= config.buildDist %>/.git*']
                }]
            }
        },

        copy: { // copy static asset files from src/ to build/[dev or dist]
            dev: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: config.src,
                        dest: config.buildDev,
                        src: config.filesToCopy
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: config.src,
                        dest: config.buildDist,
                        src: config.filesToCopy
                    }
                ]
            }
        },

        browserify: { // bundle JS with browserify
            dev: {
                options: { bundleOptions: { debug: true } },
                files: config.jsFilesDev
            },
            dist: {
                files: config.jsFilesDist
            }
        },

        less: { // compile LESS to CSS
            dev: {
                files: config.lessFilesDev
            },
            dist: {
                files: config.lessFilesDist
            }
        },

        htmlbuild: { // replace tags in index.html to point to minified or built js/css
            dev: {
                src: '<%%= config.buildDev %>/index.html',
                dest: '<%%= config.buildDev %>/',
                options: {
                    beautify: true,
                    scripts: { js: '<%%= config.buildDev %>/scripts/main.js' },
                    styles: { css: '<%%= config.buildDev %>/styles/main.css' }
                }
            },
            dist: {
                src: '<%%= config.buildDist %>/index.html',
                dest: '<%%= config.buildDist %>/',
                options: {
                    scripts: { js: '<%%= config.buildDist %>/scripts/main.js' },
                    styles: { css: '<%%= config.buildDist %>/styles/main.css' }
                }
            }
        },

        connect: { // web server for serving files from dist/
            dev: {
                options: {
                    port: '<%= devPort %>',
                    base: '<%%= config.buildDev %>'
                }
            },
            dist: {
                options: {
                    port: '<%= devPort %>',
                    base: '<%%= config.buildDist %>'
                }
            }
        },

        watch: {
            grunt: {
                files: 'Gruntfile.js' // reload Gruntfile when it changes
            },
            less: {
                files: '<%%= config.src %>/styles/*.less',
                tasks: ['less:dev']
            },
            browserify: {
                files: '<%%= config.src %>/scripts/**/*.js',
                tasks: ['browserify:dev']
            },
            copy: {
                files: [
                    '<%%= config.src %>/{,*/}*.{gif,jpeg,jpg,png,webp,gif,ico}',
                    '<%%= config.src %>styles/fonts/{,*/}*.*'
                ],
                tasks: ['copy:dev']
            },
            html: {
                files: '<%%= config.src %>/**/*.html',
                tasks: ['buildDev']
            }
        }
    });


    grunt.registerTask('buildDev', [
        'clean:dev',      // clean old files out of build/
        'copy:dev',       // copy static asset files from app/ to build/dev
        'browserify:dev', // bundle JS with browserify
        'less:dev',       // compile LESS to CSS
        'htmlbuild:dev'   // replace tags in index.html to point to built js/css
    ]);

    grunt.registerTask('debug', [
        'buildDev',
        'connect:dev',     // web server for serving files from build/dev
        'watch'            // watch src files for changes and rebuild when necessary
    ]);
    grunt.registerTask('serve', ['debug']);
};