import axios from 'axios';
import http from '_helpers/http';

export const getBulkData = endpoints =>
  axios.all(
    endpoints.map(endpoint =>
      http()
        .get(endpoint)
        .then(res => res.data),
    ),
  );

export const getKeyBasedData = query =>
  http()
    .get(query)
    .then(res => res.data);
