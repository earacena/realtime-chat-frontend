import { MessageArray } from "../types/chat.types";

const baseUrl = 'http://localhost:3001/api/messages';

type RetrieveMessagesProps = {
  senderUsername: string,
  recipientUsername: string,
}

const retrieveMessages = async ({ senderUsername, recipientUsername }: RetrieveMessagesProps) => {
  const response = await fetch(`${baseUrl}/?senderUsername=${senderUsername}&recipientUsername=${recipientUsername}`);
  console.log(response);
  const responseJson = await response.json();
  const messages = MessageArray.check(responseJson);
  return messages;
};

const chatService = { retrieveMessages };

export default chatService;
