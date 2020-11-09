# watchMedia.js
Use `watchMedia()` to enable/disable code under specific media query conditions with javascript.

Many callbacks can be registered to the same media query and **only one event listener** will be created for that media query as opposed to many event listeners created for the same media query event.

#### Basic example
Create the basic mobile and desktop breakpoints so different code runs for each device size. In this case, we are enabling/disabling different mobile and desktop navigation systems.

```
import { triggerMedia, watchMedia } from 'watch-media';

// Create on/off callbacks to enable/disable code.
const onMobile = config => { /* Initialize mobile navigation */ };
const offMobile = config => { /* Unregister mobile navigation event */ };

const onDesktop = config => { /* Initialize desktop navigation */ };
const offDesktop = config => { /* Unregister desktop navigation event */ };

// Register media query handlers.
watchMedia( 'mobile', '( max-width: 767px )', { onMobile, offMobile } );
watchMedia( 'desktop', '( min-width: 768px )', { onDesktop, offDesktop } );

// Use triggerMedia() to initialize once the DOM is loaded.
window.addEventListener( 'DOMContentLoaded', triggerMedia );
```

From here, other modules in your codebase may use `watchMedia()` for the same media query conditions and they will not generate a duplicate event handler for that media query.
