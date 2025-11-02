# Database Schema Documentation

This document provides an overview of the XHubSell database schema, including entity relationships, indexes, and usage guidelines.

## Overview

The XHubSell database is built with PostgreSQL and managed through Prisma ORM. It supports a marketplace platform connecting sellers with clients, including features for profiles, services, messaging, reviews, and analytics.

## Core Entities

### Users

The central entity representing all platform users with role-based access control.

**Fields:**

- `id`: Primary key (CUID)
- `email`: Unique email address
- `username`: Unique username
- `password`: Hashed password
- `firstName`, `lastName`: User's name
- `avatar`: Profile picture URL
- `role`: User role (ADMIN, SELLER, RECRUITER, CLIENT)
- `language`: Preferred language (RU, EN)
- `createdAt`, `updatedAt`: Timestamps

**Relationships:**

- One-to-one with `SellerProfile`
- One-to-many with `Message` (sent/received), `Review`, `Notification`, etc.

### SellerProfile

Extended profile for users with seller role, containing professional information.

**Fields:**

- `id`: Primary key (CUID)
- `userId`: Foreign key to Users
- `title`: Professional title
- `description`, `bio`: Professional descriptions
- `hourlyRate`: Service rate
- `experience`: Years of experience
- `location`: Geographic location
- `languages`: Array of language codes
- `skills`: Array of technical skills
- `status`: Current status (ACTIVE, INACTIVE, SUSPENDED, PENDING_VERIFICATION)
- `rating`: Average rating (0-5, 2 decimal places)
- `reviewCount`: Total number of reviews

**Relationships:**

- Belongs to `User`
- Has many `Portfolio`, `Service`, `Certificate`, etc.

## Categories & Hierarchies

### Category

Hierarchical category system for organizing sellers and services.

**Fields:**

- `id`: Primary key (CUID)
- `nameEn`, `nameRu`: Multilingual names
- `slug`: URL-friendly unique identifier
- `description`: Category description
- `icon`: Icon identifier or URL
- `parentId`: Self-referencing foreign key for hierarchy
- `createdAt`, `updatedAt`: Timestamps

**Relationships:**

- Self-referencing parent/child relationship
- Many-to-many with `SellerProfile` through `SellerCategory`

### SellerCategory

Junction table for many-to-many relationship between sellers and categories.

**Fields:**

- `id`: Primary key (CUID)
- `sellerId`: Foreign key to SellerProfile
- `categoryId`: Foreign key to Category
- `createdAt`: Timestamp

**Constraints:**

- Unique constraint on `[sellerId, categoryId]`

## Portfolio & Media

### Portfolio

Seller's work portfolio with multiple images.

**Fields:**

- `id`: Primary key (CUID)
- `sellerId`: Foreign key to SellerProfile
- `title`: Portfolio item title
- `description`: Project description
- `projectUrl`: Live project URL
- `createdAt`, `updatedAt`: Timestamps

**Relationships:**

- Belongs to `SellerProfile`
- Has many `PortfolioImage`

### PortfolioImage

Images associated with portfolio items.

**Fields:**

- `id`: Primary key (CUID)
- `portfolioId`: Foreign key to Portfolio
- `url`: Image URL
- `alt`: Alt text for accessibility
- `order`: Display order

## Services & Pricing

### Service

Services offered by sellers with pricing information.

**Fields:**

- `id`: Primary key (CUID)
- `sellerId`: Foreign key to SellerProfile
- `title`: Service title
- `description`: Service description
- `price`: Service price (Decimal)
- `duration`: Duration in minutes
- `isActive`: Service availability status
- `createdAt`, `updatedAt`: Timestamps

## Availability & Booking

### AvailabilitySlot

Time slots when sellers are available for bookings.

**Fields:**

- `id`: Primary key (CUID)
- `sellerId`: Foreign key to SellerProfile
- `startTime`: Slot start time
- `endTime`: Slot end time
- `isBooked`: Booking status
- `createdAt`: Timestamp

## Reviews & Ratings

### Review

Customer reviews for sellers.

**Fields:**

- `id`: Primary key (CUID)
- `sellerId`: Foreign key to SellerProfile
- `reviewerId`: Foreign key to User
- `rating`: Rating (1-5)
- `comment`: Review text
- `createdAt`: Timestamp

