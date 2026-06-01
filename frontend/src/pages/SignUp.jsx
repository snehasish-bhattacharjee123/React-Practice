import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function SignUp() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        console.log("-----------------------");
        const { name, value } = e.target;
        setFormData(prev => {
            const nextData = { ...prev, [name]: value };
            console.log(nextData)
            if (nextData.password && nextData.confirmPassword && nextData.password !== nextData.confirmPassword) {
                setError('Passwords do not match');
            } else {
                setError('');
            }
            return nextData;
        });
    };

    const { login } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) throw new Error(data.message || 'Something went wrong');

            // 3. Log the user into the global context session on success!
            login(data.user || { email: formData.email, fullName: formData.fullName });

            // Clean form and errors on success
            setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
            setError('');
            alert('Registration successful!');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 border-2 border-solid border-blue-400">
            <div className="w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-black-900 tracking-tight">
                        Create Account
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Sign up for an account to get started
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="p-3 mb-5 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
                        {error}
                    </div>
                )}

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            Full Name <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder='Enter Your Name'
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            Email Address <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            Password <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            Confirm Password <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-lg transition-all cursor-pointer">
                        Sign Up
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account? <a href="#" className="text-blue-600 hover:underline">Log in</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
