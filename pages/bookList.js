window.Page.books = () => {

  main.innerHTML = '';

  tableHead = ['Título', 'Autor', 'Descrição', 'Tiragem'];

  tableData = [
    {
      title: 'Exemplo1',
      author: 'Autor1',
      description: 'Essa é a descrição para o teste mockado 1',
      tiragem: '10'
    },
    {
      title: 'Exemplo2',
      author: 'Autor2',
      description: 'Essa é a descrição para o teste mockado 2',
      tiragem: '20'
    },
    {
      title: 'Exemplo3',
      author: 'Autor3',
      description: 'Essa é a descrição para o teste mockado 3',
      tiragem: '30'
    }
  ];

  main.appendChild(
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
                children: myFramework.tableBody(tableData)
              }),
          ]
        })
      ]
    })
  );

};