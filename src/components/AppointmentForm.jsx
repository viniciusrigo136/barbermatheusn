import React from 'react';
    import { Button } from '@/components/ui/button';
    import { motion } from 'framer-motion';
    import { servicesList } from './ServicesSection';
    import FormField from './appointment-form/FormField';
    import ServiceSelector from './appointment-form/ServiceSelector';
    import DateTimeSelector from './appointment-form/DateTimeSelector';
    import { useAppointmentForm } from './appointment-form/hooks/useAppointmentForm';
    import { useBookedSlots } from './appointment-form/hooks/useBookedSlots';
    import { useAppointmentSubmit } from './appointment-form/hooks/useAppointmentSubmit';
    
    const AppointmentForm = () => {
      const {
        formData,
        errors,
        setErrors,
        handleChange,
        handleTimeChange,
        handleServiceChange,
        resetForm
      } = useAppointmentForm();

      const { bookedSlots, availableTimeSlots, refreshBookedSlots } = useBookedSlots(formData.date);
      
      const { isSubmitting, handleSubmit } = useAppointmentSubmit(
        formData, 
        bookedSlots, 
        resetForm,
        refreshBookedSlots 
      );
      
      return (
        <section id="appointment-form" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Agende seu Horário
            </motion.h2>
            <motion.form 
              onSubmit={(e) => handleSubmit(e, setErrors)} 
              className="max-w-lg mx-auto space-y-6 bg-secondary p-8 rounded-lg shadow-xl border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <FormField
                id="name"
                name="name"
                label="Nome"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Seu nome completo"
                disabled={isSubmitting}
              />
              <FormField
                id="phone"
                name="phone"
                label="Telefone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="(XX) XXXXX-XXXX"
                disabled={isSubmitting}
              />
              
              <ServiceSelector
                services={servicesList}
                selectedServices={formData.services}
                onServiceChange={handleServiceChange}
                error={errors.services}
                disabled={isSubmitting}
              />

              {formData.totalValue > 0 && (
                <div className="mt-4 text-right">
                  <p className="text-lg font-semibold text-primary">
                    Valor Total: R$ {formData.totalValue.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              )}

              <DateTimeSelector
                date={formData.date}
                time={formData.time}
                onDateChange={handleChange}
                onTimeChange={handleTimeChange}
                dateError={errors.date}
                timeError={errors.time}
                availableTimeSlots={availableTimeSlots}
                disabled={isSubmitting}
              />
             
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 transition-transform transform hover:scale-105 duration-300 ease-in-out" disabled={isSubmitting}>
                {isSubmitting ? 'Agendando...' : 'Confirmar Agendamento'}
              </Button>
            </motion.form>
          </div>
        </section>
      );
    };

    export default AppointmentForm;