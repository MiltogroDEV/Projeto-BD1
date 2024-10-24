function apiCall(root, method, data){
    const HOST_API = "https://academic-events-api-83ac51d23457.herokuapp.com"

    const requestInfo = {
        method: `${method}`,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    console.log(data)
    
    fetch(`${HOST_API}${root}`, requestInfo)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    }).catch(error => {
        console.error("Erro na requisição:", error);
    });
    
    return data;
}

export { apiCall };