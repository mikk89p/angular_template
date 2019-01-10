
// Shift + alt + F - autoformat
// Alt + shift + G -> getter setter ; write * for all
export class User {
  public id: number;
  public username: string;
  public email: string;
  public token: string;
  // public subscription: boolean;


  constructor(id: number, username: string, email: string, token: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.token = token;
  }
}
