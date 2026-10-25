import { isApiError, UNKNOWN_ERROR } from "../../../api/responseType";
import { useDeleteABlogMutation, usePostBlogMutation, useUpdateBlogMutation } from "./blogSlice";

export const useBlogService = () => {
  const [postBlogMutation, { isLoading: isPosting }] = usePostBlogMutation();
  const [updateBlogMutation, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlogMutation, { isLoading: isDeleting }] = useDeleteABlogMutation();
  const postBlog = async (payload: FormData) => {
    try {
      return await postBlogMutation(payload).unwrap();
    } catch (error) {
      if (isApiError(error)) {
        return error.data;
      }
      return UNKNOWN_ERROR;
    }
  };

  const updateBlog = async (payload: FormData) => {
    try {
      return await updateBlogMutation(payload).unwrap();
    } catch (error) {
      if (isApiError(error)) {
        return error.data;
      }
      return UNKNOWN_ERROR;
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      return await deleteBlogMutation(id).unwrap();
    } catch (error) {
      if (isApiError(error)) {
        return error.data;
      }
      return UNKNOWN_ERROR;
    }
  };

  return {
    postBlog,
    isPosting,
    updateBlog,
    isUpdating,
    deleteBlog,
    isDeleting,
  };
};
