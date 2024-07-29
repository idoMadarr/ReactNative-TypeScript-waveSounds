import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

export const apiQuery = createApi({
  reducerPath: 'apiQuery',
  baseQuery: fetchBaseQuery({ baseUrl: Config.deezer_api }),
  endpoints: (builder) => ({
    fetchSearchResults: builder.query({
      query: (search) => `search?q=${search}`,
    }),
  }),
})

export const { useFetchSearchResultsQuery } = apiQuery;