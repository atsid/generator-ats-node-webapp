/**
 * A middleware function that sends static content
 * @param content The static content to send
 * @returns A middleware function
 */
module.exports = (content) => (req, res) => {
    res.json({message: content});
    res.end();
};
