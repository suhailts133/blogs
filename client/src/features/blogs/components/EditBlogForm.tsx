import { useParams } from "react-router-dom";
import { useGetBlogQuery } from "../api/blogSlice";
import Spinner from "../../../shared/components/Spinner";
import { AlertCircle } from "lucide-react";
import type { BlogsDTO } from "../type/blog.interface";
import { useForm, useWatch } from "react-hook-form";
import { editBlogSchema, type EditBlogFormType } from "../schema/editBlogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImagePreview } from "../../../shared/hooks/useImagePreview";
import { FileInputField } from "../../../shared/components/FileInputField";
import { InputField } from "../../../shared/components/InputField";
import SubmitButton from "../../../shared/components/SubmitButton";
import { TextAreaField } from "../../../shared/components/TextAreaField";
import { useUpdateBlog } from "../hooks/useUpdateBlog";
import { useHandleResponse } from "../../../shared/hooks/useHandleResponse";

export default function EditBlogForm() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading: isBlogLoading, error } = useGetBlogQuery(id!, { skip: !id });

    if (isBlogLoading) return <Spinner />;

    if (error || !data) {
        return (
            <div className="flex-1 flex items-center justify-center py-12">
                <p className="text-sm text-error flex items-center gap-2">
                    <AlertCircle size={16} /> Failed to load blog.
                </p>
            </div>
        );
    }

    return <EditBlogFormInner key={id} defaultData={data.data as BlogsDTO} />;
}

interface Props {
    defaultData: BlogsDTO;
}

function EditBlogFormInner({ defaultData }: Props) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<EditBlogFormType>({
        resolver: zodResolver(editBlogSchema),
        mode: "onBlur",
        defaultValues: {
            title: defaultData.title,
            description: defaultData.description,
        },
    });

    const { handleUpdation, isUpdating } = useUpdateBlog();
    const handleResponse = useHandleResponse();
    const watchedBlogImage = useWatch({ control, name: "blog" });
    const previewUrl = useImagePreview(watchedBlogImage);
    const previewSrc = previewUrl ?? defaultData.image;

    const onSubmit = async (data: EditBlogFormType) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);

        const blogImage = data.blog?.[0];
        if (blogImage) {
            formData.append("blog", blogImage);
            formData.append("newImage", "true");
        } else {
            formData.append("newImage", "false");
        }

        formData.append("blogId", defaultData.blogId);
        const result = await handleUpdation(formData);
        handleResponse(result.success, "Blog Updated successfully", result.message, "/my-blogs");
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl bg-surface backdrop-blur-2xl border border-surface-border rounded-xl p-8 md:p-10">
                <h2 className="text-4xl font-semibold text-accent mb-2 text-center font-Dynalight-Regular tracking-tight">
                    Blogs
                </h2>
                <p className="text-center text-base font-Jost-Semibold text-text-muted mb-8 tracking-wide">
                    Edit blog
                </p>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        label="Title"
                        type="text"
                        placeholder="title"
                        registration={register("title")}
                        error={errors.title?.message}
                    />

                    <TextAreaField
                        label="Description"
                        registration={register("description")}
                        error={errors.description?.message}
                    />

                    <FileInputField
                        label="Blog image"
                        fileName={watchedBlogImage?.[0]?.name}
                        registration={register("blog")}
                        error={errors.blog?.message}
                    />

                    {previewSrc && (
                        <img
                            src={previewSrc}
                            alt="Blog cover preview"
                            className="w-full h-64 object-cover rounded-lg border border-surface-border"
                        />
                    )}

                    <SubmitButton
                        isLoading={isUpdating}
                        label="Save changes"
                        loadingLabel="Saving"
                        type="submit"
                    />
                </form>
            </div>
        </div>
    );
}