import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { useCreateBlogMutation } from '../../store/apiSlice';
import { ArrowLeft } from 'lucide-react';
import AdminNavbar from '../../components/AdminNavbar';
interface BlogForm {
    title: string;
    excerpt: string;
    content: string;
    image: FileList;
    category: string;
    tags: string;
}

export default function CreateBlog() {
    const navigate = useNavigate();
    const [createBlog, { isLoading }] = useCreateBlogMutation();
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<BlogForm>();

    const imageFile = watch('image');

    // Handle image preview
    if (imageFile && imageFile.length > 0) {
        const file = imageFile[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }

    const onSubmit = async (data: BlogForm) => {
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
            if (data.image[0]) {
                formData.append('image', data.image[0]);
            }

            // Content validation
            if (!data.content || data.content === '<p><br></p>') {
                setError('Content cannot be empty');
                return;
            }

            await createBlog(formData).unwrap();
            navigate('/admin/dashboard');
        } catch (err: any) {
            console.error('Failed to create blog:', err);
            setError(err.data?.message || 'Failed to create blog');
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
                    >
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </button>

                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Blog Post</h1>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    {...register('title', { required: 'Title is required' })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                    placeholder="Enter blog title"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Excerpt *
                                </label>
                                <textarea
                                    {...register('excerpt', { required: 'Excerpt is required' })}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
                                    placeholder="Brief description of the blog post"
                                />
                                {errors.excerpt && (
                                    <p className="mt-1 text-sm text-red-500">{errors.excerpt.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Content *
                                </label>
                                <Controller
                                    name="content"
                                    control={control}
                                    rules={{ required: 'Content is required' }}
                                    render={({ field }) => (
                                        <div className="bg-white rounded-lg h-80 mb-12">
                                            <ReactQuill
                                                theme="snow"
                                                value={field.value || ''}
                                                onChange={field.onChange}
                                                className="h-64"
                                                placeholder="Write here..."
                                            />
                                        </div>
                                    )}
                                />
                                {errors.content && (
                                    <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Featured Image *
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-500 transition-colors">
                                    <div className="space-y-1 text-center">
                                        {imagePreview ? (
                                            <div className="mb-4 relative group">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="mx-auto h-48 object-cover rounded-lg shadow-sm"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg" />
                                            </div>
                                        ) : (
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
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
                                        )}
                                        <div className="flex text-sm text-gray-600 justify-center">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    accept="image/*"
                                                    {...register('image', {
                                                        required: 'Image is required',
                                                    })}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF up to 5MB
                                        </p>
                                    </div>
                                </div>
                                {errors.image && (
                                    <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    {...register('category', { required: 'Category is required' })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white"
                                >
                                    <option value="">Select a category</option>
                                    <option value="technology">Technology</option>
                                    <option value="design">Design</option>
                                    <option value="business">Business</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="productivity">Productivity</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tags (comma separated)
                                </label>
                                <input
                                    {...register('tags')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                    placeholder="web, design, tutorial"
                                />
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    {isLoading ? 'Creating...' : 'Publish Blog Post'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/dashboard')}
                                    className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
