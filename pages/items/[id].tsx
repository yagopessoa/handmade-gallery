import Head from 'next/head';
import { GetStaticPropsContext } from 'next';
import { Button } from 'gestalt';

import { fetchAPI } from '../../lib/api-prismic';
import {
  Container,
  CardContent,
  LeftContent,
  RightContent,
  Image,
} from '../../styles/pages/items';
import Card from '../../components/Card';

interface Image {
  image: {
    url: string;
  };
}

interface ItemProps {
  item: {
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

function Item({ item }: ItemProps) {
  // console.log(item);

  const { images, title: titles, description: descriptions } = item;

  const [image] = images;
  const {
    image: { url: imageUrl },
  } = image;

  const [mainTitle] = titles;
  const { text: title } = mainTitle;

  const [mainDescription] = descriptions;
  const { text: description } = mainDescription;

  return (
    <>
      <Head>
        <title>{item.title[0].text} | Handmade Gallery | Thais Kuga</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Card>
          <CardContent>
            <LeftContent>
              <Image src={imageUrl} />
            </LeftContent>
            <RightContent>
              <div>
                <h1>{title}</h1>
                <span>{description}</span>
              </div>
              <Button color="red" size="lg" text="Comprar" />
            </RightContent>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const item = await fetchAPI(
    `
    query($slug: String!, $lang: String!) {
      item(uid: $slug, lang: $lang) {
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
  `,
    {
      slug: ctx.params.id,
      lang: 'pt-br',
    }
  );

  return {
    props: {
      item: item.item,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const {
    allItems: { edges },
  } = await fetchAPI(
    `
    query {
      allItems {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }
    }
  `,
    {}
  );

  return {
    paths: edges.map(({ node }) => `/items/${node._meta.uid}`) || [],
    fallback: false,
  };
}

export default Item;
