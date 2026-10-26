import { useState } from "react";
import { Calendar, User, Eye } from "lucide-react";
import type { BlogsDTO } from "../type/blog.interface";
import BlogModal from "../../../shared/components/modals/BlogModal";

type Props = {
    blog: BlogsDTO;
};

export default function BlogCard({ blog }: Props) {
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
                    <div className="flex items-center justify-between gap-3 text-xs text-text-muted mb-2">
                        <span className="inline-flex items-center gap-1.5 min-w-0">
                            <User className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{blog.userName}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 shrink-0">
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

                    <div className="mt-auto pt-4">
                        <div className="h-px bg-surface-border mb-4" />

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(true);
                            }}
                            className="w-full inline-flex items-center justify-center gap-1.5 text-text-muted bg-surface hover:bg-surface-hover hover:text-accent-hover border border-surface-border hover:border-surface-border-strong rounded-lg text-xs font-medium py-2 transition-all duration-200"
                        >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Read more</span>
                        </button>
                    </div>
                </div>
            </div>

            <BlogModal isOpen={isOpen} onClose={() => setIsOpen(false)} blog={blog} />
        </>
    );
}