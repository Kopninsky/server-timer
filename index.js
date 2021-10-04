const http = require('http');

const PORT = process.env.PORT || 3000;
const TIMER = process.env.TIMER || 10000;
const INTERVAL = process.env.INTERVAL || 1000;

http
  .createServer((req, res) => {
    const timer = (timeout, interval) => {
      return new Promise((resolve, reject) => {
        const ticker = setInterval(() => {
          console.log((new Date().toUTCString()));
          res.write(new Date().toUTCString() + '\n');
        }, interval);

        setTimeout(() => {
          clearInterval(ticker);
          resolve(new Date().toUTCString());
        }, timeout);
      });
    };

    timer(TIMER, INTERVAL)
      .then(time => {
        console.log(`stopped at ${time}`);
        res.end(`stopped at ${time}`);
        process.exit();
      });
  })
  .listen(PORT, () => console.log('server is on ' + PORT));
