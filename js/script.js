const inputText = document.querySelector(".text")
const inputPassword = document.querySelector(".password")
const button = document.querySelector(".btn-submit")

let conteudo_classe;
conteudo_classe = document.querySelector("#paragraph-random")
console.log(conteudo_classe)

function soma(numero1,numero2){
    let somaNumeros = numero1 + numero2;
    return somaNumeros;
}
 let resultadoDaSoma = soma(1,2);
 console.log(resultadoDaSoma);

function validarCampos() {
    if (!inputText.value || !inputPassword.value) {
        alert("Preencha todos os campos corretamente");
        return;
    } else {
        console.log("enviado")
    }
}

button.addEventListener("click", validarCampos)

// imprimindo numeros de 1 a 5
for (i = 1; i < 6; i++) {
    console.log(i);
}

let m = 1;
while (m < 6) {
    console.log(i);
    m++
}