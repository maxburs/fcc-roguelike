module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            files: ['src/*.js', 'src/*.scss'],
            tasks: ['babel', 'sass']
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "js/fcc-roguelike.js": "src/fcc-roguelike.js"
                }
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'fcc-roguelike.css': 'src/fcc-roguelike.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('default', ['babel', 'sass']);
};