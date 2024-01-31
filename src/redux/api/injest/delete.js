import { api } from "../api";


export const deletePost = api.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        headers: {'authorization': localStorage.getItem('toket')}
      }),
      invalidatesTags: () => [{type: 'Posts'}]
    })
  })
})

export const { useDeletePostMutation } = deletePost 