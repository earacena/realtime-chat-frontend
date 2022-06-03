import { Array as RtArray, InstanceOf as RtInstanceOf, Union as RtUnion, Number as RtNumber, Record as RtRecord, String as RtString } from "runtypes";

const baseUrl = 'http://localhost:3001/api/requests';

type Request = {
  type: string,
  toUser: number,
  fromUser: number,
};

const RequestResponse = RtRecord({
  id: RtNumber,
  type: RtString,
  dateRegistered: RtUnion(
    RtInstanceOf(Date),
    RtString.withConstraint((x: string) => (x && x !== null && typeof x === 'string' && !Number.isNaN(Date.parse(x)))),
  ),
  toUser: RtNumber,
  status: RtString,
});

const Requests = RtArray(RequestResponse);

const create = async (request: Request) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  const responseJson = await response.json();

  if (responseJson.error) {
    throw new Error(`${responseJson.error}`)
  } else {
    return RequestResponse.check(responseJson);
  }
};

const getRequestsOfUser = async (userId: number) => {
  const response = await fetch(`${baseUrl}/${userId}`);
  const requests = Requests.check(await response.json());
  return requests;
};

const requestService = { create, getRequestsOfUser };
export default requestService;
