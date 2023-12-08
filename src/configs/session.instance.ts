import session, { SessionOptions } from 'express-session';

const sessionConfig: SessionOptions = {
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    signed: true,
    maxAge: 1000 * 60 * 60 * 24,
    domain: 'localhost',
  },
};

export const sessionInstance = session(sessionConfig);
