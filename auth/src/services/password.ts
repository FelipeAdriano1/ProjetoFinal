import argon2 from 'argon2'

export class Password {
    //Hash de senha
    static async hash(password: string) {
        return await argon2.hash(password);
    }
  
    static async compare(storedPassword: string, suppliedPassword: string) {
        return await argon2.verify(storedPassword, suppliedPassword);
    }
}