
module.exports = async (req, res, next) => {
    try {
        // TODO: Verify login user is admin here
        await next();
    } catch (error) {
        res.status(401).send('Authorization failed');
    }
};
