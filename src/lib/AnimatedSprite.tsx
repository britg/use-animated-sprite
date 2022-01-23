import { useRef } from 'react';
import { Sprite } from 'three';
import { SpriteProps } from '@react-three/fiber';
import { SpriteSheetConfig, useAnimatedSprite } from './useAnimatedSprite';
import React from 'react';

interface Props extends SpriteProps, SpriteSheetConfig {}

export function AnimatedSprite(props: Props): JSX.Element {
  const spriteRef = useRef<Sprite>();
  const config: SpriteSheetConfig = {
    spriteSheetUrl: props.spriteSheetUrl,
    xCount: props.xCount,
    yCount: props.yCount,
    spriteFrames: props.spriteFrames,
    spriteX: props.spriteX,
    spriteY: props.spriteY,
    intervalFunc: props.intervalFunc,
    interval: props.interval,
  };

  const texture = useAnimatedSprite(spriteRef, config);

  return (
    <sprite ref={spriteRef} {...props}>
      <spriteMaterial map={texture} />
    </sprite>
  );
}
