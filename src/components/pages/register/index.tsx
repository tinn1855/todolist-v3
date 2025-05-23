import { FormCreateAccount } from '@/components/features/form-create-account';
import { Link } from 'react-router-dom';

export function Register() {
  return (
    <div className="container mx-auto px-5 max-w-xl justify-center py-10 items-center">
      <div className="w-full px-20 shadow-md py-10 border">
        <h2 className="font-bold text-center text-2xl">Create An Account</h2>
        <div className="py-3">
          <FormCreateAccount />
        </div>
        <div className="font-medium text-center ">
          <Link to="/login" className="hover:border-b border-black">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
