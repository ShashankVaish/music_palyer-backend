const asynchandler = (fn) => async (req,res,next)=>{
    try {
        await fn(req,res,next)
        
    } catch (error) {
        
    }

}
export {asynchandler}