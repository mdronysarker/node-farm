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

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%EMOJI%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.image);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%DESCRIPTON%}/g, product.description);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

const tempOverview = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);

// console.log(tempOverview);

const tempCard = fs.readFileSync("./templates/template-card.html", "utf-8");

const tempProducat = fs.readFileSync(
  "./templates/template-product.html",
  "utf-8"
);

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const path = req.url;
  const { query, pathname } = url.parse(req.url, true);
  // console.log(query, pathname);
  // OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardHtml = dataObj.map((el) => replaceTemplate(tempCard, el));
    const output = tempOverview.replace("{%PROUDCTCARD%}", cardHtml);
    res.end(output);
  }
  // PRUDUCT PAGE
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProducat, product);
    res.end(output);
  }

  // API PAGE
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }

  // NOT FOUND PAGE
  else {
    res.end("page not found !");
  }
});

server.listen(8000, () => {
  console.log("port is runing");
});
