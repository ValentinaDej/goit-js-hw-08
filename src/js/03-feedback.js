import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', throttle(onInputForm, 500));
refs.form.addEventListener('submit', onSubmitForm);
window.addEventListener('load', onLoadForm);

function onInputForm(e) {
  e.preventDefault();
  const email = refs.form.elements.email.value;
  const message = refs.form.elements.message.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({ message, email }));
}

function onSubmitForm(e) {
  const savedSettings = localStorage.getItem(LOCALSTORAGE_KEY);
  console.log(
    'email: ' + savedSettings.email + 'message: ' + savedSettings.message
  );
  localStorage.removeItem(LOCALSTORAGE_KEY);
  refs.form.reset();
}

function onLoadForm(e) {
  e.preventDefault();
  const savedSettings = localStorage.getItem(LOCALSTORAGE_KEY);
  const parsedSettings = JSON.parse(savedSettings);
  refs.form.elements.email.value = parsedSettings.email;
  refs.form.elements.message.value = parsedSettings.message;
}
