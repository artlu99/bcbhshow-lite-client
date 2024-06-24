import { isAction, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { notificationController } from '@app/controllers/notificationController';

/**
 * Log a warning and show a toast!
 */
export const errorLoggingMiddleware: Middleware = () => (next) => (action) => {
  if (isAction(action) && isRejectedWithValue(action)) {
    notificationController.error({ message: action.error.message });
  }

  return next(action);
};
