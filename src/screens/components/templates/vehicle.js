import React from 'react';

import StarContainer from '_organisms/starContainer';
import VehicleDetail from '_organisms/vehicleDetail';

const Vehicle = props => {
  return (
    <StarContainer>
      <VehicleDetail {...props} />
    </StarContainer>
  );
};

export default Vehicle;
