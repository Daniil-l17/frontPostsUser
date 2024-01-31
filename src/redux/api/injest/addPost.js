import { api } from "../api";


export const createPost = api.injectEndpoints({
  endpoints: builder => ({
    getAddPostNew: builder.mutation({
      query: (post) => ({
        body: post,
        url: '/posts',
        method: 'POST',
        headers: {'authorization': localStorage.getItem('toket')}
      }),
      invalidatesTags: () => [{
        type: 'Posts'
      }]
    })
  })
})

export const {useGetAddPostNewMutation} = createPost