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

async function login(e){
    let attemptLoggin;
    e.preventDefault();

    if (inputCpf.value.length != 14 || senha.value.length < 5){
        showMessage("error", "Credenciais inválidas!");
    } else {
        const data = {
            "cpf": `${userCpf}`,
            "password": `${senha.value}`,
        }

        try{
            console.log("tentando logar"); // remover depois
            attemptLoggin = await apiCall("/login", "POST", data);
            if(attemptLoggin.success){
                showMessage("sucess", "Login efetuado com sucesso!")

                const userSession = {
                    cpf: userCpf,
                    role: attemptLogin.role,
                };

                localStorage.setItem("userSession", JSON.stringify(userSession));

                setTimeout(() => {
                    window.location.href = "/Pages/participante/homePart.html";
                }, 2000);

                // setTimeout(() => {
                //     if (userSession.role === "ADM") {
                //         window.location.href = "../Pages/adm/homePart.html";
                //     } else if (userSession.role === "PROFESSOR") {
                //         window.location.href = "../Pages/professor/homePart.html";
                //     } else {
                //         window.location.href = "../Pages/participante/homePart.html";
                //     }
                // }, 2000);
            } else {
                showMessage("error", "Credenciais inválidas!")
            }
        } catch (e){
            console.log(e);
        }

        setTimeout(() => {
            console.log("Passou")
            window.location.href = "../Pages/login.html";
        }, 3000);
    }
}

const loginButton = document.getElementById("loginBtn");
loginButton.addEventListener("click", login);

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
});

const btnVoltar = document.getElementById("btnVoltar");
btnVoltar.addEventListener('click', (e) => {
    window.location.href = "/index.html"
});