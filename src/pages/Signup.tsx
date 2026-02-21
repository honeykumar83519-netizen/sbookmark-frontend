import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useSignupMutation } from '../store/apiSlice';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setCredentials } from '../store/authSlice';

interface SignupForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [signup, { isLoading }] = useSignupMutation();
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupForm>({
        mode: 'onBlur', // Validate on blur for better UX
    });

    const password = watch('password');

    const onSubmit = async (data: SignupForm) => {
        try {
            setError(''); // Clear previous errors
            const result = await signup({
                username: data.username,
                email: data.email,
                password: data.password,
            }).unwrap();
            dispatch(setCredentials(result.data));
            navigate('/');
        } catch (err: any) {
            setError(err.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4 py-8">
            <div className="card max-w-md w-full p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Join LinkHive</h1>
                <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">Create your account</p>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
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
                            className={`input text-sm sm:text-base ${errors.username ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="johndoe"
                            aria-invalid={errors.username ? 'true' : 'false'}
                        />
                        {errors.username && (
                            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Please enter a valid email address',
                                },
                            })}
                            className={`input text-sm sm:text-base ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="john@example.com"
                            aria-invalid={errors.email ? 'true' : 'false'}
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                                validate: {
                                    hasUpperCase: (value) =>
                                        /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                                    hasLowerCase: (value) =>
                                        /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
                                    hasNumber: (value) =>
                                        /[0-9]/.test(value) || 'Password must contain at least one number',
                                    hasSpecialChar: (value) =>
                                        /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must contain at least one special character',
                                },
                            })}
                            className={`input text-sm sm:text-base ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="••••••••"
                            aria-invalid={errors.password ? 'true' : 'false'}
                        />
                        {errors.password && (
                            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.password.message}
                            </p>
                        )}
                        <div className="mt-2 text-xs text-gray-500 space-y-1">
                            <p className="font-medium">Password requirements:</p>
                            <ul className="list-disc list-inside space-y-0.5 ml-2">
                                <li className={password && password.length >= 8 ? 'text-green-600' : ''}>At least 8 characters</li>
                                <li className={password && /[A-Z]/.test(password) ? 'text-green-600' : ''}>One uppercase letter</li>
                                <li className={password && /[a-z]/.test(password) ? 'text-green-600' : ''}>One lowercase letter</li>
                                <li className={password && /[0-9]/.test(password) ? 'text-green-600' : ''}>One number</li>
                                <li className={password && /[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : ''}>One special character</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: (value) => value === password || 'Passwords do not match',
                            })}
                            className={`input text-sm sm:text-base ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="••••••••"
                            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary w-full py-2.5"
                    >
                        {isLoading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600 text-sm sm:text-base">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
