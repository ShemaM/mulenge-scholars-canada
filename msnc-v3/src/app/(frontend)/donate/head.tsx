import { SITE_NAME, SITE_URL } from '@/lib/site'

export default function Head() {
  return (
    <>
      <title>Donate | MSNC</title>
      <meta
        name="description"
        content="Support Mulenge Scholars' Network Canada and help expand mentorship, scholarship readiness, and leadership opportunities for youth across Canada."
      />
      <link rel="canonical" href={`${SITE_URL}/donate`} />
      <meta property="og:title" content={`Donate | ${SITE_NAME}`} />
      <meta
        property="og:description"
        content="Support Mulenge Scholars' Network Canada and help expand mentorship, scholarship readiness, and leadership opportunities for youth across Canada."
      />
      <meta property="og:url" content={`${SITE_URL}/donate`} />
    </>
  )
}
