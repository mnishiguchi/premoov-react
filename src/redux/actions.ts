import shortid from 'shortid';
import { Project, Room, RoomItem } from '../types';

export type Action =
  | { type: 'CREATE_PROJECT'; payload: { project: Project } }
  | { type: 'UPDATE_PROJECT'; payload: { project: Project } }
  | { type: 'DELETE_PROJECT'; payload: { projectId: string } }
  | { type: 'CREATE_ROOM'; payload: { room: Room } }
  | { type: 'UPDATE_ROOM'; payload: { room: Room } }
  | { type: 'DELETE_ROOM'; payload: { roomId: string } }
  | { type: 'CREATE_ROOM_ITEM'; payload: { roomItem: RoomItem } }
  | { type: 'UPDATE_ROOM_ITEM'; payload: { roomItem: RoomItem } }
  | { type: 'DELETE_ROOM_ITEM'; payload: { roomItemId: string } }
  | { type: 'INCREMENT_ROOM_ITEM_COUNT'; payload: { roomItemId: string } }
  | { type: 'DECREMENT_ROOM_ITEM_COUNT'; payload: any }; // For some reason typescript complains.

export const createProjectAction: (project: Project) => Action = project => ({
  type: 'CREATE_PROJECT',
  payload: {
    project: {
      ...project,
      id: shortid.generate(),
    },
  },
});

export const updateProjectAction: (project: Project) => Action = project => ({
  type: 'UPDATE_PROJECT',
  payload: { project },
});

export const deleteProjectAction: (projectId: string) => Action = projectId => ({
  type: 'DELETE_PROJECT',
  payload: { projectId },
});

export const createRoomAction: (room: Room, projectId: string) => Action = (room, projectId) => ({
  type: 'CREATE_ROOM',
  payload: {
    room: {
      ...room,
      id: shortid.generate(),
      projectId,
    },
  },
});

export const updateRoomAction = (room: Room) => {
  return {
    type: 'UPDATE_ROOM',
    payload: {
      room,
    },
  };
};

export const deleteRoomAction = (roomId: string) => ({
  type: 'DELETE_ROOM',
  payload: {
    roomId,
  },
});

export const createRoomItemAction: (
  roomItem: RoomItem,
  roomId: string,
  projectId: string
) => Action = (roomItem, roomId, projectId) => ({
  type: 'CREATE_ROOM_ITEM',
  payload: {
    roomItem: {
      ...roomItem,
      id: shortid.generate(),
      roomId,
      projectId,
    },
  },
});

export const updateRoomItemAction: (roomItem: RoomItem) => Action = roomItem => ({
  type: 'UPDATE_ROOM_ITEM',
  payload: { roomItem },
});

export const deleteRoomItemAction: (roomItemId: string) => Action = roomItemId => ({
  type: 'DELETE_ROOM_ITEM',
  payload: { roomItemId },
});

export const incrementRoomItemCountAction: (roomItemId: string) => Action = roomItemId => ({
  type: 'INCREMENT_ROOM_ITEM_COUNT',
  payload: { roomItemId },
});

export const decrementRoomItemCountAction: (roomItemId: string) => Action = roomItemId => ({
  type: 'DECREMENT_ROOM_ITEM_COUNT',
  payload: { roomItemId },
});
