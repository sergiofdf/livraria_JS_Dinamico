window.Page.home = () => {

  main.innerHTML = '';

  selectedBooks = [
    {
      title: 'Exemplo1',
      author: 'Autor1',
      description: 'Descrição 1 para exemplo',
      tiragem: '100'
    },
    {
      title: 'Exemplo2',
      author: 'Autor2',
      description: 'Descrição 2 para exemplo',
      tiragem: '200'
    },
    {
      title: 'Exemplo3',
      author: 'Autor3',
      description: 'Descrição 3 para exemplo',
      tiragem: '300'
    },
    {
      title: 'Exemplo4',
      author: 'Autor4',
      description: 'Descrição 4 para exemplo',
      tiragem: '400'
    }
  ]

  main.appendChild(
    myFramework.container({
      className: 'home-container',
      children: [
        myFramework.text('h1', 'Veja os destaques selecionados pela nossa Livraria'),
        myFramework.container({
          className: 'selected-itens-container',
          children: [
            myFramework.container({
              className: 'carrousel',
              children: [
                myFramework.generalElement({
                  htmlElement: 'img',
                  className: 'left-arrow',
                  attributeName: 'src',
                  attributeValue: '../assets/img/left-arrow.svg'
                }),
                myFramework.container({
                  className: 'carrousel-item',
                  children: [
                    myFramework.generalElement({
                      htmlElement: 'img',
                      className: 'carrousel-image',
                      attributeName: 'src',
                      attributeValue: '../assets/img/cleanCode.jpg'
                    }),
                    myFramework.text('p', `Título: ${selectedBooks[0].title}`),
                    myFramework.text('p', `Autor: ${selectedBooks[0].author}`),
                    myFramework.text('p', `Descrição: ${selectedBooks[0].description}`),
                    myFramework.text('p', `Tiragem: ${selectedBooks[0].tiragem}`)
                  ]
                }),
                myFramework.container({
                  className: 'carrousel-item',
                  children: [
                    myFramework.generalElement({
                      htmlElement: 'img',
                      className: 'carrousel-image',
                      attributeName: 'src',
                      attributeValue: '../assets/img/designPatterns.jpg'
                    }),
                    myFramework.text('p', `Título: ${selectedBooks[1].title}`),
                    myFramework.text('p', `Autor: ${selectedBooks[1].author}`),
                    myFramework.text('p', `Descrição: ${selectedBooks[1].description}`),
                    myFramework.text('p', `Tiragem: ${selectedBooks[1].tiragem}`)
                  ]
                }),
                myFramework.generalElement({
                  htmlElement: 'img',
                  className: 'right-arrow',
                  attributeName: 'src',
                  attributeValue: '../assets/img/right-arrow.svg'
                }),
              ]
            }),
           
          ]
        })
      ]
    })
  );

};