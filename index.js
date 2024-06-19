const fs = require("fs");
const http = require("http");
const url = require("url");

// Bloking and syncronous way

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// console.log(textIn);

// const textout = `This is what we know about : ${textIn}`;

// fs.writeFileSync("./txt/output.txt", textout);

// console.log("file written");

// Non-Bloking and asychronous way

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile(".txt", `${data2}\n ${data3}`, (err) => {
//         console.log("data has been wrriten");
//       });
//     });
//   });
// });
// console.log("hello");

/////////////////////////////////////////////////////

// server
const server = http.createServer((req, res) => {
  const path = req.url;
  if (path === "/" || path === "/overview") {
    res.end("This is the overview ");
  } else if (path === "/product") {
    res.end("This is the product page");
  } else if (path === "/api") {
    fs.readFile("./dev-data/data.json", "utf-8", (err, data) => {
      if (err) return res.end("something wrong");
      const productData = JSON.parse(data);
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
    });
  } else {
    res.end("page not found !");
  }
});

server.listen(8000, () => {
  console.log("port is runing");
});
