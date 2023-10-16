'use strict'

const http = require('node:http');
const router = require('./lib/routers/router')
const PORT = 8000;

const Client = require('./lib/cookies/client.js');
const Session = require('./lib/cookies/session.js');


const server = http.createServer(async (req, res) => {
    const client = await Client.getInstance(req, res);
    const { method, url, headers } = req;
    console.log(`${method} ${url} ${headers.cookie}`);

    res.on('finish', () => {
        if (client.session) client.session.save();
    });
    await router(client);
})

const start = async () => {
    try{
        await server.listen(PORT, () => console.log(`Server is listening ${PORT}`))
    }catch(err){
        console.log(err);
    }
}

(async ()=>{
    await start();
})()