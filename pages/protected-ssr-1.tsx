import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

type Props = {
  token: string;
  isLoggedIn: boolean;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req
}) => {
  const cookies = parse(req.headers.cookie || '');
  const tokenFromCookie = cookies.token || '';
  let isLoggedIn = false;

  try {
    const decodedToken = jwt.verify(tokenFromCookie, SECRET_KEY || '') as {
      isLoggedIn: boolean;
    };
    isLoggedIn = decodedToken.isLoggedIn;
  } catch (err) {
    console.error(`Access denied: verification error: ${err}`);
  }

  return {
    props: {
      token: tokenFromCookie,
      isLoggedIn: isLoggedIn || false
    }
  };
};

const ProtectedPage: React.FC<Props> = ({ token, isLoggedIn }) => {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>isLoggedIn: {isLoggedIn ? 1 : 0}</p>
      <p>token: {token ? token : null}</p>
      <Link href="/">Home</Link>
    </div>
  );
};

export default ProtectedPage;
