import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormWrapper, LabelErrorMessage } from '../../components';
import { userService } from '../Users';
import { loginService } from '../Login';
import { setAuthenticatedUser } from './stores/auth.slice';

type Input = {
  name: string;
  username: string;
  password: string;
};

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Input>({
    defaultValues: {
      name: '',
      username: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<Input> = async (credentials) => {
    try {
      await userService.create(credentials);
      
      const { id, name, username, token } = await loginService.login({
        username: credentials.username,
        password: credentials.password,
      });

      dispatch(setAuthenticatedUser({ user: { id, name, username, token } }));
      window.localStorage.setItem('chatAppUser', JSON.stringify({id, name, username, token}));
      reset({
        name: '',
        username: '',
        password: '',
      });
      navigate("/");
    } catch (error: unknown) {
      console.error('Error registering user credentials');
    }
  };

  const loginButtonClicked = () => navigate("/login");

  return (
    <FormWrapper>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-2xl self-center">Create an account</p>
        <label className="mt-3" htmlFor="name-input">Name</label>
        {errors.name && <LabelErrorMessage content="Required" />}
        <input
          id="name-input"
          aria-label="name"
          className="p-2 mt-1 mb-3 bg-slate-200 rounded-sm focus:outline-slate-400"
          type="text"
          placeholder=""
          {...register('name', { required: true })}
        />
        <label htmlFor="username-input">Username</label>
        {errors.username && <LabelErrorMessage content="Required" />}
        <input
          id="username-input"
          aria-label="username"
          className="p-2 mt-1 mb-3 bg-slate-200 rounded-sm focus:outline-slate-400"
          type="text"
          placeholder=""
          {...register('username', { required: true })}
        />
        <label htmlFor="password-input">Password</label>
        {errors.password && <LabelErrorMessage content="Required" />}
        <input
          id="password-input"
          aria-label="password"
          className="p-2 mt-1 mb-3 bg-slate-200 rounded-sm focus:outline-slate-400"
          type="password"
          placeholder=""
          {...register('password', { required: true })}
        />
        <button 
          id="create-button"
          className="rounded-md p-3 bg-slate-500 text-white w-full mt-3 hover:bg-slate-400"
          type="submit"
          aria-label="create">
          Create Account
        </button>
        <p className="mt-4 text-sm self-center text-slate-600">Have an account?</p>
        <button 
          id="login-button"
          className="rounded-md p-3 outline outline-2 text-slate-600 w-full mt-1 hover:bg-slate-200"
          type="button"
          aria-label="login"
          onClick={loginButtonClicked}
        >
          Login
        </button>
      </form>
    </FormWrapper>
  );
}

export default RegisterForm;