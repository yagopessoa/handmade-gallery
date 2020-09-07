import Head from 'next/head';
import Link from 'next/link';

import Card from '../components/Card';
import { fetchAPI } from '../lib/api-prismic';

interface Image {
  image: {
    url: string;
  };
}

interface Item {
  node: {
    _meta: {
      uid: string;
    };
    title: {
      text: string;
    }[];
    description?: {
      text: string;
    }[];
    images: Image[];
    category: string;
    tags?: {
      tag: string;
    }[];
    buyLink?: string;
    imageLink?: string;
  };
}

interface HomeProps {
  items: Item[];
}

export default function Home({ items }: HomeProps) {
  return (
    <>
      <Head>
        <title>Handmade Gallery | Thais Kuga</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {items.map(({ node }) => (
        <Card key={`post-${node._meta.uid}`}>
          <h3>
            <Link href={`items/${node._meta.uid}`}>{node.title[0].text}</Link>
          </h3>
          <span>{node.description[0].text}</span>
        </Card>
      ))}
    </>
  );
}

export async function getServerSideProps() {
  const items = await fetchAPI(
    `
    query {
      allItems {
        edges {
          node{
            _meta {
              uid
            }
            title
            description
            images {
              image
            }
            category
            tags {
              tag
            }
            buylink {
              _linkType
            }
            imagelink {
              _linkType
            }
          }
        }
      }
    }
  `,
    {}
  );

  return {
    props: {
      items: items.allItems.edges,
    },
  };
}
