const username = document.querySelector('#username');
const pass1 = document.querySelector('#pass1');
const pass2 = document.querySelector('#pass2');
const email = document.querySelector('#email');
const btnClear = document.querySelector('.button-clear');
const btnSend = document.querySelector('.button-send');
const btnClose = document.querySelector('.button-close');
const popup = document.querySelector('.popup');

// function for button Clear
const btnClearFcn = e => {
    e.preventDefault();
    const inTable = [username, pass1, pass2, email];
    inTable.forEach(element => {
        element.value = '';
        element.parentElement.classList.remove('error-input');
        // clearError(element);
    });
}
// function for button Close
const btnCloseFcn = e => {
    e.preventDefault();
    const inTable = [username, pass1, pass2, email];
    inTable.forEach(element => {
        element.value = '';
        clearError(element);
        popup.classList.remove('show-popup');
    });
}

// error functions 
const showErrorText = (inputElem, text) => {
        const inputParent = inputElem.parentElement;
        inputParent.classList.add('error-input');
        const findError = inputParent.querySelector('.error');//find error
        findError.textContent = text; // text for errors
}
const clearError = (inputElem) => {
    const inputParent = inputElem.parentElement;
    inputParent.classList.remove('error-input');
}

// function with conditions for all inputs
const validateInputs = (input) => {
    input.forEach(element => {
        if (element.value == '') {
            showErrorText(element, element.placeholder);
        }
        else if (element.value.includes(' ')) {
            const spaceError = `Don't use "space"`;
            showErrorText(element, spaceError);
        } 
        else {
            // clear suitable error when conditions are false
            clearError(element);
        }
    });
}

// checking length
const validateInputsLengthsMin = (input, length) => {
    if(input.value.length < length) {
        const errorText = `Length must be greater than ${length}`;
        showErrorText(input, errorText);
    }
}
const validateInputsLengthsMax = (input, length) => {
    if(input.value.length > length) {
        const errorText = `Length must be less than ${length}`;
        showErrorText(input, errorText);
    }
}

// comparing passwords
const comparePass = (pass1, pass2) => {
    if(pass2.value !== pass1.value) {
        const errorTextpass = 'Passwords must be the same';
        showErrorText(pass2, errorTextpass);
        showErrorText(pass1, errorTextpass);
    }
}

// checking email //regExp //test
const validateMail = mail => {

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

    if(re.test(mail.value)) {
        clearError(mail);
    }
    else {
        const errorTextMail = 'E-mail is incorrect';
        showErrorText(mail, errorTextMail);
    }
}

// Sending function based on checking errors
const checkErrors = (input) => {
    return !(input.parentElement.classList.contains('error-input'));
}
const SendingFcn = (table) => {
    if(table.every(checkErrors)) {
        popup.classList.add('show-popup');
    }
}

// events
btnClose.addEventListener('click', btnCloseFcn);
btnClear.addEventListener('click', btnClearFcn);
btnSend.addEventListener('click', e => {
    e.preventDefault();
    
    const inTable = [username, pass1, pass2, email];
    
    validateInputs(inTable);
    comparePass(inTable[1], inTable[2]); // (pass1, pass2), its the same
    validateInputsLengthsMin(inTable[0], 5);
    validateInputsLengthsMax(inTable[0], 10);
    validateInputsLengthsMin(inTable[1], 10);
    validateInputsLengthsMax(inTable[1], 20);
    // checkInputsLengthsMin(pass2, 10);
    // checkInputsLengthsMax(pass2, 20);
    validateMail(inTable[3]);

    //sendForm(inTable);
    SendingFcn(inTable);
});


// Sending function (easiest worst way) 
// const sendForm = () => { 
//         const inputParent1 = username.parentElement;
//         const inputParent2 = pass1.parentElement;
//         const inputParent3 = pass2.parentElement;
//         const inputParent4 = email.parentElement;

//         if(
//             inputParent1.classList.contains('error-input') == false &&
//             inputParent2.classList.contains('error-input') == false &&
//             inputParent3.classList.contains('error-input') == false &&
//             inputParent4.classList.contains('error-input') == false ) {
           
//             popup.classList.add('show-popup');
//         }
// }