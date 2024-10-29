const userSession = JSON.parse(localStorage.getItem("userSession"));

const userFoto = document.getElementById("userFoto");
const userCpf = document.getElementById("userCpf");
const userNome = document.getElementById("userNome");
const userEmail = document.getElementById("userEmail");
const userCidade = document.getElementById("userCidade");
const userEstado = document.getElementById("userEstado");
const userRua = document.getElementById("userRua");
const userBairro = document.getElementById("userBairro");
const userNumero = document.getElementById("userNumero");

let userCpfFormatted = "";

if (userSession){
    userCpfFormatted = userSession.cpf[0] + userSession.cpf[1] + userSession.cpf[2] + "." + userSession.cpf[3] + userSession.cpf[4] + userSession.cpf[5] + "." + userSession.cpf[6] + userSession.cpf[7] + userSession.cpf[8] + "-" + userSession.cpf[9] + userSession.cpf[10]; 
}

const noAcess = document.getElementById("noAcess");

if (userSession) {
    console.log(userSession.cpf);
    console.log(userSession.role);
    
    if(userCpf){
        // userFoto.src = userSession.foto;
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
    noAcess.style.display = "block";
}

const avatar = document.getElementById("avatar");

avatar.addEventListener('click', (e) => {
    window.location.href = "/pages/perfil.html";
})

const btnInicio = document.getElementById("btnInicio");
const btnEventos = document.getElementById("btnEventos");

btnInicio.addEventListener('click', (e) => {
    if (userSession.role === "ADM") {
        window.location.href = "/Pages/adm/homeAdm.html";
    } else if (userSession.role === "professor") {
        window.location.href = "/Pages/professor/homeProf.html";
    } else if (userSession.role === "participante"){
        window.location.href = "/Pages/participante/homePart.html";
    } else {
        window.location.href = "/index.html"
    }
});

btnEventos.addEventListener('click', (e) => {
    if (userSession.role === "ADM") {
        window.location.href = "/Pages/adm/homeAdm.html";
    } else if (userSession.role === "professor") {
        window.location.href = "/Pages/professor/homeProf.html";
    } else if (userSession.role === "participante"){
        window.location.href = "/Pages/participante/homePart.html";
    } else {
        window.location.href = "/pages/eventos.html"
    }
});

const btnLogout = document.getElementById("btnLogout");

const editNome = document.getElementById("editNome");
const editEmail = document.getElementById("editEmail");
const editCpf = document.getElementById("editCpf");
const editCidade = document.getElementById("editCidade");
const editEstado = document.getElementById("editEstado");
const editRua = document.getElementById("editRua");
const editBairro = document.getElementById("editBairro");
const editNumero = document.getElementById("editNumero");

document.addEventListener('DOMContentLoaded', () => {
    const btnEditPerfil = document.getElementById("btnEditPerfil");
    
    btnEditPerfil.addEventListener('click', () => {
        editNome.value = userSession.nome;
        editEmail.value = userSession.email;
        editCpf.value = userCpfFormatted;
        editCidade.value = userSession.cidade;
        editEstado.value = userSession.estado;
        editRua.value = userSession.rua;
        editBairro.value = userSession.bairro;
        editNumero.value = userSession.numero;

        const editProfileModal = new bootstrap.Modal(document.getElementById("editProfileModal"));
        editProfileModal.show();
    });
});

const btnSalvarAlteracoes = document.getElementById("btnSalvarAlteracoes");

function atualizarDados() {
    const data = {
        "cpf": `${userCpf}`,
        "nome": `${inputNome.value}`,
        "foto": `Default`,
        "telefone": `${userTelefone}`,
        "email": `${inputEmail.value}`,
        "password": `${inputSenha1.value}`,
        "rua": `${inputRua.value}`,
        "numero": `${inputNumero.value}`,
        "bairro": `${inputBairro.value}`,
        "cidade": `${inputCidade.value}`,
        "estado": `${inputEstado.value}`,
        "role": "PARTICIPANT",
        // "role": "ADM",
    }
}

btnSalvarAlteracoes.addEventListener('click', atualizarDados);