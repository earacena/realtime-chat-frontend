import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { selectSortedMessages, sendMessage, setMessages, startConnecting } from "./stores/chat.slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { setAuthenticatedUser } from "../Login/stores/auth.slice";
import { Messages } from "./types/chat.types";
import chatService from "./api/chat.service";
import { BiSend } from "react-icons/bi";

type Input = {
  message: string;
};

function Chat() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const messages = useAppSelector(selectSortedMessages);
  const currentRoom = useAppSelector((state) => state.rooms.currentRoom);
  const isConnected = useAppSelector((state) => state.chat.isConnected);
  const isConnecting = useAppSelector((state) => state.chat.isConnecting);

  const { register, handleSubmit, reset } = useForm<Input>({
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    // Check if a user session already exists
    if (!user.token) {
      const chatAppUserJSON = window.localStorage.getItem("chatAppUser");
      if (chatAppUserJSON) {
        const chatAppUser = JSON.parse(chatAppUserJSON);
        dispatch(setAuthenticatedUser({ user: chatAppUser }));
      } else {
        navigate("/login");
      }
    }
  }, [dispatch, navigate, user.token]);

  useEffect(() => {
    if (!isConnected && !isConnecting) {
      dispatch(startConnecting());
    }
  }, []);

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const fetchedMessages: Messages = await chatService.retrieveMessages({
          senderUsername: user.username,
          recipientUsername: currentRoom.roomId,
        });

        dispatch(setMessages({ messages: fetchedMessages }));
      } catch (error: unknown) {
        console.error(error);
      }
    };

    if (isConnected) {
      fetchAllMessages();
    }
  }, [dispatch, isConnected, user.username, currentRoom.roomId]);

  const onSubmit: SubmitHandler<Input> = ({ message }) => {
    // Prepare and send message
    if (currentRoom) {
      const newMessage = {
        senderUsername: user.username,
        recipientUsername: currentRoom.roomId,
        content: message,
      };

      dispatch(sendMessage({ newMessage }));
      console.log(
        `sending: ${currentRoom.roomId} | ${JSON.stringify(newMessage)}`
      );

      reset({
        message: "",
      });
    }
  };

  return (
    <div className="flex flex-col p-3 w-full bg-slate-100">
      <p className="bg-slate-100">{`Connected as: ${user.name}`}</p>
      <p className="bg-slate-100">
        {`Room: ${currentRoom ? currentRoom.roomName : "not in a room"}`}
      </p>
      <ul className="flex flex-1 flex-col overflow-y-scroll">
        {messages.map((m, i) =>
          (currentRoom.roomId === m.recipientUsername ||
            currentRoom.roomId === m.senderUsername) &&
          m.content !== "" &&
          m.senderUsername === user.username ? (
            <li
              key={i}
              className="first:mt-auto m-2 bg-slate-600 text-white p-1 px-3 rounded-md self-end"
            >
              {m.content}
            </li>
          ) : (
            <li
              key={i}
              className="first:mt-auto m-2 bg-slate-400 text-white p-1 px-3 rounded-md self-start"
            >
              {m.content}
            </li>
          )
        )}
      </ul>
      <form className="flex h-12 mt-auto" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="grow p-1 center shadow-lg rounded-lg outline outline-1 hover:outline-2 outline-slate-300 hover:outline-slate-400"
          {...register("message")}
        />
        <button
          className="rounded-full shadow-lg ml-2 p-3 hover:outline hover:outline-2 hover:outline-slate-600 bg-slate-500"
          type="submit"
        >
          <BiSend className="text-slate-100" size={24} />
        </button>
      </form>
    </div>
  );
}

export default Chat;
