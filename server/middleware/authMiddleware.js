import jwt from "jsonwebtoken";

const authMiddleware=((req,res,next)=>{

        const authHeader = req.header("Authorization"); // Get the header

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied" });
        }
    
        const token = authHeader.split(" ")[1];
try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
    
} catch (error) {
    if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Session Expired. Please log in again." });
    }
    return res.status(401).json({ message: "Invalid Token" });
}
})

export default authMiddleware;