import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateBlogMutation, useGetBlogByIdQuery } from '../../store/apiSlice';
import { ArrowLeft } from 'lucide-react';
import AdminNavbar from '../../components/AdminNavbar';
import SEO from '../../components/SEO';
import { BACKEND_URL } from '../../config';

interface BlogForm {
    title: string;
    excerpt: string;
    content: string;
    image: FileList;
    category: string;
    tags: string;
}

export default function EditBlog() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: blog, isLoading: isFetching } = useGetBlogByIdQuery(id || '', {
        skip: !id,
    });
    const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm<BlogForm>();

    const imageFile = watch('image');

    // Handle image preview
    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [imageFile]);

    // Pre-populate form data
    useEffect(() => {
        if (blog) {
            reset({
                title: blog.title,
                excerpt: blog.excerpt,
                content: blog.content,
                category: blog.category,
                tags: blog.tags ? blog.tags.join(', ') : '',
            });
            if (blog.image) {
                setImagePreview(blog.image.startsWith('/uploads/') ? `${BACKEND_URL}${blog.image}` : blog.image);
            }
        }
    }, [blog, reset]);

    const onSubmit = async (data: BlogForm) => {
        if (!id) return;
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('excerpt', data.excerpt);
            formData.append('content', data.content);
            formData.append('category', data.category);

            // Handle tags
            const tagsList = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
            tagsList.forEach(tag => formData.append('tags', tag));

            // Handle image
            if (data.image && data.image[0]) {
                formData.append('image', data.image[0]);
            }

            // Content validation
            if (!data.content || data.content === '<p><br></p>') {
                setError('Content cannot be empty');
                return;
            }

            await updateBlog({ id, formData }).unwrap();
            navigate('/admin/dashboard');
        } catch (err: any) {
            console.error('Failed to update blog:', err);
            setError(err.data?.message || 'Failed to update blog');
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ]
    };

    if (isFetching) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <>
            <SEO title={`Edit Blog: ${blog?.title || ''}`} description="Edit blog post for SBookmark." />
            <AdminNavbar />
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-semibold uppercase tracking-wider">Back to Dashboard</span>
                    </button>

                    <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-8 border border-gray-100">
                        <header className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Edit Blog Post</h1>
                            <p className="text-gray-500 mt-1 text-sm">Update your insights and inform the community.</p>
                        </header>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Blog Title *
                                </label>
                                <input
                                    {...register('title', { required: 'Title is required' })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-gray-400"
                                    placeholder="Enter a catchy title"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-xs font-medium text-red-500">{errors.title.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Short Excerpt *
                                </label>
                                <textarea
                                    {...register('excerpt', { required: 'Excerpt is required' })}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none placeholder:text-gray-400"
                                    placeholder="Brief summary that appears on the blog list page"
                                />
                                {errors.excerpt && (
                                    <p className="mt-1 text-xs font-medium text-red-500">{errors.excerpt.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Full Content *
                                </label>
                                <Controller
                                    name="content"
                                    control={control}
                                    rules={{ required: 'Content is required' }}
                                    render={({ field }) => (
                                        <div className="bg-white rounded-xl border border-gray-300 overflow-hidden mb-2">
                                            <ReactQuill
                                                theme="snow"
                                                value={field.value || ''}
                                                onChange={field.onChange}
                                                modules={modules}
                                                className="h-[300px] mb-12 sm:mb-10"
                                                placeholder="Start writing your masterpiece..."
                                            />
                                        </div>
                                    )}
                                />
                                {errors.content && (
                                    <p className="mt-2 text-xs font-medium text-red-500">{errors.content.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Featured Image
                                </label>
                                <div className="mt-1 flex justify-center px-4 sm:px-6 pt-6 pb-6 border-2 border-gray-100 border-dashed rounded-2xl hover:border-primary-400 transition-colors bg-gray-50/50">
                                    <div className="space-y-2 text-center w-full">
                                        {imagePreview ? (
                                            <div className="mb-4 relative group max-w-lg mx-auto">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="mx-auto h-40 sm:h-56 w-full object-cover rounded-xl shadow-md border-4 border-white"
                                                />
                                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all rounded-xl flex items-center justify-center">
                                                    <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">Change Image</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center py-4 text-gray-400">
                                                <svg
                                                    className="mx-auto h-12 w-12 mb-2"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <span className="text-xs font-medium">No image selected</span>
                                            </div>
                                        )}
                                        <div className="flex flex-col text-sm text-gray-600 items-center justify-center">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full font-bold hover:bg-primary-100 transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 mb-2"
                                            >
                                                <span>{imagePreview ? 'Replace Image' : 'Choose File'}</span>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    accept="image/*"
                                                    {...register('image')}
                                                />
                                            </label>
                                            <p className="text-[10px] text-gray-500 font-medium">
                                                PNG, JPG, WEBP up to 5MB. Leave empty to keep current image.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {errors.image && (
                                    <p className="mt-1 text-xs font-medium text-red-500">{errors.image.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Category *
                                    </label>
                                    <select
                                        {...register('category', { required: 'Category is required' })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white cursor-pointer font-medium"
                                    >
                                        <option value="">Select a category</option>
                                        <option value="technology">Technology</option>
                                        <option value="design">Design</option>
                                        <option value="business">Business</option>
                                        <option value="science">Science</option>
                                        <option value="entertainment">Entertainment</option>
                                        <option value="health">Health</option>
                                        <option value="education">Education</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.category && (
                                        <p className="mt-1 text-xs font-medium text-red-500">{errors.category.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Tags (comma separated)
                                    </label>
                                    <input
                                        {...register('tags')}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-gray-400 font-medium"
                                        placeholder="e.g. web, design, tutorial"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    <p className="text-sm font-medium text-red-700">{error}</p>
                                </div>
                            )}

                            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/dashboard')}
                                    className="flex-1 px-6 py-3.5 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all text-sm uppercase tracking-wider"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="flex-[2] bg-primary-600 text-white py-3.5 px-6 rounded-xl font-bold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary-500/20 text-sm uppercase tracking-wider"
                                >
                                    {isUpdating ? 'Updating...' : 'Update Article'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}
