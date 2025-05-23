import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { forgotPassword } from '../../services/userService';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      const errorMsg = 'Please enter your email address';
      toast.error(errorMsg);
      setMessage(errorMsg);
      setMessageType('error');
      return;
    }

    setLoading(true); 

    try {
      const result = await forgotPassword(email);
      if (result.success) {
        toast.success(`Password reset link sent to ${email}`);
        setMessage(`Password reset link sent to ${email}`);
        setMessageType('success');
      } else {
        const errorMsg = result.error?.message || 'Failed to send reset email';
        toast.error(errorMsg);
        setMessage(errorMsg);
        setMessageType('error');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      setMessage('Something went wrong. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Enter your email to reset password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Inline message */}
              {message && (
                <p
                  className={`mt-2 text-sm ${
                    messageType === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>

          <div className="flex space-x-3">
            <Link
              to="/login"
              className="w-1/2 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
