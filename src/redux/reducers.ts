// @ts-nocheck

import faker from 'faker';

const defaultState = {
  projects: [
    {
      id: 1,
      name: 'Project - April',
      description: faker.lorem.paragraphs(2),
    },
  ],
  rooms: [
    {
      projectId: 1,
      name: 'Living Room',
      description: faker.lorem.paragraphs(2),
      items: [
        {
          name: 'Desk',
          volume: 10,
          count: 1,
          description: faker.lorem.paragraphs(2),
        },
        {
          name: 'Chair',
          volume: 3,
          count: 4,
          description: faker.lorem.paragraphs(2),
        },
      ],
    },
    {
      projectId: 1,
      name: 'Bedroom',
      description: faker.lorem.paragraphs(2),
      items: [
        {
          name: 'Bed',
          volume: 30,
          count: 1,
          description: faker.lorem.paragraphs(2),
        },
      ],
    },
    {
      projectId: 1,
      name: 'Kitchen',
      description: faker.lorem.paragraphs(2),
      items: [
        {
          name: 'Small box',
          volume: 3,
          count: 10,
          description: faker.lorem.paragraphs(2),
        },
      ],
    },
    {
      projectId: 1,
      name: 'Bathroom',
      description: faker.lorem.paragraphs(2),
      items: [
        {
          name: 'Small box',
          volume: 3,
          count: 2,
          description: faker.lorem.paragraphs(2),
        },
        {
          name: 'Medium box',
          volume: 5,
          count: 3,
          description: faker.lorem.paragraphs(2),
        },
      ],
    },
  ],
  currentProjectId: null,
  config: {},
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'DO_NOTHING':
    default:
      return state;
  }
};

export default reducer;
