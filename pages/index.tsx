import { useState } from "react";
import jwt from "jsonwebtoken";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("Not logged in");

  const submitForm = async () => {
    const res = await fetch("api/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (data?.token) {
      const json = jwt.decode(data.token);
      setMessage(`Welcome ${json?.username} you are logged in`);
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
          onClick
        >
          Login
        </button>
      </form>
    </main>
  );
}
