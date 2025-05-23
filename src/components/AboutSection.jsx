
    import React from 'react';
    import { motion } from 'framer-motion';

    const AboutSection = () => {
      return (
        <section id="about" className="py-16 md:py-24 bg-secondary text-foreground">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Sobre Nós</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Bem-vindo à nossa barbearia, onde tradição encontra modernidade. Nosso espaço foi criado para clientes que valorizam um atendimento de excelência e um visual impecável.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Estamos prontos para oferecer desde cortes clássicos até os mais contemporâneos. Utilizamos produtos de alta qualidade para garantir o melhor resultado para seu cabelo e barba.
                </p>
                <p className="text-lg text-muted-foreground">
                  Mais do que um corte, proporcionamos uma experiência única. Venha nos visitar e descubra o diferencial da nossa barbearia.
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
                  className="rounded-lg shadow-xl w-full h-auto object-cover aspect-video filter grayscale hover:grayscale-0 transition-all duration-500"
                  alt="Equipe da barbearia ou interior do estabelecimento"
                 src="https://images.unsplash.com/photo-1603268206075-56e995c9e830" />
              </motion.div>
            </div>
          </div>
        </section>
      );
    };

    export default AboutSection;
  