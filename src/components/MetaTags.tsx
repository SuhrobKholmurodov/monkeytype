import { Helmet } from 'react-helmet-async'

interface MetaTagsProps {
  title: string
  description: string
  keywords: string
}

export const MetaTags = ({ title, description, keywords }: MetaTagsProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}