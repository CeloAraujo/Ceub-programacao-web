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

const relacaoNomesMoedas = {
  real: "BRL",
  dolar: "USD",
  euro: "EUR",
};

const botaoInverter = document.querySelector("#invert");
const botaoEnviar = document.querySelector("#submit");
const botaoLimpar = document.querySelector("#clear-btn");

const hideResult = document.querySelector(".hide");
const valorUsuario = document.querySelector("#money");

// eventos
botaoInverter.addEventListener("click", (e) => {
  let valorMoeda1 = document.getElementById("moeda1").value;
  let valorMoeda2 = document.getElementById("moeda2").value;

  document.getElementById("moeda1").value = valorMoeda2;
  document.getElementById("moeda2").value = valorMoeda1;
});

botaoLimpar.addEventListener("click", (e) => {
  let paragrafoResultado = document.getElementById("resultado");
  paragrafoResultado.textContent = "";
  let valor = document.getElementById("money");
  valor.value = "";
  hideResult.classList.add("hide-div");
});

botaoEnviar.addEventListener("click", (e) => {
  let historicoRecuperado = recuperaHistorico();

  let money = document.getElementById("money").value;
  if (money === "" || money <= 0) {
    alert("Você não digitou um valor válido");
    return;
  }

  let moeda1 = document.getElementById("moeda1").value;
  let moeda2 = document.getElementById("moeda2").value;

  console.log(moeda1);
  console.log(moeda2);

  console.log(relacaoNomesMoedas[moeda1]);
  console.log(relacaoNomesMoedas[moeda2]);

  if (moeda1 === moeda2) {
    alert("As moedas são iguais");
    return;
  }

  buscaConversaoMinhaAPI(
    relacaoNomesMoedas[moeda1],
    relacaoNomesMoedas[moeda2]
  ).then(function (data) {
    data = JSON.parse(data);
    let simbolo = valoresConversao[moeda2]["simbolo"];
    let resultadoConversao = money * data["fator"];

    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent =
      simbolo + " " + resultadoConversao.toFixed(2);
    hideResult.classList.remove("hide-div");

    let objetoResultado = {
      valorDoUsuario: money,
      valorMoeda1: moeda1,
      valorMoeda2: moeda2,
      valorResultado: resultadoConversao,
    };
    // Converter objeto javascript para texto (json) antes de salvar no localstorage
    // let objetoResultadoJSON = JSON.stringify(objetoResultado);
    salvarHistorico(objetoResultado);
  });
});

function recuperaHistorico() {
  //vai ate a localstorage e recupera o valor da chave "historico"
  // localstorage salva string
  let historico = localStorage.getItem("historico");

  if (!historico) {
    return [];
  }
  let historicoObjeto = JSON.parse(historico);

  return historicoObjeto;
}

function salvarHistorico(resultadoConversao) {
  let historico = recuperaHistorico();
  historico.push(resultadoConversao);

  localStorage.setItem("historico", JSON.stringify(historico));
}

function salvarResultadoNoLocalStorage(resultado) {}

valorUsuario.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    botaoEnviar.click();
  }
  if (e.ctrlKey == true && e.code == "KeyI") {
    e.preventDefault();
    botaoInverter.click();
  }
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.code === "KeyL") {
      e.preventDefault();
      botaoLimpar.click();
    }
  });
});

const botaoAceitaMensagem = document.getElementById("botao-aceita-mensagem");
botaoAceitaMensagem.addEventListener("click", aceitarMensagem);

if (localStorage.getItem("aceitouCookie") == "1") {
  console.log("usuario já aceitou os termos e não vou mais mostrar");
  const divMensagemUsuario = document.getElementById("mensagem-usuario");
  divMensagemUsuario.classList.add("oculto");
}
function aceitarMensagem() {
  const divMensagemUsuario = document.getElementById("mensagem-usuario");
  divMensagemUsuario.classList.add("oculto");

  localStorage.setItem("aceitouCookie", "1");
}
 function buscaConversaoMinhaAPI(moedaOrigem, moedaDestino) {
  let urlAPI = "http://localhost:4000/conversao/";

  urlAPI = urlAPI + moedaOrigem + "-" + moedaDestino;

  return fetch(urlAPI)
    .then(function (response) {
      if (response.status == 200) {
        console.log("Chamada a minha API feita com sucesso");
      }
      return response.json();
    })
    .then(function (data) {
      console.log("Estou no segundo then");
      return JSON.stringify(data);
    })
    .catch(function (error) {
      console.log("Deu erro", error);
    });
}