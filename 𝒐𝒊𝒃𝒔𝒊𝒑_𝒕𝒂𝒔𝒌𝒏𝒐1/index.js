

let input = document.getElementById('inputBox');

let btn = document.querySelectorAll('button');

let string = "";

let arr = Array.from(btn);


function processInput(value) {
    if (value === '=') {
        try {
            string = eval(string); 
            input.value = string;
        } catch {
            input.value = "Error"; 
            string = "";
        }
    } else if (value === 'AC') {
        string = ""; 
        input.value = string;
    } else if (value === 'DEL') {
        string = string.slice(0, -1); 
        input.value = string;
    } else {
        string += value; 
        input.value = string;
    }
}


arr.forEach(button => {
    button.addEventListener('click', (e) => {
        processInput(e.target.innerText); 
    });
});


document.addEventListener('keydown', (e) => {
    let allowedKeys = '0123456789+-*/.()'; 
    if (allowedKeys.includes(e.key)) {
        processInput(e.key);
    } else if (e.key === 'Enter') {
        e.preventDefault(); 
        processInput('=');
    } else if (e.key === 'Backspace') {
        processInput('DEL');
    } else if (e.key === 'Escape') {
        processInput('AC');
    }
});
