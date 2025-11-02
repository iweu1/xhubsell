# Internationalization (i18n) Guide

This guide explains how to work with internationalization in the XHubSell application, which supports English (en) and Russian (ru) languages.

## Frontend (Next.js)

### Translation Files Structure

Translation files are located in `apps/web/public/locales/`:

```
public/locales/
├── en/
│   ├── common.json       # Common UI elements
│   ├── navigation.json   # Navigation items
│   ├── home.json         # Home page content
│   ├── catalog.json      # Product catalog
│   ├── seller.json       # Seller-related content
│   ├── auth.json         # Authentication
│   ├── admin.json        # Admin panel
│   ├── errors.json       # Error messages
│   └── notifications.json # Success/info messages
└── ru/
    ├── common.json
    ├── navigation.json
    ├── home.json
    ├── catalog.json
    ├── seller.json
    ├── auth.json
    ├── admin.json
    ├── errors.json
    └── notifications.json
```

### Using Translations in Components

```tsx
import { useTranslation } from 'next-i18next';

export function MyComponent() {
  const { t } = useTranslation('namespace'); // e.g., 'common', 'home'

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('home:subtitle')}</p> {/* Cross-namespace reference */}
    </div>
  );
}
```

### Language Switching

Use the provided `LanguageSwitcher` component:

```tsx
import { LanguageSwitcher } from '@/components/language-switcher';

export function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
}
```

### Date/Number Formatting

```tsx
import { useLocalizedFormat } from '@/hooks/use-localized-format';

export function ProductPrice({ price, date }) {
  const { formatCurrency, formatDate } = useLocalizedFormat();

  return (
    <div>
      <p>{formatCurrency(price, 'USD')}</p>
      <p>{formatDate(date)}</p>
    </div>
  );
}
```

### Adding New Translations

1. Add the translation key to both `en/namespace.json` and `ru/namespace.json`
2. Use the key in your components with `t('key')`
3. Test both languages to ensure proper display

### Best Practices

- Use descriptive keys (e.g., `product.addToCart` instead of `button1`)
- Group related translations in appropriate namespaces
- Use parameter interpolation for dynamic values:
  ```json
  {
    "welcome": "Welcome {{username}}!"
  }
  ```
  ```tsx
  t('welcome', { username: 'John' });
  ```

## Backend (NestJS)

### Translation Files Structure

Backend translation files are located in `apps/api/src/i18n/`:

```
src/i18n/
├── en/
│   ├── validation.json   # Validation error messages
│   └── email.json         # Email templates
└── ru/
    ├── validation.json
    └── email.json
```

### Using Translations in Controllers

```typescript
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('users')
export class UsersController {
  constructor(@I18n() private readonly i18n: I18nContext) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const message = await this.i18n.t('validation.required', {
      lang: 'en',
      args: { field: 'email' },
    });

    return { message };
  }
}
```

### Using the I18n Helper Service

```typescript
import { I18nHelperService } from '@/common/services/i18n-helper.service';

@Injectable()
export class MyService {
  constructor(private readonly i18nHelper: I18nHelperService) {}

  async getErrorMessage(errorKey: string, language: string) {
    return this.i18nHelper.translateErrorMessage(errorKey, { lang: language });
  }
}
```

### Email Templates with i18n

```typescript
import { EmailService } from '@/common/services/email.service';

@Injectable()
export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  async sendWelcomeEmail(userEmail: string, username: string, language: string) {
    await this.emailService.sendWelcomeEmail(userEmail, username, language);
  }
}
```

### Date/Number Formatting

```typescript
import { I18nFormatService } from '@/common/services/i18n-format.service';

@Injectable()
export class ProductService {
  constructor(private readonly formatService: I18nFormatService) {}

  async formatProductPrice(price: number, language: string) {
    return this.formatService.formatCurrency(price, 'USD', language);
  }
}
```

### Language Detection

The system automatically detects the language from:

1. User preference (if authenticated)
2. `Accept-Language` header
3. `lang` query parameter
4. `x-lang` header
5. Defaults to `en`

### Adding New Translations

1. Add the translation key to both `en/namespace.json` and `ru/namespace.json`
2. Use the key in your code with the i18n service or helper
3. Test both languages

## Translation Workflow

### For Developers

1. **Frontend**: Always use translation keys instead of hardcoded text
2. **Backend**: Use i18n services for user-facing messages
3. **Testing**: Test both languages for new features
4. **Consistency**: Follow the established naming conventions

### For Translators

1. **Maintain Structure**: Keep the same key structure across all languages
2. **Context**: Consider the context where translations will be used
3. **Variables**: Preserve variable placeholders like `{{username}}`
4. **Length**: Consider UI constraints for different languages

### Adding New Languages

1. Create new language directories (`de`, `fr`, etc.)
2. Copy all translation files from `en/` to the new language directory
3. Translate all keys in the new language files
4. Update the supported languages list in:
   - `apps/web/next-i18next.config.js`
   - `apps/web/src/middleware.ts`
   - `apps/api/src/app.module.ts`

## Testing i18n

### Frontend Testing

```bash
# Test English
curl -H "Accept-Language: en" http://localhost:3000

# Test Russian
curl -H "Accept-Language: ru" http://localhost:3000
```

### Backend Testing

```bash
# Test English responses
curl -H "Accept-Language: en" http://localhost:3001/api/auth/login

# Test Russian responses
curl -H "Accept-Language: ru" http://localhost:3001/api/auth/login
```

## Common Issues

1. **Missing Translations**: Ensure keys exist in all language files
2. **Language Switching**: Clear cookies if language doesn't persist
3. **Backend i18n**: Make sure i18n module is imported in the required modules
4. **Build Issues**: Run `pnpm build` to ensure all translation files are included

## Performance Considerations

- Translation files are loaded on-demand
- Client-side language switching is instant
- Server-side translations are cached
- Consider using CDN for static translation files in production

## Tools and Resources

- [next-i18next Documentation](https://github.com/i18next/next-i18next)
- [nestjs-i18n Documentation](https://github.com/toonvanstrijp/nestjs-i18n)
- [i18next Documentation](https://www.i18next.com/)
- [Intl API Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
