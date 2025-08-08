import React from 'react';

const AnimatedBackGround = ({ children, className = "" }) => {
  const particles = [
    { left: '28%', size: 172, delay: '1s' },
    { left: '49%', size: 126, delay: '4s' },
    { left: '14%', size: 178, delay: '7s' },
    { left: '73%', size: 102, delay: '4s' },
    { left: '62%', size: 188, delay: '10s' },
    { left: '86%', size: 129, delay: '13s' },
    { left: '83%', size: 142, delay: '19s' },
    { left: '86%', size: 176, delay: '4s' },
    { left: '43%', size: 192, delay: '11s' },
    { left: '26%', size: 195, delay: '11s' }
  ];

  return (
    <div className={`relative overflow-hidden bg-[#09090B] ${className}`}>
      
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute animate-float bg-[#F9F4F4]"
            style={{
              left: particle.left,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              bottom: `-${particle.size}px`,
              animationDelay: particle.delay,
              animationDuration: '19s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              opacity: 0.1 
            }}
          />
        ))}
      </div>
      
      
      <div className="relative z-10">
        {children}
      </div>
      
      
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.1;
            border-radius: 0;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
          }
        }
        
        .animate-float {
          animation-name: float;
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackGround;