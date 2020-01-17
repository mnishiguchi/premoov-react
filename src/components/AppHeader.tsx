import React from 'react';
import { navigate } from '@reach/router';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import shortid from 'shortid';

import useToggle from '../components/useToggle';
import ProjectFormDialog from '../components/ProjectFormDialog';
import { Project } from '../types';

const AppHeader: React.FC = () => {
  const dispatch = useDispatch();

  const {
    open: openAddProjectModal,
    close: closeAddProjectModal,
    isOpen: isOpenAddProjectModal,
  } = useToggle(false);

  const handleProjectAdded = ({ name, description }: Project) =>
    dispatch({
      type: 'CREATE_PROJECT',
      payload: {
        project: {
          name,
          description,
          id: shortid.generate(),
        } as Project,
      },
    });

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>
          <Button color="inherit" onClick={() => navigate('/')}>
            {process.env.REACT_APP_NAME || 'Home'}
          </Button>
          <Button color="inherit" onClick={() => navigate('/about')}>
            About
          </Button>
        </span>
        <Button onClick={openAddProjectModal} color="inherit">
          <AddIcon />
          Add Project
        </Button>
      </Toolbar>

      <ProjectFormDialog
        isOpen={isOpenAddProjectModal}
        onClose={closeAddProjectModal}
        onSubmit={(project: Project, { resetForm }: any) => {
          closeAddProjectModal();
          handleProjectAdded(project);
          resetForm();
        }}
        title={`Add Project`}
      />
    </AppBar>
  );
};

export default AppHeader;
