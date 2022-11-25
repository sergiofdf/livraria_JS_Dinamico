window.API = {
  baseURL: 'http://livros.letscode.dev.netuno.org:25390/services/livro',
  authCode: '18c0e5eb-6e35-4f48-832b-82da55d55ec6',
  callApi: async ({ method, service, body }) => {
    try {
      const response = await fetch(`${API.baseURL}/${service}`, {
        method: method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json'
        },
        body,
      });

      if (!response.ok) {
        myFramework.notification.create({ 'type': 'error', 'text': 'Erro na comunicação com a API' });
        return [];
      };

      const data = await response.json();
      if (data) {
        return data;
      };
      return [];
    } catch (error) {
      myFramework.notification.create({ 'text': 'Erro na comunicação com a API.', 'type': 'error' });
      console.error(`Erro na comunicação. Erro: \n ${error}`);
    };
  },
};