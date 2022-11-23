window.Carrousel = (items, numberPerPage) => {

  let carrouselItems = [];
  
  function loadItems(numberPerPage, initialItem = 0){
    carrouselItems = [];
    carrouselItems.push(
      myFramework.generalElement({
        htmlElement: 'img',
        className: 'left-arrow',
        attributeName: 'src',
        attributeValue: '../assets/img/left-arrow.svg'
      }),
    );

    for (let i = 0; i < items.length; i++) {
      const item = myFramework.container({
        className: 'carrousel-item',
        children: [
          myFramework.generalElement({
            htmlElement: 'img',
            className: 'carrousel-image',
            attributeName: 'src',
            attributeValue: items[initialItem + i].img,
          }),
          myFramework.text('p', `Título: ${items[i].title}`),
          myFramework.text('p', `Autor: ${selectedBooks[i].author}`),
          myFramework.text('p', `Descrição: ${selectedBooks[i].description}`),
          myFramework.text('p', `Tiragem: ${selectedBooks[i].tiragem}`)
        ]
      });
      if( i >= numberPerPage){
        item.setAttribute('style', 'display: none');
      }
      carrouselItems.push(item);
    }

    carrouselItems.push(
      myFramework.generalElement({
        htmlElement: 'img',
        className: 'right-arrow',
        attributeName: 'src',
        attributeValue: '../assets/img/right-arrow.svg'
      }),
    );
      return carrouselItems;
  }

  return myFramework.container({
    className: 'selected-itens-container',
    children: [
      myFramework.container({
        className: 'carrousel',
        children: loadItems(numberPerPage)
      }),
    ]
  })
}