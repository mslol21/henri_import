'use client';

import React, { useState, useEffect } from 'react';
import {
  Share2,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  Lock,
  X,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

interface WholesaleShareModalProps {
  variant?: 'sidebar' | 'button' | 'card';
}

export default function WholesaleShareModal({ variant = 'button' }: WholesaleShareModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [wholesalePassword, setWholesalePassword] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  // Determine current origin or default
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const atacadoUrl = `${origin}/atacado`;

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setWholesalePassword(data.wholesalePassword || null);
      }
    } catch (err) {
      console.error('Erro ao buscar configurações de atacado', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchConfig();
    }
  }, [isOpen]);

  const shareMessage = `Olá! 📦✨
Acesse o nosso *Portal do Atacado Henri Imports* pelo link:
${atacadoUrl}

${
  wholesalePassword
    ? `🔑 *Código de Acesso:* \`${wholesalePassword}\``
    : `⚠️ *Atenção:* Defina a senha do atacado no painel administrativo.`
}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(atacadoUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleCopyPassword = () => {
    if (wholesalePassword) {
      navigator.clipboard.writeText(wholesalePassword);
      setCopiedPassword(true);
      setTimeout(() => setCopiedPassword(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(shareMessage);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <>
      {/* Trigger Button Variants */}
      {variant === 'sidebar' && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-purple-950/70 border border-purple-800/50 text-purple-200 text-xs font-bold hover:bg-purple-900/80 transition-all group shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1 rounded-lg bg-purple-600/30 text-purple-300 group-hover:scale-110 transition-transform">
              <Share2 className="h-3.5 w-3.5" />
            </div>
            <span>Compartilhar Atacado</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-extrabold uppercase border border-purple-500/30">
            B2B
          </span>
        </button>
      )}

      {variant === 'button' && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Share2 className="h-4 w-4" />
          <span>Compartilhar Link do Atacado</span>
        </button>
      )}

      {variant === 'card' && (
        <div className="bg-gradient-to-br from-purple-900 via-slate-900 to-slate-950 p-6 rounded-3xl border border-purple-700/40 text-white shadow-xl relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Lock className="w-32 h-32 text-purple-400" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-600/40">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                  Link Direto do Atacado
                </h3>
                <p className="text-xs text-purple-200/70">
                  Envie para revendedores com 1 clique
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Opções de Envio</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
            <div className="flex-1 bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-mono text-purple-300 truncate">
              {atacadoUrl}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copiado!' : 'Copiar Link'}</span>
              </button>
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center shadow-inner">
                  <Share2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white tracking-tight">
                    Compartilhar Portal do Atacado
                  </h3>
                  <p className="text-xs text-slate-400">
                    Facilidade para enviar aos seus clientes B2B
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Status Warning if password is not configured */}
              {!loading && !wholesalePassword && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-300 text-xs flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">Aviso: Senha do Atacado não configurada</p>
                    <p className="text-amber-200/80">
                      O ambiente de atacado estará indisponível para os clientes até que você defina uma senha nas configurações da loja.
                    </p>
                    <a
                      href="/admin/settings"
                      className="inline-block pt-1 font-extrabold underline text-amber-400 hover:text-amber-300"
                    >
                      Configurar Senha Agora &rarr;
                    </a>
                  </div>
                </div>
              )}

              {/* 1. Link do Atacado */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Link Direto do Atacado
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={atacadoUrl}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs font-mono text-purple-300 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-4 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-lg shadow-purple-600/20"
                  >
                    {copiedLink ? <Check className="h-4 w-4 text-green-300" /> : <Copy className="h-4 w-4" />}
                    <span>{copiedLink ? 'Copiado!' : 'Copiar Link'}</span>
                  </button>
                </div>
              </div>

              {/* 2. Senha de Acesso Exclusiva */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Código / Senha de Acesso Atacado
                </label>
                <div className="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-800 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-purple-400" />
                    <span className="text-xs font-mono font-bold text-white">
                      {wholesalePassword ? wholesalePassword : 'Nenhuma senha definida'}
                    </span>
                  </div>
                  {wholesalePassword && (
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                      {copiedPassword ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedPassword ? 'Copiado!' : 'Copiar Senha'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 3. Mensagem Pronta para Envio */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Mensagem Pronta para Envio
                </label>
                <div className="relative">
                  <textarea
                    readOnly
                    rows={4}
                    value={shareMessage}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-300 font-mono resize-none focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="absolute top-2 right-2 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-200 transition-colors flex items-center gap-1 border border-slate-700"
                  >
                    {copiedText ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedText ? 'Copiado!' : 'Copiar Texto'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-slate-800 bg-slate-950/50 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 px-4 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all text-xs"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Enviar pelo WhatsApp</span>
              </button>

              <a
                href="/atacado"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 px-4 rounded-2xl border border-slate-700 transition-all text-xs"
              >
                <span>Testar Link</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
