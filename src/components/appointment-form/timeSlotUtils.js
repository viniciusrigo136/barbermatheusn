export const generateTimeSlots = (daySchedule) => {
    const slots = [];
    const interval = 30; 

    daySchedule.forEach(period => {
        let currentTime = period.start * 60; 
        const endTime = period.end * 60;

        while (currentTime < endTime) { 
            const hours = Math.floor(currentTime / 60);
            const minutes = currentTime % 60;
            slots.push(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
            currentTime += interval;
        }
    });
    return slots;
};

export const getAvailableTimeSlotsForDate = (date, allAppointments) => {
    const selectedDate = new Date(date + "T00:00:00");
    const dayOfWeek = selectedDate.getUTCDay(); 

    const schedule = {
        1: [{ start: 13, end: 20 }], 
        2: [{ start: 8, end: 11.5 }, { start: 13, end: 20 }], 
    };

    const daySlots = schedule[dayOfWeek] ? generateTimeSlots(schedule[dayOfWeek]) : [];

    const bookedSlotsForDate = allAppointments
        .filter(app => app.date === date)
        .map(app => app.time);

    return daySlots.filter(slot => !bookedSlotsForDate.includes(slot));
};

export const validateDateSelection = (dateString) => {
    if (!dateString) {
        return "Data é obrigatória.";
    }
    const selectedDate = new Date(dateString + "T00:00:00");
    const dayOfWeek = selectedDate.getUTCDay(); 
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        return "Data não pode ser no passado.";
    }

    if (dayOfWeek !== 1 && dayOfWeek !== 2) { 
        return "Agendamentos apenas às Segundas e Terças.";
    }
    
    return null; 
};


export const getMinDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};