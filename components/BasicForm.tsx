import jwt, { JwtPayload } from "jsonwebtoken";
import Link from "next/link";
import { useState } from "react";

interface DecodedToken extends JwtPayload {
  username?: string;
}

const BasicForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("Not logged in");

  const submitForm = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {

      const res:any = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const { token } = await res.json() || {};
  
      if (token) {
        const json = jwt.decode(token) as DecodedToken;
        setMessage(`Welcome ${json?.username ?? 'user'}, you are logged in`);
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setMessage('An error occurred while processing your login. Please try again.');
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 bg-slate-100`}
    >
      {message}
      <form
        action="/api/login"
        method="POST"
        className={`flex flex-col space-y-2`}
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`class="w-full p-2 border border-gray-300 rounded-md" required`}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`class="w-full p-2 border border-gray-300 rounded-md" required`}
          required
        />

        <button
          type="submit"
          className={`w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 shadow rounded`}
          onClick={submitForm}
        >
          Login
        </button>
        <Link href="/protected">visit protected</Link>
      </form>
    </main>
  );
};

export default BasicForm;