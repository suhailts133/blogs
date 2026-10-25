import { Link } from "react-router-dom";
import type { BlogsDTO } from "../type/blog.interface";

type Props = {
    blog: BlogsDTO;
};

export default function BlogCard({ blog }: Props) {
    return (
        <div className="group bg-surface w-full h-full rounded-xl border border-surface-border hover:border-accent overflow-hidden transition-colors duration-300 flex flex-col">
            <Link to={`/blogs/${blog.blogId}`} className="block h-48 overflow-hidden bg-surface-hover">
                <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </Link>

            <div className="px-5 pt-4 pb-5 flex-1 flex flex-col">
                <h5 className="font-Jost-Semibold text-lg font-semibold text-text-primary leading-snug line-clamp-1 mb-1">
                    <Link to={`/blogs/${blog.blogId}`} className="hover:text-accent-hover transition-colors duration-200">
                        {blog.title}
                    </Link>
                </h5>

                <p className="text-sm font-dm-sans-light text-text-muted leading-relaxed line-clamp-3 mb-4">
                    {blog.description}
                </p>

             
            </div>
        </div>
    );
}