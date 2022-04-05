import React from 'react';

import StarContainer from '_organisms/starContainer';
import SpeciesDetail from '_organisms/speciesDetail';

const Species = props => {
  return (
    <StarContainer>
      <SpeciesDetail {...props} />
    </StarContainer>
  );
};

export default Species;
