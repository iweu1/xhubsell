import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly i18n: I18nService,
    private readonly configService: ConfigService
  ) {}

  async sendWelcomeEmail(email: string, username: string, language: string = 'en') {
    const subject = await this.i18n.t('email.welcome.subject', { lang: language });
    const title = await this.i18n.t('email.welcome.title', { lang: language, args: { username } });
    const body = await this.i18n.t('email.welcome.body', { lang: language });
    const cta = await this.i18n.t('email.welcome.cta', { lang: language });

    // Here you would integrate with your email provider (SendGrid, Nodemailer, etc.)
    console.log(`Sending email to ${email} with subject: ${subject}`);
    console.log(`Title: ${title}`);
    console.log(`Body: ${body}`);
    console.log(`CTA: ${cta}`);

    // Example implementation with nodemailer would be:
    // await this.transporter.sendMail({
    //   to: email,
    //   subject,
    //   template: 'welcome',
    //   context: { title, body, cta, username }
    // });
  }

  async sendPasswordResetEmail(email: string, resetToken: string, language: string = 'en') {
    const subject = await this.i18n.t('email.passwordReset.subject', { lang: language });
    const title = await this.i18n.t('email.passwordReset.title', { lang: language });
    const body = await this.i18n.t('email.passwordReset.body', { lang: language });
    const cta = await this.i18n.t('email.passwordReset.cta', { lang: language });
    const expiry = await this.i18n.t('email.passwordReset.expiry', { lang: language });

    const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${resetToken}`;

    console.log(`Sending password reset email to ${email}`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log(`Subject: ${subject}`);
    console.log(`Expiry: ${expiry}`);
  }

  async sendOrderConfirmationEmail(email: string, orderId: string, language: string = 'en') {
    const subject = await this.i18n.t('email.orderConfirmation.subject', {
      lang: language,
      args: { orderId },
    });
    const title = await this.i18n.t('email.orderConfirmation.title', { lang: language });
    const body = await this.i18n.t('email.orderConfirmation.body', { lang: language });
    const cta = await this.i18n.t('email.orderConfirmation.cta', { lang: language });

    console.log(`Sending order confirmation to ${email} for order ${orderId}`);
    console.log(`Subject: ${subject}`);
  }

  async sendOrderShippedEmail(
    email: string,
    orderId: string,
    estimatedDays: number,
    language: string = 'en'
  ) {
    const subject = await this.i18n.t('email.orderShipped.subject', {
      lang: language,
      args: { orderId },
    });
    const title = await this.i18n.t('email.orderShipped.title', { lang: language });
    const body = await this.i18n.t('email.orderShipped.body', {
      lang: language,
      args: { estimatedDays },
    });
    const cta = await this.i18n.t('email.orderShipped.cta', { lang: language });

    console.log(`Sending shipping notification to ${email} for order ${orderId}`);
    console.log(`Subject: ${subject}`);
    console.log(`Estimated delivery: ${estimatedDays} days`);
  }
}
