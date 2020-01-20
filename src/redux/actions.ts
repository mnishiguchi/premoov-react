import shortid from 'shortid';
import { Project, Room, RoomItem } from '../types';

export type Action =
  | { type: 'CREATE_PROJECT'; project: Project }
  | { type: 'UPDATE_PROJECT'; project: Project }
  | { type: 'DELETE_PROJECT'; projectId: string }
  | { type: 'CREATE_ROOM'; room: Room }
  | { type: 'UPDATE_ROOM'; room: Room }
  | { type: 'DELETE_ROOM'; roomId: string }
  | { type: 'CREATE_ROOM_ITEM'; roomItem: RoomItem }
  | { type: 'UPDATE_ROOM_ITEM'; roomItem: RoomItem }
  | { type: 'DELETE_ROOM_ITEM'; roomItemId: string }
  | { type: 'INCREMENT_ROOM_ITEM_COUNT'; roomItemId: string }
  | { type: 'DECREMENT_ROOM_ITEM_COUNT'; roomItemId: string };

export const createProjectAction: (project: Project) => Action = project => ({
  type: 'CREATE_PROJECT',
  project: {
    ...project,
    id: shortid.generate(),
  },
});

export const updateProjectAction: (project: Project) => Action = project => ({
  type: 'UPDATE_PROJECT',
  project,
});

export const deleteProjectAction: (projectId: string) => Action = projectId => ({
  type: 'DELETE_PROJECT',
  projectId,
});

export const createRoomAction: (room: Room, projectId: string) => Action = (room, projectId) => ({
  type: 'CREATE_ROOM',
  room: {
    ...room,
    id: shortid.generate(),
    projectId,
  },
});

export const updateRoomAction = (room: Room) => ({
  type: 'UPDATE_ROOM',
  room,
});

export const deleteRoomAction = (roomId: string) => ({
  type: 'DELETE_ROOM',
  roomId,
});

export const createRoomItemAction: (
  roomItem: RoomItem,
  roomId: string,
  projectId: string
) => Action = (roomItem, roomId, projectId) => ({
  type: 'CREATE_ROOM_ITEM',
  roomItem: {
    ...roomItem,
    id: shortid.generate(),
    roomId,
    projectId,
  },
});

export const updateRoomItemAction: (roomItem: RoomItem) => Action = roomItem => ({
  type: 'UPDATE_ROOM_ITEM',
  roomItem,
});

export const deleteRoomItemAction: (roomItemId: string) => Action = roomItemId => ({
  type: 'DELETE_ROOM_ITEM',
  roomItemId,
});

export const incrementRoomItemCountAction: (roomItemId: string) => Action = roomItemId => ({
  type: 'INCREMENT_ROOM_ITEM_COUNT',
  roomItemId,
});

export const decrementRoomItemCountAction: (roomItemId: string) => Action = roomItemId => ({
  type: 'DECREMENT_ROOM_ITEM_COUNT',
  roomItemId,
});
