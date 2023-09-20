const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const port = 443;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  //key: fs.readFileSync("/etc/letsencrypt/live/truyenfun.vn/privkey1.pem"),
  //cert: fs.readFileSync("/etc/letsencrypt/live/truyenfun.vn/cert1.pem")
  key: fs.readFileSync("./certificates/privkey1.pem"),
  cert: fs.readFileSync("./certificates/cert1.pem"),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    //const parsedUrl = parse(req.url, true);
    //handle(req, res, parsedUrl);
    if (req.url.startsWith("/api")) {
      return handle(req, res);
    } else {
      return handle(req, res);
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log("ready - started server on url: https://localhost:" + port);
  });
});
