import { notificationController } from '@app/controllers/notificationController';
import { Middleware, isAction, isRejectedWithValue } from '@reduxjs/toolkit';

/**
 * Log a warning and show a toast!
 */
export const errorLoggingMiddleware: Middleware = () => (next) => (action) => {
  if (isAction(action) && isRejectedWithValue(action)) {
    notificationController.error({ message: action.error.message });
  }

  return next(action);
};
