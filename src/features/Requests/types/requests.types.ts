import {
  Record as RtRecord,
  Number as RtNumber,
  String as RtString,
  InstanceOf as RtInstanceOf,
  Union as RtUnion,
  Array as RtArray,
  Static as RtStatic,
} from 'runtypes';

export type NewRequest = {
  type: string,
  fromUserId: number,
  toUser: string,
};

export const RequestResponse = RtRecord({
  id: RtNumber,
  type: RtString,
  dateRequested: RtUnion(
    RtInstanceOf(Date),
    RtString.withConstraint((x: string) => (x && x !== null && typeof x === 'string' && !Number.isNaN(Date.parse(x)))),
  ),
  toUser: RtNumber,
  fromUser: RtNumber,
  status: RtString,
});

export type Request = RtStatic<typeof RequestResponse>;
export const RequestArray = RtArray(RequestResponse);
export type Requests = RtStatic<typeof RequestArray>;

export type RequestsState = {
  requests: Requests,
}

export type RequestsPayload = {
  requests: Requests,
};

export type GetRequestsOfUserParams = {
  userId: number,
  token: string,
};

export type UpdateParams = {
  updatedRequest: Request,
  token: string,
};

export type CreateParams = {
  request: NewRequest,
  token: string,
};