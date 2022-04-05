import React from 'react';
import {Text, View} from 'react-native';

import StarContainer from '_organisms/starContainer';
import FilmDetail from '_organisms/filmDetail';

const Film = props => {
  return (
    <StarContainer film padding={0}>
      <FilmDetail {...props} />
    </StarContainer>
  );
};

export default Film;
