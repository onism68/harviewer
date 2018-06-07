// Process a request like
//   "http://harviewer.lan:3000/selenium/tests/testLoadHarAPIViewer.html"
// through the EJS renderer.
const path = require("path");

function mapRequestToView(viewRoot, req) {
    // Remove leading "/"
    const relativePath = req.path.substring(1);

    if (!relativePath.endsWith(".php")) {
        return null;
    }

    view = path.resolve(viewRoot, relativePath);

    return view;
}

function create(viewRoot, locals) {
    return function handleView(req, res, next) {
        const view = mapRequestToView(viewRoot, req);

        if (!view) {
            next();
            return;
        }

        res.render(view, locals, function(err, html) {
            if (!err) {
                res.send(html);
            } else {
                console.error(err);
                next();
            }
        });
    };
}

module.exports = create;
