import jwt from 'jsonwebtoken'
// import User from '../models/User.js'

export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log('JWT verification error:', err);
                return res.status(401).json({error: 'Unauthorized'});
            } else {
                console.log('Decoded token:', decodedToken);
                req.user = decodedToken; 
                next();
            }
        });
    } else {
        console.log('No token found, ');
        return res.status(401).json({error: 'No token provided'});
    }
};


