// @ts-nocheck
// TS complains about reach-router's magic with path.
import React from 'react';
import { Router } from '@reach/router';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectPage from './pages/ProjectPage';
import RoomPage from './pages/AboutPage';

const Routes: React.FC = () => {
  return (
    <Router>
      <HomePage path="/" />
      <AboutPage path="about" />
      <ProjectPage path="projects/:id" />
      <RoomPage path="rooms/:id" />
    </Router>
  );
};

export default Routes;
