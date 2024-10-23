function apiCall(){

    console.log("mizera");

    const HOST_API = "https://academic-events-api-83ac51d23457.herokuapp.com"

    const data = {
        "cpf": `${userCpf}`,
        "nome": `${inputNome.value}`,
        "foto": "Default",
        "telefone": `${userTelefone}`,
        "email": `${inputEmail.value}`,
        "password": `${inputSenha1.value}`,
        "rua": `${inputRua.value}`,
        "numero": `${inputNumero.value}`,
        "bairro": `${inputBairro.value}`,
        "cidade": `${inputCidade.value}`,
        "estado": `${inputEstado.value}`,
        "role": "ADM",
        // "role": "PARTICIPANT",
        // "role": "PROFESSOR",
    }

    // para o navegador criar a requisição
    const requestInfo = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    console.log(data)
    
    // fetch abre a conexao com o banco de dados
    fetch(`${HOST_API}/create/user`, requestInfo)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    }).catch(error => {
        console.error("Erro na requisição:", error);
    });
}

export default apiCall