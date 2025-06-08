<<<<<<< HEAD

    import React from 'react';
    import { motion } from 'framer-motion';

    const AboutSection = () => {
      return (
        <section id="about" className="py-16 md:py-24 bg-secondary text-foreground">
          <div className="container mx-auto px-6">
=======
import React from 'react';
    import { motion } from 'framer-motion';

    const AboutSection = () => {
      const newBackgroundImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/2040a985-6302-4efb-8001-1ea01bc1d57b/6a41ff35b29bbd03b1df8d194fc37448.png";

      return (
        <section 
          id="about" 
          className="relative py-16 md:py-24 text-foreground"
          style={{
            backgroundImage: `url(${newBackgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed', 
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>
          <div className="container mx-auto px-6 relative z-10">
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Sobre Nós</h2>
<<<<<<< HEAD
                <p className="text-lg text-muted-foreground mb-4">
                  Bem-vindo à nossa barbearia, onde tradição encontra modernidade. Nosso espaço foi criado para clientes que valorizam um atendimento de excelência e um visual impecável.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Estamos prontos para oferecer desde cortes clássicos até os mais contemporâneos. Utilizamos produtos de alta qualidade para garantir o melhor resultado para seu cabelo e barba.
                </p>
                <p className="text-lg text-muted-foreground">
                  Mais do que um corte, proporcionamos uma experiência única. Venha nos visitar e descubra o diferencial da nossa barbearia.
=======
                <p className="text-lg text-gray-200 mb-4">
                  Bem-vindo à nossa barbearia, onde tradição encontra modernidade. Nosso espaço foi criado para homens que valorizam um atendimento de excelência e um visual impecável.
                </p>
                <p className="text-lg text-gray-200 mb-4">
                  Nossa equipe de barbeiros experientes está sempre atualizada com as últimas tendências, oferecendo desde cortes clássicos até os mais contemporâneos. Utilizamos produtos de alta qualidade para garantir o melhor resultado para seu cabelo e barba.
                </p>
                <p className="text-lg text-gray-200">
                  Mais do que um corte, proporcionamos uma experiência relaxante e revigorante. Venha nos visitar e descubra o diferencial da nossa barbearia.
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
                </p>
              </motion.div>
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <img  
<<<<<<< HEAD
                  className="rounded-lg shadow-xl w-full h-auto object-cover aspect-video filter grayscale hover:grayscale-0 transition-all duration-500"
                  alt="Equipe da barbearia ou interior do estabelecimento"
=======
                  className="rounded-lg shadow-xl w-full h-auto object-cover aspect-video filter grayscale hover:grayscale-0 transition-all duration-500 border-2 border-primary/50"
                  alt="Equipe da barbearia ou interior do estabelecimento com foco nos detalhes"
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
                 src="https://images.unsplash.com/photo-1603268206075-56e995c9e830" />
              </motion.div>
            </div>
          </div>
        </section>
      );
    };

<<<<<<< HEAD
    export default AboutSection;
  
=======
    export default AboutSection;
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
