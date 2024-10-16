const form = document.querySelector('#item-form'); // formulario
const clearBtn = document.querySelector('#clear'); // butao de clenar tudo
const ul = document.querySelector('ul'); // a lista
const filter = document.querySelector('#filter'); // o texto de filtro.

function onSubmit (evt) {
    // evitar o submit
    evt.preventDefault();
    
    const itemList = document.querySelectorAll('li');

    const item = document.querySelector('#item-input').value;
    
    // fazer com que o usuario digite algo
    if(item === '' ) {
        alert('Por favor, verifique os seus dados.');
        return;
    } else if (itemList.length === 0) { 
        // caso não tenha nenhum item, ele criará o novo item
        return newLi();
    } else {
        // fazer a verificação se o item já existe ou n
        return verItems(); 
        
    }
    
} 

// funcao para criar caso nao tenha nenhum item;

const newLi = () => {
    const item = document.querySelector('#item-input').value;

    const newLi = document.createElement('li');
    const newLiText = document.createTextNode(`${item}`);
    const button = createButton('remove-item btn-link text-red');

    newLi.appendChild(newLiText);
    newLi.appendChild(button);


    ul.appendChild(newLi);
}


// funcao para verificar se o item digitado pelo usuario ja existe:.

const verItems = () => {
    const itemList = document.querySelectorAll('li'); // retorna um NodeList
    
    const item = document.querySelector('#item-input').value;
    
    const existe = 
        Array.from(itemList) // Array.from(a variavel) -> transforma o NodeList em Array.
        .some(element => { // some() -> faz a verificação e retorna true ou false.
            const itemText = element.firstChild.textContent.trim(); // -> Trim remove os espaços em branco. Importante nesse caso, visto que o primeiro node é #text (espaço em branco);
            return itemText === item;
        });

    if (existe) {
        alert('Este item já existe na lista.')
        return
    } else {
        return criarLi();
    }

}

const criarLi = () => {
    const item = document.querySelector('#item-input').value;

    const lastChild = document.querySelector('li:last-child');
    const newLi = document.createElement('li');
    const newLiText = document.createTextNode(`${item}`);
    newLi.appendChild(newLiText);

    lastChild.insertAdjacentElement('afterend', newLi);

    // criar o button.
    const button = createButton('remove-item btn-link text-red');
    newLi.appendChild(button);
}

// funcao para criar o button
const createButton = classe => {
    const button = document.createElement('button');
    button.className = classe;

    const icon = createIcon('fa-solid fa-xmark');

    button.appendChild(icon);
    return button;
}

// funcao para criar o icon
const createIcon = classe => {
    const icon = document.createElement('icon');
    icon.className = classe;

    return icon;
}


// funcao para filtrar o item

function onFilter(evt) {
    // convert to lower case
    const itemList = ul.getElementsByTagName('li'); // HTML COLECTION -> transformar em array. para fazer um loop.
    
    // transformar em array
    Array.from(itemList)
        .forEach(item => {
            const text = evt.target.value.toLowerCase();
            const itemName = item.firstChild.textContent.trim();
            if(itemName.toLowerCase().indexOf(text) !== -1) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        })
}


// funcao para excluir apenas 1 task;

ul.addEventListener('click', evt => {
    if(evt.target.classList.contains('fa-solid')) {
        const li = evt.target.closest('li');
        ul.removeChild(li);
    }
})



// funcao para limpar tudo
function onClearAll() {
    const itemList = document.querySelector('ul')
    
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
}


// Fazer a verificação caso o usuário submita.
form.addEventListener('submit', onSubmit);

// Tirar todos as li, caso o usuario queira.
clearBtn.addEventListener('click', onClearAll);

// Filtar a tarefa caso o usuario queira
filter.addEventListener('keyup', onFilter);
