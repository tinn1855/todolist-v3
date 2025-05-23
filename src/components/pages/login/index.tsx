import { FormLogin } from '@/components/features/form-login';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Login() {
  return (
    <div className="container mx-auto px-5 max-w-xl justify-center py-10 items-center">
      <div className="w-full px-20 shadow-md py-10 border">
        <h2 className="font-bold text-center text-2xl">Login</h2>
        <FormLogin />
        <div className="py-3">
          <Link to="/signup">
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </Link>
        </div>
        <div className="text-center font-medium">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}
