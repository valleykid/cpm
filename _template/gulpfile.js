var fs=require("fs"),gulp=require("gulp"),plugins=require("gulp-load-plugins")(),config=require("./package.json"),browserSync=require("browser-sync"),reload=browserSync.reload,sass=require("gulp-sass"),group=require("./gulp-group"),path={js:config.jsfile||["src/**/*.js"],css:config.cssfile||["src/**/*.css","src/**/*.scss"],gulp:["./gulpfile.source.js","./gulp-group.source.js"]};gulp.task("server",function(){browserSync.init({port:config.port||16898,server:{baseDir:"./"}}),gulp.watch(["index.html","style/**/*.css","index.js","test/**/*"],{cwd:"./"},reload)}),gulp.task("img",function(){return gulp.src(["src/css/img/*"]).pipe(plugins.copy("./style",{prefix:2})).pipe(plugins.notify({message:"Img task complete"}))}),gulp.task("jsindex",function(){return gulp.src(path.js).pipe(group(config)).pipe(plugins.concat("index.js")).pipe(gulp.dest("./")).pipe(plugins.uglify()).pipe(plugins.rename({extname:".min.js"})).pipe(gulp.dest("./")).pipe(plugins.notify({message:"JS task complete"}))}),gulp.task("cssindex",function(){return gulp.src(path.css).pipe(plugins.concat("index.scss")).pipe(group(config,"css")).pipe(sass().on("error",sass.logError)).pipe(gulp.dest("./style")).pipe(plugins.cssmin()).pipe(plugins.rename({extname:".min.css"})).pipe(gulp.dest("./style")).pipe(plugins.notify({message:"CSS task complete"}))}),gulp.task("build",function(){return gulp.src(["style/**/*","./index.js","./index.min.js"]).pipe(plugins.copy("./"+config.version,{prefix:0}))}),gulp.task("jsmin",function(){return gulp.src(path.gulp).pipe(plugins.uglify()).pipe(plugins.rename(function(s){s.basename=s.basename.replace(/\.source/,"@")})).pipe(gulp.dest("./"))}),gulp.task("watch",function(){gulp.watch(path.js,["jsindex"]),gulp.watch("src/*.tpl",["jsindex"]),gulp.watch(path.css,["cssindex"]),gulp.watch(path.gulp,["jsmin"])}),gulp.task("file",["img","jsindex","cssindex"]),gulp.task("sync",["watch","server"]),gulp.task("default",["file","watch","server"]);