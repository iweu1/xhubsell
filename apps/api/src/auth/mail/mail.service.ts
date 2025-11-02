import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {}

  async sendWelcomeEmail(email: string, firstName?: string): Promise<void> {
    const subject = 'Welcome to XHubSell!';
    const text = `Hello ${firstName || 'there'}, welcome to XHubSell! We're excited to have you on board.`;
    
    // Placeholder for actual email sending
    // In a real implementation, you would use Nodemailer or a service like SendGrid
    this.logger.log(`Sending welcome email to ${email}: ${subject}`);
    
    // Queue stub - in real implementation, you would add to a queue
    // await this.queueService.add('send-email', { to: email, subject, text });
    
    this.logger.log(`Welcome email queued for ${email}`);
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const subject = 'Verify your email address';
    const text = `Please verify your email address by clicking the link: ${this.configService.get('APP_URL')}/verify?token=${token}`;
    
    this.logger.log(`Sending verification email to ${email}: ${subject}`);
    
    // Queue stub
    // await this.queueService.add('send-email', { to: email, subject, text });
    
    this.logger.log(`Verification email queued for ${email}`);
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const subject = 'Reset your password';
    const text = `Reset your password by clicking the link: ${this.configService.get('APP_URL')}/reset-password?token=${token}`;
    
    this.logger.log(`Sending password reset email to ${email}: ${subject}`);
    
    // Queue stub
    // await this.queueService.add('send-email', { to: email, subject, text });
    
    this.logger.log(`Password reset email queued for ${email}`);
  }
}