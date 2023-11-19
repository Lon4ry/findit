import session, { SessionOptions } from 'express-session';

const sessionConfig: SessionOptions = {
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    signed: true,
    maxAge: 60000,
    domain: 'localhost',
  },
};

export const sessionInstance = session(sessionConfig);
