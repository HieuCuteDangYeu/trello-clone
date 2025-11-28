import { IUserRepo } from '@modules/users/repos/userRepos';
import { IEmailService } from '@shared/core/services/IEmailService';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../users/domain/user';
import { Role } from '../../domain/role';
import { IRoleRepo } from '../../repos/roleRepo';
import { RegisterDTO } from './RegisterDTO';

export class RegisterUseCase {
  private userRepo: IUserRepo;
  private roleRepo: IRoleRepo;
  private mailService: IEmailService;

  constructor(
    userRepo: IUserRepo,
    roleRepo: IRoleRepo,
    mailService: IEmailService,
  ) {
    this.userRepo = userRepo;
    this.roleRepo = roleRepo;
    this.mailService = mailService;
  }

  public async execute(request: RegisterDTO): Promise<void> {
    const { email, username, password } = request;

    const userAlreadyExists = await this.userRepo.exists(email);
    if (userAlreadyExists) {
      throw new Error('Email already associated with an account.');
    }

    let clientRole = await this.roleRepo.getRoleByName('user');
    if (!clientRole) {
      clientRole = Role.create({ name: 'user' });
      await this.roleRepo.save(clientRole);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = uuidv4();

    const newUser = User.create({
      email,
      username,
      password: hashedPassword,
      roleId: clientRole.id,
    });
    newUser.setEmailVerificationToken(verificationToken);

    await this.userRepo.save(newUser);
    await this.mailService.sendVerificationEmail(email, verificationToken);
  }
}
