import React from 'react';
import {Text} from 'react-native';

import StarContainer from '_organisms/starContainer';
import PlanetDetail from '_organisms/planetDetail';

const Planet = props => {
  return (
    <StarContainer>
      <PlanetDetail {...props} />
    </StarContainer>
  );
};

export default Planet;
