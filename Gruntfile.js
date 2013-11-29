var fs     = require('fs');
var path   = require('path');
var os     = require('os');
var rimraf = require('rimraf');

var buildPath = 'bin';

module.exports = function(grunt) {

  // Resource Paths //
  var package = grunt.file.readJSON('package.json');
  
  // Project configuration.
  grunt.initConfig({
    pkg : package,
    exec: remoteDependencies(),
    uglify : {
      options : {
        banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build : {
        src : 'app/js/main.js',
        dest : buildPath + '/js/<%= pkg.name %>-' + package.version + '.min.js'
      }
    },
    copy: {
      build: {
        cwd: 'app',
        src: [ '**', '!**/*.less', '!test', '!**/*.js' ],
        dest: 'bin',
        expand: true
      },
    },
    nodewebkit: {
      options: {
          build_dir: buildPath, 
          mac: true,      
          win: false,      
          linux32: false, 
          linux64: true   
      },
      src: ['bin/**/*']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  
  grunt.registerTask('clean', 'remove the bin folder', function() {
    rimraf.sync(path.join(__dirname, buildPath));
  });
  
  // Default task(s).
  grunt.registerTask('default', [ 'clean', 'uglify', 'copy', 'nodewebkit']);


};

var remoteDependencies = function () {
  var deps = {};
  
  return { 
  
  };
};