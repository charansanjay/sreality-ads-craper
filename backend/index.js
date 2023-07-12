const app = require("./app");
require("dotenv").config();

// Start the server
app.listen(process.env.PORT, () => {
  console.log("SERVER STARTED: Listening on port - " + process.env.PORT);
});
