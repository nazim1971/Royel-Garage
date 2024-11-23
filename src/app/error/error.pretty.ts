import { ZodError } from 'zod';
import { MongoError, ParserError } from './error.interface';

export const customErrorMsg = (error: unknown): string => {
  // Process Zod Validation Error(s)
  if (error instanceof ZodError) {
    return error.errors
      .map((err) => {
        if (err.code === 'invalid_type') {
          return `Expected ${err.expected} for “${err.path}” but got ${err.received}!`;
        }
        return `${err.path.join('.')}: ${err.message}`;
      })
      .join('; ');
  } else if (
    // Process MongoDB Duplicate Error
    'code' in (error as MongoError) &&
    (error as MongoError).code === 11000
  ) {
    const mongoError = error as MongoError;
    const path = Object.keys(mongoError.keyValue)[0];

    return `Duplicate “${path}” Found for “${mongoError.keyValue[path]}”!`;
  } else if (
    // Process Express Body Parser Error
    'type' in (error as ParserError) &&
    (error as ParserError).type === 'entity.parse.failed'
  ) {
    return 'Please, Send Data in Valid JSON Format!';
  } else {
    // Process General Error
    const generalError = error as Error;
    return generalError.message;
  }
};
