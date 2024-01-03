function uploadImage() {
    var formData = new FormData(document.getElementById("uploadForm"));

    fetch("https://ocr.asprise.com/api/v1/receipt", {
        method: "POST",
        body: formData

    })
    .then(response => response.json())
    .then(data => { 
        // Procesar el array devuelto
        mostrarDatosEnLista(data);
        // Enviar el array a la hoja de Google
        sendToGoogleSheet(data);
    })
    .catch(error => console.error('Error:', error));
}

// function displayResult(data) {
//      // Lógica para mostrar el resultado en la interfaz de usuario
//      document.getElementById("result").innerHTML = JSON.stringify(data, null, 2);
// }


// Obtener la referencia al elemento HTML donde mostrar la lista
// Obtener la referencia al elemento HTML donde mostrar la lista
const listaContainer = document.getElementById("result");

// Función recursiva para separar el JSON y mostrarlo en la lista
function mostrarDatosEnLista(data, parentKey = null) {
  // Crear un elemento de lista (ul)
  const lista = document.createElement("ul");

  // Iterar a través de las propiedades del objeto
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      // Crear un elemento de lista (li) para cada propiedad
      const listItem = document.createElement("li");

      // Crear un fragmento de documento para contener el texto
      const textFragment = document.createDocumentFragment();

      // Agregar la clave (nombre de la propiedad) al fragmento de texto
      const keyText = document.createTextNode(`${key}: `);
      textFragment.appendChild(keyText);

      // Si el valor de la propiedad es un objeto, llamar recursivamente a la función
      if (typeof data[key] === "object" && data[key] !== null) {
        // La clave se convierte en el "parentKey" para la recursión
        mostrarDatosEnLista(data[key], key);
      } else {
        // Si el valor no es un objeto, agregar directamente el valor al fragmento
        const valueText = document.createTextNode(data[key]);
        textFragment.appendChild(valueText);
      }

      // Agregar el fragmento de texto al elemento de lista
      listItem.appendChild(textFragment);

      // Agregar el elemento de lista a la lista no ordenada
      lista.appendChild(listItem);
    }
  }

  // Si se proporciona una clave principal (parentKey), agregar una etiqueta de nivel superior
  if (parentKey) {
    const topLevelItem = document.createElement("li");
    topLevelItem.textContent = parentKey;
    topLevelItem.appendChild(lista);
    listaContainer.appendChild(topLevelItem);
  } else {
    // Si no hay clave principal, agregar la lista directamente al contenedor HTML
    listaContainer.appendChild(lista);
  }
}

// Llamar a la función para mostrar los datos en la lista
mostrarDatosEnLista();


// Llamar a la función para mostrar los datos anidados en HTML
// mostrarDatosAnidados(data);





// function sendToGoogleSheet(data) {
//     // Lógica para enviar el array a una hoja de Google
//     // Puedes utilizar la API de Google Sheets o alguna biblioteca específica
//     // para realizar la conexión y la escritura en la hoja de Google.
// }