import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2022-11-09',
  useCdn: false,
};

const client = createClient(config);
const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export { client, urlFor };

