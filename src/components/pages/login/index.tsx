import { FormLogin } from '@/components/features/form-login';

export function Login() {
  return (
    <div className="container mx-auto px-5 max-w-xl justify-center py-10 items-center">
      <div className="w-full shadow-md py-10">
        <h2 className="font-bold text-center text-2xl">Login</h2>
        <FormLogin />;
      </div>
    </div>
  );
}
