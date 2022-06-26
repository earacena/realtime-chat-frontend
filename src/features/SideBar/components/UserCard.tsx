import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { useAppSelector } from '../../../hooks';

function UserCard() {

  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col items-center">
      <AiOutlineUser size={80} className="border border-5 rounded-full border-slate-500" />
      <span className="text-xl"> {user.name} </span>
      <span className="text-sm text-slate-600"> {user.username} </span>
    </div>
  );
}

export default UserCard;
