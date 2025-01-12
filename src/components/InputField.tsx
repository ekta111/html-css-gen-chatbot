import React from 'react'

interface InputFieldProps {
    type: string; // Type for input type, such as "text", "password", etc.
    name: string; // Name for the input field
    placeholder: string; // Placeholder text for the input field
    onChange: React.ChangeEventHandler<HTMLInputElement>; // Handler for the input change
    value: string; // The value of the input
  }

const InputField : React.FC<InputFieldProps> = ({ type, name, placeholder, onChange, value }) => {

    return (
        <>
            <input
                className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    )
}

export default InputField