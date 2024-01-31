

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

  

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4777/'
  }),
  endpoints: builder => ({
    getAddPostUser: builder.query({
      query: () => '/posts',
      providesTags: () => [{type: 'Posts'}]
    }),
  }),
})


export const { useGetAddPostUserQuery } = api;