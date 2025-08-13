import crypto from 'crypto';

//CLASSE RESPONSÁVEL POR ARMAZENAR OS TOKENS CSRF
export default class CSRFTokens {
  constructor(private secret: string) {}
  private csrfTokens = new Map<string, number>();

  //GERA UM NOVO TOKEN CSRF
  //ESSE TOKEN É GERADO A CADA REQUISIÇÃO
  //ASSIM QUE UM TOKEN É GERADO, ELE É ARMAZENADO NO MAP NESTA CLASSE, E É VALIDADO A CADA REQUISIÇÃO
  public generateToken(): string {
    const expires = Date.now() + 24 * 60 * 60 * 1000;
    const raw = crypto.randomBytes(32).toString('hex');
    const data = `${raw}.${expires}`;
    const signature = crypto.createHmac('sha256', this.secret).update(data).digest('hex');
    const token = `${data}.${signature}`;
    this.csrfTokens.set(token, expires);
    return token;
  }

  //VALIDA UM TOKEN CSRF
  //ESSA FUNÇÃO É CHAMADA A CADA REQUISIÇÃO
  //ELA VERIFICA SE O TOKEN É VÁLIDO
  //SE O TOKEN FOR VÁLIDO, ELE É REMOVIDO DO MAP
  //SE O TOKEN FOR INVÁLIDO, ELE É REMOVIDO DO MAP
  public validateToken(token: string): boolean {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const [raw, expStr, sig] = parts;
    const data = `${raw}.${expStr}`;
    const expected = crypto.createHmac('sha256', this.secret).update(data).digest('hex');
    if (sig !== expected) return false;
    const expires = Number(expStr);
    if (isNaN(expires) || expires < Date.now()) return false;
    return true;
  }
}

