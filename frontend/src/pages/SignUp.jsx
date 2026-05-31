import react, { useState } from 'react';


function SignUp() {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [Error, setError] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
        } else {
            setError('');
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Something went wrong');
            alert('Registration successful!');
        } catch (error) {
            setError(error.message);
        }
    }




    return (
        <div className="min-h-screen flex justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 border-2  border-solid border-blue-400">
            <div className="w-full  bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 ">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-black-900 tracking-tight">
                        Create Account
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Sign up for an account to get started
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">Full Name
                            <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder='Enter Your Name'
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">Email Address
                            <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">Password
                            <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">Confirm Password
                            <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
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
    )
}
export default SignUp