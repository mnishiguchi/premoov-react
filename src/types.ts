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

export type DefaultVolumeLookup = {
  [key: string]: Object;
};

export type VolumeUnit = 'm3' | 'ft3';

export type AppState = {
  projects: Project[];
  rooms: Room[];
  roomItems: RoomItem[];
  defaultVolumeLookup: DefaultVolumeLookup;
  volumeUnit: VolumeUnit;
};
