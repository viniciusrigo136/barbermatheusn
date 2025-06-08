import React from 'react';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';

    const FormField = ({ id, name, label, type = 'text', value, onChange, error, placeholder, disabled }) => {
      return (
        <div>
          <Label htmlFor={id} className="text-foreground">{label}</Label>
          <Input 
            type={type} 
            id={id} 
            name={name} 
            value={value} 
            onChange={onChange} 
            className={`mt-1 bg-background border-primary/30 focus:ring-primary text-foreground ${error ? 'border-destructive ring-destructive' : ''}`}
            placeholder={placeholder}
            disabled={disabled}
          />
          {error && <p className="text-destructive text-sm mt-1">{error}</p>}
        </div>
      );
    };

    export default FormField;