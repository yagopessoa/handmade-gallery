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
    images: Image[];
  };
}

interface HomeProps {
  items: Item[];
}

export default function Home({ items }: HomeProps) {
  return (
    <>
      <Head>
        <title>Handmade Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeadingContainer>
        <Heading size="lg" align="center">
          Handmade Gallery
        </Heading>
      </HeadingContainer>
      <Container>
        {items.map(({ node: { _meta: { uid }, images, title } }) => (
          <Card key={`post-${uid}`} isChild>
            <CardContent>
              <Image src={images[0]?.image?.url} />
              <h3>{title[0].text}</h3>
              <Button
                role="link"
                color="red"
                text="Ver"
                href={`items/${uid}/`}
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
            images {
              image
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
      items: items?.allItems?.edges,
    },
  };
}
