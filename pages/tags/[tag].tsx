import React from 'react';
import Head from 'next/head';
import { GetStaticPropsContext } from 'next';
import { Button, Heading } from 'gestalt';

import Card from '../../components/Card';
import { fetchAPI } from '../../lib/api-prismic';
import {
  Container,
  CardContent,
  Image,
  HeadingContainer,
} from '../../styles/pages';
import { TagSubheaderRow } from '../../styles/pages/tags/index';

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

interface TagProps {
  items: Item[];
  tag: string;
}

function Tag({ items = [], tag = '' }: TagProps) {
  return (
    <>
      <Head>
        <title>{tag} | Handmade Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeadingContainer>
        <Heading size="lg">Handmade Gallery</Heading>
        <TagSubheaderRow>
          <Heading size="md">#{tag}</Heading>
          <Button role="link" text="Limpar filtro" href="/" />
        </TagSubheaderRow>
      </HeadingContainer>
      <Container>
        {items.map(({ node: { _meta: { uid }, images, title } }) => (
          <Card key={`post-${uid}`}>
            <CardContent>
              <Image src={images[0]?.image?.url} />
              <h3>{title[0].text}</h3>
              <Button
                role="link"
                color="red"
                text="Ver"
                href={`/items/${uid}/`}
              />
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { tag } = ctx.params;

  const items = await fetchAPI(
    `
    query($tags: [String!], $lang: String!) {
      allItems(tags: $tags, lang: $lang) {
        edges {
          node {
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
    {
      tags: tag,
      lang: 'pt-br',
    }
  );

  return {
    props: {
      items: items?.allItems?.edges || [],
      tag,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const res = await fetchAPI(
    `
    query {
      allItems {
        edges {
          node {
            tags {
              tag
            }
          }
        }
      }
    }
  `,
    {}
  );

  const { allItems } = res || {};
  const { edges } = allItems || {};

  let tags = [];
  edges?.forEach(({ node }) => {
    node?.tags?.forEach(({ tag }) => {
      if (tag && !tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });

  const paths = tags.map(tag => `/tags/${tag}`) || [];

  return {
    paths,
    fallback: true,
  };
}

export default Tag;
