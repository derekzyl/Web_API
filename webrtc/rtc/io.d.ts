export interface me {
  other_user_id: string;
  connectionID: string;
}
export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  the: (mev: me) => void;
  inform_me_about_others: (data: any) => void;
  sdpProcess: (data: spdProcessServerI) => void;
}

export interface dataI {
  displayName: string;
  meetingID: string;
}
export interface spdProcessI {
  message: any;
  to_connid: any;
}
export interface spdProcessServerI {
  message: any;
  from_connid: any;
}
export interface ClientToServerEvents {
  hello: () => void;
  userConnect: (data: dataI) => void;
  helloSide: (da: string, me) => void;
  sdpProcess: (data: spdProcessI) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
