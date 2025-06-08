import React from 'react';
<<<<<<< HEAD
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import BarbeariaImage from './ui/barbearia.jpg'; // ✅ Caminho correto!

const HeroSection = () => {
  const scrollToAppointment = () => {
    const appointmentSection = document.getElementById('appointment-form');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          className="object-cover w-full h-full filter brightness-50"
          alt="Barbearia estilosa com ambiente moderno"
          src={BarbeariaImage}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      <motion.div
        className="relative z-10 p-6 md:p-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-primary"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "circOut" }}
        >
          Transforme seu Estilo!
        </motion.h1>
        <motion.p 
          className="text-lg md:text-2xl mb-8 text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Agende seu horário com facilidade e cuide do seu visual.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button 
            onClick={scrollToAppointment}
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Agendar Agora
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
=======
    import { Button } from '@/components/ui/button';
    import { motion } from 'framer-motion';

    const HeroSection = () => {
      const scrollToAppointment = () => {
        const appointmentSection = document.getElementById('appointment-form');
        if (appointmentSection) {
          appointmentSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

      const newBackgroundImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/2040a985-6302-4efb-8001-1ea01bc1d57b/6a41ff35b29bbd03b1df8d194fc37448.png";

      return (
        <section 
          className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden"
          style={{
            backgroundImage: `url(${newBackgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>
          
          <motion.div
            className="relative z-10 p-6 md:p-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-primary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "circOut" }}
            >
              Transforme seu Estilo!
            </motion.h1>
            <motion.p 
              className="text-lg md:text-2xl mb-8 text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Agende seu horário com facilidade e cuide do seu visual.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button 
                onClick={scrollToAppointment}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                Agendar Agora
              </Button>
            </motion.div>
          </motion.div>
        </section>
      );
    };

    export default HeroSection;
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
