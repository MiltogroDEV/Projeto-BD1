import { apiCall } from "../scripts/components/apicalls.js";
import { showMessage } from "../scripts/components/showMessage.js";

const inputCpf = document.getElementById("inputCPF");
const senha = document.getElementById("inputSenha");

let userCpf;

inputCpf.addEventListener('input', (e) => {
    let inputLength = inputCpf.value.length;
    if (inputLength === 3 || inputLength === 7) {
        inputCpf.value += ".";
    } else if (inputLength === 11) {
        inputCpf.value += "-";
    }

    if (inputLength === 14){
        userCpf = inputCpf.value.replace(/[.-]/g, '');
    }
});

function login(e){
    e.preventDefault();

    if (inputCpf.value.length != 14 || senha.value.length < 5){
        showMessage("error", "Credenciais inválidas!");
    } else {
        const data = {
            "cpf": `${userCpf.value}`,
            "password": `${senha.value}`,
        }

        apiCall("/login", "GET", data)

        showMessage("success", "Login efetuado com sucesso!!!");

        setTimeout(() => {
            console.log("Passou")
            window.location.href = "../Pages/login.html";
        }, 3000);
    }
}

const loginButton = document.getElementById("loginBtn");
loginButton.addEventListener("click", login);
