import { Artwork, Gallery } from '../types';

export const MOCK_ARTWORKS: Artwork[] = [
  {
    id: '1',
    title: 'Starry Night',
    medium: 'Oil on canvas',
    year: 1889,
    artistName: 'Vincent van Gogh',
    location: 'Museum of Modern Art, New York',
    description: 'This painting depicts the view from the east-facing window of Van Gogh\'s asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an imaginary village.',
    imageUrl: 'https://images.unsplash.com/photo-1541680670548-88e8cd23c0f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Landscapes', 'Post-Impressionism', 'Night Scenes'],
    likes: 245
  },
  {
    id: '2',
    title: 'The Persistence of Memory',
    medium: 'Oil on canvas',
    year: 1931,
    artistName: 'Salvador Dalí',
    location: 'Museum of Modern Art, New York',
    description: 'The well-known surrealist piece introduced the image of the soft melting pocket watch. It epitomizes Dalí\'s theory of "softness" and "hardness".',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Surrealism', 'Dreamscapes'],
    likes: 187
  },
  {
    id: '3',
    title: 'Girl with a Pearl Earring',
    medium: 'Oil on canvas',
    year: 1665,
    artistName: 'Johannes Vermeer',
    location: 'Mauritshuis, The Hague, Netherlands',
    description: 'This work is not a portrait, but a "tronie" – a painting of an imaginary figure. Tronies were popular in Dutch Golden Age painting.',
    imageUrl: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Portraits', 'Dutch Golden Age'],
    likes: 210
  },
  {
    id: '4',
    title: 'The Great Wave off Kanagawa',
    medium: 'Woodblock print',
    year: 1831,
    artistName: 'Katsushika Hokusai',
    location: 'Metropolitan Museum of Art, New York',
    description: 'This famous woodblock print depicts an enormous wave threatening boats off the coast of Kanagawa Prefecture. It is Hokusai\'s most famous work and is often considered the most recognizable work of Japanese art in the world.',
    imageUrl: 'https://images.unsplash.com/photo-1565799557186-1af66414c664?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Landscapes', 'Japanese Art', 'Woodblock Prints'],
    likes: 198
  },
  {
    id: '5',
    title: 'The Night Watch',
    medium: 'Oil on canvas',
    year: 1642,
    artistName: 'Rembrandt van Rijn',
    location: 'Rijksmuseum, Amsterdam',
    description: 'This painting is renowned for its effective use of light and shadow (chiaroscuro) as well as the perception of motion in what would have traditionally been a static military group portrait.',
    imageUrl: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Portraits', 'Dutch Golden Age', 'Night Scenes'],
    likes: 176
  },
  {
    id: '6',
    title: 'Water Lilies',
    medium: 'Oil on canvas',
    year: 1919,
    artistName: 'Claude Monet',
    location: 'Metropolitan Museum of Art, New York',
    description: 'Part of Monet\'s Water Lilies series, this painting depicts his flower garden at his home in Giverny and was the main focus of his artistic production during the last thirty years of his life.',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Landscapes', 'Impressionism', 'Nature'],
    likes: 231
  }
];

export const MOCK_GALLERIES: Gallery[] = [
  {
    id: '1',
    title: 'Portraits',
    description: 'A collection of portrait artworks from various periods and styles.',
    tag: 'Portraits'
  },
  {
    id: '2',
    title: 'Landscapes',
    description: 'Beautiful landscape paintings from around the world.',
    tag: 'Landscapes'
  },
  {
    id: '3',
    title: 'Surrealism',
    description: 'Dreamlike and imaginative surrealist artworks.',
    tag: 'Surrealism'
  },
  {
    id: '4',
    title: 'Dutch Golden Age',
    description: 'Masterpieces from the Dutch Golden Age period.',
    tag: 'Dutch Golden Age'
  },
  {
    id: '5',
    title: 'Night Scenes',
    description: 'Artworks depicting nighttime and evening scenes.',
    tag: 'Night Scenes'
  }
];