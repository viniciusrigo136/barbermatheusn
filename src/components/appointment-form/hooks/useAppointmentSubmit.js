import { useState, useCallback } from 'react';
    import { supabase } from '@/lib/supabaseClient';
    import { useToast } from '@/components/ui/use-toast';
    import { servicesList } from '@/components/ServicesSection';
    import { validateDateSelection } from '@/components/appointment-form/timeSlotUtils';

    export const useAppointmentSubmit = (formData, bookedSlots, resetForm, refreshBookedSlots) => {
      const { toast } = useToast();
      const [isSubmitting, setIsSubmitting] = useState(false);
      
      const validateForm = useCallback(() => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Nome é obrigatório.";
        if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório.";
        else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = "Telefone inválido (use apenas números, ex: 49999999999).";
        if (formData.services.length === 0) newErrors.services = "Selecione ao menos um serviço.";
        
        const dateError = validateDateSelection(formData.date);
        if(dateError) newErrors.date = dateError;

        if (!formData.time) newErrors.time = "Hora é obrigatória.";
        else if (bookedSlots.includes(formData.time)) newErrors.time = "Este horário já está agendado.";
        
        return newErrors;
      }, [formData, bookedSlots]);


      const handleSubmit = useCallback(async (e, setErrors) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          toast({
            title: "Erro de Validação",
            description: "Por favor, corrija os campos destacados.",
            variant: "destructive",
            duration: 3000,
          });
          return;
        }
        
        setIsSubmitting(true);

        const appointmentData = {
          name: formData.name,
          phone: formData.phone,
          services: formData.services.map(id => servicesList.find(s => s.id === id)?.title || id),
          date: formData.date,
          time: formData.time,
          total_value: formData.totalValue,
        };

        const { error } = await supabase.from('appointments').insert([appointmentData]);

        setIsSubmitting(false);

        if (error) {
          console.error('Error saving appointment:', error);
          toast({
            title: 'Erro ao Agendar',
            description: 'Não foi possível salvar seu agendamento. Tente novamente.',
            variant: 'destructive',
            duration: 5000,
          });
        } else {
          toast({
            title: 'Agendamento Confirmado!',
            description: 'Seu horário foi agendado com sucesso!',
            variant: 'default',
            duration: 5000,
          });
          resetForm();
          refreshBookedSlots(); // Refresh slots after successful submission
        }
      }, [formData, bookedSlots, resetForm, toast, validateForm, refreshBookedSlots]);

      return { isSubmitting, handleSubmit };
    };