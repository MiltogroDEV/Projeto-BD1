import { apiCall } from "../scripts/components/apicalls.js";
import { showMessage } from "../scripts/components/showMessage.js";

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
let userEmail = false;

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
        userTelefone = inputTelefone.value.replace(/[()\s-]/g, '');
    }
});

inputEmail.addEventListener('input', () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (regexEmail.test(inputEmail.value)) {
        userEmail = true;
    }
});

async function cadastrar(){
    if(inputNome.value.length < 1 || inputCpf.value.length < 14 || inputSenha1.value.length < 5 || inputSenha2.value.length < 5 || inputSenha1.value != inputSenha2.value || !userEmail || inputTelefone.value.length < 14 || inputRua.value.length < 1 || inputBairro.value.length < 1 || inputNumero.value.length == 0){
        showMessage("error", "Credenciais inválidas.");
        if (inputNome.value.length < 1) {
            inputNome.value = "";
        } if (inputCpf.value.length < 14) {
            inputCpf.value = "";
        } if (inputSenha1.value.length < 5 || inputSenha2.value.length < 5 || inputSenha1.value != inputSenha2.value) {
            inputSenha1.value = "";
            inputSenha2.value = "";
        } if (!userEmail) {
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
        showMessage("warning", "Para continuar, aceite os termos e condições.");
    } else {

        let fotoDefault = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmQAAAJkAQMAAACF36//AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURczMzJmZmQihqqgAAAAJcEhZcwAALiMAAC4jAXilP3YAAAbNaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+DQogIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+DQogICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpJcHRjNHhtcENvcmU9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBDb3JlLzEuMC94bWxucy8iIHhtbG5zOkdldHR5SW1hZ2VzR0lGVD0iaHR0cDovL3htcC5nZXR0eWltYWdlcy5jb20vZ2lmdC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iIHhtbG5zOmlwdGNFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIHBob3Rvc2hvcDpDcmVkaXQ9IkdldHR5IEltYWdlcyIgR2V0dHlJbWFnZXNHSUZUOkFzc2V0SUQ9IjE0OTUwODgwNDMiIHhtcFJpZ2h0czpXZWJTdGF0ZW1lbnQ9Imh0dHBzOi8vd3d3LmlzdG9ja3Bob3RvLmNvbS9sZWdhbC9saWNlbnNlLWFncmVlbWVudD91dG1fbWVkaXVtPW9yZ2FuaWMmYW1wO3V0bV9zb3VyY2U9Z29vZ2xlJmFtcDt1dG1fY2FtcGFpZ249aXB0Y3VybCIgcGx1czpEYXRhTWluaW5nPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3ZvY2FiL0RNSS1QUk9ISUJJVEVELUVYQ0VQVFNFQVJDSEVOR0lORUlOREVYSU5HIj4NCiAgICAgIDxkYzpjcmVhdG9yPg0KICAgICAgICA8cmRmOlNlcT4NCiAgICAgICAgICA8cmRmOmxpPlNBTkFMUkVOSzwvcmRmOmxpPg0KICAgICAgICA8L3JkZjpTZXE+DQogICAgICA8L2RjOmNyZWF0b3I+DQogICAgICA8ZGM6ZGVzY3JpcHRpb24+DQogICAgICAgIDxyZGY6QWx0Pg0KICAgICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+VXNlciBwcm9maWxlIGljb24uIEF2YXRhciBvciBwZXJzb24gaWNvbi4gUHJvZmlsZSBwaWN0dXJlLCBwb3J0cmFpdCBzeW1ib2wuIERlZmF1bHQgcG9ydHJhaXQgaW1hZ2UuIEVhc2lseSBlZGl0YWJsZSBsaW5lIGljb24gb24gYSB0cmFuc3BhcmVudCBiYWNrZ3JvdW5kLiBWZWN0b3Igc3RvY2sgaWxsdXN0cmF0aW9uLjwvcmRmOmxpPg0KICAgICAgICA8L3JkZjpBbHQ+DQogICAgICA8L2RjOmRlc2NyaXB0aW9uPg0KICAgICAgPHBsdXM6TGljZW5zb3I+DQogICAgICAgIDxyZGY6U2VxPg0KICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPg0KICAgICAgICAgICAgPHBsdXM6TGljZW5zb3JVUkw+aHR0cHM6Ly93d3cuaXN0b2NrcGhvdG8uY29tL3Bob3RvL2xpY2Vuc2UtZ20xNDk1MDg4MDQzLT91dG1fbWVkaXVtPW9yZ2FuaWMmYW1wO3V0bV9zb3VyY2U9Z29vZ2xlJmFtcDt1dG1fY2FtcGFpZ249aXB0Y3VybDwvcGx1czpMaWNlbnNvclVSTD4NCiAgICAgICAgICA8L3JkZjpsaT4NCiAgICAgICAgPC9yZGY6U2VxPg0KICAgICAgPC9wbHVzOkxpY2Vuc29yPg0KICAgIDwvcmRmOkRlc2NyaXB0aW9uPg0KICA8L3JkZjpSREY+DQo8L3g6eG1wbWV0YT4NCjw/eHBhY2tldCBlbmQ9InIiPz5NxH2YAAAEMElEQVR42u2cy5WjMBBF4WihJSEQCqHh0ByKQ/DSCx8zn25P8xFSS3VpGPvdAO4xVJUAVcmVEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYR4C5oBlLXDwOncb9lwp2zdH9twZmT1X9lwY2zNhw26c92njbnUTxlzqf5pexC29mlDLrX/Z7vYZfU/GXHj3JcNuHHNlw3IuHZks4ehH9nsYRjJhqtV5sY286rkxzZzUMchtQe1m9isQe0nNmtQJzJrUOupzVipbmozpoif2owpMk0Qa4q0M9vJZOtmNlvC9TObLeGGTW2m9K3nNlP6urnNlL5+bnugNlP6NqitXdgsxdAtbOfD2PqFzVIMC5mpGFBbvbTdjmJzS9v9KLZlmVrKnrUti95S9qytDdhOB7F1Adv5ILY+YLu8pC0gMyxw/5uteLms38bmQra7bCl8yPaQTbYnoUd9+cNeNtlkk0022cbo6fx6Nre97SXfyevtbS/5DfhGuwT95raj7Pwcef8tZDvKvmXIViw79O7xkXfdN+9WHKYvU21ts3TH2M4da2N7lGw3lrWxfeeNO+ym7j87S8DOObAzGPC0CTsJM7fZpnTYCSLWxs5KsXNc7MQabGMn/Vow3eiZRk+GdLom2Qd8yZBO1yT7RG4LhpSePXZgSKtxGK6ArQODMA4DIPu6cczpCvK20ecXPHjbquelXiFbQ/60jx93xWweOqYhhBBHA10t0efC8wl4IWQefXNA35E8+jaInh1jvxemX0bWF5uJzPr5wX47szsYM5kt5dhdqeXeoMWG7qmyO9tsR4Dt8mw/ZX2QiVx22qQL2kpLtQ/aCsMQbIkXh8GFbYVhCAehNAztiq2sGroVW1lQV2Rl62+9ZisKqluzFQV1LaRlQW1XbSVB7VZtJUHtV20llboqKwmqW7cVBNWjtvUEKUmRNmLLT5EuYstPkT5iy0+RiKxgFYnZslcRF7Nlp4hHbbF0y0841tZGbbnp20VtuenbR2256TuQtjpuu+1pc3FbZvr6uO2xpy1eCrnF0CZspx1tXcKWV1p9wnbZ0ZaQZT5nUFudsmUVqkvZ7vvZfMr22M+WKvq8sj+yrU3achaRLmk772brf9h22c02/LDtupetTttusi1xadv9NWw+bXu8hq35adsg2zvb2m/YTrJtbGNjyq5I7ErOPgHhdyT2TZV9J2e/jNhvwGRQ877E2V2CVFDzdlfYfSR2/43dG0zUVm4rMF4Nufu97M422xGIhiG/58n2ZdgOFNsdi9y4kuYuedvobizbd67J2wZ3/+E5h5XHYOFEEjttAs/VsDM/7DxSMEfKJ6/Y0/rsOfHAAmwZamT/y7oiL5T+X3dH/rR5dVmPosEn+Brwp1XjsBIj4PBpL/hElWMiIIQQQgghhBBCCCGEEEKIb1NVvwAbf6K4OqDnPQAAAABJRU5ErkJggg==" 

        const data = {
            "cpf": `${userCpf}`,
            "nome": `${inputNome.value}`,
            "foto": `${fotoDefault}`,
            "telefone": `${userTelefone}`,
            "email": `${inputEmail.value}`,
            "password": `${inputSenha1.value}`,
            "rua": `${inputRua.value}`,
            "numero": `${inputNumero.value}`,
            "bairro": `${inputBairro.value}`,
            "cidade": `${inputCidade.value}`,
            "estado": `${inputEstado.value}`,
            "role": "PROFESSOR",
        }

        console.log(data);

        try{
            attemptLoggin = await apiCall("/create/user", "POST", data);

            if(attemptLoggin.success){
                showMessage("sucess", "Login efetuado com sucesso!")
                
                setTimeout(() => {
                    window.location.href = "/Pages/login.html";
                }, 2000);

            } else if(attemptLoggin.error){
                showMessage("error", "CPF já existente!");

                inputNome.value = "";
                inputCpf.value = "";
                inputSenha1.value = "";
                inputSenha2.value = "";
                inputEmail.value = "";
                inputTelefone.value = "";
                inputRua.value = "";
                inputBairro.value = "";
                inputNumero.value = "";
            }
        } catch(e) {
            console.log(e);
        }
    }
}

const cadastrarButton = document.getElementById("cadastrarBtn");
cadastrarButton.addEventListener("click", cadastrar);

document.getElementById("registerForm").addEventListener('submit', (e) => {
    e.preventDefault();
});

const btnVoltar = document.getElementById("btnVoltar");
btnVoltar.addEventListener('click', (e) => {
    window.location.href = "/index.html"
});

// TESTES
// setInterval(() => {
//     console.log()
// }, 100)