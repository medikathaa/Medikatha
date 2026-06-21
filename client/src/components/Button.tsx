import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type ButtonProps = {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  type?: 'button' | 'submit';
};

export function Button({ to, onClick, children, variant = 'primary', type = 'button' }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Magnetic effect logic
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-2) var(--space-5)',
    borderRadius: 'var(--radius-full)',
    fontFamily: 'var(--font-ui)',
    fontWeight: 500,
    fontSize: '0.9375rem',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    border: 'none',
    outline: 'none',
  };

  const variants = {
    primary: {
      background: 'var(--brand-blue)',
      color: '#fff',
      boxShadow: 'var(--shadow-raised)',
    },
    secondary: {
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-strong)',
      boxShadow: 'var(--shadow-subtle)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--brand-blue)',
    }
  };

  const style = { ...baseStyle, ...variants[variant] };

  const content = (
    <>
      <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
      {variant === 'primary' && (
        <motion.div
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #3d8fe0, #0a4d95)',
            zIndex: 1,
            borderRadius: 'inherit'
          }}
        />
      )}
    </>
  );

  const MotionLink = motion.create(Link);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: 'inline-block' }}
    >
      {to ? (
        <MotionLink 
          to={to} 
          style={style}
          whileTap={{ scale: 0.95 }}
        >
          {content}
        </MotionLink>
      ) : (
        <motion.button 
          type={type} 
          onClick={onClick} 
          style={style}
          whileTap={{ scale: 0.95 }}
        >
          {content}
        </motion.button>
      )}
    </motion.div>
  );
}
