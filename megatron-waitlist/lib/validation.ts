import { z } from 'zod';

// Waitlist form validation schema
export const waitlistSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    name: z.string().min(2, 'Name must be at least 2 characters').optional().or(z.literal('')),
    // Honeypot field - should be empty
    website: z.string().max(0).optional(),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;
