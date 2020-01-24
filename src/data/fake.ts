import faker from 'faker';

const projectId = '1';
const roomId1 = 'room1';
const roomId2 = 'room2';
const roomId3 = 'room3';
const roomId4 = 'room4';

export default {
  projects: [
    {
      id: projectId,
      name: 'Project - April',
      description: faker.lorem.paragraphs(2),
    },
  ],
  rooms: [
    {
      id: roomId1,
      projectId,
      name: 'Living Room',
      description: faker.lorem.paragraphs(2),
    },
    {
      id: roomId2,
      projectId,
      name: 'Bedroom',
      description: faker.lorem.paragraphs(2),
    },
    {
      id: roomId3,
      projectId,
      name: 'Kitchen',
      description: faker.lorem.paragraphs(2),
    },
    {
      id: roomId4,
      projectId,
      name: 'Bathroom',
      description: faker.lorem.paragraphs(2),
    },
  ],
  roomItems: [
    {
      id: 'roomItem1',
      projectId,
      roomId: roomId1,
      name: 'Desk',
      volume: 10,
      count: 1,
      description: faker.lorem.paragraphs(2),
    },
    {
      id: 'roomItem2',
      projectId,
      roomId: roomId1,
      name: 'Chair',
      volume: 3,
      count: 4,
      description: faker.lorem.paragraphs(2),
    },
    {
      id: 'roomItem3',
      projectId,
      roomId: roomId2,
      name: 'Bed',
      volume: 30,
      count: 1,
      description: faker.lorem.paragraphs(2),
    },
    {
      id: 'roomItem4',
      projectId,
      roomId: roomId3,
      name: 'Small box',
      volume: 3,
      count: 10,
      description: faker.lorem.paragraphs(2),
    },
    {
      id: 'roomItem5',
      projectId,
      roomId: roomId4,
      name: 'Small box',
      volume: 3,
      count: 2,
      description: faker.lorem.paragraphs(2),
    },
    {
      id: 'roomItem6',
      projectId,
      roomId: roomId4,
      name: 'Medium box',
      volume: 5,
      count: 3,
      description: faker.lorem.paragraphs(2),
    },
  ],
  settings: {},
};
