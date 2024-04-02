import Link from 'next/link';
import { GetServerSideProps } from 'next';

type ProtectedPageProps = {
  isLoggedIn: boolean;
};

const ProtectedPage: React.FC<ProtectedPageProps> = ({ isLoggedIn }) => (
  <div>
    <h1>Protected Page</h1>
    <p>You are {isLoggedIn ? 'logged in' : 'NOT logged in'}</p>
    <Link href="/">Home</Link>
  </div>
);

export const getServerSideProps: GetServerSideProps<
  ProtectedPageProps
> = async ({ req }) => {
  const host = `http://${req.headers.host}`;
  const res = await fetch(`${host}/api/auth`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  const data = (await res.json()) || {};

  return {
    props: {
      isLoggedIn: data?.isLoggedIn
    }
  };
};

export default ProtectedPage;
