import React, { ChangeEvent } from 'react'
import InputField from './InputField'

interface SignupProps {
    setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
    formState: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    };
    setFormState: React.Dispatch<React.SetStateAction<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }>>;
    handleSubmit: (event: React.FormEvent) => void;
    errors: string
    setErrors: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
}


const Signup: React.FC<SignupProps> = ({ setIsSignup, formState, setFormState, handleSubmit, errors, setErrors, loading }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // No fields should be more than 8 characters except email
        if (name !== 'email' && value.length > 8) {
            return;
        }

        setFormState((prev) => ({ ...prev, [name]: value }));
        setErrors('');
    };

    const handleAuthPage = () => {
        setIsSignup(false)
        setErrors('')
    }

    return (
        <div className="flex-1 bg-white flex flex-col justify-center p-8 sm:px-12 md:px-16 lg:px-24">
            <div className="text-right">
                <span className="text-gray-600">Already have an account?</span>{" "}
                <span className="text-blue-500 font-semibold cursor-pointer" onClick={handleAuthPage}>
                    Login
                </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mt-8">Get started.</h2>
            <p className="text-gray-500 mb-6">Sign up to the platform</p>

            {/* <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button className="flex-1 bg-gray-100 py-2 rounded-md shadow-md text-sm font-semibold"
                >
                    <span>📧</span> Sign up with Google
                </button>

            </div> */}

            {/* <div className="text-center text-gray-400 text-sm mb-6">or</div> */}

            <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-2">
                    <InputField
                        type='text'
                        name='firstName'
                        placeholder="FirstName"
                        onChange={handleChange}
                        value={formState?.firstName}
                    />
                    <InputField
                        type='text'
                        name='lastName'
                        placeholder="LastName"
                        onChange={handleChange}
                        value={formState?.lastName}
                    />
                    <InputField
                        type='email'
                        name='email'
                        placeholder="Email"
                        onChange={handleChange}
                        value={formState?.email}
                    />
                    <InputField
                        type='password'
                        name='password'
                        placeholder="Password"
                        onChange={handleChange}
                        value={formState?.password}
                    />
                </div>
                <span className='text-red-500 text-sm font-semibold'>{errors}</span>
                <button
                    type="submit"
                    className="w-full bg-blue-500 disabled:bg-gray-200 flex justify-center items-center text-white py-3 rounded-md mt-6 shadow-md hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ?
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-800"></div>
                        : "Signup"
                    }
                </button>
            </form>
        </div>
    )
}

export default Signup