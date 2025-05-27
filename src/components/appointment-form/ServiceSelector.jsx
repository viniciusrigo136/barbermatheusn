import React from 'react';
    import { Checkbox } from '@/components/ui/checkbox';
    import { Label } from '@/components/ui/label';

    const ServiceSelector = ({ services, selectedServices, onServiceChange, error, disabled }) => {
      return (
        <div>
          <Label className="text-foreground mb-2 block">Serviços</Label>
          <div className="space-y-2">
            {services.map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`service-${service.id}`}
                  checked={selectedServices.includes(service.id)}
                  onCheckedChange={() => onServiceChange(service.id)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-primary/50"
                  disabled={disabled}
                />
                <Label htmlFor={`service-${service.id}`} className={`text-foreground font-normal ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}>
                  {service.title} - R$ {service.price.toFixed(2).replace('.', ',')}
                </Label>
              </div>
            ))}
          </div>
          {error && <p className="text-destructive text-sm mt-1">{error}</p>}
        </div>
      );
    };

    export default ServiceSelector;