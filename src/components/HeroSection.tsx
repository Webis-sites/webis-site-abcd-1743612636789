'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

interface HeroSectionProps {
  restaurantName?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ restaurantName = 'abcd' }) => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        delay: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const floatingVariants: Variants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        repeat: Infinity,
        duration: 5,
        ease: 'easeInOut',
      },
    },
  };

  const rotateVariants: Variants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 5, -5, 0],
      transition: {
        repeat: Infinity,
        duration: 6,
        ease: 'easeInOut',
      },
    },
  };

  // Start animations when component mounts
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  // Parallax effect for background
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrollY = window.scrollY;
        const section = sectionRef.current;
        const parallaxElements = section.querySelectorAll('.parallax');
        
        parallaxElements.forEach((element, index) => {
          const speed = index * 0.1 + 0.2;
          const yPos = scrollY * speed;
          (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#588C7E]/20 to-[#9B786F]/20 rtl"
      dir="rtl"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-[10%] right-[15%] w-64 h-64 rounded-full bg-[#588C7E]/20 blur-3xl parallax"
          initial="initial"
          animate="animate"
          variants={floatingVariants}
        />
        <motion.div 
          className="absolute bottom-[20%] left-[10%] w-80 h-80 rounded-full bg-[#9B786F]/20 blur-3xl parallax"
          initial="initial"
          animate="animate"
          variants={floatingVariants}
        />
        <motion.div 
          className="absolute top-[40%] left-[25%] w-40 h-40 rounded-full bg-[#588C7E]/30 blur-2xl parallax"
          initial="initial"
          animate="animate"
          variants={rotateVariants}
        />
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-screen z-10">
        <motion.div
          className="w-full max-w-4xl backdrop-blur-lg bg-white/20 p-8 md:p-12 rounded-2xl border border-white/30 shadow-lg"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Restaurant name */}
          <motion.div 
            variants={itemVariants}
            className="mb-4 flex justify-center"
          >
            <span className="px-6 py-2 rounded-full bg-[#588C7E]/30 backdrop-blur-md border border-white/20 text-[#588C7E] font-bold">
              {restaurantName}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-center mb-6 text-[#588C7E] font-['Rubik'] tracking-tight"
          >
            מסעדה מוביל בישראל
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-center mb-10 text-[#9B786F] font-['Heebo'] leading-relaxed"
          >
            חווית לקוח מושלמת בכל ביקור
          </motion.p>
          
          {/* CTA Button */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center"
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-4 bg-gradient-to-r from-[#588C7E] to-[#588C7E]/80 text-white font-bold text-lg rounded-full shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300"
            >
              קבע תור עכשיו
            </motion.button>
          </motion.div>

          {/* Decorative elements inside the glassmorphism card */}
          <motion.div 
            className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#9B786F]/30 backdrop-blur-md border border-white/20 z-0"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          />
          <motion.div 
            className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-[#588C7E]/30 backdrop-blur-md border border-white/20 z-0"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
        </motion.div>

        {/* Animated food icons or entertainment elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 60 + 40}px`,
                height: `${Math.random() * 60 + 40}px`,
              }}
              initial={{ y: -100, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 0.7,
                transition: { 
                  delay: i * 0.2 + 1.5,
                  duration: 1.5,
                  ease: "easeOut"
                }
              }}
            >
              {/* You could add SVG icons here for food/entertainment */}
              <span className="text-2xl">🍽️</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;