**Relationships:**

- Belongs to `SellerProfile`
- Belongs to `User` (reviewer)

## Messaging System

### MessageThread

Conversation threads between users.

**Fields:**

- `id`: Primary key (CUID)
- `subject`: Thread subject
- `createdAt`, `updatedAt`: Timestamps

**Relationships:**

- Many-to-many with `User` (participants)
- Has many `Message`

### Message

Individual messages within threads.

**Fields:**

- `id`: Primary key (CUID)
- `threadId`: Foreign key to MessageThread
- `senderId`: Foreign key to User
- `receiverId`: Foreign key to User
- `content`: Message content
- `isRead`: Read status
- `createdAt`: Timestamp

**Relationships:**

- Belongs to `MessageThread`
- Belongs to `User` (sender and receiver)

## Marketing & Promotions

### Banner

Promotional banners for sellers.

**Fields:**

- `id`: Primary key (CUID)
- `sellerId`: Foreign key to SellerProfile
- `title`: Banner title
- `imageUrl`: Banner image URL
- `linkUrl`: Destination URL
- `position`: Display position (HERO, SIDEBAR, FOOTER, HEADER, POPUP)
- `isActive`: Active status
- `startDate`, `endDate`: Campaign dates
- `createdAt`, `updatedAt`: Timestamps

### Announcement

Seller announcements and updates.

**Fields:**

- `id`: Primary key (CUID)
- `sellerId`: Foreign key to SellerProfile
- `title`: Announcement title
- `content`: Announcement content
- `isActive`: Active status
- `createdAt`, `updatedAt`: Timestamps

### Promotion

Discount codes and special offers.

**Fields:**

- `id`: Primary key (CUID)
- `sellerId`: Foreign key to SellerProfile
- `title`: Promotion title
- `description`: Promotion description
- `discount`: Discount percentage
- `code`: Unique promo code
- `isActive`: Active status
- `startDate`, `endDate`: Promotion dates
- `createdAt`, `updatedAt`: Timestamps

## User Interactions

### Favorite

Users' favorite sellers.

**Fields:**

- `id`: Primary key (CUID)
- `userId`: Foreign key to User
- `sellerId`: Foreign key to SellerProfile
- `createdAt`: Timestamp

**Constraints:**

- Unique constraint on `[userId, sellerId]`

## Analytics & Statistics

### StatisticsDaily

Daily performance statistics for sellers.

**Fields:**

- `id`: Primary key (CUID)
- `sellerId`: Foreign key to SellerProfile
- `date`: Statistics date
- `views`: Page views count
- `inquiries`: Inquiry count
- `bookings`: Booking count
- `revenue`: Total revenue
- `createdAt`: Timestamp

**Constraints:**

- Unique constraint on `[sellerId, date]`

## System Management

### PremiumSubscription

Premium subscription status for users.

**Fields:**

- `id`: Primary key (CUID)
- `userId`: Foreign key to User
- `plan`: Subscription plan
- `startDate`, `endDate`: Subscription period
- `isActive`: Active status
- `createdAt`, `updatedAt`: Timestamps

### Notification

System notifications for users.

**Fields:**

- `id`: Primary key (CUID)
- `userId`: Foreign key to User
- `type`: Notification type (SYSTEM, MESSAGE, REVIEW, PROMOTION, BOOKING, PAYMENT)
- `title`: Notification title
- `message`: Notification message
- `isRead`: Read status
- `data`: Additional JSON data
- `createdAt`: Timestamp

### Settings

Global system settings.

**Fields:**

- `id`: Primary key (CUID)
- `key`: Setting key (unique)
- `value`: JSON value
- `createdAt`, `updatedAt`: Timestamps

### AuditLog

Audit trail for system actions.

**Fields:**

- `id`: Primary key (CUID)
- `userId`: Foreign key to User
- `action`: Action performed
- `resource`: Resource type
- `resourceId`: Resource ID
- `oldValues`, `newValues`: Change data (JSON)
- `ipAddress`, `userAgent`: Request metadata
- `createdAt`: Timestamp

## Certificates & Verification

### Certificate

Professional certificates and qualifications.

**Fields:**

