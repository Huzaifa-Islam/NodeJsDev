const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (isAdminAuthorized){
        console.log("admin authorized")
        next()
    }  
    else{
        res.status(401).send("unauthorized request");
    }
}

const userAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (isAdminAuthorized){
        console.log("user authorized")
        next()
    }  
    else{
        res.status(401).send("unauthorized request");
    }
}

module.exports = {adminAuth, userAuth}