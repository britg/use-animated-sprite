import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { MutableRefObject, useEffect, useRef } from 'react';
import { NearestFilter, RepeatWrapping, Sprite, Texture } from 'three';

export interface SpriteSheetConfig {
  spriteSheetUrl: string;
  xCount: number; // The number of sprites along the x axis
  yCount: number; // the number of sprites along the y axis
  spriteX: number;
  spriteY: number;
  spriteFrames: number;
  interval?: number;
  intervalFunc?: () => number;
}

export function useAnimatedSprite(
  sprite: MutableRefObject<Sprite>,
  config: SpriteSheetConfig
) {
  const [texture] = useTexture([config.spriteSheetUrl]);
  const currentDeltaRef = useRef<number>(0);
  const currentIndexRef = useRef<number>(0);
  const nextTime = useRef<number>(config.interval || config.intervalFunc());

  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(1 / config.xCount, 1 / config.yCount);

  const localTexture = useRef<Texture>(texture.clone());

  useEffect(() => {
    if (!localTexture.current) {
      return;
    }

    localTexture.current.offset.set(
      config.spriteX / config.xCount,
      config.spriteY / config.yCount
    );
    localTexture.current.needsUpdate = true;
  }, [config, localTexture]);

  useFrame((_, delta) => {
    currentDeltaRef.current += delta;
    if (currentDeltaRef.current > nextTime.current) {
      nextTime.current = config.interval || config.intervalFunc();
      currentDeltaRef.current = 0;
      currentIndexRef.current += 1;
      if (currentIndexRef.current > config.spriteFrames - 1) {
        currentIndexRef.current = 0;
      }

      sprite.current.material.map.offset.setX(
        (currentIndexRef.current + config.spriteX) / config.xCount
      );
    }
  });

  return localTexture.current;
}
