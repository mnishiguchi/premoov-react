import { combineReducers, Reducer } from 'redux';

import { Project, Room, RoomItem, DefaultVolumeLookup, VolumeUnit } from '../types';
import defaultVolumeLookup from '../data/api.json';
import { Action } from './actions';

const projectsReducer: (state: Project[], action: Action) => Project[] = (state = [], action) => {
  let stateIndex = Number.MIN_SAFE_INTEGER;
  switch (action.type) {
    case 'CREATE_PROJECT':
      return [...state, action.project];
    case 'UPDATE_PROJECT':
      stateIndex = state.findIndex((project: Project) => project.id === action.project.id);
      if (stateIndex < 0) throw new Error('project not found');
      state[stateIndex] = {
        ...state[stateIndex],
        ...action.project,
      };
      return [...state];
    case 'DELETE_PROJECT':
      return state.filter((project: Project) => project.id !== action.projectId);
    default:
      return state;
  }
};

const roomsReducer: (state: Room[], action: Action) => Room[] = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_ROOM':
      return [...state, action.room as Room];
    case 'UPDATE_ROOM':
      const stateIndex = state.findIndex((room: Room) => room.id === action.room.id);
      if (stateIndex < 0) throw new Error('room not found');
      state[stateIndex] = {
        ...state[stateIndex],
        ...action.room,
      };
      return [...state];
    case 'DELETE_ROOM':
      return state.filter((room: Room) => room.id !== action.roomId);
    case 'DELETE_PROJECT':
      // Clean up associated records.
      return state.filter((room: Room) => room.projectId !== action.projectId);
    default:
      return state;
  }
};

const roomItemsReducer: (state: RoomItem[], action: Action) => RoomItem[] = (
  state = [],
  action
) => {
  let stateIndex = Number.MIN_SAFE_INTEGER;
  const findStateIndex = (roomItemId: string) =>
    state.findIndex((roomItem: RoomItem) => roomItem.id === roomItemId);

  switch (action.type) {
    case 'CREATE_ROOM_ITEM':
      return [action.roomItem as RoomItem, ...state];
    case 'INCREMENT_ROOM_ITEM_COUNT':
      stateIndex = findStateIndex(action.roomItemId);
      if (stateIndex < 0) throw new Error('room item not found');
      state[stateIndex] = {
        ...state[stateIndex],
        count: state[stateIndex].count + 1,
      };
      return [...state];
    case 'DECREMENT_ROOM_ITEM_COUNT':
      stateIndex = findStateIndex(action.roomItemId);
      if (stateIndex < 0) throw new Error('room item not found');
      state[stateIndex] = {
        ...state[stateIndex],
        count: state[stateIndex].count > 0 ? state[stateIndex].count - 1 : 0,
      };
      return [...state];
    case 'UPDATE_ROOM_ITEM':
      stateIndex = findStateIndex(action.roomItem.id);
      if (stateIndex < 0) throw new Error('room item not found');
      state[stateIndex] = {
        ...state[stateIndex],
        ...action.roomItem,
      };
      return [...state];
    case 'DELETE_ROOM_ITEM':
      return state.filter((roomItem: RoomItem) => roomItem.id !== action.roomItemId);
    case 'DELETE_ROOM':
      // Clean up associated records.
      return state.filter((roomItem: RoomItem) => roomItem.roomId !== action.roomId);
    case 'DELETE_PROJECT':
      // Clean up associated records.
      return state.filter((roomItem: RoomItem) => roomItem.projectId !== action.projectId);
    default:
      return state;
  }
};

const valumeUnitReducer: (state: VolumeUnit, action: Action) => VolumeUnit = (
  state = 'm3' as VolumeUnit,
  action
) => {
  switch (action.type) {
    case 'SET_VOLUME_UNIT':
      return action.volumeUnit as VolumeUnit;
    default:
      return state;
  }
};

const defaultVolumeLookupReducer: (state: DefaultVolumeLookup, action: Action) => any = (
  state = defaultVolumeLookup,
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  projects: projectsReducer as Reducer<Project[]>,
  rooms: roomsReducer as Reducer<Room[]>,
  roomItems: roomItemsReducer as Reducer<RoomItem[]>,
  defaultVolumeLookup: defaultVolumeLookupReducer as Reducer<DefaultVolumeLookup>,
  volumeUnit: valumeUnitReducer as Reducer<string>,
});

export default rootReducer;
