const inputCpf = document.getElementById("inputCPF");

let inputValueTemp = inputCpf.value

inputCpf.addEventListener('keypress', (e) => {
    let inputLength = inputCpf.value.length;
    
    if(inputLength === 3 || inputLength === 7){
        inputCpf.value += "."
    } else if (inputLength === 11){
        inputCpf.value += "-"
    }

})

const senha1 = document.getElementById("inputSenha1")
const senha2 = document.getElementById("inputSenha2")

function Cadastrar(){
    if(inputCpf.value == "" || inputCpf.value.length < 14){
        alert("CPF inválido.")
        inputCpf.value =  ""
    }

    if(senha1.value.length < 5 && senha2.value.length < 5){
        alert("Crie uma senha com no mínimo 5 dígitos.")
        senha1.value = ""
        senha2.value = ""
    }

    if(senha1.value != senha2.value){
        alert("Senhas não estão iguais.")
        senha1.value = ""
        senha2.value = ""
    }
}
