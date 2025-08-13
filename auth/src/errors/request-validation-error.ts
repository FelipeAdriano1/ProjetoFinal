export class RequestValidationError extends Error {
    public errors: any[]
    
    constructor(errors: any[]){
        super("Erro de requisição");
        this.name = "RequestValidationError";
        this.errors = errors;
    }
}