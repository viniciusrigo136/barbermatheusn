import React from 'react';
    import { Instagram, ShieldCheck } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';

    const Footer = () => {
      const currentYear = new Date().getFullYear();
      const instagramUsername = "barbearia.balen";

      return (
        <motion.footer 
          className="bg-secondary text-muted-foreground py-8 border-t border-primary/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center space-x-6 mb-4">
              <a href={`https://instagram.com/${instagramUsername}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
                <Instagram size={24} />
              </a>
            </div>
            <nav className="mb-4 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <a href="#privacy" className="text-sm hover:text-primary transition-colors">Política de Privacidade</a>
              <span className="hidden sm:inline">|</span>
              <a href="#terms" className="text-sm hover:text-primary transition-colors">Termos de Serviço</a>
               <span className="hidden sm:inline">|</span>
              <Link to="/admin" className="text-sm hover:text-primary transition-colors flex items-center">
                <ShieldCheck size={16} className="mr-1" /> Painel Admin
              </Link>
            </nav>
            <p className="text-sm">
<<<<<<< HEAD
              &copy; {currentYear} Barbearia Balen. Todos os direitos reservados.
            </p>
            <p className="text-sm">
              &copy; {currentYear} Dúvidas 49-99941-6011
=======
              &copy; {currentYear} Barbearia Moderna. Todos os direitos reservados.
            </p>
            <p className="text-xs mt-2">
              Criado com <span className="text-primary">❤</span> por Hostinger Horizons
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
            </p>
          </div>
        </motion.footer>
      );
    };

    export default Footer;