- `id`: Primary key (CUID)
- `sellerId`: Foreign key to SellerProfile
- `title`: Certificate title
- `issuer`: Issuing organization
- `issueDate`, `expiryDate`: Certificate validity
- `fileUrl`: Certificate file URL
- `createdAt`: Timestamp

### SellerStatusHistory

History of seller status changes.

**Fields:**

- `id`: Primary key (CUID)
- `sellerId`: Foreign key to SellerProfile
- `status`: Status value
- `reason`: Change reason
- `changedBy`: User who made the change
- `createdAt`: Timestamp

## Indexes and Performance

### Important Indexes

The schema includes several implicit indexes:

1. **Unique Indexes:**
   - `users.email`, `users.username`
   - `categories.slug`
   - `promotions.code`
   - `premium_subscriptions.userId`
   - `settings.key`
   - `seller_categories.[sellerId, categoryId]`
   - `favorites.[userId, sellerId]`
   - `statistics_daily.[sellerId, date]`

2. **Foreign Key Indexes:**
   - All foreign key relationships are automatically indexed

### Recommended Additional Indexes

For optimal performance in production, consider adding:

```sql
-- For seller searches
CREATE INDEX idx_seller_profiles_rating ON seller_profiles(rating DESC);
CREATE INDEX idx_seller_profiles_status ON seller_profiles(status);
CREATE INDEX idx_seller_profiles_location ON seller_profiles(location);

-- For messaging
CREATE INDEX idx_messages_thread_id ON messages(threadId);
CREATE INDEX idx_messages_receiver_id ON messages(receiverId);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- For analytics
CREATE INDEX idx_statistics_daily_date ON statistics_daily(date DESC);
CREATE INDEX idx_statistics_daily_seller_date ON statistics_daily(sellerId, date DESC);
```

## Data Integrity

### Cascade Deletes

Most relationships use `onDelete: Cascade` to maintain data integrity:

- Deleting a User deletes their SellerProfile, messages, reviews, etc.
- Deleting a SellerProfile deletes their portfolios, services, certificates, etc.
- Deleting a Portfolio deletes its images
- Deleting a MessageThread deletes its messages

### Constraints

- Email and username uniqueness for users
- Rating values constrained to valid ranges
- Decimal precision for financial fields
- Non-null constraints on critical fields

## Migration Strategy

### Initial Setup

1. Run `prisma migrate dev` to create initial migration
2. Run `prisma db seed` to populate with sample data
3. Verify with `prisma studio`

### Schema Updates

1. Update `schema.prisma`
2. Run `prisma migrate dev --name descriptive-name`
3. Update seed script if needed
4. Test with sample data

## Usage Examples

### Common Queries

**Find active sellers with rating >= 4.5:**

```typescript
const topSellers = await prisma.sellerProfile.findMany({
  where: {
    status: 'ACTIVE',
    rating: { gte: 4.5 },
  },
  include: {
    user: true,
    categories: { include: { category: true } },
  },
  orderBy: { rating: 'desc' },
});
```

**Get seller's daily statistics:**

```typescript
const stats = await prisma.statisticsDaily.findMany({
  where: {
    sellerId: sellerId,
    date: { gte: new Date('2024-01-01') },
  },
  orderBy: { date: 'desc' },
});
```

**Search messages:**

```typescript
const messages = await prisma.message.findMany({
  where: {
    OR: [{ senderId: userId }, { receiverId: userId }],
    content: { contains: searchTerm },
  },
  include: {
    thread: true,
    sender: { select: { firstName: true, lastName: true } },
    receiver: { select: { firstName: true, lastName: true } },
  },
  orderBy: { createdAt: 'desc' },
});
```

## Extending the Schema

When adding new features:

1. Consider existing relationships and constraints
2. Add appropriate indexes for query performance
3. Update seed script with sample data
4. Update this documentation
5. Test migrations thoroughly

### Recommended Extensions

- **Tags System**: Add tags for sellers, services, and portfolios
- **Payment Processing**: Add payment transactions and invoices
- **File Management**: Enhanced file uploads with metadata
- **Advanced Analytics**: More granular tracking and reporting
- **Multi-tenancy**: Support for multiple marketplaces

## Security Considerations

- All passwords are hashed using bcrypt
- Sensitive operations are logged in AuditLog
- User roles control access to different features
- Input validation through Prisma and application-level checks
- Consider implementing row-level security for multi-tenant scenarios
