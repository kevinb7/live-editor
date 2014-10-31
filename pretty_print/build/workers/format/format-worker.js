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

        importScripts(event.data.externalsDir +
            "ast-walker/src/walker.js?cachebust=" + (new Date()).toDateString());

        importScripts(event.data.externalsDir +
            "jsonpath/lib/jsonpath.js?cachebust=" + (new Date()).toDateString());
    }

    var output;
    var cursorPosition = event.data.cursorPosition;

    if (event.data.formatter === "esformatter") {
        var options = {
            "preset": "default",
            "indent": {
                "value": "    "
            }
        };

        output = esformatter.format(event.data.code, options);
        cursorPosition = {
            row: 1,
            column: 0
        };
    } else if (event.data.formatter === "escodegen") {
        var ast = esprima.parse(event.data.code, { range: true, tokens: true, comment: true, loc: true });

        var path = "$";
        var cursorNode = ast;

        var walker = new Walker();
        walker.enter = function (node, name) {
            if (name !== "program") {
                path += "." + name;
                cursorNode = node;
            }
        };
        walker.shouldWalk = function (node) {
            var loc = node.loc;
            var line = cursorPosition.row;
            var column = cursorPosition.column;

            if (line >= loc.start.line && line <= loc.end.line) {
                if (line === loc.start.line && column < loc.start.column) {
                    return false;
                }
                if (line === loc.end.line && column > loc.end.column) {
                    return false;
                }
                return true;
            } else {
                return false;
            }
        };

        walker.walk(ast, "program");

        ast = escodegen.attachComments(ast, ast.comments, ast.tokens);
        output = escodegen.generate(ast, { comment: true });

        // parse the output so we can get the location of the cursor
        // after pretty printing
        ast = esprima.parse(output, { loc: true });
        cursorNode = jsonPath.eval(ast, path)[0];

        if (cursorNode) {
            var end = cursorNode.loc.end;
            cursorPosition = {
                row: end.line,
                column: end.column
            };
        }
    }

    // Return the JSHint results to the main code
    self.postMessage({
        type: "format",
        code: output,
        cursorPosition: cursorPosition
    });
};
