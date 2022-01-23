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

interface Props extends SpriteProps, SpriteSheetConfig {}

function MySprite (props: Props) {
	return <AnimatedSprite {...props}>
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
		spriteSheetUrl: `/path/to/spritesheet.png`, // Required - The path or full URL to the sprite sheet
		xCount: 40, // Required - the number of sprites along the X axis the spritesheet is divided into
		yCount: 32, // Required - the number of sprites along the Y axis the spritesheet is divided into
		spriteFrames: 4 // Required - the number of frames for this sprite
		spriteX: 20 // Required - the start x position of this sprite (not pixels, but number of sprites from "left")
		spriteY: 10 // Required - the start y position of this sprite (not pixels, but the number of sprites from "bottom")

		// One of interval or intervalFunc are required
		interval: 0.5 // Optional - the number of seconds between sprite frames

		// Optional - a function returning a number to use for the next interval between sprite frames
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
