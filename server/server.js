//importing our dependencies:
const express = require("express"); // express server - using to initialize the app
const fs = require("fs"); //importing file system dependency
const cors = require("cors"); // cors dependency (allows for connections from specific origins)

const app = express(); //initiallizing our app as an express server
const port = 3000; // app is running on port 3000 (ex. localhost:3000/clothes?page=0&perPage=2) (/request we're making)

// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
  origin: "http://localhost:4200", //address of our local app used by cors
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

// Use cors middleware
app.use(cors(corsOptions)); //using our cors config^ with our app

// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());

// GET route - Allows to get all the items (GET request to our /clothes route)
// example: localhost:3000/clothes?page=0&perPage=2
app.get("/clothes", (req, res) => {
  //extract the 'page' and 'perPage' parameters:
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 10;

  //read the contents of our db.json file:
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    //use JSON.parse to parse the data into a JSON data to query as a JSON object
    const jsonData = JSON.parse(data);

    //making basic calculations based on our page and perPage parameter: (page = page we're requesting) (Pagination)
    //Every single page will display different set of products
    const start = page * perPage;
    const end = start + perPage;

    //slicing our JSON items array from a certain index to a certain index (could set up 2 items per page for example):
    //(pages are 0-indexed)
    const result = jsonData.items.slice(start, end);

    //response part:
    //send a status of 200 (success), .json (JSON response) so front-end will read it as a JSON response instead of text
    res.status(200).json({
      items: result,
      total: jsonData.items.length, //number of total items in our database
      page, //sending back the page and perPage parameters
      perPage,
      totalPages: Math.ceil(jsonData.items.length / perPage), //send the number of total pages (total items/total pages)
    });
  });
});

// POST route - Allows to add a new item
// example: localhost:3000/clothes
/*
  body: {
    "image": "https://your-image-url.com/image.png",
    "name": "T-shirt",
    "price": "10",
    "rating": 4
  }
*/
app.post("/clothes", (req, res) => {
  //inputing a body to this post request by deconstructing that body
  //to extract the image, name, price, and rating:
  const { image, name, price, rating } = req.body;

  //using the fs dependency to read the db.json file with our products
  //getting a response in the form of an error or data
  fs.readFile("db.json", "utf8", (err, data) => {
    //if there's an error, we're sending a response of 500 (internal server error) back to the client
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    //if no errors, using JSON.parse to parse through the products in db.json. jsonData IS the list of products
    const jsonData = JSON.parse(data);

    //find the maximum id: (highest id = 16, add a new item = 16 + 1 = 17)
    const maxId = jsonData.items.reduce(
      (max, item) => Math.max(max, item.id),
      0
    );

    //creating a new item by creating a new Id, based on the length of the items + 1 (zero-intexed items NOT +1):
    // creating a new item = 16 items + 1 new item = 17 ids
    const newItem = {
      id: maxId + 1,
      image,
      name,
      price,
      rating,
    };
    //pushing that new item into our jsonData (db.json) array:
    jsonData.items.push(newItem);

    //instead of readFile^, we're writing with writeFile:
    //taking our db.json file, sreingifying that as jsonData, getting a response in the form of an error:
    fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
      //if there's an error, display the error status 500(internal server error)
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      //if no error, return positive response(201) and returning that new item(redundant):
      res.status(201).json(newItem);
    });
  });
});

// PUT route - Allows to update an item
// example: localhost:3000/clothes/1
/*
  body: {
    "image": "https://your-image-url.com/image.png",
    "name": "T-shirt",
    "price": "10",
    "rating": 4
  }
*/
// localhost:3000/clothes/1 - PUT
app.put("/clothes/:id", (req, res) => {
  //the id is being extracted using parseInt as an integer from the parameter above^:
  const id = parseInt(req.params.id);
  //extracting the body like before:
  const { image, name, price, rating } = req.body;

  //reading the file like before:
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    //trying to obtain the index of that element based on the id (id in database may not be sequential):
    const index = jsonData.items.findIndex((item) => item.id === id);

    //if index not found, returning a 404(Not Found) status:
    if (index === -1) {
      res.status(404).send("Not Found");
      return;
    }

    //if no error, taking our product at that specific index, and setting it to our new object:
    jsonData.items[index] = {
      id,
      image,
      name,
      price,
      rating,
    };

    //use fs.writeFile to write our changes back into our file: 
    fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      //sending positive(200) response back like before:
      res.status(200).json(jsonData.items[index]);
    });
  });
});

// DELETE route - Allows to delete an item
// example: localhost:3000/clothes/1 - DELETE
app.delete("/clothes/:id", (req, res) => {
  //extracting an id from the endpoint:
  const id = parseInt(req.params.id);

  //reading our db.json file, responding with an error or data:
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    //parsing our data into JSON:
    const jsonData = JSON.parse(data);

    //getting the index of the current product
    const index = jsonData.items.findIndex((item) => item.id === id);

    if (index === -1) {
      res.status(404).send("Not Found");
      return;
    }

    //splicing the current product from the list of products in db.json file
    jsonData.items.splice(index, 1);

    //writing the changes into our file:
    fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(204).send();
    });
  });
});

// listening to a specific 'port'
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`); //displaying to the user that the app is listening to the server on port 'port' (3000 in setup above^)
});
