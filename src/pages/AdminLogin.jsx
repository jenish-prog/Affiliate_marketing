import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === (import.meta.env.VITE_ADMIN_PASSWORD || 'admin')) {
      sessionStorage.setItem('admin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Wrong password');
      toast.error('Wrong password');
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Dots Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}
      ></div>

      <div className="bg-surface rounded-card shadow-2xl p-8 max-w-sm w-full z-10 border border-border/10">
        <div className="text-center mb-10">
          <div className="font-heading text-4xl font-extrabold tracking-tight text-secondary inline-block mb-3">
            Deal<span className="text-primary">Hub</span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-gray-800">Admin Access</h2>
          <p className="text-gray-500 mt-2 font-medium">Enter password to manage products</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter admin password"
                className={`w-full px-5 py-4 rounded-xl border-2 transition-all font-medium text-secondary focus:outline-none placeholder-gray-400 ${
                  error ? 'border-red-400 focus:border-red-500 bg-red-50/50' : 'border-border focus:border-primary bg-gray-50/50 focus:bg-white'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-3 font-semibold mx-1">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-4 text-lg mt-4 uppercase tracking-widest hover:shadow-[0_8px_30px_rgba(255,107,53,0.3)] transition-all transform hover:-translate-y-1"
          >
            Login →
          </button>
        </form>
      </div>
    </div>
  );
}
