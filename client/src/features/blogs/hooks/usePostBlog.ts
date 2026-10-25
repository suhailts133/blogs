import { useBlogService } from "../api/blogService";

export const usePostBlog = () => {
  const { postBlog, isPosting } = useBlogService();
  const handlePost = async (formData: FormData) => await postBlog(formData);

  return {
    handlePost,
    isPosting,
  };
};
