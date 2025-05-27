import { useState, useEffect, useCallback } from 'react';
    import { servicesList } from '@/components/ServicesSection';
    import { validateDateSelection } from '@/components/appointment-form/timeSlotUtils';

    export const useAppointmentForm = () => {
      const [formData, setFormData] = useState({
        name: '',
        phone: '',
        services: [],
        date: '',
        time: '',
        totalValue: 0,
      });
      const [errors, setErrors] = useState({});

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

      const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
          setErrors(prev => ({ ...prev, [name]: null }));
        }
        if (name === 'date') {
          setFormData(prev => ({ ...prev, time: '' }));
          const dateError = validateDateSelection(value);
          setErrors(prev => ({ ...prev, date: dateError }));
        }
      }, [errors]);

      const handleTimeChange = useCallback((value) => {
        setFormData((prev) => ({ ...prev, time: value }));
        if (errors.time) {
          setErrors(prev => ({ ...prev, time: null }));
        }
      }, [errors]);

      const handleServiceChange = useCallback((serviceId) => {
        setFormData((prev) => {
          const currentServices = prev.services;
          const updatedServices = currentServices.includes(serviceId)
            ? currentServices.filter(id => id !== serviceId)
            : [...currentServices, serviceId];
          return { ...prev, services: updatedServices };
        });
        if (errors.services) {
          setErrors(prev => ({ ...prev, services: null }));
        }
      }, [errors]);
      
      const resetForm = useCallback(() => {
        setFormData({ name: '', phone: '', services: [], date: '', time: '', totalValue: 0 });
        setErrors({});
      }, []);

      return {
        formData,
        setFormData,
        errors,
        setErrors,
        handleChange,
        handleTimeChange,
        handleServiceChange,
        resetForm
      };
    };