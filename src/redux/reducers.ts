// @ts-nocheck

import faker from 'faker';

const defaultState = {
  projects: [
    {
      id: 1,
      title: 'Project - April',
      description: faker.lorem.paragraphs(2),
    },
    {
      id: 2,
      title: 'Project - May',
      description: faker.lorem.paragraphs(2),
    },
    {
      id: 3,
      title: 'Project - June',
      description: faker.lorem.paragraphs(2),
    },
  ],
  currentProject: null,
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
