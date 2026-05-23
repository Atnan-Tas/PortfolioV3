import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

type Status = "idle" | "submitting" | "success";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initial: FormState = { name: "", email: "", subject: "", message: "" };

export const Contact = () => {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Votre nom est requis.";
    if (!form.email.trim()) {
      next.email = "Votre email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Email invalide.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = "Votre message doit faire au moins 10 caractères.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    // Simulated submission — replace with real API call.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setForm(initial);
    setTimeout(() => setStatus("idle"), 4000);
  };

  const fieldClass = (key: keyof FormState) =>
    `w-full bg-transparent border-b py-4 px-1 text-[#e1e1e1] placeholder:text-neutral-600 focus:outline-none transition-colors ${
      errors[key] ? "border-red-500" : "border-neutral-800 focus:border-white"
    }`;

  return (
    <section id="contact" className="bg-[#050505] text-[#e1e1e1] py-24 md:py-32 border-t border-neutral-900">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[0.95]"
              data-cursor-text="Coucou"
            >
              TRAVAILLONS<br />ENSEMBLE
            </motion.h2>
            <p className="text-neutral-400 font-light max-w-md mb-8 leading-relaxed">
              Un projet, une question, ou juste envie de discuter ? Envoyez-moi un message,
              je réponds sous 48 heures.
            </p>
            <a
              href="mailto:atnan.tas.pro@gmail.com"
              className="inline-flex items-center gap-3 text-base md:text-lg border-b border-white/30 pb-1 hover:border-white transition-colors group font-mono"
              data-cursor-text="Email"
            >
              atnan.tas.pro@gmail.com
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className={fieldClass("name")}
                  />
                  {errors.name && (
                    <span className="text-red-400 text-xs mt-2 block">{errors.name}</span>
                  )}
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="vous@exemple.com"
                    className={fieldClass("email")}
                  />
                  {errors.email && (
                    <span className="text-red-400 text-xs mt-2 block">{errors.email}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Projet, collaboration..."
                  className={fieldClass("subject")}
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-neutral-500 font-mono block mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Parlez-moi de votre projet..."
                  rows={5}
                  className={fieldClass("message") + " resize-none"}
                />
                {errors.message && (
                  <span className="text-red-400 text-xs mt-2 block">{errors.message}</span>
                )}
              </div>

              <div className="flex items-center gap-6 mt-4">
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#e1e1e1] text-[#050505] uppercase tracking-widest text-xs font-bold hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  data-cursor-sticky
                >
                  {status === "submitting"
                    ? "Envoi en cours..."
                    : status === "success"
                    ? "Message envoyé"
                    : "Envoyer le message"}
                  {status === "success" ? <Check size={16} /> : <ArrowRight size={16} />}
                </button>
                <AnimatePresence>
                  {status === "success" && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-neutral-400 font-mono"
                    >
                      Merci, je vous réponds très vite.
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
