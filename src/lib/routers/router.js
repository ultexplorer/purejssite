const routerStatic = require("./routerStatic");
const routerPost = require('./routerPost')
const router = async (client) => {
    await routerPost(client);
    await routerStatic(client);
}

module.exports = router