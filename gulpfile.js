/**
 * Created by mengchen on 2015/6/19.
 */
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("default", function() {
    gulp.src("src/mc-placeholder.js").
        pipe(uglify()).
        pipe(rename({suffix: '.min'})).
        pipe(gulp.dest("build"));
});