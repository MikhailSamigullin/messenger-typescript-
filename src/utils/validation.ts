/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

const inputs: {
  first_name: object,
  second_name: object,
  login: object,
  email: object,
  phone: object,
  password: object,
} = {
    first_name: validationName,
    second_name: validationName,
    login: validationLogin,
    email: validationEmail,
    phone: validationPhone,
    password: validationPassword,
  };
  
export default function validation(name: string, value:string):unknown {
  if (!value) {
    return {
      required: 'false',
      text: 'Поле не должно быть пустым',
    };
  }
  if (Object.keys(inputs).includes(name)) {
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
    return inputs[name](value);
  }

  return { 
    required: 'true', 
    text: '' };
}

function validationName(value: string) {
  if (/^[A-Za-zА-Яа-я-]{0,20}$/i.test(value)) {
    return { 
      required: 'true', 
      text: '' };
  }
  return { 
    required: 'false', 
    text: 'Только буквы, первая заглавная' };
}

function validationLogin(value: string) {
  if (/^(?=[\S]+)(?=.*[^0-9 ].*)[a-zA-Z0-9_-]{3,20}$/.test(value)) {
    return { 
      required: 'true', 
      text: '' };
  }
  return { 
    required: 'false', 
    text: 'Только буквы, первая заглавная' };
}

function validationPassword(value: string) {
  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/i.test(value)) {
    return { 
      required: 'true', 
      text: '' };
  }
  return { 
    required: 'false', 
    text: 'от 8 до 40 символов, одна заглавная буква или цифра' };
}

function validationEmail(value: string) {
  if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value)) {
    return { 
      required: 'true', 
      text: '' };
  }
  return { 
    required: 'false', 
    text: 'Email указан неверно' };
}

function validationPhone(value: string) {
  if (/(?:\+|\d)[\d\-() ]{9,}\d/g.test(value)) {
    return { 
      required: 'true', 
      text: '' };
  }
  return { 
    required: 'false', 
    text: 'Неверный формат' };
}
