import { API_ROUTES } from "../../../api/apiRoutes";
import { baseApi } from "../../../api/baseApi";
import type { IApiResponse, IApiResponseWithPagination } from "../../../api/responseType";
import type { BlogsDTO } from "../type/blog.interface";

export const blogSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlog: builder.query<IApiResponse<BlogsDTO>, string>({
      query: (id) => ({
        url: `${API_ROUTES.BLOG.ONE}/${id}`,
        method: "GET",
      }),
    }),

    getMyBlog: builder.query<IApiResponseWithPagination<BlogsDTO[]>, number>({
      query: (page) => ({
        url: API_ROUTES.BLOG.MY,
        method: "GET",
        params: {
          page,
        },
      }),
      providesTags: ["blogs"],
    }),

    getAllBlog: builder.query<IApiResponseWithPagination<BlogsDTO[]>, number>({
      query: (page) => ({
        url: API_ROUTES.BLOG.ALL,
        method: "GET",
        params: {
          page,
        },
      }),
    }),

    deleteABlog: builder.mutation<IApiResponse, string>({
      query: (id) => ({
        url: `${API_ROUTES.BLOG.DELETE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),

    postBlog: builder.mutation<IApiResponse, FormData>({
      query: (body: FormData) => ({
        url: API_ROUTES.BLOG.CREATE,
        method: "POST",
        body,
      }),
      invalidatesTags: ["blogs"],
    }),

    updateBlog: builder.mutation<IApiResponse, FormData>({
      query: (body: FormData) => ({
        url: API_ROUTES.BLOG.UPDATE,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const { useUpdateBlogMutation, usePostBlogMutation, useGetBlogQuery, useGetMyBlogQuery, useGetAllBlogQuery, useDeleteABlogMutation } = blogSlice;
