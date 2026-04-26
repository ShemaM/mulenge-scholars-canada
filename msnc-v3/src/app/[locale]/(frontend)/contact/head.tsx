import { SITE_NAME, SITE_URL } from '@/lib/site'

export default function Head() {
  return (
    <>
      <title>Contact | MSNC</title>
      <meta
        name="description"
        content="Contact Mulenge Scholars' Network Canada for partnerships, mentorship, student support, volunteering, and community inquiries."
      />
      <link rel="canonical" href={`${SITE_URL}/contact`} />
      <meta property="og:title" content={`Contact | ${SITE_NAME}`} />
      <meta
        property="og:description"
        content="Contact Mulenge Scholars' Network Canada for partnerships, mentorship, student support, volunteering, and community inquiries."
      />
      <meta property="og:url" content={`${SITE_URL}/contact`} />
    </>
  )
}
