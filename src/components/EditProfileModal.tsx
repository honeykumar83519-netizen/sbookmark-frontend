import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { X, Upload, User as UserIcon } from 'lucide-react';
import { useUpdateUserProfileMutation } from '../store/apiSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { updateUser } from '../store/authSlice';
import { BACKEND_URL } from '../config';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ProfileForm {
    username: string;
    bio: string;
    avatar: string;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();
    const [error, setError] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileForm>({
        defaultValues: {
            username: user?.username || '',
            bio: user?.bio || '',
            avatar: user?.avatar || '',
        },
    });

    if (!isOpen || !user) return null;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should not exceed 5MB');
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please upload a valid image file');
                return;
            }

            // Store the file object and create preview
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
                setError('');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveAvatar = () => {
        setAvatarPreview('');
        setAvatarFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const onSubmit = async (data: ProfileForm) => {
        try {
            setError('');

            // Create FormData for multipart file upload
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('bio', data.bio || '');

            // Add avatar file if selected
            if (avatarFile) {
                formData.append('avatar', avatarFile);
            } else if (!avatarPreview && user.avatar) {
                // User removed the avatar
                formData.append('removeAvatar', 'true');
            }

            const result = await updateProfile({
                id: user.id,
                formData,
            }).unwrap();

            // Update local user state
            dispatch(updateUser(result.data));
            onClose();
        } catch (err: any) {
            setError(err.data?.message || 'Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
                    onClick={onClose}
                />

                {/* Modal panel */}
                <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {error}
                            </div>
                        )}

                        {/* Avatar Upload */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Profile Picture
                            </label>
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                                <div className="flex-shrink-0">
                                    {avatarPreview ? (
                                        <img
                                            src={avatarPreview.startsWith('/uploads/')
                                                ? `${BACKEND_URL}${avatarPreview}`
                                                : avatarPreview
                                            }
                                            alt="Profile preview"
                                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-primary-100"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center border-4 border-primary-100">
                                            <UserIcon size={40} className="text-primary-600 sm:w-12 sm:h-12" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 w-full text-center sm:text-left">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-start">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="btn btn-secondary flex items-center justify-center gap-2 py-2"
                                        >
                                            <Upload size={18} />
                                            Upload Image
                                        </button>
                                        {avatarPreview && (
                                            <button
                                                type="button"
                                                onClick={handleRemoveAvatar}
                                                className="btn bg-red-50 text-red-600 hover:bg-red-100 border-red-200 flex items-center justify-center gap-2 py-2"
                                            >
                                                <X size={18} />
                                                Remove
                                            </button>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Username */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                {...register('username', {
                                    required: 'Username is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Username must be at least 3 characters',
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: 'Username cannot exceed 20 characters',
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9_-]+$/,
                                        message: 'Username can only contain letters, numbers, underscores, and hyphens',
                                    },
                                })}
                                className={`input ${errors.username
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                    : ''
                                    }`}
                                placeholder="johndoe"
                            />
                            {errors.username && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        {/* Bio */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bio
                            </label>
                            <textarea
                                {...register('bio', {
                                    maxLength: {
                                        value: 200,
                                        message: 'Bio cannot exceed 200 characters',
                                    },
                                })}
                                className={`input min-h-[100px] resize-none ${errors.bio
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                    : ''
                                    }`}
                                placeholder="Tell us about yourself..."
                                rows={4}
                            />
                            {errors.bio && (
                                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {errors.bio.message}
                                </p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                                {(register('bio').name ? 0 : 0)}/200 characters
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4 border-t">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 btn btn-secondary"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 btn btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg
                                            className="animate-spin h-5 w-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Saving...
                                    </span>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
