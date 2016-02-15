var gulp = require('gulp');
var zip = require('gulp-zip');
var args = require('yargs').argv;
var wiredep = require('wiredep');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var inquirer = require('inquirer');

var dest = args.template;

gulp.task('zip', function(){
	return gulp.src('www/*')
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

function getTemplateTypes() {
    var folderArr = [];
    gulp.src('templates/*')

}

gulp.task('inquirerOne', function(done){
    inquirer.prompt({
        name: 'templateType',
    	type: 'list',
        message: 'Which template would you like to use?',
        choices: ['dv', 'c', 'ss', 'ui'], // needs to be dynamic
    }, function(ans) {

            console.log("Type :: ", ans.templateType);

    	//if (ans.templateType) {
    		//return template(ans.templateType);
    	//}
    });
});

gulp.task('inquirerTwo', ['inquirerOne'], function(done){
    inquirer.prompt({

            name: 'templateNum', 
            message: 'Which type?',
            choices: ['ui-1', 'ui-2'], 
            type: 'list'
        
        }, function(ans){
            console.log(ans.templateType);
            done();
        });
});


gulp.task('default', ['inquirerOne', 'inquirerTwo']);