import {
  PrismaClient,
  Role,
  SellerStatus,
  BannerPosition,
  NotificationType,
  Language,
} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing data
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.settings.deleteMany();
  await prisma.statisticsDaily.deleteMany();
  await prisma.premiumSubscription.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.message.deleteMany();
  await prisma.messageThread.deleteMany();
  await prisma.sellerCategory.deleteMany();
  await prisma.review.deleteMany();
  await prisma.availabilitySlot.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.service.deleteMany();
  await prisma.portfolioImage.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.sellerStatusHistory.deleteMany();
  await prisma.sellerProfile.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing data');

  // Hash passwords
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@xhubsell.com',
      username: 'admin',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: Role.ADMIN,
      language: Language.EN,
    },
  });

  const sellerUser1 = await prisma.user.create({
    data: {
      email: 'john.seller@xhubsell.com',
      username: 'johnseller',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Smith',
      role: Role.SELLER,
      language: Language.EN,
    },
  });

  const sellerUser2 = await prisma.user.create({
    data: {
      email: 'maria.seller@xhubsell.com',
      username: 'mariasilva',
      password: hashedPassword,
      firstName: 'Maria',
      lastName: 'Silva',
      role: Role.SELLER,
      language: Language.RU,
    },
  });

  const recruiterUser = await prisma.user.create({
    data: {
      email: 'recruiter@company.com',
      username: 'recruiter',
      password: hashedPassword,
      firstName: 'Robert',
      lastName: 'Johnson',
      role: Role.RECRUITER,
      language: Language.EN,
    },
  });

  const clientUser = await prisma.user.create({
    data: {
      email: 'client@business.com',
      username: 'client',
      password: hashedPassword,
      firstName: 'Alice',
      lastName: 'Brown',
      role: Role.CLIENT,
      language: Language.EN,
    },
  });

  console.log('👥 Created users');

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        nameEn: 'Design',
        nameRu: 'Дизайн',
        slug: 'design',
        description: 'UI/UX design, graphic design, and branding',
        icon: 'design',
      },
    }),
    prisma.category.create({
      data: {
        nameEn: 'Programming',
        nameRu: 'Программирование',
        slug: 'programming',
        description: 'Software development, web development, and programming services',
        icon: 'programming',
      },
    }),
    prisma.category.create({
      data: {
        nameEn: 'Marketing',
        nameRu: 'Маркетинг',
        slug: 'marketing',
        description: 'Digital marketing, social media marketing, and advertising',
        icon: 'marketing',
      },
    }),
    prisma.category.create({
      data: {
        nameEn: 'SEO',
        nameRu: 'SEO',
        slug: 'seo',
        description: 'Search engine optimization and digital marketing',
        icon: 'seo',
      },
    }),
    prisma.category.create({
      data: {
        nameEn: 'Copywriting',
        nameRu: 'Копирайтинг',
        slug: 'copywriting',
        description: 'Content writing, copywriting, and technical writing',
        icon: 'copywriting',
      },
    }),
    prisma.category.create({
      data: {
        nameEn: 'Support',
        nameRu: 'Поддержка',
        slug: 'support',
        description: 'Customer support, technical support, and virtual assistance',
        icon: 'support',
      },
    }),
    prisma.category.create({
      data: {
        nameEn: 'Web Development',
        nameRu: 'Веб-разработка',
        slug: 'web-development',
        description: 'Full-stack, frontend, and backend web development services',
        icon: 'web',
      },
    }),
    prisma.category.create({
      data: {
        nameEn: 'Mobile Development',
        nameRu: 'Мобильная разработка',
        slug: 'mobile-development',
        description: 'iOS and Android app development',
        icon: 'mobile',
      },
    }),
  ]);

  console.log('📁 Created categories');

  // Create seller profiles
  const sellerProfile1 = await prisma.sellerProfile.create({
    data: {
      userId: sellerUser1.id,
      title: 'Full-Stack Web Developer',
      description:
        'Experienced web developer specializing in React, Node.js, and cloud technologies',
      bio: 'I am a passionate full-stack developer with over 5 years of experience building scalable web applications. I love working with modern technologies and helping businesses bring their ideas to life.',
      hourlyRate: 75.0,
      experience: 5,
      location: 'San Francisco, CA',
      languages: ['en', 'es'],
      skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
      status: SellerStatus.ACTIVE,
      rating: 4.8,
      reviewCount: 23,
    },
  });

  const sellerProfile2 = await prisma.sellerProfile.create({
    data: {
      userId: sellerUser2.id,
      title: 'UI/UX Designer & Frontend Developer',
      description: 'Creative designer and developer with eye for detail and user experience',
      bio: 'Design and development are my passion. I create beautiful, functional interfaces that users love. With 3 years of experience in both design and frontend development.',
      hourlyRate: 60.0,
      experience: 3,
      location: 'Moscow, Russia',
      languages: ['ru', 'en'],
      skills: ['Figma', 'React', 'Vue.js', 'CSS', 'UI Design', 'UX Research'],
      status: SellerStatus.ACTIVE,
      rating: 4.9,
      reviewCount: 18,
    },
  });

  // Create additional seller profiles for more top sellers
  const sellerProfile3 = await prisma.sellerProfile.create({
    data: {
      userId: recruiterUser.id,
      title: 'Digital Marketing Expert',
      description: 'Specialized in SEO, content marketing, and social media strategies',
      bio: 'I help businesses grow their online presence through data-driven marketing strategies. 8 years of experience in digital marketing with proven results.',
      hourlyRate: 85.0,
      experience: 8,
      location: 'New York, NY',
      languages: ['en', 'fr'],
      skills: [
        'SEO',
        'Google Analytics',
        'Content Marketing',
        'Social Media',
        'PPC',
        'Email Marketing',
      ],
      status: SellerStatus.ACTIVE,
      rating: 4.7,
      reviewCount: 31,
    },
  });

  const sellerProfile4 = await prisma.sellerProfile.create({
    data: {
      userId: clientUser.id,
      title: 'Customer Support Specialist',
      description: 'Professional customer support and virtual assistance services',
      bio: 'Providing exceptional customer support services for businesses of all sizes. Fluent in multiple languages and experienced with various support tools.',
      hourlyRate: 25.0,
      experience: 4,
      location: 'London, UK',
      languages: ['en', 'es', 'fr'],
      skills: [
        'Customer Support',
        'Technical Support',
        'Virtual Assistant',
        'Communication',
        'Problem Solving',
      ],
      status: SellerStatus.ACTIVE,
      rating: 4.6,
      reviewCount: 42,
    },
  });

  // Create additional users for more sellers
  const sellerUser3 = await prisma.user.create({
    data: {
      email: 'alex.writer@xhubsell.com',
      username: 'alexwriter',
      password: hashedPassword,
      firstName: 'Alex',
      lastName: 'Johnson',
      role: Role.SELLER,
      language: Language.EN,
    },
  });

  const sellerUser4 = await prisma.user.create({
    data: {
      email: 'sarah.seo@xhubsell.com',
      username: 'sarahseo',
      password: hashedPassword,
      firstName: 'Sarah',
      lastName: 'Williams',
      role: Role.SELLER,
      language: Language.EN,
    },
  });

  const sellerProfile5 = await prisma.sellerProfile.create({
    data: {
      userId: sellerUser3.id,
      title: 'Professional Copywriter',
      description: 'Creative copywriting and content creation for businesses',
      bio: 'Words are my passion. I create compelling content that engages audiences and drives results. Specialized in marketing copy and technical writing.',
      hourlyRate: 45.0,
      experience: 6,
      location: 'Los Angeles, CA',
      languages: ['en'],
      skills: [
        'Copywriting',
        'Content Writing',
        'Technical Writing',
        'SEO Writing',
        'Blog Writing',
      ],
      status: SellerStatus.ACTIVE,
      rating: 4.8,
      reviewCount: 27,
    },
  });

  const sellerProfile6 = await prisma.sellerProfile.create({
    data: {
      userId: sellerUser4.id,
      title: 'SEO Specialist',
      description: 'Search engine optimization and digital marketing expert',
      bio: 'I help businesses rank higher on search engines and increase their organic traffic. Proven track record in SEO for various industries.',
      hourlyRate: 70.0,
      experience: 5,
      location: 'Austin, TX',
      languages: ['en', 'es'],
      skills: [
        'SEO',
        'Keyword Research',
        'Link Building',
        'Technical SEO',
        'Analytics',
        'Content Strategy',
      ],
      status: SellerStatus.ACTIVE,
      rating: 4.9,
      reviewCount: 35,
    },
  });

  console.log('💼 Created seller profiles');

  // Create seller-category relationships
  await Promise.all([
    prisma.sellerCategory.create({
      data: {
        sellerId: sellerProfile1.id,
        categoryId: categories[1].id, // Programming
      },
    }),
    prisma.sellerCategory.create({
      data: {
        sellerId: sellerProfile2.id,
        categoryId: categories[0].id, // Design
      },
    }),
    prisma.sellerCategory.create({
      data: {
        sellerId: sellerProfile2.id,
        categoryId: categories[6].id, // Web Development (frontend)
      },
    }),
    prisma.sellerCategory.create({
      data: {
        sellerId: sellerProfile3.id,
        categoryId: categories[2].id, // Marketing
      },
    }),
    prisma.sellerCategory.create({
      data: {
        sellerId: sellerProfile3.id,
        categoryId: categories[3].id, // SEO
      },
    }),
    prisma.sellerCategory.create({
      data: {
        sellerId: sellerProfile4.id,
        categoryId: categories[5].id, // Support
      },
    }),
    prisma.sellerCategory.create({
      data: {
        sellerId: sellerProfile5.id,
        categoryId: categories[4].id, // Copywriting
      },
    }),
    prisma.sellerCategory.create({
      data: {
        sellerId: sellerProfile6.id,
        categoryId: categories[3].id, // SEO
      },
    }),
  ]);

  // Create portfolios
  const portfolio1 = await prisma.portfolio.create({
    data: {
      sellerId: sellerProfile1.id,
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce platform built with React and Node.js',
      projectUrl: 'https://example-ecommerce.com',
    },
  });

  const portfolio2 = await prisma.portfolio.create({
    data: {
      sellerId: sellerProfile2.id,
      title: 'Mobile Banking App Design',
      description: 'Complete UI/UX design for a mobile banking application',
      projectUrl: 'https://example-banking-app.com',
    },
  });

  // Create portfolio images
  await Promise.all([
    prisma.portfolioImage.create({
      data: {
        portfolioId: portfolio1.id,
        url: 'https://picsum.photos/seed/ecommerce1/800/600.jpg',
        alt: 'E-commerce homepage',
        order: 0,
      },
    }),
    prisma.portfolioImage.create({
      data: {
        portfolioId: portfolio1.id,
        url: 'https://picsum.photos/seed/ecommerce2/800/600.jpg',
        alt: 'Product listing page',
        order: 1,
      },
    }),
    prisma.portfolioImage.create({
      data: {
        portfolioId: portfolio2.id,
        url: 'https://picsum.photos/seed/banking1/800/600.jpg',
        alt: 'Banking app dashboard',
        order: 0,
      },
    }),
    prisma.portfolioImage.create({
      data: {
        portfolioId: portfolio2.id,
        url: 'https://picsum.photos/seed/banking2/800/600.jpg',
        alt: 'Transaction history screen',
        order: 1,
      },
    }),
  ]);

  console.log('🎨 Created portfolios and images');

  // Create services
  await Promise.all([
    prisma.service.create({
      data: {
        sellerId: sellerProfile1.id,
        title: 'Custom Web Application Development',
        description: 'Build custom web applications tailored to your business needs',
        price: 5000.0,
        duration: 240, // 4 hours
      },
    }),
    prisma.service.create({
      data: {
        sellerId: sellerProfile1.id,
        title: 'API Development & Integration',
        description: 'RESTful API development and third-party service integration',
        price: 1500.0,
        duration: 120, // 2 hours
      },
    }),
    prisma.service.create({
      data: {
        sellerId: sellerProfile2.id,
        title: 'UI/UX Design Consultation',
        description: 'Professional UI/UX design review and recommendations',
        price: 300.0,
        duration: 60, // 1 hour
      },
    }),
    prisma.service.create({
      data: {
        sellerId: sellerProfile2.id,
        title: 'Responsive Web Design',
        description: 'Create beautiful, responsive website designs',
        price: 2000.0,
        duration: 180, // 3 hours
      },
    }),
  ]);

  console.log('🛠️ Created services');

  // Create certificates
  await Promise.all([
    prisma.certificate.create({
      data: {
        sellerId: sellerProfile1.id,
        title: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        issueDate: new Date('2023-01-15'),
        expiryDate: new Date('2026-01-15'),
        fileUrl: 'https://example.com/certificates/aws-sa.pdf',
      },
    }),
    prisma.certificate.create({
      data: {
        sellerId: sellerProfile1.id,
        title: 'Meta React Professional Certificate',
        issuer: 'Meta',
        issueDate: new Date('2022-11-20'),
        fileUrl: 'https://example.com/certificates/react.pdf',
      },
    }),
    prisma.certificate.create({
      data: {
        sellerId: sellerProfile2.id,
        title: 'Google UX Design Professional Certificate',
        issuer: 'Google',
        issueDate: new Date('2023-03-10'),
        fileUrl: 'https://example.com/certificates/google-ux.pdf',
      },
    }),
  ]);

  console.log('📜 Created certificates');

  // Create availability slots
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  await Promise.all([
    // Seller 1 availability
    prisma.availabilitySlot.create({
      data: {
        sellerId: sellerProfile1.id,
        startTime: new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          9,
          0,
          0
        ),
        endTime: new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          11,
          0,
          0
        ),
      },
    }),
    prisma.availabilitySlot.create({
      data: {
        sellerId: sellerProfile1.id,
        startTime: new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          14,
          0,
          0
        ),
        endTime: new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          16,
          0,
          0
        ),
      },
    }),
    // Seller 2 availability
    prisma.availabilitySlot.create({
      data: {
        sellerId: sellerProfile2.id,
        startTime: new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          10,
          0,
          0
        ),
        endTime: new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          12,
          0,
          0
        ),
      },
    }),
    prisma.availabilitySlot.create({
      data: {
        sellerId: sellerProfile2.id,
        startTime: new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          15,
          0,
          0
        ),
        endTime: new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate(),
          17,
          0,
          0
        ),
      },
    }),
  ]);

  console.log('📅 Created availability slots');

  // Create reviews
  await Promise.all([
    prisma.review.create({
      data: {
        sellerId: sellerProfile1.id,
        reviewerId: clientUser.id,
        rating: 5,
        comment:
          'Excellent work! Very professional and delivered on time. The web application exceeded our expectations.',
      },
    }),
    prisma.review.create({
      data: {
        sellerId: sellerProfile1.id,
        reviewerId: recruiterUser.id,
        rating: 4,
        comment:
          'Great developer with strong technical skills. Good communication throughout the project.',
      },
    }),
    prisma.review.create({
      data: {
        sellerId: sellerProfile2.id,
        reviewerId: clientUser.id,
        rating: 5,
        comment:
          'Amazing design work! Maria understood our requirements perfectly and delivered beautiful designs.',
      },
    }),
  ]);

  console.log('⭐ Created reviews');

  // Create banners
  await Promise.all([
    prisma.banner.create({
      data: {
        sellerId: sellerProfile1.id,
        title: 'Web Development Special',
        imageUrl: 'https://picsum.photos/seed/banner1/1200/400.jpg',
        linkUrl: '/sellers/johnseller',
        position: BannerPosition.HERO,
        startDate: new Date(),
        endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
    }),
    prisma.banner.create({
      data: {
        sellerId: sellerProfile2.id,
        title: 'UI/UX Design Services',
        imageUrl: 'https://picsum.photos/seed/banner2/600/300.jpg',
        position: BannerPosition.SIDEBAR,
        startDate: new Date(),
      },
    }),
  ]);

  console.log('🎯 Created banners');

  // Create announcements
  await Promise.all([
    prisma.announcement.create({
      data: {
        sellerId: sellerProfile1.id,
        title: 'Available for New Projects',
        content:
          'I am currently available for new web development projects. Specializing in React and Node.js applications. Contact me for a free consultation!',
      },
    }),
    prisma.announcement.create({
      data: {
        sellerId: sellerProfile2.id,
        title: 'New Design Portfolio',
        content:
          'Check out my latest design projects! I have recently completed several mobile app designs and would love to work on your next project.',
      },
    }),
  ]);

  console.log('📢 Created announcements');

  // Create promotions
  await Promise.all([
    prisma.promotion.create({
      data: {
        sellerId: sellerProfile1.id,
        title: 'First Project Discount',
        description: 'Get 20% off your first web development project with me!',
        discount: 20,
        code: 'FIRST20',
        startDate: new Date(),
        endDate: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
      },
    }),
    prisma.promotion.create({
      data: {
        sellerId: sellerProfile2.id,
        title: 'Design Package Deal',
        description: 'Complete UI/UX design package for startups at a special price',
        discount: 15,
        code: 'STARTUP15',
        startDate: new Date(),
      },
    }),
  ]);

  console.log('🎁 Created promotions');

  // Create premium subscription for admin
  await prisma.premiumSubscription.create({
    data: {
      userId: adminUser.id,
      plan: 'PREMIUM',
      startDate: new Date(),
      endDate: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    },
  });

  // Create daily statistics
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

  await Promise.all([
    prisma.statisticsDaily.create({
      data: {
        sellerId: sellerProfile1.id,
        date: today,
        views: 45,
        inquiries: 3,
        bookings: 1,
        revenue: 500.0,
      },
    }),
    prisma.statisticsDaily.create({
      data: {
        sellerId: sellerProfile1.id,
        date: yesterday,
        views: 38,
        inquiries: 2,
        bookings: 0,
        revenue: 0.0,
      },
    }),
    prisma.statisticsDaily.create({
      data: {
        sellerId: sellerProfile2.id,
        date: today,
        views: 52,
        inquiries: 4,
        bookings: 2,
        revenue: 600.0,
      },
    }),
    prisma.statisticsDaily.create({
      data: {
        sellerId: sellerProfile2.id,
        date: yesterday,
        views: 41,
        inquiries: 3,
        bookings: 1,
        revenue: 300.0,
      },
    }),
  ]);

  console.log('📊 Created statistics');

  // Create notifications
  await Promise.all([
    prisma.notification.create({
      data: {
        userId: sellerUser1.id,
        type: NotificationType.MESSAGE,
        title: 'New Message',
        message: 'You have received a new message from a potential client.',
      },
    }),
    prisma.notification.create({
      data: {
        userId: sellerUser2.id,
        type: NotificationType.REVIEW,
        title: 'New Review',
        message: 'Someone left you a 5-star review!',
      },
    }),
    prisma.notification.create({
      data: {
        userId: clientUser.id,
        type: NotificationType.BOOKING,
        title: 'Booking Confirmed',
        message: 'Your booking with John Smith has been confirmed.',
      },
    }),
  ]);

  console.log('🔔 Created notifications');

  // Create settings
  await Promise.all([
    prisma.settings.create({
      data: {
        key: 'site_name',
        value: { name: 'XHubSell' },
      },
    }),
    prisma.settings.create({
      data: {
        key: 'maintenance_mode',
        value: { enabled: false },
      },
    }),
    prisma.settings.create({
      data: {
        key: 'max_file_size',
        value: { size: 10485760 }, // 10MB
      },
    }),
  ]);

  console.log('⚙️ Created settings');

  // Create message threads and messages
  const messageThread1 = await prisma.messageThread.create({
    data: {
      subject: 'Web Development Project Inquiry',
      participants: {
        connect: [{ id: clientUser.id }, { id: sellerUser1.id }],
      },
    },
  });

  await Promise.all([
    prisma.message.create({
      data: {
        threadId: messageThread1.id,
        senderId: clientUser.id,
        receiverId: sellerUser1.id,
        content:
          "Hi John, I'm interested in your web development services. Can we discuss a project?",
      },
    }),
    prisma.message.create({
      data: {
        threadId: messageThread1.id,
        senderId: sellerUser1.id,
        receiverId: clientUser.id,
        content:
          "Hello! Thank you for reaching out. I'd be happy to discuss your project. What kind of web application are you looking to build?",
      },
    }),
  ]);

  console.log('💬 Created messages');

  // Create favorites
  await Promise.all([
    prisma.favorite.create({
      data: {
        userId: clientUser.id,
        sellerId: sellerProfile1.id,
      },
    }),
    prisma.favorite.create({
      data: {
        userId: recruiterUser.id,
        sellerId: sellerProfile2.id,
      },
    }),
  ]);

  console.log('❤️ Created favorites');

  // Create audit logs
  await Promise.all([
    prisma.auditLog.create({
      data: {
        userId: adminUser.id,
        action: 'CREATE_USER',
        resource: 'User',
        resourceId: sellerUser1.id,
        newValues: { role: 'SELLER', email: 'john.seller@xhubsell.com' },
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0...',
      },
    }),
    prisma.auditLog.create({
      data: {
        userId: sellerUser1.id,
        action: 'UPDATE_PROFILE',
        resource: 'SellerProfile',
        resourceId: sellerProfile1.id,
        oldValues: { hourlyRate: 50 },
        newValues: { hourlyRate: 75 },
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0...',
      },
    }),
  ]);

  console.log('📋 Created audit logs');

  console.log('✅ Database seeding completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`- Users: ${await prisma.user.count()}`);
  console.log(`- Seller Profiles: ${await prisma.sellerProfile.count()}`);
  console.log(`- Categories: ${await prisma.category.count()}`);
  console.log(`- Services: ${await prisma.service.count()}`);
  console.log(`- Portfolios: ${await prisma.portfolio.count()}`);
  console.log(`- Reviews: ${await prisma.review.count()}`);
  console.log(`- Messages: ${await prisma.message.count()}`);
  console.log('');
  console.log('🔑 Test Accounts:');
  console.log('Admin: admin@xhubsell.com / password123');
  console.log('Seller 1: john.seller@xhubsell.com / password123');
  console.log('Seller 2: maria.seller@xhubsell.com / password123');
  console.log('Recruiter: recruiter@company.com / password123');
  console.log('Client: client@business.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
