import Link from "next/link";
import { useEffect, useState } from "react";

const ProtectedPage = () => {
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth");
      const { isLoggedIn } = (await res.json()) || {};
      setLoggedIn(isLoggedIn);
    })();
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>You are {loggedIn ? "logged in" : "NOT logged in"}</p>
      <Link href="/">Home</Link>
    </div>
  );
};

export default ProtectedPage;
