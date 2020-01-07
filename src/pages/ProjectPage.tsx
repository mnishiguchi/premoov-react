// @ts-nocheck

import React from 'react';
import { Container, Header, Tab, Table, Button, Icon } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import { fullPageTitle } from '../lib';

type Props = {
  id: string | number;
};

const ProjectPage: React.FC<Props> = ({ id }: Props) => {
  const { project, rooms } = useSelector(state => ({
    project: state.projects.find(project => Number(project.id) === Number(id)),
    rooms: state.rooms.filter(room => Number(room.projectId) === Number(id)),
  }));

  const pageTitle = project.name;

  const panes = rooms.map(room => ({
    menuItem: room.name,
    render: () => (
      <Tab.Pane>
        <Table singleLine unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Volume</Table.HeaderCell>
              <Table.HeaderCell>Count</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {room.items.map(item => (
              <Table.Row key={item.name}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.volume}</Table.Cell>
                <Table.Cell>{item.count}</Table.Cell>
                <Table.Cell>{item.volume * item.count}</Table.Cell>
                <Table.Cell textAlign="right">
                  <span>
                    <Button icon basic size="tiny" attached="left">
                      <Icon name="minus" />
                    </Button>
                    <Button icon basic size="tiny" attached="right">
                      <Icon name="plus" />
                    </Button>
                  </span>{' '}
                  <Button icon basic size="tiny">
                    <Icon name="pencil" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Tab.Pane>
    ),
  }));

  return (
    <Container>
      <Helmet>
        <title>{fullPageTitle(pageTitle)}</title>
      </Helmet>

      <Header as="h1">{pageTitle}</Header>

      <p>ID: {id}</p>
      <p>name: {project.description}</p>

      <Tab panes={panes} />
    </Container>
  );
};

export default ProjectPage;
