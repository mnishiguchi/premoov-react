// @ts-nocheck
// TS complains about reach-router's magic with path.
import React from 'react';
import { Router } from '@reach/router';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectPage from './pages/ProjectPage';
import RoomsPage from './pages/RoomsPage';

const Routes: React.FC = () => {
  return (
    <Router>
      <HomePage path="/" />
      <AboutPage path="about" />
      <ProjectPage path="projects/:id" />
      <RoomsPage path="projects/:projectId/rooms" />
    </Router>
  );
};

export default Routes;
