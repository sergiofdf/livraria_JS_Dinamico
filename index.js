(() => {
  window.Page = {};

  for (const file of [
    'common/myFramework',
    'common/API',
    'pages/home',
    'pages/bookList',
    'pages/registerForm',
    'components/Header',
    'components/Footer',
    'components/Carrousel'
  ]) {
    const script = document.createElement('script')
    script.setAttribute('src', `${file}.js`)

    document.head.appendChild(script);
  }

  window.addEventListener('load', () => {
    
    Header();

    window.main = myFramework.generalElement({htmlElement: 'main'});
    document.body.appendChild(main);

    Page.home();

    Footer();

    myFramework.loadCss('styles.css');

  });

})();