import Head from 'next/head';
import { GetStaticPropsContext } from 'next';
import { Button } from 'gestalt';
import { Carousel } from 'react-responsive-carousel';

import { fetchAPI } from '../../lib/api-prismic';
import {
  Container,
  CardContent,
  LeftContent,
  RightContent,
  Image,
  ButtonWrapper,
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
  const { images, title: titles, description: descriptions } = item;

  const [mainTitle] = titles;
  const { text: title } = mainTitle;

  const [mainDescription] = descriptions;
  const { text: description } = mainDescription;

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <Head>
        <title>{title} | Handmade Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Card>
          <CardContent>
            <LeftContent>
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
              >
                {images.map(({ image: { url } }) => (
                  <div>
                    <Image src={url} />
                  </div>
                ))}
              </Carousel>
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
      <ButtonWrapper>
        <Button size="lg" text="Voltar" onClick={handleBack} />
      </ButtonWrapper>
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
    fallback: true,
  };
}

export default Item;
