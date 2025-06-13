import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import { Button } from '../components/Button';

type LoginPageProps = {
  onLoginSuccess: () => void;
};

export const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    
    setEmail('');
    setPassword('');
    setMessage(null);
  }, [authContext?.user]);

  function handleLogin() {
    if (authContext && email && password) {
      authContext
        .logIn(email, password)
        .then(() => {
          setMessage('Login successful.');
          onLoginSuccess();
        })
        .catch((error) => {
          console.log(error);
          setMessage('Login failed. Check credentials.');
        });
    }
  }

  return (
    <main className="max-w-md mx-auto p-8 mt-10 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Login
      </h1>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="new-email"
            type="email"
            autoComplete='off'
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
            name="new-pass"
            type="password"
            autoComplete='new-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {message && (
          <p className="text-center text-sm text-red-600 font-medium">
            {message}
          </p>
        )}

        <div className="flex justify-center">
          <Button label="Log In" handleOnclick={handleLogin} />
        </div>
      </form>
    </main>
  );
};
