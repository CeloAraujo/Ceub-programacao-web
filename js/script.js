const inputText = document.querySelector(".text")
const inputPassword = document.querySelector(".password")
const button = document.querySelector(".btn-submit")

function validarCampos() {
    if (!inputText.value || !inputPassword.value) {
        alert("Preencha todos os campos corretamente");
        return;
    }else{
        console.log("enviado")
    }
}

button.addEventListener("click", validarCampos)