// Prompt: When I reload the page I get the error "ReferenceError: AudioBuffer is not defined". Most probably because nextjs is trying to render the page on the server, which doesn't supports audiobuffer.
// GPT4: You are correct. The issue is due to the server-side rendering of Next.js trying to access the `AudioBuffer`, which is not available on the server side. To fix this, we can use dynamic imports to load the `MusicBox` component only on the client side.

// File: src/components/DynamicMusicBox.tsx
import dynamic from 'next/dynamic';

const MusicBox = dynamic(() => import('@/components/MusicBox'), {
  ssr: false,
});

export default MusicBox;

// Usage Example
// import DynamicMusicBox from "@/components/DynamicMusicBox.tsx";