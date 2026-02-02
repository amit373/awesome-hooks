# useFullscreen

React hook for controlling fullscreen mode. Provides an easy way to enter, exit, and toggle fullscreen mode for elements in the browser.

## Features

- Enter fullscreen mode for any element
- Exit fullscreen mode
- Toggle fullscreen mode
- Track fullscreen state
- Cross-browser compatibility
- SSR-safe implementation

## Installation

```bash
npm install # or your package manager of choice
```

## Usage

```typescript
import { useFullscreen } from './hooks/browser-apis/useFullscreen';

const VideoPlayer = () => {
  const {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    isEnabled
  } = useFullscreen();

  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isEnabled) {
    return <div>Fullscreen is not supported in your browser</div>;
  }

  return (
    <div>
      <video
        ref={videoRef}
        controls
        style={{ width: '100%', maxWidth: '800px' }}
      >
        <source src="sample-video.mp4" type="video/mp4" />
      </video>

      <div style={{ marginTop: '10px' }}>
        <button onClick={() => toggleFullscreen(videoRef.current)}>
          {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        </button>

        <button
          onClick={() => enterFullscreen(videoRef.current)}
          disabled={isFullscreen}
          style={{ marginLeft: '10px' }}
        >
          Enter Fullscreen
        </button>

        <button
          onClick={exitFullscreen}
          disabled={!isFullscreen}
          style={{ marginLeft: '10px' }}
        >
          Exit Fullscreen
        </button>
      </div>

      {isFullscreen && <p>Currently in fullscreen mode</p>}
    </div>
  );
};
```

## API

### Arguments

None

### Return Values

- `isFullscreen` (boolean): True if currently in fullscreen mode
- `enterFullscreen` (function): Function to enter fullscreen mode for an element
  - `element` (HTMLElement, optional): Element to enter fullscreen, defaults to document body
- `exitFullscreen` (function): Function to exit fullscreen mode
- `toggleFullscreen` (function): Function to toggle fullscreen mode
  - `element` (HTMLElement, optional): Element to toggle fullscreen for
- `isEnabled` (boolean): True if fullscreen API is supported in the browser

## Browser Compatibility

- Chrome 15+
- Firefox 10+
- Safari 5.1+
- Edge 11+
- Opera 12.1+

## Security Considerations

Fullscreen can only be initiated by explicit user action (e.g., click event). Programmatic entry to fullscreen will be blocked by browsers for security reasons.

## Use Cases

- Video players
- Image galleries
- Presentations
- Games
- Immersive experiences
- Data visualization dashboards

## License

MIT
