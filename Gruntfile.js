module.exports = function (grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: 'assets/scss/**/*.scss',
        tasks: ['sass', 'postcss']
      },
      svg: {
        files: 'assets/images/svg/*.svg',
        tasks: ['svgstore']
      },
        js: {
            files: 'assets/js/*.js',
            tasks: ['uglify']
        }
    },
    sass: {
        options: {
            sourceMap: true,
            outputStyle: 'compressed'
        },
        dist: {
            files: {
                'public_html/assets/style.css': 'assets/scss/main.scss'
            }
        }
    },
      postcss: {
          options: {
              map: {
                  inline: false, // save all sourcemaps as separate files...
                  annotation: 'dist/css/maps/' // ...to the specified directory
              },

              processors: [
                  require('pixrem')(), // add fallbacks for rem units
                  require('autoprefixer-core')({browsers: 'last 2 versions'}), // add vendor prefixes
                  require('cssnano')() // minify the result
              ]
          },
          dist: {
              src: 'public_html/assets/style.css'
          }
      },//postcss
      uglify: {
          my_target: {
              files: {
                  'public_html/assets/js/main.js': [
                      'assets/js/main.js'
                  ]
              }
          }
      },
      browserSync: {
          dev: {
              bsFiles: {
                  src : [
                      'public_html/assets/css/style.css',
                      'craft/templates/**/*.html'
                  ]
              },
              options: {
                  proxy: 'diffusion.craft.dev',
                  watchTask: true
              }
          }
      }
  });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-postcss');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['browserSync', 'watch']);

};