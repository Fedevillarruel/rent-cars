'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Eye, EyeOff, AlertCircle, Car } from 'lucide-react';
import { loginAdmin } from '@/lib/storage';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = loginAdmin(password);
    setLoading(false);
    if (ok) {
      router.push('/admin');
    } else {
      setError('Contraseña incorrecta. Hint: admin2024');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[rgba(200,169,110,0.1)] border border-[rgba(200,169,110,0.2)] flex items-center justify-center mx-auto mb-5">
            <Shield className="w-7 h-7 text-[var(--primary)]" />
          </div>
          <h1 className="text-white text-2xl font-black mb-2">Panel de Administración</h1>
          <p className="text-gray-500 text-sm">MiamiDrive · Acceso restringido</p>
        </div>

        <div className="glass rounded-2xl p-6 border border-[rgba(200,169,110,0.1)]">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Contraseña de administrador</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Ingresá la contraseña"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[var(--primary)] transition-colors"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-900/20 border border-red-800/40 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="btn-primary w-full py-3.5 rounded-xl font-semibold disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#07070d]/30 border-t-[#07070d] rounded-full animate-spin" />
                  Verificando...
                </>
              ) : 'Ingresar al panel'}
            </button>
          </form>

          <div className="mt-4 p-3 rounded-xl bg-[rgba(200,169,110,0.05)] border border-[rgba(200,169,110,0.1)] text-center">
            <p className="text-gray-600 text-xs">Demo: contraseña <code className="text-[var(--primary)] font-mono font-bold">admin2024</code></p>
          </div>
        </div>

        <p className="text-center mt-6 text-gray-600 text-xs">
          <a href="/" className="hover:text-gray-400 transition-colors">← Volver al sitio</a>
        </p>
      </div>
    </div>
  );
}
