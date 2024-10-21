const inputCpf = document.getElementById("inputCPF");
const senha = document.getElementById("inputSenha");

// let userCpf;

// Função para formatar o CPF enquanto o usuário digita
inputCpf.addEventListener('input', (e) => {
    let inputLength = inputCpf.value.length;
    if (inputLength === 3 || inputLength === 7) {
        inputCpf.value += ".";
    } else if (inputLength === 11) {
        inputCpf.value += "-";
    }

    // Tira os .'s e -'s
    // if (inputLength === 14){
    //     let userCpf = inputCpf.value.replace(/[.-]/g, '');
    //     console.log(userCpf);
    // }
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
// function login(event) {
//     event.preventDefault();
    
//     if (inputCpf.value.length === 14 && senha.value.length >= 5) {
//         if (inputCpf.value === "111.111.111-11" && senha.value === "12345") {
//             showMessage("success", "Login bem-sucedido! Redirecionando...");
//             setTimeout(() => {
//                 window.location.href = "http://127.0.0.1:5500/Pages/index.html";
//             }, 2000);
//             logged = true;
//         } else {
//             showMessage("error", "Credenciais inválidas.");
//             inputCpf.value = "";
//             senha.value = "";
//         }
//     } else if (inputCpf.value == "1" && senha.value == "1") {    
//         showMessage("success", "Login bem-sucedido! Redirecionando...");
//         setTimeout(() => {
//             console.log("Passou")
//             window.location.href = "/index.html";
//         }, 3000);
//     } else {
//         showMessage("error", "Por favor, preencha o CPF e a senha corretamente.");
//     }
// }

function login(e){
    e.preventDefault();

    if (inputCpf.value == "1" && senha.value == "1") {    
        showMessage("success", "Login bem-sucedido! Redirecionando...");
        setTimeout(() => {
            console.log("Passou")
            window.location.href = "/Pages/Participante/homePart.html";
        }, 3000);
    } else if (inputCpf.value.length != 14 && senha.value.length < 5){
        showMessage("error", "Credenciais inválidas.");
        inputCpf.value =  ""
        senha.value = ""
        const HOST_API = "http://127.0.0.1:8080"
        const data = {
            "cpf": `${userCpf.value}`,
            "password": `${senha.value}`,
        }

        const requestInfo = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        
        fetch(`${HOST_API}/login/user`, requestInfo)
        .then(response => response)
        .then(data => {
            console.log(data);
        }).catch(error => {
            console.error("Erro na requisição:", error);
        });

        

        showMessage("success", "Login efetuado com sucesso!!!");
        setTimeout(() => {
            console.log("Passou")
            window.location.href = "../Pages/login.html";
        }, 3000);
    }
}

const loginButton = document.getElementById("loginBtn");
loginButton.addEventListener("click", login);
