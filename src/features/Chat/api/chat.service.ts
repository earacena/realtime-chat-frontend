import { MessageArray } from "../types/chat.types";

const baseUrl = 'http://localhost:3001/api/messages';

type RetrieveMessagesProps = {
  senderUsername: string,
  recipientUsername: string,
}

const retrieveMessages = async ({ senderUsername, recipientUsername }: RetrieveMessagesProps) => {
  const response = await fetch(baseUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ senderUsername, recipientUsername }),
  });

  const messages = MessageArray.check(await response.json());
  return messages;
};

const chatService = { retrieveMessages };

export default chatService;
