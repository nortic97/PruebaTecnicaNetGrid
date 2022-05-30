export class Usuario{
  constructor(
    public id:number,
    public usuario:string,
    public nombres:string,
    public apellidos:string,
    public tipo_de_identificacion:string,
    public numero_de_identificacion:string,
    public fecha_de_nacimiento:any,
    public contrasena:string,
    public gettoken:any
  ){}
}
