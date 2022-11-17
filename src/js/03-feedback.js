import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

function onInputForm(e) {
  e.preventDefault();
  const email = refs.form.elements.email.value;
  const message = refs.form.elements.message.value;
  save(LOCALSTORAGE_KEY, { message, email });
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
  const parsedSettings = load(LOCALSTORAGE_KEY);
  refs.form.elements.email.value = parsedSettings.email;
  refs.form.elements.message.value = parsedSettings.message;
}

refs.form.addEventListener('input', throttle(onInputForm, 500));
refs.form.addEventListener('submit', onSubmitForm);
window.addEventListener('load', onLoadForm);
