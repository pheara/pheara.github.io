
'use strict';

var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');


gulp.task('default', ['build']);
gulp.task('build', ['iconsprite']);


var svgSpriteConf = {
    shape : {
        dimension : {
            //default would be just 2
            precision: 4
        }
    },
    mode : {
        view : {
            //example: true //generates html with usage-demo

            /*
             Problem: Glitches in layouting where viewports show parts
             of adjacent svgs as well.
             Solution:
                * `root.shape.spacing.padding: 1` -> It has the side effect to make icons a bit
                  smaller which needs to be accounted for during styling. Margin would be
                  better but, alas, is not available.
                * `mode.view.layout: 'diagonal'` seems to be a better solution, which solves the issue for all
                  except adjacent rectangular icons.
             */
            layout: 'diagonal',

            //default would be './view'
            dest: '.',

            //instead of default 'svg/sprite.view.svg'
            sprite: 'sprite.generated.svg',

            // don't add a hash to the name (it's intended to
            // circumvent cache staleness, but makes referencing the sprite hard)
            bust: false
        }
    }
};
var assetsFolder = 'themes/custom/static/assets/'
gulp.task('iconsprite', function(done) {
    gulp.src('icons/*.svg', {cwd: assetsFolder})
        .pipe(svgSprite(svgSpriteConf))
        .pipe(gulp.dest(assetsFolder))
        .on('end', done);
});
