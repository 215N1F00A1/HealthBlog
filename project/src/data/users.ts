import { User } from '../types';

// Mock users for demonstration
export const users: User[] = [
  {
    id: '1',
    name: 'Dr. John Smith',
    email: 'john.smith@example.com',
    role: 'doctor',
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'doctor',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    role: 'patient',
  },
];

// Current logged in user (for demo purposes)
export const currentUser: User = users[0];