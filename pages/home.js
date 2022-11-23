window.Page.home = () => {

  main.innerHTML = '';

  selectedBooks = [
    {
      img: '../assets/img/cleanCode.jpg',
      title: 'Código Limpo',
      author: 'Robert Martin',
      description: 'Mesmo um código ruim pode funcionar. Mas se ele não for limpo, pode acabar com uma empresa de desenvolvimento. Perdem-se a cada ano horas incontáveis e recursos importantes devido a um código mal escrito.',
      tiragem: '4149'
    },
    {
      img: '../assets/img/designPatterns.jpg',
      title: 'Padrões de Projetos',
      author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
      description: 'Catálogo de soluções simples e sucintas para os problemas mais frequentes na área de projeto, assinado por quatro profissionais com grande experiência em software orientado a objetos',
      tiragem: '405'
    },
    {
      img: '../assets/img/arquiteturaLimpa.jpg',
      title: 'Arquitetura Limpa',
      author: 'Robert Martin',
      description: 'As regras universais de arquitetura de software aumentam dramaticamente a produtividade dos desenvolvedores ao longo da vida dos sistemas de software.',
      tiragem: '2565'
    },
    {
      img: '../assets/img/phyton3.jpg',
      title: 'Aprenda Python 3 do jeito certo',
      author: 'Zed Shaw',
      description: 'Zed Shaw aperfeiçoou o melhor sistema do mundo para aprender o Python 3. Siga-o e você será bem-sucedido ― como os milhões de novatos que Zed ensinou até hoje! Você entra com a disciplina, o comprometimento e a persistência; o autor proporciona o resto.',
      tiragem: '400'
    },
    {
      img: '../assets/img/devOps.jpg',
      title: 'DevOps para leigos',
      author: 'Emily Freeman',
      description: 'Com o DevOps, podemos acelerar o ciclo de vida de entrega de software ― entendendo processos, ferramentas e mindset que impulsionam sua cultura. O livro ajuda engenheiros de software e diretores tecnológicos a transformar suas organizações e adotar uma estrutura DevOps.',
      tiragem: '32'
    },
    {
      img: '../assets/img/javascript.jpg',
      title: 'JavaScript: O Guia Definitivo',
      author: 'David Flanagan',
      description: 'Referência completa para programadores, JavaScript: O guia definitivo fornece uma ampla descrição da linguagem JavaScript básica e das APIs JavaScript do lado do cliente definidas pelos navegadores Web.',
      tiragem: '260'
    },
    {
      img: '../assets/img/node.jpg',
      title: 'Aprendendo Node: Usando JavaScript no Servidor',
      author: 'Shelley Powers',
      description: 'Reúna o conhecimento de programação que você já usa no navegador e empregue no servidor com o Node! Aprenda a criar aplicações em rede de alto desempenho e plenamente escalonáveis nesta plataforma baseada em JavaScript.',
      tiragem: '138'
    }
  ];

  let numberPerPage = 3;

  loadPage();
  carrouselResize();

  function loadPage(){

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
  }

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

  window.addEventListener('resize', carrouselResize);

  function carrouselResize () {
    const home = document.querySelector('.home-container');
    if(!home)
    { 
      return
    }
    if (window.innerWidth < 900 && window.innerWidth > 600) {
      main.innerHTML = '';
      numberPerPage = 2;
      loadPage();
    } 
    else if (window.innerWidth <= 600){
      main.innerHTML = '';
      numberPerPage = 1;
      loadPage();
    }
    else {
      main.innerHTML = '';
      numberPerPage = 3;
      loadPage();
    }
  }
}