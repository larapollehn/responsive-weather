const concat = require('gulp-concat');
const minify = require('gulp-minify');
const gulp = require('gulp');

function build() {
    return gulp.src(
        ["public/model/cityNavItem.js",
            "public/model/cityTabPane.js",
            "public/model/cityTabPaneContent.js",
            "public/model/utils.js",
            "public/model/city.js",
            "public/controller/controller.js",
            "public/index.js"
        ])
        .pipe(concat('all.js'))
        .pipe(minify())
        .pipe(gulp.dest('./dist/'));
}

exports.default = build;