import React from 'react'

type FormWrapperProps = {
  children?: JSX.Element,
};

function FormWrapper({ children }: FormWrapperProps) {
  return (
    <div className="flex justify-center p-6 border-2 w-80 h-96 rounded-md border-slate-400 shadow-2xl">
      {children}
    </div>
  );
}

export default FormWrapper;