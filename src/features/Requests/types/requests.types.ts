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
  toUser: number,
  fromUser: number,
};

export const RequestResponse = RtRecord({
  id: RtNumber,
  type: RtString,
  dateRegistered: RtUnion(
    RtInstanceOf(Date),
    RtString.withConstraint((x: string) => (x && x !== null && typeof x === 'string' && !Number.isNaN(Date.parse(x)))),
  ),
  toUser: RtNumber,
  status: RtString,
});

export type Request = RtStatic<typeof RequestResponse>;
export const RequestArray = RtArray(RequestResponse);
export type Requests = RtStatic<typeof RequestArray>;