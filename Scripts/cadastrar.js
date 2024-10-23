const inputNome = document.getElementById("inputNome");
const inputCpf = document.getElementById("inputCPF");
const inputEmail = document.getElementById("inputEmail");
const inputTelefone = document.getElementById("inputTelefone");
const inputCidade = document.getElementById("inputCidade");
const inputEstado = document.getElementById("inputEstado");
const inputRua = document.getElementById("inputRua");
const inputBairro = document.getElementById("inputBairro");
const inputNumero = document.getElementById("inputNumero");
const inputSenha1 = document.getElementById("inputSenha1");
const inputSenha2 = document.getElementById("inputSenha2");
const termosCondicoes = document.getElementById("termosCondicoes");

let userCpf;
let userTelefone;

inputCpf.addEventListener('input', (e) => {
    let inputLength = inputCpf.value.length;
    if (inputLength === 3 || inputLength === 7) {
        inputCpf.value += ".";
    } else if (inputLength === 11) {
        inputCpf.value += "-";
    }

    if (inputLength === 14){
        let userCpf = inputCpf.value.replace(/[.-]/g, '');
    }
});

// Mascara para inputTelefone
inputTelefone.addEventListener('input', (e) => {
    let inputLength = inputTelefone.value.length;

    if (inputLength === 1){
        inputTelefone.value = "(" + inputTelefone.value;
    } else if (inputLength === 3){
        inputTelefone.value += ") ";
    } else if (inputLength === 10){
        inputTelefone.value += "-";
    }

    if (inputLength === 15){
        let userTelefone = inputTelefone.value.replace(/[()\s-]/g, '');
    }
});

// Função para mostrar o popup
function showMessage(type, message) {
    const messageBox = document.getElementById("messageBox");
    
    if (type === "success") {
        messageBox.className = "alert alert-success";
        messageBox.style.backgroundColor = "rgba(60, 255, 0, 0.253)";
    } else if (type === "error") {
        messageBox.className = "alert alert-danger";
        messageBox.style.backgroundColor = "rgba(255, 0, 0, 0.253)";
    }
    
    messageBox.textContent = message;
    messageBox.style.display = "inline";
    
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 3000);
}

// Função para cadastrar usuário
function cadastrar(){
    if(
    inputNome.value.length < 1 ||
    inputCpf.value.length < 14 ||
    inputSenha1.value.length < 5 ||
    inputSenha2.value.length < 5 ||
    inputSenha1.value != inputSenha2.value ||
    inputEmail.value.length < 5 ||
    inputTelefone.value.length < 14 ||
    inputRua.value.length < 1 || 
    inputBairro.value.length < 1 ||
    inputNumero.value.length == 0){
        showMessage("error", "Credenciais inválidas.");
        if (inputNome.value.length < 1) {
            inputNome.value = "";
        } if (inputCpf.value.length < 14) {
            inputCpf.value = "";
        } if (inputSenha1.value.length < 5 || inputSenha2.value.length < 5 || inputSenha1.value != inputSenha2.value) {
            inputSenha1.value = "";
            inputSenha2.value = "";
        } if (inputEmail.value.length < 5) {
            inputEmail.value = "";
        } if (inputTelefone.value.length < 14) {
            inputTelefone.value = "";
        } if (inputRua.value.length < 1) {
            inputRua.value = "";
        } if (inputBairro.value.length < 1) {
            inputBairro.value = "";
        } if (inputNumero.value.length == 0) {
            inputNumero.value = "";
        }
    } else if (!termosCondicoes.checked){
        showMessage("error", "Para continuar, aceite os termos e condições.");
    } else {
        const HOST_API = "https://academic-events-api-83ac51d23457.herokuapp.com"

        const data = {
            "cpf": `${userCpf}`,
            "name": `${inputNome.value}`,
            "foto": "Default",
            "telefone": `${userTelefone}`,
            "email": `${inputEmail.value}`,
            "password": `${inputSenha1.value}`,
            "rua": `${inputRua.value}`,
            "numero": `${inputNumero.value}`,
            "bairro": `${inputBairro.value}`,
            "cidade": `${inputCidade.value}`,
            "estado": `${inputEstado.value}`,
            "role": "ADM",
            // "role": "PARTICIPANT",
            // "role": "PROFESSOR",
        }

        // para o navegador criar a requisição
        const requestInfo = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        console.log(data)
        
        // fetch abre a conexao com o banco de dados
        fetch(`${HOST_API}/create/user`, requestInfo)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }).catch(error => {
            console.error("Erro na requisição:", error);
        });

        showMessage("success", "Conta criada com sucesso!!!");
        // setTimeout(() => {
        //     console.log("Passou")
        //     window.location.href = "../Pages/login.html";
        // }, 3000);
    }
}

const cadastrarButton = document.getElementById("cadastrarBtn");
cadastrarButton.addEventListener("click", cadastrar);

document.getElementById("registerForm").addEventListener('submit', (e) => {
    e.preventDefault();
});

// TESTES
setInterval(() => {
    console.log()
}, 100)