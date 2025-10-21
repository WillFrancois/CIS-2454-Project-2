const fs = require("fs");
const http = require("http");

async function getRecipes(req, res) {
  fs.readFile("./recipes.json", "utf8", (err, data) => {
    if (err) {
      res.write("Error has occured opening recipes file.");
    }

    try {
      let parsed = JSON.parse(data);
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      if (req.url.substring(1, req.url.length).length > 0) {
        res.end(
          JSON.stringify(
            parsed[decodeURIComponent(req.url.substring(1, req.url.length))],
          ),
        );
      } else {
        res.end(data);
      }
    } catch (err) {
      res.write("Unable to read recipe data.");
      res.end();
    }
  });
}

async function addRecipe(req, res) {
  let content = [];

  req.on("data", (chunk) => {
    content.push(chunk);
  });

  req.on("end", () => {
    content = Buffer.concat(content).toString();
    console.log(content);
  });

  fs.readFile("./recipes.json", "utf8", (err, data) => {
    if (err) {
      res.write("Error has occured opening recipes file.");
    }

    try {
      let cparsed = JSON.parse(content);
      let parsed = JSON.parse(data);

      for (let i in cparsed) {
        if (parsed[i] == undefined) {
          parsed[i] = cparsed[i];
        } else {
          res.write("Key already exists in database!");
          res.end();
        }
      }

      console.log(parsed);

      fs.writeFile("recipes.json", JSON.stringify(parsed), (err) => {
        if (err) console.log(err);
        res.write("Saved successfully!");
        res.end();
      });
    } catch (err) {
      res.write("Error parsing input");
      res.end();
    }
  });
}

async function updateRecipe(req, res) {
  let content = [];

  req.on("data", (chunk) => {
    content.push(chunk);
  });

  req.on("end", () => {
    content = Buffer.concat(content).toString();
    console.log(content);
  });

  fs.readFile("./recipes.json", "utf8", (err, data) => {
    if (err) {
      res.write("Error has occured opening recipes file.");
    }

    try {
      let cparsed = JSON.parse(content);
      let parsed = JSON.parse(data);

      for (let i in cparsed) {
        if (parsed[i] != undefined) {
          parsed[i] = cparsed[i];
        } else {
          res.write("Key does not exist in database!");
          res.end();
        }
      }

      console.log(parsed);

      fs.writeFile("recipes.json", JSON.stringify(parsed), (err) => {
        if (err) console.log(err);
        res.write("Saved successfully!");
        res.end();
      });
    } catch (err) {
      res.write("Error parsing input");
      res.end();
    }
  });
}

async function deleteRecipe(req, res) {
  return 0;
}

const server = http.createServer(function (request, response) {
  if (request.method == "GET") {
    getRecipes(request, response);
  } else if (request.method == "POST") {
    addRecipe(request, response);
  } else if (request.method == "PUT") {
    updateRecipe(request, response);
  } else if (request.method == "DELETE") {
    deleteRecipe(request, response);
  }
});

const port = 8080;

server.listen(port);

console.log("http://localhost:" + port);
