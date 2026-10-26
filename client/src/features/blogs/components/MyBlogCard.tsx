import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash, Eye, Calendar } from "lucide-react";
import type { BlogsDTO } from "../type/blog.interface";
import BlogModal from "../../../shared/components/modals/BlogModal";

type Props = {
    blog: BlogsDTO;
    onDeleteClick: () => void;
};

export default function MyBlogCard({ blog, onDeleteClick }: Props) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="group bg-surface w-full h-full rounded-xl border border-surface-border hover:border-accent overflow-hidden transition-colors duration-300 flex flex-col cursor-pointer"
            >
                <div className="h-48 overflow-hidden bg-surface-hover">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <div className="px-5 pt-4 pb-5 flex-1 flex flex-col">
                    <div className="flex items-center text-xs text-text-muted mb-2">
                        <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {blog.createdAt}
                        </span>
                    </div>

                    <h5 className="font-Jost-Semibold text-lg font-semibold text-text-primary leading-snug line-clamp-1 mb-1">
                        {blog.title}
                    </h5>

                    <p className="text-sm font-dm-sans-light text-text-muted leading-relaxed line-clamp-3 mb-4">
                        {blog.description}
                    </p>

                    <div className="mt-auto pt-4" onClick={(e) => e.stopPropagation()}>
                        <div className="h-px bg-surface-border mb-4" />

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setIsOpen(true)}
                                title="View"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 text-text-muted bg-surface hover:bg-surface-hover hover:text-accent-hover border border-surface-border hover:border-surface-border-strong rounded-lg text-xs font-medium py-2 transition-all duration-200"
                            >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate(`/blog/edit/${blog.blogId}`)}
                                title="Edit"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 text-text-muted bg-surface hover:bg-surface-hover hover:text-accent-hover border border-surface-border hover:border-surface-border-strong rounded-lg text-xs font-medium py-2 transition-all duration-200"
                            >
                                <Pencil className="w-3.5 h-3.5" />
                                <span>Edit</span>
                            </button>

                            <button
                                type="button"
                                onClick={onDeleteClick}
                                title="Delete"
                                aria-label="Delete blog"
                                className="inline-flex items-center justify-center text-error bg-surface hover:bg-error-tint border border-surface-border hover:border-error rounded-lg p-2 transition-all duration-200"
                            >
                                <Trash className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <BlogModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                blog={blog}
                showAuthor={false}
            />
        </>
    );
}