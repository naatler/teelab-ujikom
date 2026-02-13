import { Injectable, UnauthorizedException, ConflictException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto){
        const existing = await this.prisma.user.findUnique({
            where: {email: dto.email},
        })

        if (existing) {
            throw new ConflictException('Email already exists');
        }
        
        const passwordHash = await bcrypt.hash(dto.password,10);
        
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                passwordHash,
                name: dto.name,
                phone: dto.phone,
                role: dto.role || 'USER',
            },
        })

        const { passwordHash: _, ...userWithoutPassword } = user;
    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });

    return {
      user: userWithoutPassword,
      access_token: token,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { passwordHash: _, ...userWithoutPassword } = user;
    const token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });

    return {
      user: userWithoutPassword,
      access_token: token,
    };
    
    }
}
