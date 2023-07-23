import * as yup from 'yup';

export let registerValidation = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email(),
  password: yup.string().required(),
});


export let loginValidaton = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().required(),
});

export let groupValidation = yup.object().shape({
  users: yup.string().required(),
  name: yup.string().required(),
});

export let renameValidation = yup.object().shape({
  chatId: yup.string().required(),
  chatName: yup.string().required(),
});

export let groupaddValidation = yup.object().shape({
  chatId: yup.string().required(),
  userId: yup.string().required(),
});

export let allChatValidation = yup.object().shape({
  chatId: yup.string().required(),
  content: yup.string().required(),
});