import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../../../shared/components/form/InputField";
import SubmitButton from "../../../shared/components/form/SubmitButton";
import { TextAreaField } from "../../../shared/components/form/TextAreaField";
import { FileInputField } from "../../../shared/components/form/FileInputField";
import { useImagePreview } from "../../../shared/hooks/useImagePreview";
import { createBlogSchema, type CreateBlogFormType } from "../schema/createBlogSchema";
import { usePostBlog } from "../hooks/usePostBlog";
import { useHandleResponse } from "../../../shared/hooks/useHandleResponse";

export default function CreateBlogForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateBlogFormType>({
    resolver: zodResolver(createBlogSchema),
    mode: "onBlur",
  });

  const watchedBlogImage = useWatch({ control, name: "blog" });
  const previewUrl = useImagePreview(watchedBlogImage);
  const { isPosting, handlePost } = usePostBlog()
  const handleResponse = useHandleResponse();
  const onSubmit = async (data: CreateBlogFormType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("blog", data.blog[0]);
    const result = await handlePost(formData);
    handleResponse(result.success, "Blog successfully posted", result.message, "/my-blogs")
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-surface backdrop-blur-2xl border border-surface-border rounded-xl p-8 md:p-10">
        <h2 className="text-4xl font-semibold text-accent mb-2 text-center font-Dynalight-Regular tracking-tight">
          Blogs
        </h2>
        <p className="text-center text-base font-Jost-Semibold text-text-muted mb-8 tracking-wide">
          Upload blog
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

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Selected blog cover preview"
              className="w-full h-64 object-cover rounded-lg border border-surface-border"
            />
          )}

          <SubmitButton
            isLoading={isPosting}
            label="Upload"
            loadingLabel="Uploading"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}