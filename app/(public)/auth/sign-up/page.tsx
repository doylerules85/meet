import { SignUpForm } from '@/components/sign-up-form';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative">
      <Image
        src="/images/supplies.jpg"
        alt="Teach Teach Logo"
        fill={true}
        priority={true}
        className="object-cover absolute inset-0 z-0"
      />
      <div className="w-full max-w-sm z-10">
        <SignUpForm />
      </div>
    </div>
  );
}
