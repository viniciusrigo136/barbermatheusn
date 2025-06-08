<<<<<<< HEAD

    import React from 'react';
=======
import React from 'react';
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
    import * as LabelPrimitive from '@radix-ui/react-label';
    import { cva } from 'class-variance-authority';
    import { cn } from '@/lib/utils';

    const labelVariants = cva(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
    )

    const Label = React.forwardRef(({ className, ...props }, ref) => (
      <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants(), className)}
        {...props} />
    ))
    Label.displayName = LabelPrimitive.Root.displayName

<<<<<<< HEAD
    export { Label }
  
=======
    export { Label }
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
