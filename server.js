// const { createServer } = require("https");
// const { parse } = require("url");
// const next = require("next");
// const fs = require("fs");
// const port = 443;
// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// const httpsOptions = {
//   //key: fs.readFileSync("/etc/letsencrypt/live/truyenfun.vn/privkey1.pem"),
//   //cert: fs.readFileSync("/etc/letsencrypt/live/truyenfun.vn/cert1.pem")
//   key: fs.readFileSync("./certificates/privkey1.pem"),
//   cert: fs.readFileSync("./certificates/cert1.pem"),
// };

// app.prepare().then(() => {
//   createServer(httpsOptions, (req, res) => {
//     //const parsedUrl = parse(req.url, true);
//     //handle(req, res, parsedUrl);
//     if (req.url.startsWith("/api")) {
//       return handle(req, res);
//     } else {
//       return handle(req, res);
//     }
//   }).listen(port, (err) => {
//     if (err) throw err;
//     console.log("ready - started server on url: https://localhost:" + port);
//   });
// });
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
