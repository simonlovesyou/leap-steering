'use strict';
module.exports = grunt => {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    babel: {
      options: {
        presets: ['es2015']
      },
      client: {
        options: {
          sourceMap: true
        },
        files: [
        {
          expand: true, 
          cwd:'./src/', 
          src: ['**/*.js'], 
          dest: './dist/',
        }]
      }
    },
    clean: {
      public: ["dist/"]
    },
    watch: {
      options: {
        spawn: false,
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['babel']
      }
    },
  });

  grunt.registerTask('default', ['clean', 'babel']);
  grunt.registerTask('dev', ['clean', 'babel', 'watch']);
  grunt.registerTask('build', ['clean', 'babel']);
};