/* Provides pretty-printing functionality */
window.ScratchpadTidy = {

    init: function (options) {
        var liveEditor = options.liveEditor;
        var editor = options.editor;
        var worker = new Worker(options.workersDir + "tidy/tidy-worker.js");
        var idle = true;

        // TODO:
        // - put up overlay when formatting the code
        // - scroll so that the line the cursor was on is visible
        // - put the cursor back to its original location after formatting

        worker.addEventListener("message", function (e) {
            if (e.data.type === "tidy") {
                editor.session.doc.setValue(e.data.code);
                var position = e.data.cursorPosition;
                position.row--;
                editor.moveCursorToPosition(position);
            }
            idle = true;
        });

        liveEditor.$el.find("#tidy-code").click(function () {
            var position = editor.getCursorPosition();
            position.row++;

            if (idle) {
                idle = false;
                worker.postMessage({
                    externalsDir: options.externalsDir,
                    code: editor.session.doc.getValue(),
                    cursorPosition: position
                });
            }
        });
    }
};
