import { Injectable, PipeTransform } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { I18nContext, I18nValidationException } from 'nestjs-i18n';

@Injectable()
export class I18nValidationPipe implements PipeTransform {
  async transform(value: any) {
    const errors = await this.validate(value);
    if (errors.length > 0) {
      throw new I18nValidationException(errors);
    }
    return value;
  }

  private async validate(value: any): Promise<ValidationError[]> {
    // This would integrate with class-validator
    // For now, return empty array as placeholder
    return [];
  }
}
