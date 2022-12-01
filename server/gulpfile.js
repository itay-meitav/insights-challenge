const gulp = require("gulp");
const clean = require("gulp-clean");
const { exec } = require("child_process");

function execLog(command = "", cb = undefined) {
  const process = exec(command, cb);
  process.stdout.on("data", console.log);
  process.stdout.on("error", console.log);
}

// Removes previous dist
gulp.task("start", () => {
  return gulp
    .src(["./dist"], {
      allowEmpty: true,
    })
    .pipe(clean());
});

// Transfers static files
gulp.task("static", () => {
  return gulp
    .src(["src/**/*", "!src/**/*.ts", "!src/**/*.scss"], { allowEmpty: true })
    .pipe(gulp.dest("./dist/"));
});

// Watch static files
gulp.task("watch-static", () => {
  return gulp.watch(
    ["src/**/*", "!src/**/*.ts", "!src/**/*.scss"],
    gulp.series("static")
  );
});

// Initial ts compile
gulp.task("tsc", (cb) => {
  execLog("tsc", cb);
});

// Watch ts files and recompile
gulp.task("tsc-w", () => {
  execLog("tsc -w");
});

// start nodemon
gulp.task("nodemon", () => {
  execLog("nodemon dist/server");
});

// if we'll want to integrate react with the api on the same server
gulp.task("react", (cb) => {
  execLog("cd ../client && npm run build && cp -r build ../server/deploy", cb);
});

gulp.task("clean-deploy", () => {
  return gulp
    .src(["./deploy"], {
      allowEmpty: true,
    })
    .pipe(clean());
});

gulp.task("copy-dist-to-deploy", () => {
  return gulp.src(["./dist/**/*"]).pipe(gulp.dest("./deploy"));
});

gulp.task("copy-node-to-deploy", () => {
  return gulp
    .src(["./package.json", "./package-lock.json", "./.gitignore"])
    .pipe(gulp.dest("./deploy"));
});

gulp.task("build", gulp.series("start", "static", "tsc"));

// Run all together
gulp.task(
  "default",
  gulp.series("build", gulp.parallel("watch-static", "tsc-w", "nodemon"))
);

gulp.task(
  "deploy",
  gulp.series(
    "build",
    "clean-deploy",
    "copy-dist-to-deploy",
    "copy-node-to-deploy",
    "react"
  )
);
