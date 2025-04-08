const asynchandler = (fn) => async (req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch((err)=>next(err))

}
export default asynchandler