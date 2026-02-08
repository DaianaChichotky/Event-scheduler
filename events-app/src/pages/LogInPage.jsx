import { useState } from 'react';
import { useNavigate } from 'react-router';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const LogInPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      // guardar token en localStorage
      localStorage.setItem('token', data.token);

      setSuccessMessage('Login successful! Redirecting to Home...');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setSuccessMessage('Logged out successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 1500);
    // Redirigir a login después de 1 segundo (opcional)
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className='flex justify-center items-center m-20'>
      <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-2xl border p-6'>
        <h1 className='font-bold uppercase text-2xl mb-8'>Log In</h1>

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

        {/* log in button */}
        <button
          className='btn btn-neutral mt-4 w-full'
          type='submit'
          onClick={handleSubmit}
        >
          Log In
        </button>

        {/* loggout */}
        {localStorage.getItem('token') && (
          <button
            className='btn btn-outline btn-secondary mt-2 w-full'
            type='button'
            onClick={handleLogout}
          >
            Log Out
          </button>
        )}
      </fieldset>
    </div>
  );
};

export default LogInPage;
