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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth");
        const data = (await res.json()) || {};
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        setError(`Error fetching data: ${error}`);
      }
    })();
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
        const decodedToken = jwt.decode(token) as DecodedToken;
        console.log(`${decodedToken?.username ?? "user"} logged in`);
        setIsLoggedIn(true);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError(
        "An error occurred while processing your login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res: any = await fetch("/api/logout");
      const data = (await res.json()) || {};
      console.log(data ? "Logged out" : "Logout failed");
      setIsLoggedIn(false);
      setLoading(false);
    } catch (error) {
      setError("An error occurred while trying to log out. Please try again.");
      setLoading(false);
    }
  };

  const isLoginButtonDisabled = !username || !password;

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-slate-100">
      {loading ? (
        <div className="flex justify-center absolute items-center h-24 w-24 animate-spin rounded-full border-4 border-t-purple-700"></div>
      ) : (
        <></>
      )}
      <form
        action="/api/login"
        method="POST"
        className="flex flex-col min-w-64 space-y-2"
      >
        <header className="text-2xl text-left font-semibold">
          Login{" "}
          <span className="text-sm inline-block relative bottom-1.5">
            {isLoggedIn ? <>✅</> : <>✖️</>}
          </span>
        </header>
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

        <Link href="/protected-middleware" passHref>
          <button className="text-sky-500 transition-colors hover:text-sky-700">
            Visit protected page
          </button>
        </Link>
        {error ? (
          <p className="text-red-600 text-base">Error: {error}</p>
        ) : null}
      </form>
    </main>
  );
};

export default BasicForm;
