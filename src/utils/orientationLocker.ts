import { NativeModules } from 'react-native';

type OrientationLockerModule = {
  lockToLandscape?: () => void;
  lockToPortrait?: () => void;
};

const Orientation = NativeModules.Orientation as
  | OrientationLockerModule
  | undefined;

export const lockFeedProgramOrientation = () => {
  Orientation?.lockToLandscape?.();
};

export const unlockFeedProgramOrientation = () => {
  Orientation?.lockToPortrait?.();
};
