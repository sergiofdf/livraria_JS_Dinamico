window.Page.register = () => {

  main.innerHTML = '';

  formData = [
    {
      label: myFramework.label('Título'),
      input: myFramework.input({name: 'title'})
    },
    {
      label: myFramework.label('Autor'),
      input: myFramework.input({name: 'author'})
    },
    {
      label: myFramework.label('Descrição'),
      input: myFramework.input({name: 'description'})
    },
    {
      label: myFramework.label('Tiragem'),
      input: myFramework.input({name: 'tiragem'})
    }
  ];

  dataContainers = formData.map( data => {
    return myFramework.container({
      className: 'book-data',
      children: [
        data.label,
        data.input
      ]});
  })

  main.appendChild(
    myFramework.container({
      elementType: 'form',
      className: 'book-form',
      children: dataContainers
    })
  );

};