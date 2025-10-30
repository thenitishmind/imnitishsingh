import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'radial-gradient(circle at 30% 30%, #0F172A 0%, #1F2937 50%, #111827 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderRadius: '8px',
          border: '1.5px solid rgba(34, 211, 238, 0.4)',
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Primary glow effect */}
        <div
          style={{
            position: 'absolute',
            inset: '2px',
            background: 'conic-gradient(from 0deg, rgba(34, 211, 238, 0.15), rgba(59, 130, 246, 0.12), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.08), rgba(34, 211, 238, 0.15))',
            borderRadius: '6px',
          }}
        />
        
        {/* Inner shadow for depth */}
        <div
          style={{
            position: 'absolute',
            inset: '1px',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(31, 41, 55, 0.6) 100%)',
            borderRadius: '7px',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4)',
          }}
        />
        
        {/* Main letter with enhanced styling */}
        <div
          style={{
            fontSize: 18,
            fontWeight: '900',
            background: 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 30%, #9333EA 70%, #EC4899 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            letterSpacing: '-1px',
            textShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
            zIndex: 10,
          }}
        >
          N
        </div>
        
        {/* Modern corner indicators */}
        <div
          style={{
            position: 'absolute',
            top: '1px',
            right: '1px',
            width: '3px',
            height: '8px',
            background: 'linear-gradient(to bottom, #22D3EE, transparent)',
            borderRadius: '0 6px 0 2px',
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '1px',
            left: '1px',
            width: '8px',
            height: '3px',
            background: 'linear-gradient(to right, #9333EA, transparent)',
            borderRadius: '0 2px 6px 0',
            opacity: 0.6,
          }}
        />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
} 