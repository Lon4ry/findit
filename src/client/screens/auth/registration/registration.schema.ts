import { z } from 'zod';

export const registrationSchema = z.object({
  user: z.object({
    username: z
      .string()
      .min(3, 'Слишком короткое имя')
      .max(15, 'Слишком длинное имя')
      .transform((field) => field.toLowerCase())
      .refine((field) => !/\s/.test(field), 'Пробелы недопускаются')
      .refine(
        (field) => !/[^a-zA-Z0-9_\-\s]/.test(field),
        'Специальные символы недопускаются',
      ),

    email: z.string().email('Это не похоже на адрес электронной почты'),

    password: z
      .string()
      .min(8, 'Слишком короткий пароль')
      .max(32, 'Слишком длинный пароль')
      .refine(
        (field) => /[a-zA-Z0-9_\-\s]/.test(field),
        'Используйте только латинские буквы',
      )
      .refine(
        (field) => /[!@#$%^&*()\-+=]/.test(field),
        'Используйте хотя бы один специальный символ',
      ),
  }),

  profile: z.object({
    name: z
      .string()
      .refine(
        (field) => !/[^a-zA-ZА-Яа-я0-9_\-\s]/.test(field),
        'Специальные символы не допускаются',
      )
      .refine(
        (field) => field.split(' ').length === 2,
        'Укажите имя и фамилию',
      ),

    skills: z.object({
      Backend: z.number(),
      Frontend: z.number(),
      MachineLearning: z.number(),
      DevOps: z.number(),
      QA: z.number(),
    }),
    gender: z.enum(['Male', 'Female']),
  }),
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;
