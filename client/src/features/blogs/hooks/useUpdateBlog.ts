import { useBlogService } from "../api/blogService";

export const useUpdateBlog = () => {
  const { updateBlog, isUpdating } = useBlogService();
  const handleUpdation = async (formData: FormData) => await updateBlog(formData);

  return {
    handleUpdation,
    isUpdating,
  };
};
