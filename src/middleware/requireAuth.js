const { verifyAccess } = require('../utils/jwt');

// If using cookie-based access token:
module.exports = function requireAuth(req, res, next) {
    const token = req.cookies?.accessToken;
    if (!token) return res.status(401).json({ error: 'Unauthenticated' });
    try {
        req.user = verifyAccess(token);
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
// If using cookie-based access token:
// If using cookie-based access token:
// Trigger GitHub Actions run
