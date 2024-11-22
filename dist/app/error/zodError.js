"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = validateSchema;
function validateSchema(schema, data) {
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
