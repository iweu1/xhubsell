import React from 'react'
import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  author?: string
  openGraph?: {
    title?: string
    description?: string
    type?: string
    locale?: string
    url?: string
    siteName?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
  }
  twitter?: {
    card?: 'summary' | 'summary_large_image'
    site?: string
    creator?: string
    title?: string
    description?: string
    image?: string
  }
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
}

export function generateMetadata({
  title,
  description,
  keywords,
  author = 'XHubSell',
  openGraph,
  twitter,
  canonical,
  noindex = false,
  nofollow = false,
}: SEOProps): Metadata {
  const defaultTitle = 'XHubSell - Your Trusted Marketplace Platform'
  const defaultDescription = 'Connect with sellers and buyers worldwide on XHubSell. Experience seamless commerce with innovative solutions.'
  
  const metaTitle = title ? `${title} | XHubSell` : defaultTitle
  const metaDescription = description || defaultDescription

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords,
    authors: [{ name: author }],
    openGraph: {
      title: openGraph?.title || metaTitle,
      description: openGraph?.description || metaDescription,
      type: (openGraph?.type as 'website' | 'article' | 'book' | 'profile') || 'website',
      locale: openGraph?.locale || 'en_US',
      url: openGraph?.url,
      siteName: openGraph?.siteName || 'XHubSell',
      images: openGraph?.images || [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: twitter?.card || 'summary_large_image',
      site: twitter?.site || '@xhubsell',
      creator: twitter?.creator || '@xhubsell',
      title: twitter?.title || metaTitle,
      description: twitter?.description || metaDescription,
      images: twitter?.image ? [twitter.image] : ['/og-image.jpg'],
    },
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
      },
    },
  }
}

interface SEOTagsProps extends SEOProps {
  locale?: string
}

export function SEOTags({
  title,
  description,
  keywords,
  author,
  openGraph,
  twitter,
  canonical,
  noindex,
  nofollow,
  locale = 'en',
}: SEOTagsProps) {
  const defaultTitle = 'XHubSell - Your Trusted Marketplace Platform'
  const defaultDescription = 'Connect with sellers and buyers worldwide on XHubSell. Experience seamless commerce with innovative solutions.'
  
  const metaTitle = title ? `${title} | XHubSell` : defaultTitle
  const metaDescription = description || defaultDescription

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={openGraph?.title || metaTitle} />
      <meta property="og:description" content={openGraph?.description || metaDescription} />
      <meta property="og:type" content={openGraph?.type || 'website'} />
      <meta property="og:locale" content={openGraph?.locale || locale} />
      {openGraph?.url && <meta property="og:url" content={openGraph.url} />}
      <meta property="og:site_name" content={openGraph?.siteName || 'XHubSell'} />
      
      {/* Open Graph Images */}
      {(openGraph?.images || []).map((image, index) => (
        <React.Fragment key={index}>
          <meta property="og:image" content={image.url} />
          {image.width && <meta property="og:image:width" content={image.width.toString()} />}
          {image.height && <meta property="og:image:height" content={image.height.toString()} />}
          {image.alt && <meta property="og:image:alt" content={image.alt} />}
        </React.Fragment>
      ))}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitter?.card || 'summary_large_image'} />
      {twitter?.site && <meta name="twitter:site" content={twitter.site} />}
      {twitter?.creator && <meta name="twitter:creator" content={twitter.creator} />}
      <meta name="twitter:title" content={twitter?.title || metaTitle} />
      <meta name="twitter:description" content={twitter?.description || metaDescription} />
      {twitter?.image && <meta name="twitter:image" content={twitter.image} />}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots */}
      <meta
        name="robots"
        content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`}
      />
    </>
  )
}