const userSession = JSON.parse(localStorage.getItem("userSession"));

if (userSession) {
    console.log("Usuário logado:", userSession.cpf);
    console.log("Role do usuário:", userSession.role);

    const cpfDisplay = document.getElementById("cpfDisplay");
    cpfDisplay.textContent = userSession.cpf;
} else {
    console.log("Nenhum usuário está logado.");
    // window.location.href = "../Pages/login.html";
}
