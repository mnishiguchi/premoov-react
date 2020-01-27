import React from 'react';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import AppHeader from '../components/AppHeader';
import { setVolumeUnitAction } from '../redux/actions';
import { VOLUME_UNIT_FT3 } from '../lib';

const pageTitle = 'Settings';

const SettingsPage: React.FC = () => {
  // @ts-ignore
  const currentVolumeUnit = useSelector(state => state.volumeUnit);
  const dispatch = useDispatch();

  return (
    <>
      <AppHeader />
      <PageContainer>
        <SEO title={pageTitle} />

        <Typography variant="h4" gutterBottom>
          {pageTitle}
        </Typography>

        <RadioGroup
          name="volumeUnit"
          value={currentVolumeUnit}
          onChange={e => dispatch(setVolumeUnitAction(e.target.value))}
          row
        >
          <FormControlLabel
            value="m3"
            control={<Radio color="primary" />}
            label="M3"
            labelPlacement="top"
          />
          <FormControlLabel
            value={VOLUME_UNIT_FT3}
            control={<Radio color="primary" />}
            label="FT3"
            labelPlacement="top"
          />
        </RadioGroup>
      </PageContainer>
    </>
  );
};

export default SettingsPage;
