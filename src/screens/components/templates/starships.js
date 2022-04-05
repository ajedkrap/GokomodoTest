import React from 'react';

import StarContainer from '_organisms/starContainer';
import StarshipsDetail from '_organisms/starshipsDetail';

const Starships = props => {
  return (
    <StarContainer>
      <StarshipsDetail {...props} />
    </StarContainer>
  );
};

export default Starships;
