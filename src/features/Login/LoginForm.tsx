import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormWrapper, LabelErrorMessage } from '../../components';

type Input = {
  username: string;
  password: string;
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Input>({
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<Input> = (formData) => {
    console.log(formData);

    reset({
      username: '',
      password: '',
    });
  };

  return (
    <FormWrapper>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="mt-3" htmlFor="username-input">Username</label>
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
          id="login-button"
          className="rounded-md p-3 bg-slate-500 text-white w-full mt-auto hover:bg-slate-400"
          type="submit"
          aria-label="login"
        >
          Login
        </button>
        <p className="mt-auto text-sm self-center text-slate-600">Don't have an account?</p>
        <button
          id="register-button"
          className="rounded-md p-3 outline outline-2 text-slate-600 w-full mt-1 hover:bg-slate-200"
          type="button"
          aria-label="login"
        >
          Create New Account
        </button>
      </form>
    </FormWrapper>
  )
}

export default LoginForm;
