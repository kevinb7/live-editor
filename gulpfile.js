var http = require("http");
var zlib = require("zlib");
var fs = require("fs");

var gulp = require("gulp");

var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var newer = require("gulp-newer");
var changed = require("gulp-changed");
var handlebars = require("gulp-handlebars");
var defineModule = require("gulp-define-module");
var declare = require("gulp-declare");
var runSequence = require("run-sequence");
var mochaPhantomJS = require("gulp-mocha-phantomjs");
var staticServe = require("node-static");
var request = require("request");

var paths = require("./build-paths.json");

// place the build files in live-editor-server so that they get deployed
var buildDir = "external/live-editor-server/live-editor/build/";

var updatePaths = function(paths) {
    return paths.map(function (path) {
        if (path.indexOf("build/") === 0) {
            return path.replace("build/", buildDir);
        } else {
            return path;
        }
    });
};

gulp.task("templates", function() {
    gulp.src(updatePaths(paths.templates))
        .pipe(changed(buildDir + "/tmpl", {extension: ".js"}))
        .pipe(handlebars({
            handlebars: require("handlebars")
        }))
        .pipe(defineModule("plain"))
        .pipe(declare({
            namespace: "Handlebars.templates"
        }))
        .pipe(gulp.dest(buildDir + "tmpl"));
});

var scriptTypes = Object.keys(paths.scripts);

scriptTypes.forEach(function(type) {
    gulp.task("script_" + type, ["templates"], function() {
        var outputFileName = "live-editor." + type + ".js";
        return gulp.src(updatePaths(paths.scripts[type]))
            .pipe(newer(buildDir + "js/" + outputFileName))
            .pipe(concat(outputFileName))
            .pipe(gulp.dest(buildDir + "js"));
    });

    gulp.task("script_" + type + "_min", ["script_" + type], function() {
        var outputFileName = "live-editor." + type + ".min.js";
        return gulp.src([buildDir + "js/live-editor." + type + ".js"])
            .pipe(newer(buildDir + "js/" + outputFileName))
            .pipe(uglify())
            .pipe(concat(outputFileName))
            .pipe(gulp.dest(buildDir + "js"));
    });
});

gulp.task("scripts", scriptTypes.map(function(type) {
    return "script_" + type;
}));

gulp.task("scripts_min", scriptTypes.map(function(type) {
    return "script_" + type + "_min";
}));

gulp.task("workers", function() {
    gulp.src(paths.workers_webpage)
        .pipe(gulp.dest(buildDir + "workers/webpage"));

    gulp.src(paths.workers_pjs)
        .pipe(gulp.dest(buildDir + "workers/pjs"));

    gulp.src(paths.workers_shared)
        .pipe(gulp.dest(buildDir + "workers/shared"));
});

gulp.task("externals", function() {
    gulp.src(paths.externals, {base: "./"})
        .pipe(gulp.dest(buildDir));
});

var styleTypes = Object.keys(paths.styles);

styleTypes.forEach(function(type) {
    gulp.task("style_" + type, function() {
        var outputFileName = "live-editor." + type + ".css";
        return gulp.src(paths.styles[type])
            .pipe(newer(buildDir + "css/" + outputFileName))
            .pipe(concat(outputFileName))
            .pipe(gulp.dest(buildDir + "css"));
    });
});

gulp.task("styles", styleTypes.map(function(type) {
    return "style_" + type;
}));

gulp.task("fonts", function() {
    gulp.src(paths.fonts)
        .pipe(gulp.dest(buildDir + "fonts"));
});

gulp.task("images", function() {
    gulp.src(paths.images)
        .pipe(gulp.dest(buildDir + "images"));
});

gulp.task("watch", function() {
    scriptTypes.forEach(function(type) {
        gulp.watch(updatePaths(paths.scripts[type]), ["script_" + type]);
    });

    // Run output tests when the output code changes
    gulp.watch(updatePaths(paths.scripts.output), ["test"]);
    gulp.watch(updatePaths(paths.scripts.output_pjs)
        .concat(["tests/output/pjs/*"]), ["test_output_pjs"]);
    gulp.watch(updatePaths(paths.scripts.output_webpage)
        .concat(["tests/output/webpage/*"]), ["test_output_webpage"]);
    // TODO(bbondy): Uncomment when PhantomJS has support for typed arrays
    // gulp.watch(paths.scripts.output_sql
    //    .concat(["tests/output/sql/*"]), ["test_output_sql"]);
    gulp.watch(updatePaths(paths.scripts.tooltips)
        .concat(["tests/tooltips/*"]), ["test_tooltips"]);

    styleTypes.forEach(function(type) {
        gulp.watch(updatePaths(paths.styles[type]), ["style_" + type]);
    });

    gulp.watch(updatePaths(paths.templates), ["templates"]);

    gulp.watch(paths.workers_pjs.concat(paths.workers_webpage)
        .concat(paths.workers_shared), ["workers"]);

    // ignore images to keep deploy size small
    //gulp.watch(paths.images, ["images"]);
});

var runTest = function(fileName) {
    return function() {
        // We need to set up a server to host the content
        // Unfortunately we can't just run it from a file:// url
        // as web workers don't like working in that way.
        var fileServer = new staticServe.Server("./");
        var server = http.createServer(function(req, res) {
            req.addListener("end", function() {
                fileServer.serve(req, res);
            }).resume();
        });
        server.listen(11537);

        // We then run the Mocha tests in a headless PhantomJS
        var stream = mochaPhantomJS();
        stream.write({
            path: "http://localhost:11537/tests/" + fileName
        });
        stream.end();
        stream.on("finish", function() {
            server.close();
        });

        // Returning the stream lets Gulp know when the tests have
        // finished running.
        return stream;
    };
};

gulp.task("test_output_pjs", ["script_output_pjs"],
    runTest("output/pjs/index.html"));

gulp.task("test_output_webpage", ["script_output_webpage"],
    runTest("output/webpage/index.html"));

// TODO(bbondy): Uncomment when phantomJS has support for typed arrays
// gulp.task("test_output_sql", ["script_output_sql"],
//    runTest("output/sql/index.html"));

gulp.task("test_tooltips", ["script_tooltips"],
    runTest("tooltips/index.html"));

// NOTE(jeresig): We don't bundle this data as it's kind of big. Better to
// download it dynamically, when we need it.
var recordDataURL = "https://s3.amazonaws.com/ka-cs-scratchpad-audio/" +
    "tests/recording-data.json.gz";
var recordDataFile = "tests/record/recording-data.json";

gulp.task("test_record_data", function(done) {
    if (fs.existsSync(recordDataFile)) {
        return done();
    }

    return request(recordDataURL)
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(recordDataFile));
});

// NOTE(jeresig): Not included in the main tests yet, as they take a
// long time to run.
gulp.task("test_record", ["test_record_data"],
    runTest("record/index.html"));

gulp.task("test", function(callback) {
    // test_output_sql is intentionally left out for now until
    // phantomJS has support for typed arrays
    runSequence("test_output_pjs", "test_output_webpage", "test_tooltips", callback);
});

//gulp.task("default", ["watch", "templates", "scripts", "workers", "styles",
//    "fonts", "images", "externals"]);

gulp.task("default", ["watch", "templates", "scripts", "workers", "styles",
    "fonts", "externals"]);  // ignore images to keep deploy size small
