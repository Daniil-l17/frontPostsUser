import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { authuser, fetchUserData } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const isAuth = useSelector(authuser)
  const db = useDispatch()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '111test@gmail.com',
      password: '12345',
    },
    mode: 'onChange',
  });

  if(isAuth){
    return <Navigate to='/' />
  }

  const onSumbit = async (values) => {
    const data = await db(fetchUserData(values))
    console.log(data)
    if(!data.payload){
      return alert('Не удалось авторизоваться')
    }
    if('token' in data?.payload){
      localStorage.setItem('toket',data.payload.token)
    }
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSumbit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
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
        <Button disabled={!isValid}  type='submit' size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
