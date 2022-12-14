import './style.css'

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showSpinner();
    hideQuote();

    const data = new FormData(form);
    const response = await fetch('http://localhost:8080/inspire', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt'),
        })
    })

    if (response.ok){
        const { image } = await response.json();
        const result = document.querySelector('#result');
        result.innerHTML = `<img src="${image}" width="512" />`;

        const prettyPrompt = document.querySelector('.pretty-prompt')
        prettyPrompt.innerHTML = data.get('prompt');
    } else {
        const error = await response.text();
        hideSpinner();
        alert(error);
    }

    showQuote();
    hideSpinner();
});

function showQuote(){
    const prettyPrompt = document.querySelector('.pretty-prompt')
    prettyPrompt.style.opacity = 1;
}

function hideQuote(){
    const prettyPrompt = document.querySelector('.pretty-prompt')
    prettyPrompt.style.opacity = 0;
}

function showSpinner(){
    const button = document.querySelector('button');
    button.disabled = true;
    button.innerHTML = 'Inspiring... <span class="spinner">💡</span>';
}

function hideSpinner(){
    const button = document.querySelector('button');
    button.disabled = false;
    button.innerHTML = 'Inspire';
}