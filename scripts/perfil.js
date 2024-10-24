const userSession = JSON.parse(localStorage.getItem("userSession"));

setInterval(() => {
    if (userSession) {
        console.log("Usuário logado:", userSession.cpf);
        // console.log("Role do usuário:", userSession.role);
        
        const userDisplay = document.getElementById("userDisplay");

        if(userDisplay){
            userDisplay.textContent = userSession.cpf;
        }
    } else {
        console.log("Não está logado");
        // const cpfDisplay = document.getElementById("cpfDisplay");
        // cpfDisplay.textContent = "Nenhum usuário está logado.";
        // window.location.href = "../Pages/login.html";
    }
}, 1000);

const avatar = document.getElementById("avatar");

avatar.addEventListener('click', (e) => {
    window.location.href = "/pages/perfil.html";
})
