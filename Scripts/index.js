const inputCpf = document.getElementById("inputCPF");
const loginCPF = "adm.in"
const loginSenha = "admin"


let inputValueTemp = inputCpf.value

inputCpf.addEventListener('keypress', (e) => {
    let inputLength = inputCpf.value.length;

    if(inputLength === 3 || inputLength === 7){
        inputCpf.value += "."
    } else if (inputLength === 11){
        inputCpf.value += "-"
    }

})

const senha = document.getElementById("inputSenha")

function Login(){
    if(inputCpf.value.length < 14 || senha.value.length < 5){
        if(inputCpf.value == loginCPF && senha.value == loginSenha){
            // window.location.replace("http://127.0.0.1:5500/Pages/inicio.html")
            window.location.replace("https://google.com")
        } else {
            alert("Credenciais inválidas.")
            inputCpf.value = ""
            senha.value = ""
        }
    }
}
