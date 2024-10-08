
// Local tester for the function with http
import http from 'http';
import { handler } from './index.mjs';
const port = 3500;

const requestListener = async function (req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const lambdaEvent = {
      version: '2.0',
      routeKey: '$default',
      rawPath: req.url,
      rawQueryString: '',
      headers: req.headers,
      requestContext: {
        domainName: req.headers.host || '',
        http: {
          method: req.method,
          path: req.url,
          protocol: req.httpVersion,
          sourceIp: req.connection.remoteAddress,
          userAgent: req.headers['user-agent'] || 'PostmanRuntime/7.41.1'
        },
        time: new Date().toISOString(),
        timeEpoch: Date.now()
      },
      body: body,
      isBase64Encoded: false
    };

    try {
      const response = await handler(lambdaEvent);
      res.writeHead(response.statusCode, response.headers);
      res.end(response.body);
    } catch (error) {
      console.error(error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  });
};

const server = http.createServer(requestListener);
server.listen(port);

console.log(`Server is running on port ${port}`);
