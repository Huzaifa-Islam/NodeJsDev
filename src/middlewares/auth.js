const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (isAdminAuthorized){
        console.log("authorized")
        next()
    }  
    else{
        res.status(401).send("unauthorized request");
    }
}

module.exports = {adminAuth}