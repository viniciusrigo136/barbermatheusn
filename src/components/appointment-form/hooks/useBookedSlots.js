import { useState, useEffect, useCallback } from 'react';
    import { supabase } from '@/lib/supabaseClient';
    import { useToast } from '@/components/ui/use-toast';
    import { generateTimeSlots } from '@/components/appointment-form/timeSlotUtils';

    const allTimeSlotsByDay = {
      1: generateTimeSlots([{ start: 13, end: 20 }]), // Monday
      2: generateTimeSlots([{ start: 8, end: 11.5 }, { start: 13, end: 20 }]), // Tuesday
    };

    export const useBookedSlots = (currentDate) => {
      const { toast } = useToast();
      const [bookedSlots, setBookedSlots] = useState([]);
      const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

      const fetchBookedSlots = useCallback(async () => {
        if (currentDate) {
          const selectedDateObj = new Date(currentDate + "T00:00:00");
          const dayOfWeek = selectedDateObj.getUTCDay();

          const { data: appointments, error } = await supabase
            .from('appointments')
            .select('time')
            .eq('date', currentDate);

          if (error) {
            console.error('Error fetching booked slots:', error);
            toast({
              title: "Erro ao buscar horários",
              description: "Não foi possível verificar os horários disponíveis. Tente novamente.",
              variant: "destructive",
            });
            setBookedSlots([]);
            setAvailableTimeSlots([]);
            return;
          }

          const slotsForDate = appointments.map(app => app.time);
          setBookedSlots(slotsForDate);

          const slotsForDay = allTimeSlotsByDay[dayOfWeek] || [];
          setAvailableTimeSlots(slotsForDay.filter(slot => !slotsForDate.includes(slot)));
        } else {
          setBookedSlots([]);
          setAvailableTimeSlots([]);
        }
      }, [currentDate, toast]);

      useEffect(() => {
        fetchBookedSlots();
      }, [currentDate, fetchBookedSlots]);
      
      const refreshBookedSlots = useCallback(() => {
        fetchBookedSlots();
      }, [fetchBookedSlots]);

      return { bookedSlots, availableTimeSlots, refreshBookedSlots };
    };