# use-animated-sprite

Animated sprite hook for [react-three-fiber](https://github.com/pmndrs/react-three-fiber)

## Dependencies

```
npm install @react-three/drei @react-three/fiber react three
```

## Installation

```
npm install use-animated-sprite
```

## Component Usage

See [Sprite](https://threejs.org/docs/#api/en/objects/Sprite)
and [SpriteSheetConfig](https://github.com/britg/use-animated-sprite/blob/39d4441261ae029404fd4b538cef39a427d77d3a/src/lib/useAnimatedSprite.ts#L6)

```tsx
import { AnimatedSprite, SpriteSheetConfig } from 'use-animated-sprite';
import { SpriteProps } from '@react-three/fiber';

// The config interface

interface SpriteSheetConfig {
		spriteSheetUrl; string; // Required - The path or full URL to the sprite sheet
		xCount: number, // Required - the number of sprites along the X axis the spritesheet is divided into
		yCount: number; // Required - the number of sprites along the Y axis the spritesheet is divided into
		spriteFrames: number; // Required - the number of frames for this sprite
		spriteX: number; // Required - the start x position of this sprite (not pixels, but number of sprites from "left")
		spriteY: number; // Required - the start y position of this sprite (not pixels, but the number of sprites from "bottom")

		// One of interval or intervalFunc are required
		interval?: number; // Optional - the number of seconds between sprite frames

		// Optional - a function returning a number to use for the next interval between sprite frames
		intervalFunc?: () => number;
}

function MySprite () {
	const config = {
		spriteSheetUrl: `/path/to/spritesheet.png`,
		xCount: 40,
		yCount: 32,
		spriteFrames: 4
		spriteX: 20
		spriteY: 10
		interval: 0.5
		// - or -
		intervalFunc: () => {
			return (300 + Math.random() * 500) / 1000;
		}
	}
	return <AnimatedSprite {...config}>
}

```

## Hook Usage

```tsx

import { Sprite } from 'three';
import { useRef } from 'react';
import { useAnimatedSprite } from 'use-animated-sprite';

function MySprite () {

	const spriteRef = useRef<Sprite>();
	const texture = useAnimatedSprite(spriteRef, {
		spriteSheetUrl: `/path/to/spritesheet.png`,
		xCount: 40,
		yCount: 32,
		spriteFrames: 4
		spriteX: 20
		spriteY: 10
		interval: 0.5
		// - or -
		intervalFunc: () => {
			return (300 + Math.random() * 500) / 1000;
		}
	})

	return (
		<sprite ref={spriteRef}>
    	<spriteMaterial map={texture} />
  	</sprite>
	)
}

```
