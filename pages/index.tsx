import Head from 'next/head';
import { Button, Heading } from 'gestalt';

import Card from '../components/Card';
import { fetchAPI } from '../lib/api-prismic';
import {
  Container,
  CardContent,
  Image,
  HeadingContainer,
} from '../styles/pages';

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
  const handleItemClick = (path: string) => () => {
    window.location.assign(path);
  };

  return (
    <>
      <Head>
        <title>Handmade Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeadingContainer>
        <Heading size="lg">Handmade Gallery</Heading>
      </HeadingContainer>
      <Container>
        {items.map(({ node: { _meta: { uid }, images, title } }) => (
          <Card key={`post-${uid}`}>
            <CardContent>
              <Image src={images[0]?.image?.url} />
              <h3>{title[0].text}</h3>
              <Button
                color="red"
                text="Ver"
                onClick={handleItemClick(`items/${uid}`)}
              />
            </CardContent>
          </Card>
        ))}
      </Container>
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
