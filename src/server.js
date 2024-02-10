const http = require("http");
const fs = require("fs");

const favicon = new Buffer.from(
  "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",
  "base64"
);

const delay = (ms) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms);
  });

const readFile = (path) =>
  new Promise(async (res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });

const server = http.createServer(async (request, response) => {
  // if (request.url === "/favicon.ico") {
  //   response.statusCode = 200;
  //   response.setHeader("Content-Length", favicon.length);
  //   response.setHeader("Content-Type", "image/x-icon");
  //   response.setHeader("Cache-Control", "public, max-age=2592000"); // expiers after a month
  //   response.setHeader(
  //     "Expires",
  //     new Date(Date.now() + 2592000000).toUTCString()
  //   );
  //   response.end(favicon);
  //   return;
  // }

  switch (request.url) {
    case "/favicon.ico": {
      fs.readFile("favicon.png", (err, data) => {
        if (err) {
          // response.write(err);
        } else {
          response.write(data);
        }
        response.end();
      });
      break;
    }

    case "/students": {
      try {
        const data = await readFile("pages/students.html");
        response.write(data);
      } catch (err) {
        response.statusCode = 500;
        response.write("500 error");
      }

      response.end();
      break;
    }

    case "/courses": {
      await delay(3000);
      response.write("COURSES");
      break;
    }

    default: {
      response.write("404 not found");
    }
  }

  response.end();
});

server.listen(3003);
