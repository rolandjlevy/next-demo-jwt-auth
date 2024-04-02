import jwt, { JwtPayload } from "jsonwebtoken";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DecodedToken extends JwtPayload {
  username?: string;
}

const BasicForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/auth");
        const data = (await res.json()) || {};
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const login = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res: any = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const { token } = (await res.json()) || {};

      setIsLoggedIn(false);

      if (token) {
        const json = jwt.decode(token) as DecodedToken;
        setIsLoggedIn(true);
        console.log(`Welcome ${json?.username ?? "user"}, you are logged in`);
      } else {
        console.log("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(
        "An error occurred while processing your login. Please try again."
      );
    }
  };

  const logout = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res: any = await fetch("/api/logout");
      const data = (await res.json()) || {};

      setIsLoggedIn(false);

      if (data) {
        console.log(`You are logged out`);
      } else {
        console.log("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log(
        "An error occurred while trying to log out. Please try again."
      );
    }
  };

  const isLoginButtonDisabled = !username || !password;

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-slate-100">
      <form
        action="/api/login"
        method="POST"
        className="flex flex-col min-w-64 space-y-2"
      >
        <header className="text-2xl text-left font-semibold">Login</header>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          required
        />

        <button
          type="submit"
          className={`${
            isLoginButtonDisabled
              ? "bg-purple-300 border border-purple-500 cursor-not-allowed"
              : "bg-purple-500 border border-purple-500 hover:bg-purple-700"
          } text-white font-bold transition-colors py-2 px-4 shadow rounded`}
          onClick={login}
          disabled={isLoginButtonDisabled}
        >
          Login
        </button>
        <button
          type="button"
          className="bg-transparent hover:bg-white text-purple-700 font-bold transition-colors border border-purple-500 py-2 px-4 shadow rounded"
          onClick={logout}
        >
          Logout
        </button>
        <p>{`You are ${isLoggedIn ? "" : "NOT"} logged in`}</p>
        <Link
          href="/protected-middleware"
          className="text-sky-500 transition-colors hover:text-sky-700"
        >
          visit protected page
        </Link>
      </form>
    </main>
  );
};

export default BasicForm;
