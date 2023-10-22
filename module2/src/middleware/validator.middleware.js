
export const validatorMiddleware = (schema) => {
    try {
        return async (req, res, next) => {
            try {
                const { body } = req;

                if (!body) throw new Error('Request body is null/empty');
                /**
                 * validate request body
                 */
                const validated = await schema.validateAsync(body);
                /**
                 * pass validated body
                 */
                req.body = validated
                next();
            }
            catch (err) {
                /**
                 * set code for validation err
                 */
                if (err.isJoi) res.status(422);

                next(err);
            }
        }
    }
    catch (error) {
        next(error);
    }
}