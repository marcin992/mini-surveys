/**
 * Created by Marcin on 2014-08-16.
 */

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['tests/**/*.js']
      }
    },
    shell: {
      testDb: {
        command: 'mongod --dbpath C:\\users\\marcin\\development\\testDB --port 27018 &'
      }
    }
  });

  grunt.registerTask('default', 'mochaTest');
};