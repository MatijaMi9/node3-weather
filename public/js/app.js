

// fetch data from url and then run callback function
/*fetch('http://puzzle.mead.io/puzzle').then((response)=> {
    response.json().then((data) => {
        console.log(data);
        
    });
});*/




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {

    e.preventDefault(); // prevent refresh of browser

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    //console.log(location);
    fetch('/weather?address='+location).then((response) => {

    response.json().then((data)=> {
        if(data.error){
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.placeName;
            messageTwo.textContent = data.forecast;
        }
        
    });


});


});