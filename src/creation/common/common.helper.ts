import { Content } from '../entities/content.entity';

export function extractCommonProperties(content: Content): {
  title: string;
  description: string;
  thumbnail: string;
  images: { url: string; seq: number }[];
} {
  const title = content.title;
  const description = content.description;
  let thumbnail = '';
  const images: { url: string; seq: number }[] = [];

  content.creationImages.forEach((item) => {
    if (item.seq === 1) {
      thumbnail = item.url;
    } else {
      images.push(item);
    }
  });

  images.sort((a, b) => a.seq - b.seq);

  return { title, description, thumbnail, images };
}
