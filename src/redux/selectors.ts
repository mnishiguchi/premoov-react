import { AppReduxState, Project, Room, RoomItem } from '../types';

type selectProjectByIdType = (
  productId: string
) => (
  state: AppReduxState
) => {
  project?: Project;
  rooms: Room[];
  roomItems: RoomItem[];
};

export const selectProjectById: selectProjectByIdType = (productId: string) => (
  state: AppReduxState
) => ({
  project: state.projects.find((project: Project) => project.id === productId),
  rooms: state.rooms.filter((room: Room) => room.projectId === productId),
  roomItems: state.roomItems.filter(
    (roomItem: RoomItem) => roomItem.projectId === productId
  ),
});
