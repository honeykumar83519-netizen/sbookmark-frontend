import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginMutation } from '../store/apiSlice';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setCredentials } from '../store/authSlice';
import SEO from '../components/SEO';

interface LoginForm {
    email: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    const onSubmit = async (data: LoginForm) => {
        try {
            const result = await login(data).unwrap();
            dispatch(setCredentials(result.data));

            // Role-based redirect
            if (result.data.user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        } catch (err: any) {
            setError(err.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4 py-8">
            <SEO title="Login" description="Login to your SBookmark account." />
            <div className="card max-w-md w-full p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Welcome Back</h1>
                <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">Login to SBookmark</p>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="input text-sm sm:text-base"
                            placeholder="john@example.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className="input text-sm sm:text-base"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary w-full py-2.5"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600 text-sm sm:text-base">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
