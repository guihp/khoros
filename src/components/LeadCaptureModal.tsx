"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface LeadCaptureModalProps {
  open: boolean;
  onClose: () => void;
  articleSlug?: string;
  articleCategory?: string;
  articleTitle?: string;
  source?: string;
}

export function LeadCaptureModal({
  open,
  onClose,
  articleSlug,
  articleCategory,
  articleTitle,
  source = "article",
}: LeadCaptureModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrorMsg("É necessário aceitar o consentimento para continuar.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    trackEvent({
      event: "lead_form_submit",
      articleSlug,
      articleCategory,
      articleTitle,
      city,
      source,
    });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          city,
          consent,
          article_slug: articleSlug,
          article_category: articleCategory,
          article_title: articleTitle,
          source,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao enviar");
      }

      setStatus("success");
      trackEvent({
        event: "lead_form_success",
        articleSlug,
        articleCategory,
        city,
        source,
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.");
      trackEvent({
        event: "lead_form_error",
        articleSlug,
        articleCategory,
        source,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      <div className="bg-card rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-khoros-slate hover:text-foreground text-xl leading-none"
          aria-label="Fechar"
        >
          ×
        </button>

        {status === "success" ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-khoros-mint flex items-center justify-center">
              <svg className="w-6 h-6 text-khoros-cyan-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Obrigado(a)!</h2>
            <p className="text-khoros-slate">
              Você entrou na lista de espera. Avisaremos quando houver um especialista
              disponível na sua cidade.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-khoros-cyan text-white rounded-full hover:bg-khoros-cyan-dark transition-colors"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <h2 id="lead-modal-title" className="text-xl font-semibold mb-2 pr-8">
              Quer ser avisado(a) quando houver um especialista disponível na sua cidade na KHOROS?
            </h2>
            <p className="text-sm text-khoros-slate mb-6">
              Sem pressão, sem venda. Apenas um aviso quando a plataforma estiver disponível na sua região.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="lead-name" className="block text-sm font-medium mb-1">
                  Nome
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-khoros-cyan"
                />
              </div>

              <div>
                <label htmlFor="lead-email" className="block text-sm font-medium mb-1">
                  E-mail
                </label>
                <input
                  id="lead-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-khoros-cyan"
                />
              </div>

              <div>
                <label htmlFor="lead-city" className="block text-sm font-medium mb-1">
                  Cidade
                </label>
                <input
                  id="lead-city"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex.: São Paulo"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-khoros-cyan"
                />
              </div>

              <label className="flex items-start gap-3 text-sm text-khoros-slate cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 rounded border-border"
                  required
                />
                <span>
                  Concordo com o tratamento dos meus dados conforme a{" "}
                  <a href="/politicas/privacidade" className="text-khoros-cyan-dark underline" target="_blank">
                    Política de Privacidade
                  </a>{" "}
                  (LGPD).
                </span>
              </label>

              {errorMsg && (
                <p className="text-sm text-red-600" role="alert">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 bg-khoros-cyan text-white font-medium rounded-full hover:bg-khoros-cyan-dark transition-colors disabled:opacity-60"
              >
                {status === "loading" ? "Enviando..." : "Entrar na lista de espera"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
