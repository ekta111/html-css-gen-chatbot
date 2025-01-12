import React, { ChangeEvent } from 'react'
import InputField from './InputField'

interface LoginProps {
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
    errors: string;
    setErrors: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
  }

const Login: React.FC<LoginProps> = ({ formState, setFormState, setIsSignup, handleSubmit, setErrors, errors, loading }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // no any feilds should be more that 8 letters except email
        if (name !== 'email' && value.length > 8) {
            return;
        }

        setFormState((prev) => ({ ...prev, [name]: value }));
        setErrors('')
    };

    const handleAuthPage = () => {
        setIsSignup(true)
        setErrors('')
    }

    return (
        <div className="flex-1 bg-white flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24">
            <div className="text-right">
                <span className="text-gray-600">Dont have an account?</span>{" "}
                <span className="text-blue-500 font-semibold cursor-pointer" onClick={handleAuthPage}>
                    Signup
                </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mt-8">Get started.</h2>
            <p className="text-gray-500 mb-6">Login to the platform</p>

            {/* <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button className="flex-1 bg-gray-100 py-2 rounded-md shadow-md text-sm font-semibold"
                // onClick={handleGoogleSignIn}
                >
                    <span>📧</span> Login with Google
                </button>
            </div> */}

            {/* <div className="text-center text-gray-400 text-sm mb-6">or</div> */}
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <InputField
                        type='email'
                        name="email"
                        placeholder="Email"
                        value={formState?.email}
                        onChange={handleChange}
                    />
                    <InputField
                        type='password'
                        name='password'
                        placeholder="Password"
                        value={formState?.password}
                        onChange={handleChange}
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
                        : "Login"
                    }
                </button>
            </form>
        </div>
    )
}

export default Login