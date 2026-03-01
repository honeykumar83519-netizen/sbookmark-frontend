import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
}

export default function SEO({
    title,
    description = "SBookmark - A modern tool for organizing and sharing your bookmarks effectively.",
    keywords = "bookmarks, links, sharing, organization"
}: SEOProps) {
    return (
        <Helmet>
            <title>{title} | SBookmark</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    );
}
