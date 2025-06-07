import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import { Button } from '../components/Button';

export const CreateUserPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setMessage(null);
  }, []);

  if (authContext?.user) {
    return (
      <p className="text-center text-lg mt-10 text-gray-500">
        You are already logged in. No need to create an account.
      </p>
    );
  }

  function handleSubmit() {
    if (password.length < 6) {
      setMessage('Password should be at least 6 characters long.');
      return;
    }

    if (authContext && email && password) {
      authContext
        .createAccount(email, password)
        .then(() => {
          setMessage('Account created successfully.');
          setEmail('');
          setPassword('');
        })
        .catch((error) => {
          console.error(error);
          setMessage('Error occurred when creating an account.');
        });
    }
  }

  return (
    <main className="max-w-md mx-auto p-8 mt-10 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h1>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="off"
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
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {message && (
          <p className="text-center text-sm font-medium text-red-600">{message}</p>
        )}

        <div className="flex justify-center">
          <Button label="Create Account" handleOnclick={handleSubmit} />
        </div>
      </form>
    </main>
  );
};
