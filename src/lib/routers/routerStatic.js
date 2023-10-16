

const {prepareFile, MIME_TYPES} = require("../static-modules/static-functions");
const routerStatic = async (client) => {
    const { req, res } = client;
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    client.objectHeaders.objectStatusCode = statusCode;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    //obj['Content-Type'] = mimeType;
    client.objectHeaders.obj['Content-Type'] = mimeType;
    //
    //res.writeHead(statusCode, mimeType);
    client.sendCookie();

    console.log('routerStatic');

    //res.writeHead(statusCode, obj)
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
}

module.exports = routerStatic;