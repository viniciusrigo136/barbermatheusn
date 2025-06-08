<<<<<<< HEAD

    import React from 'react';
=======
import React from 'react';
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
    import { cn } from '@/lib/utils';

    const Card = React.forwardRef(({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
        {...props} />
    ))
    Card.displayName = "Card"

    const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props} />
    ))
    CardHeader.displayName = "CardHeader"

    const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
      <h3
        ref={ref}
        className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
        {...props} />
    ))
    CardTitle.displayName = "CardTitle"

    const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
      <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props} />
    ))
    CardDescription.displayName = "CardDescription"

    const CardContent = React.forwardRef(({ className, ...props }, ref) => (
      <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
    ))
    CardContent.displayName = "CardContent"

    const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0', className)}
        {...props} />
    ))
    CardFooter.displayName = "CardFooter"

<<<<<<< HEAD
    export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
  
=======
    export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
