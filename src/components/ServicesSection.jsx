import React from 'react';
<<<<<<< HEAD
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slice as CutIcon, User as BeardIcon, Eye as EyebrowIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export const servicesList = [
  {
    id: 'corte',
    icon: <CutIcon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />,
    title: 'Corte de Cabelo',
    description: 'Estilo na medida: clássico ou moderno.',
    price: 30,
  },
  {
    id: 'barba',
    icon: <BeardIcon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />,
    title: 'Barba',
    description: 'Aparar, alinhar e hidratar.',
    price: 30,  // aqui mantive 20, mas você pode mudar.
  },
  {
    id: 'bigode',
    icon: <BeardIcon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />,
    title: 'Bigode',
    description: 'Acerto preciso, estilo marcante.',
    price: 5,
  },
  {
    id: 'sobrancelha',
    icon: <EyebrowIcon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />,
    title: 'Sobrancelha',
    description: 'Design masculino: reto e alinhado.',
    price: 5,
  },
];

const ServicesSection = () => {
  const scrollToAppointment = () => {
    const appointmentSection = document.getElementById('appointment-form');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Nossos Serviços
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex"
            >
              <Card className="bg-background border-primary/30 shadow-xl hover:shadow-primary/20 transition-shadow duration-300 flex flex-col w-full">
                <CardHeader className="items-center text-center p-4 md:p-6">
                  {service.icon}
                  <CardTitle className="text-xl md:text-2xl text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-grow p-4 pt-0 md:p-6 md:pt-0">
                  <CardDescription className="text-muted-foreground text-sm md:text-base min-h-[40px]">
                    {service.description}
                  </CardDescription>
                  <p className="text-lg md:text-xl font-semibold text-primary mt-2">
                    R$ {service.price.toFixed(2).replace('.', ',')}
                  </p>
                </CardContent>
                <CardFooter className="justify-center p-4 md:p-6 pt-0">
                  <Button 
                    onClick={scrollToAppointment}
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 w-full text-sm md:text-base"
                  >
                    Agendar
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
=======
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Slice as CutIcon, User as BeardIcon, Eye as EyebrowIcon, Scissors as ComboIcon } from 'lucide-react';
    import { motion } from 'framer-motion';

    export const servicesList = [
      {
        id: 'corte',
        icon: <CutIcon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />,
        title: 'Corte de Cabelo',
        description: 'Estilo na medida: clássico ou moderno.',
        price: 30,
      },
      {
        id: 'barba',
        icon: <BeardIcon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />,
        title: 'Barba',
        description: 'Aparar, alinhar e hidratar.',
        price: 30,
      },
      {
        id: 'corte_barba',
        icon: <ComboIcon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />,
        title: 'Cabelo e Barba',
        description: 'Combo completo para um visual impecável.',
        price: 50,
      },
      {
        id: 'sobrancelha',
        icon: <EyebrowIcon className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />,
        title: 'Sobrancelha',
        description: 'Design masculino: reto e alinhado.',
        price: 5,
      },
    ];

    const ServicesSection = () => {
      const scrollToAppointment = () => {
        const appointmentSection = document.getElementById('appointment-form');
        if (appointmentSection) {
          appointmentSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

      const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.15,
            duration: 0.5,
            ease: "easeOut"
          }
        })
      };

      return (
        <section id="services" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Nossos Serviços
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {servicesList.map((service, index) => (
                <motion.custom
                  key={service.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="flex"
                >
                  <Card className="bg-background border-primary/30 shadow-xl hover:shadow-primary/20 transition-shadow duration-300 flex flex-col w-full">
                    <CardHeader className="items-center text-center p-4 md:p-6">
                      {service.icon}
                      <CardTitle className="text-xl md:text-2xl text-primary">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center flex-grow p-4 pt-0 md:p-6 md:pt-0">
                      <CardDescription className="text-muted-foreground text-sm md:text-base min-h-[40px]">{service.description}</CardDescription>
                      <p className="text-lg md:text-xl font-semibold text-primary mt-2">
                        R$ {service.price.toFixed(2).replace('.', ',')}
                      </p>
                    </CardContent>
                    <CardFooter className="justify-center p-4 md:p-6 pt-0">
                      <Button 
                        onClick={scrollToAppointment}
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 w-full text-sm md:text-base"
                      >
                        Agendar
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.custom>
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default ServicesSection;
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
