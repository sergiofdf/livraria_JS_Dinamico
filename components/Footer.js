window.Footer = () => {

  socialMedia = {
    instagram: 'https://www.instagram.com/sergiofdiasfilho/',
    facebook: 'https://www.facebook.com/fleurydiasfilho',
    linkedin: 'https://www.linkedin.com/in/sergio-fleury-dias-filho/',
    github: 'https://github.com/sergiofdf'
  }
  
  socialIcons = [];
  
  for (let key in socialMedia) {
    const link = myFramework.generalElement({ htmlElement: 'a', className: 'social-icon-link', attributeName: 'href', attributeValue: socialMedia[key]  });
    link.setAttribute('target', '_blank');
    const icon = myFramework.generalElement({ htmlElement: 'img', className: 'social-icon', attributeName: 'src', attributeValue: `../assets/img/${key}-icon.svg` });
    link.appendChild(icon);
    socialIcons.push(link);
  }
  

  document.body.appendChild(
    myFramework.container({
      elementType: 'footer',
      children: [
        myFramework.container({
          className: 'social-icons-container',
          children: socialIcons
          }
        ),
        myFramework.text('p', 'Contato: sergiofdf@gmail.com')
      ]
    })
  );

};