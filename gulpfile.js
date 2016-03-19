var gulp = require('gulp');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


gulp.task('lint', function() {
    return gulp.src('src/http.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('js', function() {
    return gulp.src('src/http.js')
        .pipe(uglify())
        .pipe(concat('http.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/http.js', ['lint', 'js']);
});

gulp.task('default', ['lint', 'js', 'watch']);
