import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormWrapper, LabelErrorMessage } from '../../components';

type Input = {
  name: string;
  username: string;
  password: string;
};

function RegisterForm() {
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

  const onSubmit: SubmitHandler<Input> = (formData) => {
    console.log(formData)

    reset({
      name: '',
      username: '',
      password: '',
    });
  };

  return (
    <FormWrapper>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="mt-3" htmlFor="name-input">name</label>
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
          id="login-button"
          className="rounded-md p-3 bg-slate-500 text-white w-full mt-auto hover:bg-slate-400"
          type="submit"
          aria-label="login">
          Login
        </button>
      </form>
    </FormWrapper>
  );
}

export default RegisterForm;