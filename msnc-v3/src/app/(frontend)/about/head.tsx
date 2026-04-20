import { SITE_NAME, SITE_URL } from '@/lib/site'

export default function Head() {
  return (
    <>
      <title>About | MSNC</title>
      <meta
        name="description"
        content="Learn about Mulenge Scholars' Network Canada, our mission, our programs, and how we support Banyamulenge youth across Canada."
      />
      <link rel="canonical" href={`${SITE_URL}/about`} />
      <meta property="og:title" content={`About | ${SITE_NAME}`} />
      <meta
        property="og:description"
        content="Learn about Mulenge Scholars' Network Canada, our mission, our programs, and how we support Banyamulenge youth across Canada."
      />
      <meta property="og:url" content={`${SITE_URL}/about`} />
    </>
  )
}
