class ApiErrors extends Error{
    constructor(statuscode ,message="something went wrong",errors=[],stack=""){
        super(message)
        this.statuscode=statuscode
        
        this.errors=errors
        this.stack=stack

    }

}
export default ApiErrors