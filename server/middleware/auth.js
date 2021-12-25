import jwt from 'jsonwebtoken';

//wants to like the post
//click the like button => auth middleware (next) => like controller...

//This is what middleware is for, whenever we have to check for a specific action before performing the next action

const auth = async (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];

        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth)
        {
            decodedData= jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub; // google's name for user's id
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;