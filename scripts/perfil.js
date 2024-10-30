import { apiCall } from "../scripts/components/apicalls.js";
import { showMessage } from "../scripts/components/showMessage.js";

const userSession = JSON.parse(localStorage.getItem("userSession"));

const userDisplay = document.getElementById("userDisplay");
const btnDisplay = document.getElementById("btnDisplay");

// const userFoto = document.getElementById("userFoto");
const userCpf = document.getElementById("userCpf");
const userNome = document.getElementById("userNome");
const userEmail = document.getElementById("userEmail");
const userCidade = document.getElementById("userCidade");
const userEstado = document.getElementById("userEstado");
const userRua = document.getElementById("userRua");
const userBairro = document.getElementById("userBairro");
const userNumero = document.getElementById("userNumero");
const userRole = document.getElementById("userRole");

const avatar = document.getElementById("avatar");
const btn1lc = document.getElementById("btn1lc");
const btn2lc = document.getElementById("btn2lc");

let userCpfFormatted = "";

if (userSession){
    userCpfFormatted = userSession.cpf[0] + userSession.cpf[1] + userSession.cpf[2] + "." + userSession.cpf[3] + userSession.cpf[4] + userSession.cpf[5] + "." + userSession.cpf[6] + userSession.cpf[7] + userSession.cpf[8] + "-" + userSession.cpf[9] + userSession.cpf[10];
}

const noAcess = document.getElementById("noAcess");

if (userSession) {

    if (userCpf){
        btnDisplay.style.display = "block";
        // userFoto.src = userSession.foto;
        userCpf.textContent = userCpfFormatted;
        userNome.textContent = userSession.nome;
        userEmail.textContent = userSession.email;
        
        userCidade.textContent = userSession.cidade + " - ";
        userEstado.textContent = userSession.estado + " | "; 
        userRua.textContent = userSession.rua + ", ";
        userBairro.textContent = userSession.bairro + ", ";
        userNumero.textContent = userSession.numero;

        userRole.textContent = userSession.role.charAt(0).toUpperCase() + userSession.role.slice(1);

    }
} else {
    noAcess.style.display = "block";
    avatar.style.display = "none";
    btn1lc.style.display = "block";
    btn2lc.style.display = "block";
}


avatar.addEventListener('click', (e) => {
    window.location.href = "/pages/perfil.html";
})

const btnInicio = document.getElementById("btnInicio");
const btnEventos = document.getElementById("btnEventos");

btnInicio.addEventListener('click', (e) => {
    if (userSession){
        if (userSession.role === "administrador") {
            window.location.href = "/Pages/adm/homeAdm.html";
        } else if (userSession.role === "professor") {
            window.location.href = "/Pages/professor/homeProf.html";
        } else if (userSession.role === "participante"){
            window.location.href = "/Pages/participante/homePart.html";
        }
    } else {
        window.location.href = "/index.html"
    }
});

btnEventos.addEventListener('click', (e) => {
    if (userSession){
        if (userSession.role === "administrador") {
            window.location.href = "/Pages/adm/eventosAdm.html";
        } else if (userSession.role === "professor") {
            window.location.href = "/Pages/professor/eventosProf.html";
        } else if (userSession.role === "participante"){
            window.location.href = "/Pages/participante/eventosPart.html";
        }
    } else {
        window.location.href = "/pages/eventos.html"
    }
});

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

let userEmailBool = false;

setInterval(() => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (regexEmail.test(editEmail.value)) {
        userEmailBool = true;
    }
}, 1);

async function atualizarDados(e) {
    e.preventDefault();

    if (!userEmailBool || editCidade.value.length < 1 || editEstado.value.length < 1 || editRua.value.length < 1 || editBairro.value.length < 1 || editNumero.value.length == 0) {
        showMessage("error", "Credenciais inválidas!");
        if (!userEmailBool) {
            editEmail.value = userSession.email;
        } if (editCidade.value.length < 1) {
            editCidade.value = userSession.cidade;
        } if (editEstado.value.length < 1) {
            editEstado.value = userSession.estado;
        } if (editRua.value.length < 1) {
            editRua.value = userSession.rua;
        } if (editBairro.value.length < 1) {
            editBairro.value = userSession.bairro;
        } if (editNumero.value.length == 0) {
            editNumero.value = userSession.numero;
        }
    } else {
        const data = {
            "userCpf": `${userSession.cpf}`,
            "email": `${editEmail.value}`,
            "rua": `${editRua.value}`,
            "cidade": `${editCidade.value}`,
            "estado": `${editEstado.value}`,
            "bairro": `${editBairro.value}`,
            "numero": `${editNumero.value}`,
        }

        try{
            const attemptLoggin = await apiCall("/update/user", "PUT", data);

            if (attemptLoggin.success) {
                showMessage("success", "Dados atualizados com sucesso!");
            
                userSession.email = editEmail.value;
                userSession.cidade = editCidade.value;
                userSession.estado = editEstado.value;
                userSession.rua = editRua.value;
                userSession.bairro = editBairro.value;
                userSession.numero = editNumero.value;
            
                localStorage.setItem("userSession", JSON.stringify(userSession));
            
                setTimeout(() => {
                    window.location.href = "/pages/perfil.html";
                }, 1000);
            } else if(attemptLoggin.error){
                showMessage("error", `${attemptLoggin.error}`);
                
                editEmail.value = userSession.email;
                editCidade.value = userSession.cidade;
                editEstado.value = userSession.estado;
                editRua.value = userSession.rua;
                editBairro.value = userSession.bairro;
                editNumero.value = userSession.numero;
            }
        } catch(e) {
            console.log(e);
        }
    }
}

const btnSalvarAlteracoes = document.getElementById("btnSalvarAlteracoes");
btnSalvarAlteracoes.addEventListener('click', atualizarDados);

const btnLogout = document.getElementById("btnLogout");
btnLogout.addEventListener('click', (e) => {
    localStorage.removeItem("userSession");
    window.location.href = "/Pages/login.html";
})