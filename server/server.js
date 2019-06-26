const app = require('express')();
const http = require('http').createServer(app);
const io = module.exports.io = require('socket.io')(http);

const PORT = 8080;

const Socket = require('./Socket');

io.on('connection', Socket);

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});