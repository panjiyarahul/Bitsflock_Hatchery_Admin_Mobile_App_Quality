import { ImageSourcePropType } from 'react-native';
import { getBrandVariant } from '../constants/colors';
export { default as AgeIcon } from './svg/AgeIcon';
export { default as ShedIcon } from './svg/ShedIcon';

const images = {
  bhattaraipoultry: require('./images/bhattaraipoultry.png'),
  bitsflocklayerfarm: require('./images/bitsflocklayerfarm.png'),
  broilerprologo: require('./images/broilerprologo.png'),
  qualitypoultry: require('./images/qualitypoultry.png'),
};

export const APP_LOGOS: Record<string, ImageSourcePropType> = {
  quality: images.qualitypoultry,
  layer: images.bitsflocklayerfarm,
  bhattarai: images.bhattaraipoultry,
  broilerpro: images.broilerprologo,
};

export const getAppLogo = () => APP_LOGOS[getBrandVariant()];

export default images;
