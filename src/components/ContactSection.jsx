import React from 'react';
    import { Button } from '@/components/ui/button';
    import { MapPin, Phone, Clock, Instagram } from 'lucide-react';
    import { motion } from 'framer-motion';

    const ContactSection = () => {
      const whatsappNumber = "554999617264";
      const instagramUsername = "barbearia.balen";

      return (
        <section id="contact" className="py-16 md:py-24 bg-background text-foreground">
          <div className="container mx-auto px-6">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Localização e Contato
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-primary flex items-center">
                    <MapPin className="h-6 w-6 mr-2 text-primary" /> Endereço
                  </h3>
                  <p className="text-lg text-muted-foreground">Av. Santo Antônio, 670 - Centro</p>
                  <p className="text-lg text-muted-foreground">União do Oeste - SC</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-primary flex items-center">
                    <Clock className="h-6 w-6 mr-2 text-primary" /> Horário de Funcionamento
                  </h3>
                  <p className="text-lg text-muted-foreground">Segunda a Sábado: 07:30 - 19:00</p>
                  <p className="text-lg text-muted-foreground">Domingo: Fechado</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-primary flex items-center">
                    <Phone className="h-6 w-6 mr-2 text-primary" /> Contato
                  </h3>
                  <Button 
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 w-full md:w-auto text-lg py-3 px-6"
                    onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
                  >
                    Contatar via WhatsApp
                  </Button>
                </div>
                <div className="flex space-x-4 mt-6">
                  <a href={`https://instagram.com/${instagramUsername}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-primary hover:text-primary/80 transition-colors">
                    <Instagram size={32} />
                  </a>
                </div>
              </motion.div>
              <motion.div 
                className="h-80 md:h-full w-full rounded-lg overflow-hidden shadow-xl border border-primary/30"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay:0.2 }}
              >
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-52.830489873886116%2C-26.76893036299082%2C-52.82209038734437%2C-26.76403879936042&layer=mapnik&marker=-26.76648458660126%2C-52.826290130615234"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa da localização da barbearia em União do Oeste"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </section>
      );
    };

    export default ContactSection;