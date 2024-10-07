import { useState, useEffect } from 'react';

// Define the User interface once to avoid duplication
export interface User {
  id: number;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  emailAddresses?: { emailAddress: string }[];
}

// Hook for fetching user data
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call or authentication check
    setTimeout(() => {
      setUser({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        emailAddresses: [{ emailAddress: 'john.doe@example.com' }],
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  return { user, isLoading };
}

// Authentication function
export const authenticateUser = (
  email: string,
  password: string
): User | null => {
  // Dummy authentication logic
  if (email === 'user@example.com' && password === 'password') {
    return {
      id: 1,
      name: 'John Doe',
      email,
      firstName: 'John',
      lastName: 'Doe',
    };
  }
  return null;
};