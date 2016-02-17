var gulp = require('gulp'),
    browserSync = require('browser-sync').create();


gulp.task('css', function () {
    return gulp.src('src/**/*.css')
        .pipe(gulp.dest('prod/'));
});

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('prod/'));
});

gulp.task('js', function () {
    return gulp.src('src/**/*.js')
        .pipe(gulp.dest('prod/'));
});


gulp.task('watch', ['html', 'css', 'js'], 
    function(){
        browserSync.reload();
    });


gulp.task('serve', ['html', 'css', 'js'], function () {
    browserSync.init({
        server: {
            baseDir: './prod/'
        }
    });
    gulp.watch(
        'src/**/*',
        ['watch']
    )
});

gulp.task('dev', ['serve'], function () {});

gulp.task('default', ['css', 'html', 'js'], function () {});