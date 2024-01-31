import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { authuser, fetchRegister } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const isAuth = useSelector(authuser);
  const db = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: 'вася пупкин',
      email: 'vasya@test.ru',
      password: '123',
    },
    mode: 'onChange',
  });

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const onSumbit = async values => {
    const data = await db(fetchRegister(values));
    console.log(data);
    if (!data.payload) {
      return alert('Не удалось зарегестрироваться');
    }
    if ('token' in data?.payload) {
      localStorage.setItem('toket', data.payload.token);
    }
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
    <form onSubmit={handleSubmit(onSumbit)}>
    <TextField
        className={styles.field}
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName', { required: 'Укажите Полное имя' })}
        label="Полное имя"
        fullWidth
      />
      <TextField
        className={styles.field}
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', { required: 'Укажите почту' })}
        label="E-Mail"
        fullWidth
      />
      <TextField
        className={styles.field}
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        label="Пароль"
        {...register('password', { required: 'Укажите пороль' })}
        fullWidth
      />
      <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </form>
    </Paper>
  );
};
