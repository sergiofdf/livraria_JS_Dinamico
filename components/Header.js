window.Header = () => {

  document.body.appendChild(
    myFramework.container({
      elementType: 'header',
      children: [
        myFramework.generalElement({ htmlElement: 'img', className: 'logo', attributeName: 'src', attributeValue: '../assets/img/logo.png' }),
        myFramework.container({
          elementType: 'nav',
          className: 'nav-container',
          children: [
            myFramework.link({
              text: 'HOME',
              onClick: () => {  Page.home(); },
            }),
            myFramework.link({
              text: 'LIVROS',
              onClick: () => {  
                Page.books(); },
            }),
            myFramework.link({
              text: 'CADASTRO',
              onClick: () => { Page.register(); },
            }),
          ]
        })
      ]
    })
  );

};