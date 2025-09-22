import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
export class RegisterDto {
    @IsEmail()
    email: string;
    
    @IsString()
    username: string;
    
    @MinLength(6)
    password: string;
}
