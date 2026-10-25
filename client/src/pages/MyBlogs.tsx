import { Link, useSearchParams } from "react-router-dom"
import { useGetMyBlogQuery } from "../features/blogs/api/blogSlice"
import Pagination from "../shared/components/Pagination"
import Spinner from "../shared/components/Spinner"
import MyBlogCard from "../features/blogs/components/MyBlogCard"
import { useState } from "react"
import {  Plus } from "lucide-react"
import DeleteConfirmModal from "../shared/components/DeleteConfirmModal"
import { useDeleteBlog } from "../features/blogs/hooks/useDeleteBlog"
import { useHandleResponse } from "../shared/hooks/useHandleResponse"

export default function MyBlogs() {
    const [searchParams, setSearchParms] = useSearchParams()
    const [deleteBlog, setDeleteBlog] = useState<string | null>()
    const page = Number(searchParams.get("page") ?? "1")
    const { data, isLoading, error } = useGetMyBlogQuery(page)
    const { handleDelete, isDeleting } = useDeleteBlog()
    const handleResponse = useHandleResponse()
    const blogs = data?.data
    if (isLoading) {
        return <Spinner />
    }
    if (error || !blogs) {
        return <p>Error loading Blogs</p>;
    }
    const totalPages = data.totalPages ?? 1;
    const totalJobRequest = data.total ?? 1;
    const setPage = (newPage: number) => {
        setSearchParms(prev => {
            const next = new URLSearchParams(prev)
            next.set("page", String(newPage))
            return next
        })
    }
    const handleDeletion = async () => {
        if (!deleteBlog) return
        const result = await handleDelete(deleteBlog)
        handleResponse(result.success, "Blog Deleted Successfully", result.message);
        setDeleteBlog(null)
    }

    return (
        <div className="w-full min-h-full flex flex-col gap-6">

            <div className="w-full flex justify-end">
                <Link
                    to="/blog/new"
                    className="inline-flex items-center gap-2 bg-accent text-text-on-accent hover:bg-accent-hover px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                    Add new blog <Plus className="w-4 h-4" />
                </Link>
            </div>

            <div >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map(data => (
                        <MyBlogCard
                            blog={data}
                            onDeleteClick={() => setDeleteBlog(data.blogId)}
                            key={data.blogId}
                        />
                    ))}
                </div>

            </div>


            <div className="fixed bottom-0 left-0 right-0 z-40">
                <Pagination
                    page={page}
                    totalItem={totalJobRequest}
                    whichItem="My Blogs"
                    totalPages={totalPages}
                    onDecrease={() => setPage(Math.max(1, page - 1))}
                    onIncrease={() => setPage(Math.min(totalPages, page + 1))}
                />
            </div>


            <DeleteConfirmModal
                isOpen={!!deleteBlog}
                onConfirm={handleDeletion}
                onClose={() => setDeleteBlog(null)}
                isLoading={isDeleting}
                text="Are you sure you want to delete this Blog?"
            />
        </div>
    )
}
