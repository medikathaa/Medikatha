import React from 'react';

interface MedikathaLogoProps {
  /** Rendered height of the icon in px */
  size?: number;
  /**
   * auto  — icon on light bg, wordmark in CSS (default, header/page use)
   * light — icon + white CSS wordmark  (dark backgrounds)
   * icon  — icon only, no wordmark     (mobile, footer bottom-bar)
   */
  variant?: 'auto' | 'light' | 'icon';
  animate?: boolean;
  showWordmark?: boolean;
  showIcon?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function MedikathaLogo({
  size = 40,
  variant = 'auto',
  animate = false,
  showWordmark = true,
  showIcon = true,
  className,
  style,
}: MedikathaLogoProps) {
  const wordColor   = variant === 'light' ? '#fff'             : '#0c2233';
  const subColor    = variant === 'light' ? 'rgba(255,255,255,0.5)' : '#728c9e';
  const wordFont    = 'Sora, DM Serif Display, serif';

  const iconStyle: React.CSSProperties = {
    width:  size,
    height: size,
    objectFit: 'contain',
    flexShrink: 0,
    animation: animate ? 'logoFloat 4s ease-in-out infinite' : undefined,
    // GPU-composited only
    willChange: animate ? 'transform' : undefined,
  };

  return (
    <>
      {animate && (
        <style>{`
          @keyframes logoFloat {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-5px); }
          }
        `}</style>
      )}
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: Math.round(size * 0.3),
          flexShrink: 0,
          textDecoration: 'none',
          ...style,
        }}
      >
        {/* Real logo icon from dist/images */}
        {showIcon && (
          <img
            src="/images/logo-icon.png"
            alt="Medikatha Logo"
            width={size}
            height={size}
            decoding="async"
            style={iconStyle}
          />
        )}

        {/* CSS wordmark — crisp at all sizes, works on any bg */}
        {showWordmark && (
          <div style={{ lineHeight: 1, userSelect: 'none' }}>
            <div style={{
              fontFamily: wordFont,
              fontSize: Math.round(size * 0.48),
              fontWeight: 800,
              letterSpacing: '-0.01em',
              lineHeight: 1,
              color: wordColor,
              // Two-colour MEDIKATHA: MEDI blue, KATHA red
              background: variant === 'light'
                ? 'none'
                : 'linear-gradient(90deg, #0f6ccf 0% 50%, #e03a3a 50% 100%)',
              WebkitBackgroundClip: variant === 'light' ? undefined : 'text',
              WebkitTextFillColor: variant === 'light' ? undefined : 'transparent',
              backgroundClip: variant === 'light' ? undefined : 'text',
            }}>
              {variant === 'light'
                ? 'MEDIKATHA'
                : 'MEDIKATHA'}
            </div>
            <div style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: Math.round(size * 0.2),
              color: subColor,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginTop: 2,
              fontWeight: 500,
            }}>
              Story of a Medicine
            </div>
          </div>
        )}
      </div>
    </>
  );
}
