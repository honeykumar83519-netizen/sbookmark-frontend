import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAdminLoginMutation } from '../../store/apiSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setCredentials, logout } from '../../store/authSlice';

interface LoginForm {
    email: string;
    password: string;
}

export default function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useAdminLoginMutation();
    const [error, setError] = useState('');

    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    const onSubmit = async (data: LoginForm) => {
        try {
            const result = await login(data).unwrap();
            dispatch(setCredentials(result.data));
            navigate('/admin/dashboard');
        } catch (err: any) {
            console.error('Login error details:', JSON.stringify(err, null, 2));

            // Handle different error structures
            let errorMessage = 'Access denied. Invalid credentials.';

            if (err?.data?.message) {
                errorMessage = err.data.message;
            } else if (err?.error) {
                errorMessage = err.error; // Handle fetch errors
            } else if (err?.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8">
            <div className="card max-w-md w-full p-6 sm:p-8 bg-white rounded-xl shadow-2xl">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">Admin Portal</h1>
                <p className="text-gray-500 text-center mb-6 text-sm sm:text-base">Secure Login Area</p>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Admin Email
                        </label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="input w-full p-2 border rounded-md"
                            placeholder="admin@sbookmark.link"
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
                            className="input w-full p-2 border rounded-md"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gray-900 text-white font-bold py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        {isLoading ? 'Verifying...' : 'Access Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
}
