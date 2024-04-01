import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { parse } from 'cookie';
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

type Props = {
  token: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {

  // Finally working!
  const cookies = parse(req.headers.cookie || ''); // Parse cookies from the request headers
  const token = cookies.token || '';

  // TODO: fix this
  // jwt.verify(token, SECRET_KEY || '', (err: any, decodedToken: any) => {
  //   if (err) {
  //     // access denied: verification error
  //     console.log(`JWT error: ${err}`);
  //     return res.status(401).json({ message: 'access denied' });
  //   }});

  try {
    // const host = `http://${req.headers.host}`;
    // const fetchUrl = `${host}/api/token`;
    // const res = await fetch(fetchUrl);
    // const data = await res.json();

    return {
      props: {
        token,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        token: '',
      },
    };
  }
};

const ProtectedPage: React.FC<Props> = ({ token }) => {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>Token: {token ? token : null}</p>
      <Link href="/">Home</Link>
    </div>
  );
};

export default ProtectedPage;