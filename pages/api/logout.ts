import { parse, serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const SECRET_KEY = process.env.SECRET_KEY;

type Data = {
  message: string;
};

type ErrorResponse = {
  error: string;
};

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) => {
  const cookies = parse(req.headers.cookie || '');
  const tokenFromCookie = cookies?.token || '';
  let isLoggedIn = false;

  try {
    const decodedToken = jwt.verify(tokenFromCookie, SECRET_KEY || '') as {
      isLoggedIn: boolean;
    };
    isLoggedIn = decodedToken.isLoggedIn;
  } catch (err) {
    console.error(`Access denied: verification error: ${err}`);
  }
  if (!isLoggedIn) {
    res.status(200).json({ message: 'Already logged out' });
    return;
  }

  // Clear the token cookie by setting an empty value and an expiration date in the past
  const cookieOptions = { httpOnly: true, path: '/', expires: new Date(0) };
  const serializedCookie = serialize('token', '', cookieOptions);
  res.setHeader('Set-Cookie', serializedCookie);

  res.status(200).json({ message: 'Successfully logged out' });
};

export default handler;
