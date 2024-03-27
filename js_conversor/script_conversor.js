const valoresConversao = {
    real: {
        euro: 0.19,
        dolar: 0.20
    },
    dolar: {
        real: 4.99,
        euro: 0.92
    },
    euro: {
        real: 5.40,
        dolar: 1.08
    }
}

function converter() {
    let money = document.getElementById("money").value

    let moeda1 = document.getElementById("moeda1").value
    let moeda2 = document.getElementById("moeda2").value
    console.log(money,moeda1,moeda2)

        if(moeda1===moeda2){
            alert("As moedas são iguais")
            return;
        }
    let resultadoConversao = money * valoresConversao[moeda1][moeda2];
    alert(resultadoConversao)

    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = resultadoConversao

    
   
   
}
function inverter() {
    let valorMoeda1 = document.getElementById("moeda1").value;
    let valorMoeda2 = document.getElementById("moeda2").value;

    document.getElementById("moeda1").value = valorMoeda2
    document.getElementById("moeda2").value = valorMoeda1
}

function limpar() {
    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = "";
    let valor = document.getElementById("money");
    money.value = "";

    
}