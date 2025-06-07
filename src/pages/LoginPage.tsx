import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Button } from '../components/Button';

export const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  function handleSubmit() {
    if (authContext && email && password) {
      authContext
        .logIn(email, password)
        .then(() => {
          setMessage('Logged in successfully.');
        })
        .catch((error) => {
          console.error(error);
          setMessage('Error occurred while logging in.');
        });
    }
  }

  return (
    <main className="max-w-md mx-auto p-8 mt-10 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Log In
      </h1>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="pass" className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            id="pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {message && (
          <p
            className={`text-center text-sm font-medium ${
              message.includes('success') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex justify-center">
          <Button label="Log In" handleOnclick={handleSubmit} />
        </div>
      </form>
    </main>
  );
};
