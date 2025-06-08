import React, { useState, useEffect, useMemo } from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Checkbox } from '@/components/ui/checkbox';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
    import { useToast } from '@/components/ui/use-toast';
    import { motion } from 'framer-motion';
    import { servicesList } from './ServicesSection';

    const generateTimeSlots = () => {
      const slots = [];
      const morningStart = 7.5 * 60; 
      const morningEnd = 11.5 * 60;
      const afternoonStart = 13.5 * 60;
      const afternoonEnd = 20 * 60;
      const interval = 30;

      for (let time = morningStart; time <= morningEnd; time += interval) {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        slots.push(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
      }
      for (let time = afternoonStart; time <= afternoonEnd; time += interval) {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        slots.push(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
      }
      return slots;
    };

    const allTimeSlots = generateTimeSlots();

    const AppointmentForm = () => {
      const { toast } = useToast();
      const [formData, setFormData] = useState({
        name: '',
        phone: '',
        services: [],
        date: '',
        time: '',
        totalValue: 0,
      });
      const [errors, setErrors] = useState({});
      const [bookedSlots, setBookedSlots] = useState([]);

      useEffect(() => {
        const calculateTotal = () => {
          const total = formData.services.reduce((sum, serviceId) => {
            const selectedService = servicesList.find(s => s.id === serviceId);
            return sum + (selectedService ? selectedService.price : 0);
          }, 0);
          setFormData(prev => ({ ...prev, totalValue: total }));
        };
        calculateTotal();
      }, [formData.services]);

      useEffect(() => {
        if (formData.date) {
          const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
          const slotsForDate = appointments
            .filter(app => app.date === formData.date)
            .map(app => app.time);
          setBookedSlots(slotsForDate);
        } else {
          setBookedSlots([]);
        }
      }, [formData.date]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
          setErrors(prev => ({...prev, [name]: null}));
        }
        if (name === 'date') {
          setFormData(prev => ({ ...prev, time: '' })); 
        }
      };

      const handleTimeChange = (value) => {
        setFormData((prev) => ({ ...prev, time: value }));
        if (errors.time) {
          setErrors(prev => ({...prev, time: null}));
        }
      };
      
      const handleServiceChange = (serviceId) => {
        setFormData((prev) => {
          const currentServices = prev.services;
          let updatedServices;
          if (currentServices.includes(serviceId)) {
            updatedServices = currentServices.filter(id => id !== serviceId);
          } else {
            updatedServices = [...currentServices, serviceId];
          }
          return { ...prev, services: updatedServices };
        });
        if (errors.services) {
          setErrors(prev => ({...prev, services: null}));
        }
      };

      const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Nome é obrigatório.";
        if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório.";
        else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = "Telefone inválido (use apenas números, ex: 49999999999).";
        if (formData.services.length === 0) newErrors.services = "Selecione ao menos um serviço.";
        
        if (!formData.date) {
          newErrors.date = "Data é obrigatória.";
        } else {
          const selectedDate = new Date(formData.date + "T00:00:00"); 
          const dayOfWeek = selectedDate.getUTCDay(); 
          if (dayOfWeek !== 1 && dayOfWeek !== 2) { 
            newErrors.date = "Agendamentos apenas às Segundas e Terças.";
          } else if (selectedDate < new Date().setHours(0,0,0,0)) {
            newErrors.date = "Data não pode ser no passado.";
          }
        }

        if (!formData.time) newErrors.time = "Hora é obrigatória.";
        else if (bookedSlots.includes(formData.time)) newErrors.time = "Este horário já está agendado.";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
          toast({
            title: "Erro de Validação",
            description: "Por favor, corrija os campos destacados.",
            variant: "destructive",
            duration: 3000,
          });
          return;
        }
        
        const appointmentData = {
          ...formData,
          services: formData.services.map(id => servicesList.find(s => s.id === id)?.title || id) 
        };

        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push(appointmentData);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        toast({
          title: 'Agendamento Confirmado!',
          description: 'Seu horário foi agendado com sucesso!',
          variant: 'default',
          duration: 5000,
        });
        setFormData({ name: '', phone: '', services: [], date: '', time: '', totalValue: 0 });
        setErrors({});
        setBookedSlots([]); 
      };
      
      const getMinDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
      };

      const availableTimeSlots = useMemo(() => {
        return allTimeSlots.filter(slot => !bookedSlots.includes(slot));
      }, [bookedSlots]);

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
              onSubmit={handleSubmit} 
              className="max-w-lg mx-auto space-y-6 bg-secondary p-8 rounded-lg shadow-xl border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div>
                <Label htmlFor="name" className="text-foreground">Nome</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className={`mt-1 bg-background border-primary/30 focus:ring-primary text-foreground ${errors.name ? 'border-destructive ring-destructive' : ''}`}
                  placeholder="Seu nome completo" 
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="phone" className="text-foreground">Telefone</Label>
                <Input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  className={`mt-1 bg-background border-primary/30 focus:ring-primary text-foreground ${errors.phone ? 'border-destructive ring-destructive' : ''}`}
                  placeholder="(XX) XXXXX-XXXX"
                />
                 {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <Label className="text-foreground mb-2 block">Serviços</Label>
                <div className="space-y-2">
                  {servicesList.map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`service-${service.id}`}
                        checked={formData.services.includes(service.id)}
                        onCheckedChange={() => handleServiceChange(service.id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-primary/50"
                      />
                      <Label htmlFor={`service-${service.id}`} className="text-foreground font-normal cursor-pointer">
                        {service.title} - R$ {service.price.toFixed(2).replace('.', ',')}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.services && <p className="text-destructive text-sm mt-1">{errors.services}</p>}
              </div>

              {formData.totalValue > 0 && (
                <div className="mt-4 text-right">
                  <p className="text-lg font-semibold text-primary">
                    Valor Total: R$ {formData.totalValue.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="date" className="text-foreground">Data (Segundas e Terças)</Label>
                  <Input 
                    type="date" 
                    id="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                    min={getMinDate()}
                    className={`mt-1 bg-background border-primary/30 focus:ring-primary text-foreground [color-scheme:dark] ${errors.date ? 'border-destructive ring-destructive' : ''}`}
                  />
                  {errors.date && <p className="text-destructive text-sm mt-1">{errors.date}</p>}
                </div>
                <div>
                  <Label htmlFor="time" className="text-foreground">Hora</Label>
                  <Select 
                    value={formData.time} 
                    onValueChange={handleTimeChange}
                    name="time"
                  >
                    <SelectTrigger 
                      className={`mt-1 w-full bg-background border-primary/30 focus:ring-primary text-foreground ${errors.time ? 'border-destructive ring-destructive' : ''}`}
                      disabled={!formData.date || (errors.date && errors.date === "Agendamentos apenas às Segundas e Terças.")}
                    >
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                    <SelectContent className="bg-secondary border-primary text-foreground">
                      <SelectGroup>
                        <SelectLabel className="text-primary">Horários Disponíveis</SelectLabel>
                        {availableTimeSlots.length > 0 ? availableTimeSlots.map(slot => (
                          <SelectItem key={slot} value={slot} className="hover:bg-primary/20 focus:bg-primary/30">
                            {slot}
                          </SelectItem>
                        )) : (
                          <SelectItem value="no-slots" disabled className="text-muted-foreground">
                            {formData.date ? "Nenhum horário disponível" : "Selecione uma data"}
                          </SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.time && <p className="text-destructive text-sm mt-1">{errors.time}</p>}
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 transition-transform transform hover:scale-105 duration-300 ease-in-out">
                Confirmar Agendamento
              </Button>
            </motion.form>
          </div>
        </section>
      );
    };

    export default AppointmentForm;