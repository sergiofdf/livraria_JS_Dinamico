window.Page.books = async () => {

  main.innerHTML = '';

  tableHead = ['Título', 'Autor', 'Descrição', 'Tiragem', 'Editar', 'Deletar'];

  const body = JSON.stringify({
    text: "",
    aluno: {
      uid: API.authCode,
    },
  });

  const bookList = await API.callApi({
    method: 'POST',
    service: '/lista',
    body
  });

  const tableData = bookList.map(book => {
    return {
      uid: book.uid,
      titulo: book.titulo,
      autor: book.autor,
      descricao: book.descricao,
      tiragem: book.tiragem,
      editIcon: '../assets/img/edit_icon.svg',
      deleteIcon: '../assets/img/delete_icon.svg'
    }
  })

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
        input: myFramework.input({
          name: 'description',
          value: selectedItem.descricao
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

    function closeModal() {
      const modal = document.querySelector('.modal-editBook');
      modal.remove();
    }

    async function updateBook() {
      const title = document.getElementsByName('title')[0];
      const author = document.getElementsByName('author')[0];
      const tiragem = document.getElementsByName('tiragem')[0];
      const description = document.getElementsByName('description')[0];

      debugger
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
      }

    }

    const pageContainer = document.querySelector('.pageContainer');
    pageContainer.appendChild(
      myFramework.modal(formData, updateBook, closeModal
      ));

  }

  async function deleteHandler() {
    const uid = this.className;
    const body = JSON.stringify({
      aluno: {
        uid: API.authCode
      },
      uid
    })

    const deleteResult = await API.callApi({
      method: 'DELETE',
      service: '',
      body
    })

    Page.books();

    myFramework.notification.create({
      text: 'Livro deletado com sucesso!',
      type: 'success',
    });

  }

  function searchByKeyWords() {
    const filteredBooksByKeyWords = bookList.filter(item => {
      return ( (item.titulo.toLocaleLowerCase().includes(this.value.toLocaleLowerCase()))
        || (item.autor.toLocaleLowerCase().includes(this.value.toLocaleLowerCase()))
      );
      
    });
    const filteredTableData = filteredBooksByKeyWords.map(book => {
      return {
        uid: book.uid,
        titulo: book.titulo,
        autor: book.autor,
        descricao: book.descricao,
        tiragem: book.tiragem,
        editIcon: '../assets/img/edit_icon.svg',
        deleteIcon: '../assets/img/delete_icon.svg'
      }
    })
    createTable(filteredTableData);
  }


  function createTable(filteredTableData) {
    const table = document.querySelector('.booksTable');
    table.remove();
    const tableContainer = document.querySelector('.table-container');
    tableContainer.appendChild(
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
                children: myFramework.tableBody(filteredTableData, editHandler, deleteHandler)
              }),
            ]
          })
        ]
      }));
  }

    main.appendChild(
      myFramework.container({
        className: 'pageContainer',
        children: [
          myFramework.input({
            name: 'searchInput',
            placeholder: 'Digite para buscar...',
            onKeyUp: searchByKeyWords
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
                    children: myFramework.tableBody(tableData, editHandler, deleteHandler)
                  }),
                ]
              })
            ]
          })
        ],
      })
    );
};