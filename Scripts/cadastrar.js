
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
        console.log(userCpf);
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
        console.log(userTelefone);
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
    
    // messageBox.style.display = "block";
    messageBox.style.display = "inline";
    
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 3000);
}

// Função para cadastrar usuário
function cadastrar(){
    // if(inputCpf.value.length < 14 || inputSenha1.value.length < 5 || inputSenha2.value.length < 5 || inputSenha1.value != inputSenha2.value){
    //     showMessage("error", "Credenciais inválidas.");
    //     inputCpf.value =  ""
    //     inputSenha1.value = ""
    //     inputSenha2.value = ""
    // } else {
        // endereço do servidor
        const HOST_API = "https://academic-events-api-83ac51d23457.herokuapp.com"

        const data = {
            "cpf": `${userCpf}`,
            "name": `${inputNome.value}`,
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
        }

        // para o navegador criar a requisição
        const requestInfo = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        
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
// }

const cadastrarButton = document.getElementById("cadastrarBtn");
cadastrarButton.addEventListener("click", cadastrar);

document.getElementById("registerForm").addEventListener('submit', (e) => {
    e.preventDefault();
});

// TESTES
// setInterval(() => {
//     console.log(inputEstado.value)
// }, 100)