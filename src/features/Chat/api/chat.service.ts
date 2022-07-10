import { MessageArray } from "../types/chat.types";

const baseUrl = 'http://localhost:3001/api/messages';

type RetrieveMessagesProps = {
  senderUsername: string,
  recipientUsername: string,
  token: string,
}

const retrieveMessages = async ({ senderUsername, recipientUsername, token }: RetrieveMessagesProps) => {
  const response = await fetch(
    `${baseUrl}/?senderUsername=${senderUsername}&recipientUsername=${recipientUsername}`,
    {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  console.log(response);
  const responseJson = await response.json();
  const messages = MessageArray.check(responseJson);
  return messages;
};

const chatService = { retrieveMessages };

export default chatService;
