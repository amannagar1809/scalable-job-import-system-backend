const http = require('http');
const env = require('./config/env.js');
const app =  require('./app.js');
const { initializeSocket } = require('./services/socket.service.js');

const server = http.createServer(app);
initializeSocket(server);

const PORT = env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});