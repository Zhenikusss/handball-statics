import React from 'react';
import { useForm } from 'react-hook-form';

function Login () {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example"));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className = 'login-title'>Авторизация</div>

      <div>
        <label>Имя пользователя</label>
        <input name='login' defaultValue='' ref={register({ required: true })} />
        {errors.login && 'Введите имя пользователя'}
      </div>

      <div>
        <label>Пароль</label>
        <input name='password' ref={register({ required: true })} />
        {errors.password && 'Введите пароль'}
      </div>

      <input type='submit' />

    </form>    
  );
}

export default Login;