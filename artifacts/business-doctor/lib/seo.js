export const siteUrl = 'https://businessdoctor.in';

export function pageMeta({ title, description, path = '/' }) {
  return {
    title,
    description,
    canonical: `${siteUrl}${path}`,
    image: `${siteUrl}/images/hero/business-diagnostic-dashboard.png`,
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Business Doctor',
    priceRange: '₹₹',
    address: { '@type': 'PostalAddress', addressLocality: 'Uttam Nagar/West Delhi', addressCountry: 'IN' },
    areaServed: ['Uttam Nagar', 'West Delhi', 'Dwarka', 'Janakpuri', 'Rohini', 'Saket', 'South Delhi', 'Gurgaon', 'Cyber City', 'Noida', 'Greater Noida', 'Faridabad', 'Ghaziabad'],
  };
}

export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}