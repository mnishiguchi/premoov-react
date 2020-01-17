export type Project = {
  id: string;
  name: string;
  description: string;
};

export type Room = {
  id: string;
  projectId: string;
  name: string;
  description: string;
};

export type RoomItem = {
  id: string;
  projectId: string;
  roomId: string;
  name: string;
  volume: number;
  count: number;
  description: string;
};

export type AppReduxState = {
  projects: Project[];
  rooms: Room[];
  roomItems: RoomItem[];
  settings: any;
};
