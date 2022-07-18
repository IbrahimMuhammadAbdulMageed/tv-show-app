import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const showApi = createApi({
    reducerPath: 'showApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.tvmaze.com/',
    }),
    endpoints: () => ({}),
});
