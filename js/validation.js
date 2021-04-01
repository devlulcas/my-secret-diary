const form = document.querySelector('[data-form]');
const fields = document.querySelectorAll('[required]');

/*
function passwordConfirmationError() {
  const pswd = form.querySelector('[data-field="password"]');
  const pswdConfirm = form.querySelector('[data-field="password-confirmation"]');
  if (pswd.value != pswdConfirm.value) return true;
  return false;
}
*/

function findError(field) {
  let errorFounded = false;
  const validations = field.validity;
  //validations.passwordsDontMatch = passwordConfirmationError();

  for (let errorKey in validations) {
    if (validations[errorKey] && !validations.valid) {
      console.log(errorKey);
      errorFounded = errorKey;
    }
  }
  return errorFounded;
}

function customErroMessage(error) {
  let defaultMessage = 'Algo deu errado! Verifique seus dados novamente :D'; //Default message
  if (error == 'valueMissing') return 'Nenhum campo pode ficar vazio!';
  if (error == 'tooShort') return 'Senhas abaixo de 8 caracteres não existem!';
  //if (error == 'passwordDontMatch') return 'Suas senhas não correspondem!';
  return defaultMessage;
}

function customValidation(event) {
  const field = event.target;
  const warningContainer = document.querySelector('[data-warning-visible]');
  const warningContent = warningContainer.querySelector('[data-warning-text]');
  const fieldContainer = field.parentNode;
  const error = findError(field);
  const errorMessage = customErroMessage(error);
  if (error) {
    fieldContainer.style.backgroundColor = 'var(--bg-text-field-wrong)';
    field.style.backgroundColor = 'var(--bg-text-field-wrong)';
    warningContainer.setAttribute('data-warning-visible', true);
    warningContent.innerHTML = errorMessage;
  } else {
    fieldContainer.style.backgroundColor = 'var(--bg-text-field-correct)';
    field.style.backgroundColor = 'var(--bg-text-field-correct)';
    warningContainer.setAttribute('data-warning-visible', false);
    warningContent.innerHTML = '';
  }
}

function validateInputField(field) {
  field.addEventListener('invalid', event => {
    event.preventDefault(); //Cancel the default validation bubble
    customValidation(event);
  });

  field.addEventListener('blur', event => customValidation(event)); //When the field loose focus the custom validation is added
}

fields.forEach((field) => validateInputField(field));

//Code that should be executed when you hit the submit button
form.addEventListener('submit', (event) => {
  console.log('pode enviaaaar');
  event.preventDefault();
});
