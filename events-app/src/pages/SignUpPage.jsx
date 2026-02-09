import { useState } from 'react';
import { useNavigate } from 'react-router';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const SignUpPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (form.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }

      setSuccessMessage('Sign-up successful! Redirecting to login...');

      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className='flex justify-center items-center m-20'>
      <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-2xl border p-6'>
        <h1
          className='font-bold uppercase text-2xl mb-8'
          style={{ color: '#6F5A55' }}
        >
          Sign Up
        </h1>

        {/* email */}
        <label className='label'>Email</label>
        <input
          type='email'
          className='input input-bordered w-full'
          placeholder='Email'
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* password */}
        <label className='label mt-4'>Password</label>
        <input
          type='password'
          className='input input-bordered w-full'
          placeholder='Password'
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {errorMessage && <p className='text-red-500 mt-2'>{errorMessage}</p>}
        {successMessage && (
          <p className='text-green-500 mt-2'>{successMessage}</p>
        )}
        {/* submit */}
        <button
          className='mt-4 w-full px-3 py-2 rounded-lg
        bg-[#85CE5D] text-white
        hover:bg-[#6F5A55]
        transition-colors font-semibold cursor-pointer'
          type='submit'
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </fieldset>
    </div>
  );
};

export default SignUpPage;
