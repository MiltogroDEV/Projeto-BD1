const inputCpf = document.getElementById("inputCPF");
const senha = document.getElementById("inputSenha");

let logged = false;

// Função para formatar o CPF enquanto o usuário digita
inputCpf.addEventListener('keypress', (e) => {
    let inputLength = inputCpf.value.length;
    if (inputLength === 3 || inputLength === 7) {
        inputCpf.value += ".";
    } else if (inputLength === 11) {
        inputCpf.value += "-";
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

// Função de login
function Login(event) {
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
loginButton.addEventListener("click", Login);

const logCadBtns = document.getElementById("logCadBtns");
const avatar = document.getElementById("avatar");

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

