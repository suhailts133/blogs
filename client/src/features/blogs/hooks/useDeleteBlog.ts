import { useBlogService } from "../api/blogService";

export const useDeleteBlog = () => {
  const { deleteBlog, isDeleting } = useBlogService();
  const handleDelete = async (id: string) => await deleteBlog(id);

  return {
    handleDelete,
    isDeleting,
  };
};
