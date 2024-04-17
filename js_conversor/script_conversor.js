const valoresConversao = {
    real: {
        euro: 0.19,
        dolar: 0.20,
        simbolo: "R$"
    },
    dolar: {
        real: 4.99,
        euro: 0.92,
        simbolo: "US$"
    },
    euro: {
        real: 5.40,
        dolar: 1.08,
        simbolo: "EUR"
    }
}

const botaoInverter = document.querySelector("#invert")
const botaoEnviar = document.querySelector("#submit")
const botaoLimpar = document.querySelector("#clear-btn")

const hideResult = document.querySelector(".hide")
const valorUsuario = document.querySelector("#money")

// eventos
botaoInverter.addEventListener("click", (e) => {
    let valorMoeda1 = document.getElementById("moeda1").value;
    let valorMoeda2 = document.getElementById("moeda2").value;

    document.getElementById("moeda1").value = valorMoeda2
    document.getElementById("moeda2").value = valorMoeda1
})

botaoLimpar.addEventListener("click", (e) => {
    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = "";
    let valor = document.getElementById("money");
    valor.value = "";
    hideResult.classList.add("hide-div")
})

botaoEnviar.addEventListener("click", (e) => {
    let historicoRecuperado = recuperaHistorico();

    let money = document.getElementById("money").value
    if (money === "" || money <= 0) {
        alert("Você não digitou um valor válido");
        return;
    }

    let moeda1 = document.getElementById("moeda1").value
    let moeda2 = document.getElementById("moeda2").value

    if (moeda1 === moeda2) {
        alert("As moedas são iguais")
        return;
    }

    let simbolo = valoresConversao[moeda2]["simbolo"];
    let resultadoConversao = money * valoresConversao[moeda1][moeda2];

    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = simbolo + " " + resultadoConversao.toFixed(2)
    hideResult.classList.remove("hide-div")

    let objetoResultado = {
        valorDoUsuario: money,
        valorMoeda1: moeda1,
        valorMoeda2: moeda2,
        valorResultado: resultadoConversao
    }
    // Converter objeto javascript para texto (json) antes de salvar no localstorage
    // let objetoResultadoJSON = JSON.stringify(objetoResultado);
    salvarHistorico(objetoResultado);
})

function recuperaHistorico(){
    //vai ate a localstorage e recupera o valor da chave "historico"
    // localstorage salva string
    let historico = localStorage.getItem("historico");

    if(!historico){
        return [];
    }
    let historicoObjeto = JSON.parse(historico);

    return historicoObjeto;
}

function salvarHistorico(resultadoConversao){
    let historico = recuperaHistorico();
    historico.push(resultadoConversao);

    localStorage.setItem("historico",JSON.stringify(historico));
}

function salvarResultadoNoLocalStorage(resultado) {

}


valorUsuario.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        botaoEnviar.click();
    }
    if(e.ctrlKey ==true && e.code=="KeyI"){
        e.preventDefault();
        botaoInverter.click()
    }
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.code === "KeyL") {
            e.preventDefault();
            botaoLimpar.click();
        }
    });
    
})

const botaoAceitaMensagem = document.getElementById("botao-aceita-mensagem");
botaoAceitaMensagem.addEventListener("click", aceitarMensagem);

if(localStorage.getItem("aceitouCookie") == "1") {
    console.log("usuario já aceitou os termos e não vou mais mostrar");
    const divMensagemUsuario = document.getElementById("mensagem-usuario");
    divMensagemUsuario.classList.add("oculto");
}
function aceitarMensagem() {
    const divMensagemUsuario = document.getElementById("mensagem-usuario");
    divMensagemUsuario.classList.add("oculto");

    localStorage.setItem("aceitouCookie", "1");
}
