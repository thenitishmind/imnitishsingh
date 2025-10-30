import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'radial-gradient(circle at 25% 25%, #0F172A 0%, #1F2937 40%, #111827 80%, #000000 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderRadius: '40px',
          border: '3px solid rgba(34, 211, 238, 0.3)',
          boxShadow: '0 0 60px rgba(34, 211, 238, 0.4), 0 0 120px rgba(34, 211, 238, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Primary animated glow */}
        <div
          style={{
            position: 'absolute',
            inset: '6px',
            background: 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.2) 0%, rgba(59, 130, 246, 0.15) 20%, rgba(147, 51, 234, 0.12) 40%, rgba(236, 72, 153, 0.1) 60%, rgba(251, 146, 60, 0.08) 80%, rgba(34, 211, 238, 0.2) 100%)',
            borderRadius: '34px',
          }}
        />
        
        {/* Secondary depth layer */}
        <div
          style={{
            position: 'absolute',
            inset: '12px',
            background: 'radial-gradient(circle at 40% 30%, rgba(34, 211, 238, 0.15) 0%, rgba(59, 130, 246, 0.1) 30%, rgba(147, 51, 234, 0.08) 60%, rgba(236, 72, 153, 0.06) 100%)',
            borderRadius: '28px',
          }}
        />
        
        {/* Inner shadow for depth */}
        <div
          style={{
            position: 'absolute',
            inset: '8px',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(31, 41, 55, 0.7) 50%, rgba(17, 24, 39, 0.8) 100%)',
            borderRadius: '32px',
            boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          }}
        />
        
        {/* Main letter with enhanced styling */}
        <div
          style={{
            fontSize: 95,
            fontWeight: '900',
            background: 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 25%, #9333EA 60%, #EC4899 85%, #F59E0B 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            letterSpacing: '-4px',
            textShadow: '0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(34, 211, 238, 0.3)',
            position: 'relative',
            zIndex: 10,
          }}
        >
          N
        </div>
        
        {/* Modern corner indicators */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '6px',
            height: '20px',
            background: 'linear-gradient(to bottom, #22D3EE, rgba(34, 211, 238, 0.3), transparent)',
            borderRadius: '0 32px 0 6px',
            opacity: 0.8,
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            width: '20px',
            height: '6px',
            background: 'linear-gradient(to right, #9333EA, rgba(147, 51, 234, 0.3), transparent)',
            borderRadius: '0 6px 32px 0',
            opacity: 0.7,
          }}
        />
        
        {/* Floating accent elements */}
        <div
          style={{
            position: 'absolute',
            top: '25px',
            left: '25px',
            width: '4px',
            height: '4px',
            background: 'radial-gradient(circle, #22D3EE, transparent)',
            borderRadius: '50%',
            opacity: 0.6,
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '30px',
            width: '3px',
            height: '3px',
            background: 'radial-gradient(circle, #EC4899, transparent)',
            borderRadius: '50%',
            opacity: 0.5,
            boxShadow: '0 0 8px rgba(236, 72, 153, 0.4)',
          }}
        />
        
        {/* Subtle tech-inspired grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: '20px',
            background: `
              radial-gradient(circle at 2px 2px, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
            borderRadius: '20px',
            opacity: 0.2,
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