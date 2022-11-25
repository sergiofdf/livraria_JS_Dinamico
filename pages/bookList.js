window.Page.books = async () => {

  main.innerHTML = '';

  tableHead = ['Título', 'Autor', 'Descrição', 'Tiragem', 'Editar', 'Deletar'];

  const body = JSON.stringify({
    text: '',
    aluno: {
      uid: API.authCode,
    },
  });

  const loadingSpinner = document.createElement('div');
  loadingSpinner.setAttribute('id', 'loading');
  loadingSpinner.setAttribute('class', 'loading');
  loadingSpinner.innerText = 'Loading&#8230;';
  loadingSpinner.style.visibility = 'visible';
  main.appendChild(loadingSpinner);

  const bookList = await API.callApi({
    method: 'POST',
    service: '/lista',
    body
  });

  loadingSpinner.style.visibility = 'hidden';

  const tableData = bookList.map(book => {
    return {
      uid: book.uid,
      titulo: book.titulo,
      autor: book.autor,
      descricao: book.descricao,
      tiragem: book.tiragem,
      editIcon: '../assets/img/edit_icon.svg',
      deleteIcon: '../assets/img/delete_icon.svg'
    };
  });

  async function editHandler() {
    const uidBook = this.className;
    const selectedItem = bookList.filter(book => book.uid == uidBook)[0];

    const formData = [
      {
        label: myFramework.label('Título'),
        input: myFramework.input({
          name: 'title',
          value: selectedItem.titulo
        })
      },
      {
        label: myFramework.label('Autor'),
        input: myFramework.input({
          name: 'author',
          value: selectedItem.autor
        })
      },
      {
        label: myFramework.label('Descrição'),
        input: myFramework.textArea({
          name: 'description',
          id: 'Descrição',
          textValue: selectedItem.descricao
        })
      },
      {
        label: myFramework.label('Tiragem'),
        input: myFramework.input({
          name: 'tiragem',
          value: selectedItem.tiragem
        })
      }
    ];

    async function updateBook() {
      const title = document.getElementsByName('title')[0];
      const author = document.getElementsByName('author')[0];
      const tiragem = document.getElementsByName('tiragem')[0];
      const description = document.getElementsByName('description')[0];

      const body = JSON.stringify({
        uid: uidBook,
        aluno: {
          uid: API.authCode
        },
        tiragem: Number(tiragem.value),
        titulo: title.value,
        autor: author.value,
        descricao: description.value
      });

      const update = await API.callApi({
        method: 'PUT',
        service: '',
        body
      });

      if (update) {
        closeModal();
        Page.books();
        myFramework.notification.create({
          text: `Livro '${title.value}' atualizado com sucesso!`,
          type: 'success',
        });
      };
    };

    const pageContainer = document.querySelector('.bookListPageContainer');

    const form = myFramework.form(formData);

    pageContainer.appendChild(
      myFramework.modal(
        form,
        {
          text: 'Atualizar',
          type: 'primary',
          onClick: updateBook
        },
        {
          text: 'Cancelar',
          type: 'cancel',
          onClick: closeModal
        }
      ));
  };

  function closeModal() {
    const modal = document.querySelector('.modal-editBook');
    modal.remove();
  };

  async function deleteHandler() {
    const uid = this.id;
    const body = JSON.stringify({
      aluno: {
        uid: API.authCode
      },
      uid
    });

    await API.callApi({
      method: 'DELETE',
      service: '',
      body
    });

    Page.books();

    myFramework.notification.create({
      text: 'Livro deletado com sucesso!',
      type: 'success',
    });
  };

  function confirmDelete() {
    const uid = this.className;
    main.appendChild(
      myFramework.modal(
        [myFramework.text('p', 'Tem certeza que deseja apagar o item selecionado?')],
        {
          text: 'Deletar',
          type: 'cancel',
          id: uid,
          onClick: deleteHandler
        },
        {
          text: 'Cancelar',
          type: 'primary',
          onClick: closeModal
        })
    );
  };

  async function searchByKeyWords() {
    const search = document.getElementsByName('searchInput')[0];
    const loadingSpinner = document.getElementById('loading');
    loadingSpinner.style.visibility = 'visible';

    const bodyFiltered = JSON.stringify({
      text: search.value.toLocaleLowerCase(),
      aluno: {
        uid: API.authCode,
      },
    });

    const filteredBooksByKeyWords = await API.callApi({
      method: 'POST',
      service: '/lista',
      body: bodyFiltered
    });

    loadingSpinner.style.visibility = 'hidden';
    search.value = '';

    const filteredTableData = filteredBooksByKeyWords.map(book => {
      return {
        uid: book.uid,
        titulo: book.titulo,
        autor: book.autor,
        descricao: book.descricao,
        tiragem: book.tiragem,
        editIcon: '../assets/img/edit_icon.svg',
        deleteIcon: '../assets/img/delete_icon.svg'
      };
    });
    createTable(filteredTableData);

    const storagedItems = JSON.parse(localStorage.getItem('searchedBooks') || '[]');

    storagedItems.push(filteredBooksByKeyWords);

    if (storagedItems.length > 3) {
      storagedItems.shift();
    };

    localStorage.setItem('searchedBooks', JSON.stringify(storagedItems));
  };

  function loadDataStorage() {
    const storagedData = JSON.parse(localStorage.getItem('searchedBooks'));
    if (!storagedData) {
      myFramework.notification.create({ text: 'Buscas prévias indisponíveis.', type: 'alert' });
      return;
    };
    let previousSearch = [];
    if (this.id == 'ultimaBusca') {
      previousSearch = storagedData.slice(-1);
    } else if (this.id == 'penultimaBusca' && storagedData.length > 1) {
      previousSearch = storagedData.slice(-2, -1);
    } else if (this.id == 'antiPenultimaBusca' && storagedData.length > 2) {
      previousSearch = storagedData.slice(-3, -2);
    } else {
      myFramework.notification.create({ text: 'Busca selecionada está indisponível.', type: 'alert' });
    };

    const previousTableData = previousSearch[0].map(book => {
      return {
        uid: book.uid,
        titulo: book.titulo,
        autor: book.autor,
        descricao: book.descricao,
        tiragem: book.tiragem,
        editIcon: '../assets/img/edit_icon.svg',
        deleteIcon: '../assets/img/delete_icon.svg'
      };
    });
    createTable(previousTableData);
  };


  function createTable(filteredTableData) {
    const table = document.querySelector('.booksTable');
    table.remove();
    const tableContainer = document.querySelector('.table-container');
    tableContainer.appendChild(
      myFramework.container({
        elementType: 'table',
        className: 'booksTable',
        children: [
          myFramework.container({
            elementType: 'thead',
            className: 'booksTable-head',
            children: myFramework.tableHead(tableHead)
          }),
          myFramework.container({
            elementType: 'tbody',
            className: 'booksTable-body',
            children: myFramework.tableBody(filteredTableData, editHandler, deleteHandler)
          }),
        ]
      }));
  };

  main.appendChild(
    myFramework.container({
      className: 'bookListPageContainer',
      children: [
        myFramework.container({
          className: 'searchContainer',
          children: [
            myFramework.input({
              name: 'searchInput',
              placeholder: 'Digite a busca...',
            }),
            myFramework.button({
              text: 'Buscar',
              type: 'primary',
              onClick: searchByKeyWords
            }),
          ],
        }),
        myFramework.container({
          className: 'fastLinksContainer',
          children: [
            myFramework.text('h2', 'Links para carregar buscas prévias'),
            myFramework.link({
              text: 'Última Busca',
              id: 'ultimaBusca',
              onClick: loadDataStorage
            }),
            myFramework.link({
              text: 'Penúltima Busca',
              id: 'penultimaBusca',
              onClick: loadDataStorage
            }),
            myFramework.link({
              text: 'Anti-penúltima Busca',
              id: 'antiPenultimaBusca',
              onClick: loadDataStorage
            }),
          ]
        }),
        myFramework.container({
          className: 'table-container',
          children: [
            myFramework.container({
              elementType: 'table',
              className: 'booksTable',
              children: [
                myFramework.container({
                  elementType: 'thead',
                  className: 'booksTable-head',
                  children: myFramework.tableHead(tableHead)
                }),
                myFramework.container({
                  elementType: 'tbody',
                  className: 'booksTable-body',
                  children: myFramework.tableBody(tableData, editHandler, confirmDelete)
                }),
              ]
            })
          ]
        })
      ],
    })
  );
};