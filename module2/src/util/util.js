

export const handleUnknownRoutes = (req, res, next) => {
    /**
     * destructuring req
     */
    const { baseUrl, responsePayload } = req
    /**
     * if theres a responsePayload it will lead you over to the next middleware
     */
    if (responsePayload) return next()
    /**
     * return 404 response
     */
    return res.status(404).json({
        errorMessage: `${baseUrl} not found`
    })
}