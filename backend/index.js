const express = require("express");

const aplication = express();

const port = 4000;

aplication.get("/", (req, res) => {
  res.send("Chamei o backend");
});

aplication.get("/moedas", (req, res) => {
  const moedas = {
    BRL: "real",
    USD: "dolar",
    EUR: "euro",
  };

  res.status(200).json(moedas);
});

aplication.get("/info", (req, res) => {
  const information = {
    version: "1.0",
    author: "Marcelo",
    update: "Maior de 2024",
    price: "free",
  };
  res.status(200).json(information);
});
aplication.get("/conversao/:moedas", (req, res) => {
  let moedas = req.params.moedas.split("-");
  let moeda1 = moedas[0];
  let moeda2 = moedas[1];

  console.log(moeda1);
  console.log(moeda2);

//   fazer processo de conversao no backend e retornar para o front

  console.log(req.params.moedas);
  conversao = {};
  res.status(200).json(conversao);
});

aplication.post("/", (req, res) => {
  res.send("Chamei o backend usando POST");
});

aplication.listen(port, () => {
  console.log("escutando na porta 4000");
});
