import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

const SEO = ({ title, description, keywords, image, url, type = 'website' }: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} | TSROA நாமக்கல்`;

    // Update meta tags
    const metaTags: MetaTag[] = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords || '' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image || '/images/office-building.png' },
      { property: 'og:type', content: type },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image || '/images/office-building.png' },
    ];

    metaTags.forEach(tag => {
      const attrName = tag.name ? 'name' : 'property';
      const attrValue = tag.name || tag.property;
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue as string);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', tag.content);
    });

    // Update canonical URL
    if (url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);
    }
  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEO;
