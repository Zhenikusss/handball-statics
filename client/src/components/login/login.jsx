import React from 'react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import logo from '../../assets/img/logo.svg';

function Login (props) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <Fragment>

      <div className="header">
        <div className="header__logo">
          <img src={logo} alt={logo} />
        </div>
      </div>
    
      <form onSubmit={handleSubmit(props.onSubmit)}>

        <div className = 'login-title'>Авторизация</div>

        <div className="form__btn">
          {errors.login && 'Введите имя пользователя'}
          <input name='login' placeholder="Имя пользователя" defaultValue='' ref={register({ required: true })} />
        </div>

        <div className="form__btn">
          {errors.password && 'Введите пароль'}
          <input name='password' placeholder="Пароль" ref={register({ required: true })} /> 
        </div>

        <input className="form__submit" type='submit' value="ВОЙТИ" />

      </form>

    </Fragment>  
  );
}

export default Login;