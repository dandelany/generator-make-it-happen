module.exports = function(grunt) {

    var config = {
        src: 'src',
        dist: 'dist',
        data: 'data/data',
        buildDev: 'build/dev',
        buildDist: 'build/dist',
        filesToCopy: [
            '{,*/}*.{gif,jpeg,jpg,png,webp,gif,ico}',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
        ]
    };

};