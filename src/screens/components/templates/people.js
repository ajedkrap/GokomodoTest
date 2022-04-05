import React from 'react';

import StarContainer from '_organisms/starContainer';
import PeopleDetail from '_organisms/peopleDetail';

const People = props => {
  return (
    <StarContainer>
      <PeopleDetail {...props} />
    </StarContainer>
  );
};

export default People;
