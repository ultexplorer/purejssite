'use strict';

const fs = require('node:fs');
const path = require('node:path');
const v8 = require('node:v8');
const { promisify } = require('../utils')
const PATH = `${__dirname}/sessions`;

const safePath = fn => (token, ...args) => {
    return new Promise((resolve, reject) => {
        if(typeof token !== 'string'){
            reject(new Error('Wrong token!'))
        }
        const fileName = path.join(PATH, token);
        if(!fileName.startsWith(PATH)){
            reject(new Error('Wrong token!'))
        }
        const result = fn(fileName, ...args);
        resolve(result);
    })
}

const promiseReadFile = promisify(fs.readFile);
const promiseWriteFile = promisify(fs.writeFile);
const promiseDeleteFile = promisify(fs.unlink);

const readSession = safePath(promiseReadFile);
const writeSession = safePath(promiseWriteFile);
const deleteSession = safePath(promiseDeleteFile);


class Storage extends Map {
    async get(key) {
        const value = super.get(key);
        if (value) {
            return value;
        }
        const data = await readSession(key)
        console.log(`Session loaded: ${key}`);
        const session = v8.deserialize(data);
        super.set(key, session);
        return session;
        };

    async save(key){
        const value = super.get(key);
        if(value){
            const data = v8.serialize(value)
            await writeSession(key, data);
            console.log(`Session saved: ${key}`);
        }
    }

    async delete(key){
        await deleteSession(key);
    }
}


/*
const storage = new Storage();
(async ()=>{
    storage.set('test', 'one two three')
    //console.log(storage)
    await storage.save('test')
    const result = await storage.get('test')
    console.log(result)
    storage.delete('test')
})()*/

module.exports = new Storage()