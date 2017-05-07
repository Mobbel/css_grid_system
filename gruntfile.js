module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    wiredep: {
      task: {
        src: 'index.html'
      }
    },
    tags: {
	    buildLinks: {
	      options: {
			    linkTemplate: '<link rel="stylesheet" type="text/css" href="{{ path }}" media="screen"/>',
	        openTag: '<!-- start css template tags -->',
	        closeTag: '<!-- end css template tags -->'
	      },
	      src: [
	        'styles/**/*.css'
	      ],
	      dest: 'index.html'
	    }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['**/*.scss'],
          dest: 'styles',
          ext: '.css'
        }]
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
            browsers: [
              'last 5 versions',
              'ie 9'
            ]
          })
        ]
      },
      dist: {
        src: 'styles/*.css'
      }
    }
  });

  grunt.registerTask('default', [
    'wiredep',
    'sass',
    'postcss',
    'tags'
  ]);
  grunt.registerTask('build', [
    'wiredep',
    'jshint',
    'tslint',
    'ts:development',
    'sass',
    'postcss',
    'tags'
  ]);

};
