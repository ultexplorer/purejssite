module.exports = (req, res) => new Promise((resolve, reject) => {
    let buffer = [];
    req.on('data', chunk => {
        buffer.push(chunk);
    })
    req.on('end', () => {
        let result = buffer.toString();
        resolve(result)
    })
});