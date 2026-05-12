import { SERVER } from './config';

export const BRAND_COLOR_PALETTES = {
  quality: {
    primary: '#F4473D',
    secondary: '#111111',
  },
  layer: {
    primary: '#FF2E23',
    secondary: '#2F4053',
  },
  bhattarai: {
    primary: '#FF8A5C',
    secondary: '#766105',
  },
  broilerpro: {
    primary: '#2D61B4',
    secondary: '#163C7A',
  },
} as const;

export type BrandPalette =
  (typeof BRAND_COLOR_PALETTES)[keyof typeof BRAND_COLOR_PALETTES];
export type BrandVariant = keyof typeof BRAND_COLOR_PALETTES;

export const getBrandVariant = (server = SERVER): BrandVariant => {
  if (server.includes('quality')) {
    return 'quality';
  }

  if (server.includes('layer')) {
    return 'layer';
  }

  if (server.includes('bhattarai')) {
    return 'bhattarai';
  }

  return 'broilerpro';
};

export const COLORS: BrandPalette = BRAND_COLOR_PALETTES[getBrandVariant()];
