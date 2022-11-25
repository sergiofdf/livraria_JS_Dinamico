window.myFramework = {
  generalElement: ({ htmlElement, className = '', id = '', attributeName = '', attributeValue = '' }) => {
    const element = document.createElement(htmlElement);
    if (className) { element.classList.add(className); };
    if (id) { element.id = id; };
    if (attributeName) { element.setAttribute(attributeName, attributeValue); };
    return element;
  },
  container: ({ elementType = 'div', className = '', children }) => {
    const container = document.createElement(elementType);
    if (className) { container.classList.add(className); };
    for (const child of children) {
      container.appendChild(child);
    };
    return container;
  },
  link: ({ text, id = '', onClick = () => { } }) => {
    const link = document.createElement('a');
    link.textContent = text;
    if (id) { link.setAttribute('id', id); };
    link.addEventListener('click', onClick);
    return link;
  },
  button: ({ text, type = 'default', id = '', onClick = () => { } }) => {
    const button = document.createElement('button');
    button.classList.add(type);
    button.setAttribute('type', 'button');
    if (id) { button.id = id; };
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
  },
  label: (text) => {
    const labelElement = document.createElement('label');
    labelElement.textContent = text + ':';
    return labelElement;
  },
  input: ({ type = 'text', name, value = '', onKeyUp = () => { }, placeholder = '' }) => {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('name', name);
    input.setAttribute('value', value);
    input.setAttribute('placeholder', placeholder);
    input.addEventListener('keyup', onKeyUp);
    return input;
  },
  textArea: ({ name, id, textValue = '' }) => {
    const textAreaElement = document.createElement('textarea');
    textAreaElement.setAttribute('name', name);
    textAreaElement.setAttribute('id', id);
    textAreaElement.value = textValue;
    return textAreaElement;
  },
  text: (type, textData) => {
    const text = document.createElement(type);
    text.textContent = textData;
    return text;
  },
  tableHead: (headerArray) => {
    const theadFilled = headerArray.map(item => {
      const tElement = document.createElement('th');
      tElement.innerText = item;
      tElement.setAttribute('class', item);
      return tElement;
    });
    return theadFilled;
  },
  tableBody: (bodyArray, editHandler, deleteHandler) => {
    const bodyArrayFilled = bodyArray.map(item => {
      const tRow = document.createElement('tr');
      for (let key in item) {
        if (!String(key).includes('uid')) {
          const data = document.createElement('td');
          data.setAttribute('class', key);
          if (String(item[key]).includes('.svg')) {
            const img = document.createElement('img');
            img.setAttribute('class', 'icon-img');
            if (String(item[key]).includes('edit')) {
              img.setAttribute('class', item.uid);
              img.addEventListener('click', editHandler);
            };
            if (String(item[key]).includes('delete')) {
              img.setAttribute('class', item.uid);
              img.addEventListener('click', deleteHandler);
            };
            img.setAttribute('src', item[key]);
            data.appendChild(img);
          } else {
            data.innerText = item[key];
          };
          tRow.appendChild(data);
        };
      }
      return tRow;
    });
    return bodyArrayFilled;
  },
  form: (formData) => {
    const form = formData.map(data => {
      return myFramework.container({
        className: 'book-data',
        children: [
          data.label,
          data.input
        ]
      });
    });
    return form;
  },
  modal: (data, firstButtonData, secondButtonData) => {
    const modal = myFramework.container(
      {
        className: 'modal-editBook',
        children: [
          myFramework.container({
            className: 'modal-dataContainer',
            children: [
              ...data,
              myFramework.container({
                className: 'modal-buttons-container',
                children: [
                  myFramework.button(firstButtonData),
                  myFramework.button(secondButtonData)
                ]
              })
            ]
          })
        ]
      });
    return modal;
  },
  modalDelete: () => {
    const modal = myFramework.container(
      {
        className: 'modal-editBook',
        children: [
          myFramework.container({
            className: 'modal-dataContainer',
            children: [
              myFramework.text('p', 'Tem certeza que deseja deletar o item selecionado?'),
              myFramework.container({
                className: 'modal-buttons-container',
                children: [
                  myFramework.button({
                    text: 'Deletar',
                    type: 'cancel',
                    onClick: actionHandler
                  }),
                  myFramework.button({
                    text: 'Cancelar',
                    type: 'primary',
                    onClick: closeHandler
                  })
                ]
              }),
            ]
          })
        ]
      });
    return modal;
  },
  loadCss: (reference) => {
    const cssLink = document.createElement('link');
    cssLink.setAttribute('rel', 'stylesheet');
    cssLink.setAttribute('type', 'text/css');
    cssLink.setAttribute('href', reference);
    document.head.appendChild(cssLink);
  },
  notification: {
    timer: null,
    element: null,
    create: ({ text, type }) => {
      myFramework.notification.remove();
      const element = document.createElement('div');
      element.classList.add('notification');
      element.classList.add(`notification-${type}`);
      element.textContent = text;
      myFramework.notification.element = element;
      document.body.appendChild(element);
      myFramework.notification.timer = setTimeout(() => {
        myFramework.notification.remove();
      }, 5000);
    },
    remove: () => {
      if (myFramework.notification.element) {
        clearTimeout(myFramework.notification.timer);
        document.body.removeChild(myFramework.notification.element);
        myFramework.notification.element = null;
      };
    }
  }
};