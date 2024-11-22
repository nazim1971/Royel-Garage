import { ZodSchema } from 'zod';

function validateSchema<T>(schema: ZodSchema<T>, data: any) {
  const result = schema.safeParse(data);

  if (!result.success) {
    const issues = result.error.issues.map((issue) => ({
      code: issue.code,
      path: issue.path,
      message: issue.message,
    }));

    return {
      success: false,
      errors: issues,
    };
  }

  return {
    success: true,
    data: result.data,
  };
}

export { validateSchema };
