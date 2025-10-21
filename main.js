const http = require("http");

async function getRecipes(res) {
  res.write("Testing");
  res.end();
}

async function updateRecipe() {
  return 0;
}

async function addRecipe() {
  return 0;
}

async function deleteRecipe() {
  return 0;
}

const server = http.createServer(function (request, response) {
  let desUrl = request.url;
  switch (desUrl) {
    case "/":
      getRecipes(response);
      break;
    default:
      console.log(desUrl);
  }
});

const port = 8080;

server.listen(port);

console.log("http://localhost:" + port);
