const API_KEY = ""; // PEGUEN ACA SU API KEY!!
const URL = "https://api.giphy.com/v1/gifs/";

const button = document.getElementById('sendButton');
const main = document.getElementById('main');
const inputElement = document.getElementById('search');

const spinner = document.getElementById('spinner');

button.addEventListener("click", ()=> {
    console.log('valor', inputElement.value);
    showSpinner();
    searchGif(inputElement.value);
});

function searchGif(valorABuscar){
    const req = new XMLHttpRequest();

    // URL + "search?api_key=" + API_KEY + "&q=" + valorABuscar;
    req.open('GET', `${URL}search?api_key=${API_KEY}&q=${valorABuscar}`, true);

    req.onreadystatechange = function(evt){
        if(req.readyState == 4){ // State DONE
            if (req.status == 200){ // Estado 200 == REQUEST OK
                //console.log('respuesta', req.response);
                var parseResponse = JSON.parse(req.response); // Hago un objeto JSON la Respuesta.
                madeGrid(parseResponse.data);
            }
        } else {
            console.log("Error ejecutando el pedido. Estado: ", req.readyState);
        };
    }

    req.send(null);
}

function madeGrid(data){
    let i;
    let images = '';

    console.log('objeto JS', data);
    for (i = 0; i < data.length; i++) {
      if (data[i].images && data[i].images.downsized.url) {
        images += `<li class='col-4'><img src="${data[i].images.downsized.url}" /></li>`;
      }
    }

    main.innerHTML = `<ul class='row'>${images}</ul>`;
    showSpinner();
}

function showSpinner() {
    spinner.classList.toggle('d-none');
}