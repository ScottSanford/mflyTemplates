var gulp = require('gulp');
var zip = require('gulp-zip');
var args = require('yargs').argv;
var wiredep = require('wiredep');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var inquirer = require('inquirer');
var dirTree = require('directory-tree');


var dest = args.template;

gulp.task('inquirer', function(done){
    
    var tree = dirTree.directoryTree('templates/', ['.js', '.html']);
    var treeArr = tree.children;

    var firstArray = treeArr.map(function(obj){
        var rObj = {};
        rObj['name'] = obj.name;
        rObj['value'] = obj.name;
        return rObj;
    });    



    inquirer.prompt([
        {
            name: 'category', 
            message: 'Which category?', 
            type: 'list', 
            choices: firstArray
        },
        {
            name: 'type', 
            message: 'Which template in selected category?', 
            type: 'list', 
            choices: ['apple', 'banana']
        }, 
        {
            name: 'start', 
            message: 'Are you ready to create an mflyTemplate?', 
            type: 'confirm', 
            default: 'true'
        }
        ], function(ans) {
            
            for (var i = 0; i < treeArr.length; i++) {
                var children = treeArr[i].children;
                console.log(children);
            }
            done();

    });
});

gulp.task('zip', function(){
    return gulp.src('www/**')
        .pipe(zip('interactive.zip'))
        .pipe(gulp.dest('build'));
});

gulp.task('index', function(){
    var target = gulp.src('www/index.html');
    var sources = gulp.src('www/components/*/*.js', {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('www/'));
});

function template(templateType) {
   return gulp.src('templates/' + templateType + '/*')
        .pipe(gulp.dest('www/components/' + templateType + '/'));
};


gulp.task('default', ['inquirer']);