const inputCpf = document.getElementById("inputCPF");
const senha = document.getElementById("inputSenha");

const inputCpf1 = document.getElementById("inputCPF1");
const inputNome = document.getElementById("inputNome");
const senha1 = document.getElementById("inputSenha1");
const senha2 = document.getElementById("inputSenha2");

let userCpf;

// Função para formatar o CPF enquanto o usuário digita
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

inputCpf1.addEventListener('input', (e) => {
    let inputLength = inputCpf.value.length;
    if (inputLength === 3 || inputLength === 7) {
        inputCpf.value += ".";
    } else if (inputLength === 11) {
        inputCpf.value += "-";
    }
});


// Função para cadastrar usuário
function cadastrar(){
    if(inputCpf1.value.length < 14 || senha1.value.length < 5 || senha2.value.length < 5 || senha1.value != senha2.value){
        showMessage("error", "Credenciais inválidas.");
        inputCpf.value =  ""
        senha1.value = ""
        senha2.value = ""
    } else {
        // endereço do servidor
        const HOST_API = "http://127.0.0.1:8080"
        // criar um JSON com os dados que você buscar ou inserir
        const data = {
            "name": `${inputNome.value}`,
            "email": "email",
            "password": `${senha1.value}`,
            "cpf": `${userCpf.value}`,
            "rua": "teste",
            "numero": "teste",
            "bairro": "teste",
            "cidade": "teste",
            "estado": "teste",
            "role": "Participant",
            // "role": "Professor",
            // "role": "ADM",
        }

        // para o navegador criar a requisição
        const requestInfo = {
            method: "POST", // ou "GET", "POST", "PUT", "DELETE" dependendo do seu caso
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) // inserir os dados json aqui
        };
        
        // fetch abre a conexao com o banco de dados
        fetch(`${HOST_API}/create/user`, requestInfo)
        .then(response => response)
        .then(data => {
            console.log(data);
        }).catch(error => {
            console.error("Erro na requisição:", error);
        });

        showMessage("success", "Conta criada com sucesso!!!");
        // setTimeout(() => {
        //     // window.location.href = "http://127.0.0.1:5500/Pages/login.html";
        //     console.log("passou")
        //     window.location.href = "/login.html";
        // }, 2000);
    }
}

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

// Função de login
function login(event) {
    event.preventDefault();
    
    if (inputCpf.value.length === 14 && senha.value.length >= 5) {
        if (inputCpf.value === "111.111.111-11" && senha.value === "12345") {
            showMessage("success", "Login bem-sucedido! Redirecionando...");
            setTimeout(() => {
                window.location.href = "http://127.0.0.1:5500/Pages/index.html";
            }, 2000);
            logged = true;
        } else {
            showMessage("error", "Credenciais inválidas.");
            inputCpf.value = "";
            senha.value = "";
        }
    } else if (inputCpf.value == "1" && senha.value == "1") {    
        showMessage("success", "Login bem-sucedido! Redirecionando...");
        setTimeout(() => {
            window.location.href = "http://127.0.0.1:5500/index.html";
        }, 2000);
        logged = true;
    } else {
        showMessage("error", "Por favor, preencha o CPF e a senha corretamente.");
    }
}

const loginButton = document.getElementById("loginBtn");
loginButton.addEventListener("click", login);

const cadastrarButton = document.getElementById("cadastrarBtn");
loginButton.addEventListener("click", cadastrar);

const logCadBtns = document.getElementById("logCadBtns");
const avatar = document.getElementById("avatar");

let logged = false;

// Função logado incompleta - fase de testes
function Logged() {
    setTimeout(() => {
        console.log(logged)
    }, 3000)
    if (!logged){
        // logCadBtns.style.display = 'none';
        // avatar.style.display = 'block';
        // logged = !logged;
        console.log("Logado")
    }
}

loginButton.addEventListener('click', Logged);
