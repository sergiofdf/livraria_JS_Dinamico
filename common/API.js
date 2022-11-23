window.API = {
  baseURL: 'http://livros.letscode.dev.netuno.org:25390/services/livro',
  authCode: '18c0e5eb-6e35-4f48-832b-82da55d55ec6',
  callApi: async ({method, service, body}) => {
    const response = await fetch(`${API.baseURL}/${service}`, {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json"
      },
      body,
    }).catch((error) => {
      console.log("Erro na comunicação:", error);
    });
  
    if (!response) {
      API.errorHandler(response);
      return [];
    }

    const data = await response.json();
    if(data){
      return data;
    }
    return;
  },
  errorHandler: () => {
    console.log("Erro : ","Falha na comunicação. Tente novamente mais tarde.");
  },
}