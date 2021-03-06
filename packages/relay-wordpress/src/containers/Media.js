import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Image from 'containers/Image';

type MediaProps = {
  crop: string,
  media: Object,
};

const Media = ({ media, crop = 'large' }: MediaProps) => {
  switch (media.__typename) {
    case 'Image':
      return <Image image={media} crop={crop} />;
    default:
      return null;
  }
};

export default createFragmentContainer(
  Media,
  graphql`
    fragment Media_media on Media {
      __typename
      ...Image_image
    }
  `
);
