import { useEffect, useState } from 'react';
import { decode } from 'jsonwebtoken'
import Link from 'next/link';

const Protected = () => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const tokenString = document.cookie?.split(';').find((c) => c.trim().startsWith('token='));
    console.log(document.cookie);
    console.log(document.cookie?.split(';'));
    // console.log(decode(tokenString || ''));
    setToken(tokenString || '')
  }, []);

  return (<div>
    <h1>Protected Page</h1>
    {token ? <p>You do have access</p> : <p>Access denied</p>}
    <Link href="/">Home</Link>
  </div>);
};

export default Protected;