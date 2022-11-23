window.Page.home = () => {

  main.innerHTML = '';

  selectedBooks = [
    {
      img: '../assets/img/cleanCode.jpg',
      title: 'Exemplo1',
      author: 'Autor1',
      description: 'Descrição 1 para exemplo',
      tiragem: '100'
    },
    {
      img: '../assets/img/designPatterns.jpg',
      title: 'Exemplo2',
      author: 'Autor2',
      description: 'Descrição 2 para exemplo',
      tiragem: '200'
    },
    {
      img: '../assets/img/cleanCode.jpg',
      title: 'Exemplo3',
      author: 'Autor3',
      description: 'Descrição 3 para exemplo',
      tiragem: '300'
    },
    {
      img: '../assets/img/cleanCode.jpg',
      title: 'Exemplo4',
      author: 'Autor4',
      description: 'Descrição 4 para exemplo',
      tiragem: '400'
    },
    {
      img: '../assets/img/cleanCode.jpg',
      title: 'Exemplo5',
      author: 'Autor5',
      description: 'Descrição 5 para exemplo',
      tiragem: '500'
    },
    {
      img: '../assets/img/designPatterns.jpg',
      title: 'Exemplo6',
      author: 'Autor6',
      description: 'Descrição 6 para exemplo',
      tiragem: '600'
    }
  ];

  let numberPerPage = 3;

  main.appendChild(
    myFramework.container({
      className: 'home-container',
      children: [
        myFramework.text('h1', 'Veja os destaques selecionados pela nossa Livraria'),
        Carrousel(selectedBooks, numberPerPage)
      ]
    })
  );

  const nextItem = main.querySelector('.right-arrow');
  const previousItem = main.querySelector('.left-arrow');

  nextItem.addEventListener('click', onClickNext);
  previousItem.addEventListener('click', onClickPrevious);

  function onClickNext() {
    const items = main.querySelectorAll('.carrousel-item');

    let inicial = -1;
    let contador = 0;

    for (let i = 0; i < items.length; i++) {
      if (items[i].style.display != 'none' && inicial == -1) {
        inicial = i ;
      }
      items[i].style.display = 'none';
    }

    for(let j = inicial + numberPerPage; contador < numberPerPage; j++) {
      if( j > items.length - 1) {
        j = 0;
      }
      items[j].style.display = 'flex';
      ++contador;
    }
  }

  function onClickPrevious() {
    const items = main.querySelectorAll('.carrousel-item');
    let inicial = -1;
    let contador = 0;

    for (let i = 0; i < items.length; i++) {
      if (items[i].style.display != 'none' && inicial == -1) {
        inicial = i ;
      }
      items[i].style.display = 'none';
    }

    for(let j = inicial - 1; contador < numberPerPage; j--) {
      if( j < 0) {
        j = items.length - 1;
      }
      items[j].style.display = 'flex';
      ++contador;
    }
  }
}