import React from 'react';
<<<<<<< HEAD
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14250.069632113502!2d-52.84198315!3d-26.7597722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94fad71b28346d3d%3A0x950316579597f01c!2sBarbearia%20Balen!5e0!3m2!1spt-BR!2sbr!4v1747932681336!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa da localização da Barbearia Balen"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
=======
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
                  <p className="text-lg text-muted-foreground">Segunda: 13:00 - 20:00</p>
                  <p className="text-lg text-muted-foreground">Terça a Sábado: 07:30 - 19:00 (Terça das 08:00 - 11:30 e 13:00 - 20:00 para agendamentos)</p>
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
                className="h-80 md:h-[450px] w-full rounded-lg overflow-hidden shadow-xl border border-primary/30"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay:0.2 }}
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14250.069632113502!2d-52.84198315!3d-26.7597722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94fad71b28346d3d%3A0x950316579597f01c!2sBarbearia%20Balen!5e0!3m2!1spt-BR!2sbr!4v1748014893378!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border:0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa da localização da Barbearia Balen">
                </iframe>
              </motion.div>
            </div>
          </div>
        </section>
      );
    };

    export default ContactSection;
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
