const { post, formStringToObject } = require('../httpMethods')

const Session = require("../cookies/session");


const routerPost = async (client) => {
    const { req, res } = client;
    const { url, method } = req;
    if(url === '/registration' && method === 'POST'){
        const string = await post(req, res);
        const o = await formStringToObject(string);
        const json = JSON.stringify(o);
        console.log('routerPost')
        Session.start(client);
        console.log(o)

        client.setCookie(o.username, o.userpassword)
        client.sendCookie();
        //res.writeHead(statusCode, obj)
        res.writeHead(client.objectHeaders.objectStatusCode, client.objectHeaders.obj);
        res.end('You have been registered!')
    }
}

module.exports = routerPost