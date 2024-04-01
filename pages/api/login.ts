
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY;

type Data = {
  message: string;
  token: string;
};

type ErrorResponse = {
  error: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | ErrorResponse>) {
  try {
    const { username, password } = req.body || {};

    let loggedIn = false;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    loggedIn = true; // this is the result of User.find({})

    const token = jwt.sign({ username, loggedIn }, SECRET_KEY || '');

    res.status(200).json({ message: `user ${username} logged in successfully`, token });

  } catch (error) {
    console.error('Error in handling login:', error);
    res.status(500).json({ error: 'Server error' });
  }
}