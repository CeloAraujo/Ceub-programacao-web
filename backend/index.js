const express = require("express");

const cors = require("cors");

const aplication = express();

const port = 4000;

const valoresConversao = {
  real: {
    euro: 0.19,
    dolar: 0.2,
    simbolo: "R$",
  },
  dolar: {
    real: 4.99,
    euro: 0.92,
    simbolo: "US$",
  },
  euro: {
    real: 5.4,
    dolar: 1.08,
    simbolo: "EUR",
  },
};

const relacaoMoedas = {
  BRL: "real",
  USD: "dolar",
  EUR: "euro",
};

aplication.use(cors());

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
  if (moedas.length != 2) {
    res.status(400);
    return;
  }

  let moeda1 = moedas[0].toUpperCase();
  let moeda2 = moedas[1].toUpperCase();

  if (moeda1 != "BRL" && moeda1 != "EUR" && moeda1 != "USD") {
    console.log("moeda 1 nao suportada")
    res.status(400);
    return;
  }
  if (moeda2 != "BRL" && moeda2 != "EUR" && moeda2 != "USD") {
    console.log("moeda 2 nao suportada")
    res.status(400);
    return;
  }

  let fatorConversao =
    valoresConversao[relacaoMoedas[moeda1]][relacaoMoedas[moeda2]];

  //   fazer processo de conversao no backend e retornar para o front
  conversao = {
    fator: fatorConversao,
  };
  res.status(200).json(conversao);
});

aplication.post("/", (req, res) => {
  res.send("Chamei o backend usando POST");
});

aplication.listen(port, () => {
  console.log("escutando na porta 4000");
});
