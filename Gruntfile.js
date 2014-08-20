/**
 * Created by Marcin on 2014-08-16.
 */

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['tests/**/*.js']
      }
    } // beautifier
  });

  grunt.registerTask('default', 'mochaTest');
};