import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCreateLinkMutation, useFetchLinkPreviewMutation } from '../store/apiSlice';
import { useAppSelector } from '../hooks/reduxHooks';
import type { CategoryType } from '../types';
import { Loader } from 'lucide-react';

const CATEGORIES: CategoryType[] = [
    'Technology',
    'Design',
    'Business',
    'Science',
    'Entertainment',
    'Health',
    'Education',
    'Other',
];

interface SubmitLinkForm {
    title: string;
    url: string;
    description: string;
    category: CategoryType;
    tags: string;
}

export default function SubmitLink() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [createLink, { isLoading }] = useCreateLinkMutation();
    const [fetchPreview, { isLoading: isFetchingPreview }] = useFetchLinkPreviewMutation();
    const [error, setError] = useState('');
    const [preview, setPreview] = useState<{
        title: string;
        description: string;
        imageUrl: string;
        siteName?: string;
    } | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<SubmitLinkForm>();

    const urlValue = watch('url');

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    const handleFetchPreview = async () => {
        if (!urlValue) {
            setError('Please enter a URL first');
            return;
        }

        try {
            setError('');
            const result = await fetchPreview({ url: urlValue }).unwrap();
            setPreview(result.data);

            // Auto-fill form fields if they're empty
            if (!watch('title') && result.data.title) {
                setValue('title', result.data.title);
            }
            if (!watch('description') && result.data.description) {
                setValue('description', result.data.description);
            }
        } catch (err: any) {
            setError(err.data?.message || 'Failed to fetch preview');
            setPreview(null);
        }
    };

    const onSubmit = async (data: SubmitLinkForm) => {
        try {
            const tags = data.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag);

            await createLink({
                title: data.title,
                url: data.url,
                description: data.description || preview?.description || '',
                imageUrl: preview?.imageUrl || '',
                category: data.category,
                tags,
            }).unwrap();

            navigate('/');
        } catch (err: any) {
            setError(err.data?.message || 'Failed to submit link');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
            <div className="max-w-3xl mx-auto px-3 sm:px-4">
                <div className="card p-4 sm:p-6 md:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">Submit a Link</h1>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">Share something awesome with the community</p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm sm:text-base">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                URL *
                            </label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="url"
                                    {...register('url', { required: 'URL is required' })}
                                    className="input flex-1 text-sm sm:text-base"
                                    placeholder="https://example.com"
                                />
                                <button
                                    type="button"
                                    onClick={handleFetchPreview}
                                    disabled={!urlValue || isFetchingPreview}
                                    className="btn btn-primary px-4 sm:px-6 whitespace-nowrap text-sm sm:text-base py-2"
                                >
                                    {isFetchingPreview ? (
                                        <span className="flex items-center gap-2">
                                            <Loader className="animate-spin" size={18} />
                                            Fetching...
                                        </span>
                                    ) : (
                                        'Fetch Preview'
                                    )}
                                </button>
                            </div>
                            {errors.url && (
                                <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
                            )}
                        </div>

                        {preview && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        {...register('title', { required: 'Title is required' })}
                                        className="input text-sm sm:text-base"
                                        placeholder="Awesome resource for developers"
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                                    )}
                                </div>

                                {/* Link Preview */}
                                <div className="border-2 border-primary-200 rounded-xl p-3 sm:p-4 bg-gradient-to-br from-primary-50 to-blue-50">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Link Preview (Editable)
                                    </h3>
                                    <div className="flex flex-col sm:flex-row gap-4 p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                                        {preview.imageUrl && (
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={preview.imageUrl}
                                                    alt="Preview"
                                                    className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg border border-gray-200"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            {preview.siteName && (
                                                <p className="text-xs font-medium text-primary-600 uppercase mb-1">
                                                    {preview.siteName}
                                                </p>
                                            )}
                                            <p className="text-base sm:text-lg font-bold text-gray-900 mb-1 leading-tight">
                                                {watch('title') || preview.title || 'No title available'}
                                            </p>
                                            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                                                {watch('description') || preview.description || 'No description available'}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 italic">
                                        💡 Preview fields are automatically filled below. Edit them as needed.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        {...register('description')}
                                        className="input text-sm sm:text-base"
                                        rows={3}
                                        placeholder="Tell us more about this link..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category *
                                    </label>
                                    <select {...register('category', { required: true })} className="input text-sm sm:text-base">
                                        <option value="">Select a category</option>
                                        {CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className="text-red-500 text-sm mt-1">Category is required</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tags (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        {...register('tags')}
                                        className="input text-sm sm:text-base"
                                        placeholder="react, javascript, tutorial"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button type="submit" disabled={isLoading} className="btn btn-primary flex-1 py-2.5">
                                        {isLoading ? 'Submitting...' : 'Submit Link'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/')}
                                        className="btn btn-secondary py-2.5"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
