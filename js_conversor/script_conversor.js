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
})

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