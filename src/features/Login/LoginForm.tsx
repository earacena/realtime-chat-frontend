import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InstanceOf as RtInstanceOf } from "runtypes";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { FormWrapper, LabelErrorMessage } from "../../components";
import loginService from "./api/login.service";
import { setAuthenticatedUser } from "./stores/auth.slice";
import { resetNotification, setNotification } from "../Notification";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Input = {
  username: string;
  password: string;
};

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Input> = async (credentials) => {
    try {
      setIsSubmitting(true);
      const user = await loginService.login(credentials);

      dispatch(setAuthenticatedUser({ user }));

      window.localStorage.setItem("chatAppUser", JSON.stringify(user));
      reset({
        username: "",
        password: "",
      });
      navigate("/chat");
    } catch (error: unknown) {
      setIsSubmitting(false);
      if (RtInstanceOf(Error).guard(error)) {
        const newTimeoutId = setTimeout(() => {
          dispatch(resetNotification());
        }, 4000);
        dispatch(
          setNotification({
            type: "error",
            message: error.message,
            timeoutId: newTimeoutId,
          })
        );
      }
    }
  };

  const registerButtonClicked = () => navigate("/register");

  return (
    <FormWrapper>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="mt-3" htmlFor="username-input">
          Username
        </label>
        {errors.username && <LabelErrorMessage content="Required" />}
        <input
          id="username-input"
          aria-label="username"
          className="p-2 mt-1 mb-3 bg-slate-200 rounded-sm focus:outline-slate-400"
          type="text"
          placeholder=""
          {...register("username", { required: true })}
        />
        <label htmlFor="password-input">Password</label>
        {errors.password && <LabelErrorMessage content="Required" />}
        <input
          id="password-input"
          aria-label="password"
          className="p-2 mt-1 mb-3 bg-slate-200 rounded-sm focus:outline-slate-400"
          type="password"
          placeholder=""
          {...register("password", { required: true })}
        />
        <button
          id="login-button"
          className="flex items-center justify-center rounded-md p-3 bg-slate-500 text-white w-full mt-2 hover:bg-slate-400"
          type="submit"
          aria-label="login"
        >
          { isSubmitting ? <span className="animate-spin text-xl"><AiOutlineLoading3Quarters /></span> : 'Login' }
        </button>
        <p className="mt-4 text-sm self-center text-slate-600">
          Don't have an account?
        </p>
        <button
          id="register-button"
          className="rounded-md p-3 outline outline-2 text-slate-600 w-full mt-1 hover:bg-slate-200"
          type="button"
          aria-label="login"
          onClick={registerButtonClicked}
        >
          Create New Account
        </button>
      </form>
    </FormWrapper>
  );
}

export default LoginForm;
