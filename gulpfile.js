const gulp = require ('gulp');
const browserSync = require ('browser-sync').create();
const prettify = require ('gulp-jsbeautifier');
const sass = require ('gulp-sass');
const pump = require ('pump');
const concat = require ('gulp-concat');
const autoprefixer = require ('gulp-autoprefixer');
const imagemin = require ('gulp-imagemin');
const uglify = require ('gulp-uglify');
const cleanCSS = require ('gulp-clean-css');
const babel = require ('gulp-babel');

gulp.task('sync', () => {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });

    gulp.watch("./src/**/*.*").on('change', browserSync.reload);
});

gulp.task('sass', () => gulp.src('./src/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
);

gulp.task('sass:watch', () => gulp.watch('./src/scss/**/*.scss', ['sass'])
);

gulp.task('prettify', () => gulp.src([
        './src/css/*.css',
        './src/*.html',
        './src/js/*.js'
    ])
    .pipe(prettify({debug: true}))
    .pipe(gulp.dest('./build/prettify'))
);

gulp.task('babel-js', () => {
    return gulp.src('./build/prettify/*.js')
        .pipe(babel({ presets: ['es2015']}))
        .pipe(uglify({ compress: true }))
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('prefixer-css', () => gulp.src('./build/prettify/*.css')
    .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./build/css'))
);

gulp.task('clean-css', () => gulp.src('./src/build/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build/css'))
);

gulp.task('minify-img', () => gulp.src('./src/img/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img'))
);

gulp.task('server', ['sync', 'sass', 'sass:watch']);
gulp.task('build', ['prettify', 'clean-css', 'prefixer-css', 'babel-js', 'minify-img']);