import { useSearchParams } from "react-router-dom"
import { useGetAllBlogQuery } from "../features/blogs/api/blogSlice"
import Pagination from "../shared/components/Pagination"
import Spinner from "../shared/components/Spinner"
import BlogCard from "../features/blogs/components/BlogCard"

export default function Home() {
  const [searchParams, setSearchParms] = useSearchParams()
  const page = Number(searchParams.get("page") ?? "1")
  const { data, isLoading, error } = useGetAllBlogQuery(page)
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



  return (
    <div className="w-full min-h-full flex flex-col gap-6">
      <div >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(data => (
            <BlogCard
              blog={data}
              key={data.blogId}
            />
          ))}
        </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40">
        <Pagination
          page={page}
          totalItem={totalJobRequest}
          whichItem="Blogs"
          totalPages={totalPages}
          onDecrease={() => setPage(Math.max(1, page - 1))}
          onIncrease={() => setPage(Math.min(totalPages, page + 1))}
        />
      </div>
    </div>
  )
}
