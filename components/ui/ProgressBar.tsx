import React, { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useTheme } from '@/providers/ThemeProvider';

interface ProgressBarProps {
  value: number;
  height?: number;
  color?: string;
  trackColor?: string;
}

const ProgressBar = memo(function ProgressBar({
  value,
  height = 8,
  color,
  trackColor,
}: ProgressBarProps) {
  const { colors } = useTheme();
  const widthPercent = useSharedValue(0);

  useEffect(() => {
    widthPercent.value = withTiming(Math.min(Math.max(value, 0), 1) * 100, { duration: 300 });
  }, [value, widthPercent]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${widthPercent.value}%` as any,
  }));

  return (
    <View
      style={[
        styles.track,
        {
          height,
          borderRadius: height / 2,
          backgroundColor: trackColor ?? colors.surface,
        },
      ]}
    >
      <Animated.View
        style={[
          {
            height,
            borderRadius: height / 2,
            backgroundColor: color ?? colors.tint,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
});

export { ProgressBar };

const styles = StyleSheet.create({
  track: { overflow: 'hidden', width: '100%' },
});
