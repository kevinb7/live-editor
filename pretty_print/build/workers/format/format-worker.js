var init = false;

self.onmessage = function(event) {
    // We don't import JSHint on load as we need to know which language
    // the user is visiting the site in. If there is no language then
    // we just use the normal file.
    if (!init) {
        init = true;

        importScripts(event.data.externalsDir +
            "escodegen/escodegen.browser.js?cachebust=" + (new Date()).toDateString());

        importScripts(event.data.externalsDir +
            "structuredjs/external/esprima.js?cachebust=" + (new Date()).toDateString());

        importScripts(event.data.externalsDir +
            "esformatter/esformatter.js?cachebust=" + (new Date()).toDateString());
    }

    var output, options;

    if (event.data.formatter === "esformatter") {
        options = {
            "preset": "default",
            "indent": {
                "value": "    "
            }
        };
        output = esformatter.format(event.data.code, options);
    } else if (event.data.formatter === "escodegen") {
        options = {
            comment: true
        };
        var ast = esprima.parse(event.data.code, options);
        output = escodegen.generate(ast, options);
    }

    // Return the JSHint results to the main code
    self.postMessage({
        type: "format",
        code: output
    });
};
