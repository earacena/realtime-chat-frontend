import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormWrapper } from '../../components';

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
        <label className="mt-7" htmlFor="username-input">Username</label>
        {errors.username && <span className="text-red-400">Required</span>}
        <input
          id="username-input"
          aria-label="username"
          className="p-2 mt-1 mb-3 bg-slate-200 rounded-sm focus:outline-slate-400"
          type="text"
          placeholder=""
          {...register('username', { required: true })}
        />
        <label htmlFor="password-input">Password</label>
        {errors.password && <span className="text-red-400">Required</span>}
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
          aria-label="login">
          Login
        </button>
      </form>
    </FormWrapper>
  )
}

export default LoginForm;
