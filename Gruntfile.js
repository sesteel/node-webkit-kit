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
    clean: [buildPath+"/css", 
            buildPath+"/html", 
            buildPath+"/js", 
            buildPath+"/node_modules", 
            buildPath+"/res",
            buildPath+"/releases"],
    uglify : {
      options : {
        banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle : true
      },
      compress: {
        global_defs: {
          "DEBUG": false
        },
        dead_code: true
      },
      build : {
        src : 'app/**/*.js',
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
    less: {
      development: {
        options: {
          paths: ['app/css']
        },
        files: {
          'bin/css/style.css': 'app/css/style.less'
        }
      },
      production: {
        options: {
          paths: ['app/css'],
          cleancss: true
        },
        files: {
          'bin/css/style.css':'app/css/style.less'
        }
      }
    },
    nodewebkit: {
      options: {
          version:     '0.8.0',
          app_name:    '<%= pkg.name %>',
          app_version: '<%= pkg.version %>',
          build_dir:   buildPath, 
          mac:         true,      
          win:         false,      
          linux32:     false, 
          linux64:     true   
      },
      src: ['bin/**/*']
    },
    plato: {
      reports: {
        options : {
          exclude: /\.[0-9]+\.js$/,
          complexity : {
            logicalor :  true,
            switchcase : true,
            forin :      true,
            trycatch :   true
          }
        },
        files: {
          'reports': ['app/js/**/*.js'],
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-plato');
  grunt.registerTask('default', ['clean', 'less', 'uglify', 'copy', 'nodewebkit']);
  grunt.registerTask('release', ['nodewebkit']);
  grunt.registerTask('reports', ['plato']);
  grunt.registerTask('travis',  ['clean', 'less', 'uglify', 'copy', 'nodewebkit', 'plato']);
};

var remoteDependencies = function () {
  var deps = {};
  
  return { 
  
  };
};