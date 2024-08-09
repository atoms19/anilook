
const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to get the content type based on file extension
const getContentType = (filePath) => {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
      return 'image/jpg';
    case '.ico':
      return 'image/x-icon';
    default:
      return 'application/octet-stream';
  }
};

// Function to serve static files
const serveStaticFile = (filePath, response) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {

        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('<h1>404 Not Found</h1>', 'utf-8');

      } else {
        response.writeHead(500, { 'Content-Type': 'text/html' });
        response.end(`<h1>500 Internal Server Error</h1><p>${err.message}</p>`, 'utf-8');
      }
    } else {
     
      response.writeHead(200, { 'Content-Type': getContentType(filePath) });
      response.end(data, 'utf-8');
    }
  });
};

const server = http.createServer((req, res) => {
  
    let filePath = path.join(__dirname, !req.url.includes('.') ? 'index.html' : req.url);

    serveStaticFile(filePath, res);

});


const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});