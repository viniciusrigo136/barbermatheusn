import React from 'react';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
    import { getMinDate, validateDateSelection } from './timeSlotUtils';

    const DateTimeSelector = ({ date, time, onDateChange, onTimeChange, dateError, timeError, availableTimeSlots, disabled }) => {
      const isDateInvalidForTimeSelection = !!validateDateSelection(date);

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="date" className="text-foreground">Data (Segundas e Terças)</Label>
            <Input 
              type="date" 
              id="date" 
              name="date" 
              value={date} 
              onChange={onDateChange} 
              min={getMinDate()}
              className={`mt-1 bg-background border-primary/30 focus:ring-primary text-foreground [color-scheme:dark] ${dateError ? 'border-destructive ring-destructive' : ''}`}
              disabled={disabled}
            />
            {dateError && <p className="text-destructive text-sm mt-1">{dateError}</p>}
          </div>
          <div>
            <Label htmlFor="time" className="text-foreground">Hora</Label>
            <Select 
              value={time} 
              onValueChange={onTimeChange}
              name="time"
              disabled={disabled || !date || isDateInvalidForTimeSelection}
            >
              <SelectTrigger 
                className={`mt-1 w-full bg-background border-primary/30 focus:ring-primary text-foreground ${timeError ? 'border-destructive ring-destructive' : ''}`}
              >
                <SelectValue placeholder="Selecione um horário" />
              </SelectTrigger>
              <SelectContent className="bg-secondary border-primary text-foreground">
                <SelectGroup>
                  <SelectLabel className="text-primary">Horários Disponíveis</SelectLabel>
                  {availableTimeSlots && availableTimeSlots.length > 0 ? availableTimeSlots.map(slot => (
                    <SelectItem key={slot} value={slot} className="hover:bg-primary/20 focus:bg-primary/30">
                      {slot}
                    </SelectItem>
                  )) : (
                    <SelectItem value="no-slots" disabled className="text-muted-foreground">
                      {!date || isDateInvalidForTimeSelection ? "Selecione uma data válida" : "Nenhum horário disponível"}
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {timeError && <p className="text-destructive text-sm mt-1">{timeError}</p>}
          </div>
        </div>
      );
    };

    export default DateTimeSelector;