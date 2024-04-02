import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProtectedPage = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/auth');
        const { isLoggedIn } = (await res.json()) || {};
        if (!isLoggedIn) {
          push('/');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [push]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-2 bg-slate-100">
      {loading ? (
        <div className="flex justify-center items-center h-24 w-24 animate-spin rounded-full border-4 border-t-purple-700"></div>
      ) : (
        <>
          <header className="text-2xl text-left font-semibold">
            Protected Page
          </header>
          <p>You are logged in</p>
          <Link href="/" className="text-sky-500 hover:text-sky-700">
            Home
          </Link>
        </>
      )}
    </main>
  );
};

export default ProtectedPage;
