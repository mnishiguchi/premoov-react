import { combineReducers, Reducer } from 'redux';

import { Project, Room, RoomItem } from '../types';
import fakeData from './fakeData';

type Action =
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

const projectsReducer: (state: Project[], action: Action) => Project[] = (
  state = fakeData.projects || [],
  action
) => {
  const payload = action.payload;
  let stateIndex = Number.MIN_SAFE_INTEGER;

  switch (action.type) {
    case 'CREATE_PROJECT':
      return [...state, payload.project];
    case 'UPDATE_PROJECT':
      stateIndex = state.findIndex(
        (project: Project) => project.id === payload.project.id
      );
      if (stateIndex < 0) throw new Error('project not found');
      state[stateIndex] = payload.project;
      return [...state];
    case 'DELETE_PROJECT':
      return state.filter(
        (project: Project) => project.id !== payload.projectId
      );
    default:
      return state;
  }
};

const roomsReducer: (state: Room[], action: Action) => Room[] = (
  state = fakeData.rooms || [],
  action: Action
) => {
  const payload = action.payload;

  switch (action.type) {
    case 'CREATE_ROOM':
      return [...state, payload.room as Room];
    case 'UPDATE_ROOM':
      const stateIndex = state.findIndex(
        (room: Room) => room.id === payload.room.id
      );
      if (stateIndex < 0) throw new Error('room not found');
      state[stateIndex] = payload.room;
      return [...state];
    case 'DELETE_ROOM':
      return state.filter((room: Room) => room.id !== payload.roomId);
    case 'DELETE_PROJECT':
      // Clean up associated records.
      return state.filter((room: Room) => room.projectId !== payload.projectId);
    default:
      return state;
  }
};

const roomItemsReducer: (state: RoomItem[], action: Action) => RoomItem[] = (
  state = fakeData.roomItems || [],
  action: Action
) => {
  const payload = action.payload;
  let stateIndex = Number.MIN_SAFE_INTEGER;
  const findStateIndex = (roomItemId: string) =>
    state.findIndex((roomItem: RoomItem) => roomItem.id === roomItemId);

  switch (action.type) {
    case 'CREATE_ROOM_ITEM':
      return [payload.roomItem as RoomItem, ...state];
    case 'INCREMENT_ROOM_ITEM_COUNT':
      stateIndex = findStateIndex(payload.roomItemId);
      if (stateIndex < 0) throw new Error('room item not found');
      state[stateIndex] = {
        ...state[stateIndex],
        count: state[stateIndex].count + 1,
      };
      return [...state];
    case 'DECREMENT_ROOM_ITEM_COUNT':
      stateIndex = findStateIndex(payload.roomItemId);
      if (stateIndex < 0) throw new Error('room item not found');
      state[stateIndex] = {
        ...state[stateIndex],
        count: state[stateIndex].count > 0 ? state[stateIndex].count - 1 : 0,
      };
      return [...state];
    case 'UPDATE_ROOM_ITEM':
      stateIndex = findStateIndex(payload.roomItem.id);
      if (stateIndex < 0) throw new Error('room item not found');
      state[stateIndex] = payload.roomItem;
      return [...state];
    case 'DELETE_ROOM_ITEM':
      return state.filter(
        (roomItem: RoomItem) => roomItem.id !== payload.roomItemId
      );
    case 'DELETE_ROOM':
      // Clean up associated records.
      return state.filter(
        (roomItem: RoomItem) => roomItem.roomId !== payload.roomId
      );
    case 'DELETE_PROJECT':
      // Clean up associated records.
      return state.filter(
        (roomItem: RoomItem) => roomItem.projectId !== payload.projectId
      );
    default:
      return state;
  }
};

// TODO
const settingsReducer: (state: any, action: Action) => any = (
  state = fakeData.settings || {},
  action: Action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  projects: projectsReducer as Reducer<any>,
  rooms: roomsReducer as Reducer<any>,
  roomItems: roomItemsReducer as Reducer<any>,
  settings: settingsReducer as Reducer<any>,
});

export default rootReducer;
