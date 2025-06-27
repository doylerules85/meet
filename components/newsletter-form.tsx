'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signUpForNewsletter } from '@/lib/actions';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setIsLoading(true);

    try {
      const result = await signUpForNewsletter(email);

      if (result.success) {
        toast.success('Successfully subscribed to newsletter!', {
          position: 'bottom-center',
        });
        setEmail(''); // Clear the form
      } else {
        toast.error(result.error || 'Failed to subscribe');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-1.5">
        <Input
          type="email"
          placeholder="Your email address"
          className="bg-background flex-1 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="hover:bg-background"
          disabled={isLoading || !email}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
    </form>
  );
};

export default Newsletter;
