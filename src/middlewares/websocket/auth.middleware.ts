import { Socket } from 'socket.io';

export function authMiddleware(
  socket: Socket & { request: Express.Request },
  next,
) {
  if (socket.request.isAuthenticated()) {
    next();
  } else {
    next(new Error('Unauthorized'));
  }
}
