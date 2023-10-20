

export const handleUnknownRoutes = (req, res) => {
    /**
     * destructuring req
     */
    const { baseUrl } = req
    /**
     * return 404 response
     */
    res.status(404).json({
        errorMessage: `${baseUrl} not found`
    })
}