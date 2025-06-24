'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export async function registerUser(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields.' };
  }

  const { name, email, password } = validatedFields.data;

  await dbConnect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return { error: 'An account with this email already exists.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return { success: 'User registered successfully!' };
  } catch (error) {
    console.error('User registration error:', error);
    return { error: 'Failed to register user. Please try again.' };
  }
}
