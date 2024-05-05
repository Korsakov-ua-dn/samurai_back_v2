import app from "./app";
import { runDb } from "./db";

const port = process.env.PORT || 5000;

export const startApp = async () => {
  await runDb();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startApp();

module.exports = startApp;

// (async () => {
//   await runDb();

//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
// })();
