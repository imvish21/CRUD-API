const http = require("http");
const getReq = require ("./methods/get-request")
const postReq = require ("./methods/post-request")
const putReq = require ("./methods/put-request")
const deleteReq = require ("./methods/delete-request")
let movies = require("./data/movies.json")
// require("dotenv").config();

const PORT = 3000;

const server = http.createServer((req, res) => {
    req.movies = movies; //to manipulate the request whenever get-requests,post-requests are called.(movies is the data we going to have from movies.json file)
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({ title: "Not Found", message: "Route Not Found" })
      );
      res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
