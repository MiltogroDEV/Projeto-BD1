const userSession = JSON.parse(localStorage.getItem("userSession"));

// setInterval(() => {
    if (userSession) {
        console.log(userSession.cpf);
        console.log(userSession.nome);
        console.log(userSession.email);
        
        const userFoto = document.getElementById("userFoto");
        const userCpf = document.getElementById("userCpf");
        const userNome = document.getElementById("userNome");
        const userEmail = document.getElementById("userEmail");
        const userCidade = document.getElementById("userCidade");
        const userEstado = document.getElementById("userEstado");
        const userRua = document.getElementById("userRua");
        const userBairro = document.getElementById("userBairro");
        const userNumero = document.getElementById("userNumero");

        let userCpfFormatted = userSession.cpf[0] + userSession.cpf[1] + userSession.cpf[2] + "." + userSession.cpf[3] + userSession.cpf[4] + userSession.cpf[5] + "." + userSession.cpf[6] + userSession.cpf[7] + userSession.cpf[8] + "-" + userSession.cpf[9] + userSession.cpf[10]; 
        
        if(userCpf){
            userFoto.src = userSession.foto;
            userCpf.textContent = userCpfFormatted;
            userNome.textContent = userSession.nome;
            userEmail.textContent = userSession.email;
            
            userCidade.textContent = userSession.cidade + " - ";
            userEstado.textContent = userSession.estado + " | "; 
            userRua.textContent = userSession.rua + ", ";
            userBairro.textContent = userSession.bairro + ", ";
            userNumero.textContent = userSession.numero;
        }

    } else {
        console.log("Não está logado");
        // const cpfCpf = document.getElementById("cpfCpf");
        // cpfCpf.textContent = "Nenhum usuário está logado.";
        // window.location.href = "../Pages/login.html";
    }
// }, 1000);

const avatar = document.getElementById("avatar");

avatar.addEventListener('click', (e) => {
    window.location.href = "/pages/perfil.html";
})
