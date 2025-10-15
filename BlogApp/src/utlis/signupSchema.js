import DOMPurify from 'dompurify';
import { z } from 'zod';

const passwordValidate = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .max(64, 'Password must be at most 64 characters long')
  .regex(/[A-Z]/, 'Add at least one uppercase letter')
  .regex(/[a-z]/, 'Add at least one lowercase letter')
  .regex(/\d/, 'Add at least one number')
  .regex(/[^A-Za-z0-9]/, 'Add at least one special character');

const sanitizedName = z
  .string()
  .trim()
  .min(1, 'Name is required')
  .max(80, 'Name too long')
  .transform((value) => DOMPurify.sanitize(value, { ALLOWED_TAGS: [] }).replace(/\s+/g, ' '));

const normalizedEmail = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .email('Enter a valid email')
  .transform((value) => value.toLowerCase());

export const signUpSchema = z
  .object({
    name: sanitizedName,
    email: normalizedEmail,
    password: passwordValidate,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      });
    }
  });
