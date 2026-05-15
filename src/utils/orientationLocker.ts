import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef } from 'react';
import { NativeModules } from 'react-native';

type OrientationLockerModule = {
  lockToLandscape?: () => void;
  lockToPortrait?: () => void;
};

const Orientation = NativeModules.Orientation as
  | OrientationLockerModule
  | undefined;

export const lockLandscapeOrientation = () => {
  Orientation?.lockToLandscape?.();
};

export const unlockLandscapeOrientation = () => {
  Orientation?.lockToPortrait?.();
};

export const useLandscapeReportExit = (navigation: any) => {
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLeavingRef = useRef(false);
  const didUnlockRef = useRef(false);

  const clearExitTimeout = useCallback(() => {
    if (!exitTimeoutRef.current) return;

    clearTimeout(exitTimeoutRef.current);
    exitTimeoutRef.current = null;
  }, []);

  const unlockPortraitOnce = useCallback(() => {
    if (didUnlockRef.current) return;

    didUnlockRef.current = true;
    unlockLandscapeOrientation();
  }, []);

  const leaveReportScreen = useCallback(
    (action?: any) => {
      if (isLeavingRef.current) return;

      isLeavingRef.current = true;
      unlockPortraitOnce();
      clearExitTimeout();

      exitTimeoutRef.current = setTimeout(() => {
        if (action) {
          navigation.dispatch(action);
        } else {
          navigation.goBack();
        }

        exitTimeoutRef.current = null;
      }, 450);
    },
    [clearExitTimeout, navigation, unlockPortraitOnce],
  );

  useFocusEffect(
    useCallback(() => {
      isLeavingRef.current = false;
      didUnlockRef.current = false;
      lockLandscapeOrientation();

      return () => {
        unlockPortraitOnce();
        clearExitTimeout();
      };
    }, [clearExitTimeout, unlockPortraitOnce]),
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (event: any) => {
      if (isLeavingRef.current) return;

      event.preventDefault();
      leaveReportScreen(event.data.action);
    });

    return unsubscribe;
  }, [leaveReportScreen, navigation]);

  return leaveReportScreen;
};
