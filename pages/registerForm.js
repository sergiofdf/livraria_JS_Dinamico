window.Page.register = () => {

  main.innerHTML = '';

  const formData = [
    {
      label: myFramework.label('Título'),
      input: myFramework.input({ name: 'title' })
    },
    {
      label: myFramework.label('Autor'),
      input: myFramework.input({ name: 'author' })
    },
    {
      label: myFramework.label('Descrição'),
      input: myFramework.textArea({
        name: 'description',
        id: 'Descrição'
      })
    },
    {
      label: myFramework.label('Tiragem'),
      input: myFramework.input({ name: 'tiragem' })
    }
  ];

  dataContainers = formData.map(data => {
    return myFramework.container({
      className: 'book-data',
      children: [
        data.label,
        data.input
      ]
    });
  });

  function validateForm() {
    title = document.getElementsByName('title')[0];
    if (title.value == '') {
      return myFramework.notification.create({
        text: 'Título inválido.',
        type: 'error'
      });
    };

    author = document.getElementsByName('author')[0];
    if (author.value == '') {
      return myFramework.notification.create({
        text: 'Autor inválido.',
        type: 'error'
      });
    };

    description = document.getElementsByName('description')[0];
    if (description.value == '') {
      return myFramework.notification.create({
        text: 'Descrição inválida.',
        type: 'error'
      });
    };

    tiragem = document.getElementsByName('tiragem')[0];
    if (tiragem.value == '') {
      return myFramework.notification.create({
        text: 'Tiragem inválida.',
        type: 'error'
      });
    };

    return {
      titulo: title.value,
      autor: author.value,
      descricao: description.value,
      tiragem: Number(tiragem.value)
    };
  };

  function clearInputs() {
    title.value = '';
    author.value = '';
    description.value = '';
    tiragem.value = '';
  };

  main.appendChild(
    myFramework.container({
      elementType: 'form',
      className: 'book-form',
      children: [
        ...dataContainers,
        myFramework.button({
          text: 'Cadastrar',
          type: 'primary',
          onClick: async () => {
            myFramework.notification.remove();
            const book = validateForm();
            if (book.titulo) {
              const body = JSON.stringify({
                aluno: {
                  uid: API.authCode
                },
                tiragem: book.tiragem,
                titulo: book.titulo,
                autor: book.autor,
                descricao: book.descricao
              })
              const post = await API.callApi({
                method: 'POST',
                service: '',
                body
              });
              if (post) {
                clearInputs();
                myFramework.notification.create({
                  text: `Livro '${book.titulo}'cadastrado com sucesso!`,
                  type: 'success',
                });
                Page.register();
              }
            }
          }
        })
      ]
    })
  );
};