import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest{
  name: string;
  email: string;
  admin?: boolean; //?opcional
}

class CreateUserService {
  async execute({ name, email, admin} : IUserRequest) {
  
    const usersRepositories = getCustomRepository (UsersRepositories);
    
    if(!email){
      throw new Error("Email incorrect")
    }
    //verificar se ja ta cadastrado   
    const userAlreadyExists = await usersRepositories.findOne({
      email
    });

    if(userAlreadyExists){
      throw new Error("User already exists");
    }

    const user = usersRepositories.create({
      name,
      email,
      admin
    });

    await usersRepositories.save(user);
    
    
    return user;
  }
}

export { CreateUserService }