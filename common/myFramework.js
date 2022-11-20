window.myFramework = {
  generalElement: ({ htmlElement, className = "", id = "", attributeName = "", attributeValue = "" }) => {
    const element = document.createElement(htmlElement);
    if (className) { element.classList.add(className); }
    if (id) { element.id = id; }
    if (attributeName) { element.setAttribute(attributeName, attributeValue); }
    return element;
  },
  container: ({elementType = 'div', className = "", children}) => {
    const container = document.createElement(elementType);
    if (className) { container.classList.add(className); }
    for (const child of children) {
      container.appendChild(child);
    }
    return container;
  },
  link: ({ text, onClick = () => { } }) => {
    const link = document.createElement('a');
    link.textContent = text;
    link.addEventListener('click', onClick);
    return link;
  },
  button: () => { },
  label: (text) => {
    const labelElement = document.createElement('label');
    labelElement.textContent = text +':';
    return labelElement;
   },
  input: ({type = 'text', name, onKeyPress = ()=>{}}) => {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('name', name);
    input.addEventListener('keypress', onKeyPress);
    return input;
},
  text: (type, textData) => {
    const text = document.createElement(type);
    text.textContent = textData;
    return text;
  },
  tableHead: (headerArray) => {
    const theadFilled = headerArray.map( item => {
      const tElement = document.createElement('th');
      tElement.innerText = item;
      return tElement;
    });
    return theadFilled;
  },
  tableBody: (bodyArray) => {
    const bodyArrayFilled = bodyArray.map( item => {
      const tRow = document.createElement('tr');
      for (let key in item) {
        const data = document.createElement('td');
        data.innerText = item[key];
        tRow.appendChild(data);
      }
      return tRow;
    });
    return bodyArrayFilled;
  },
  loadCss: (reference) => {
    const cssLink = document.createElement('link');
    cssLink.setAttribute('rel', 'stylesheet');
    cssLink.setAttribute('type', 'text/css');
    cssLink.setAttribute('href', reference);
    
    document.head.appendChild(cssLink);   
  }
}