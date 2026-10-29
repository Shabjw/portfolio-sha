"use client";

import { ArrowUpRight, Check, Copy, FileText, Linkedin, Plane, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { portfolioData } from "@/data/portfolioData";
import { trackEvent } from "@/lib/analytics";
import styles from "./ContactNote.module.css";

export function ContactSection() {
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const sending = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    sending.current = true;
    setFormState("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("https://formspree.io/f/mqppqgyq", {
        method: "POST", body: data, headers: { Accept: "application/json" }, signal: controller.signal
      });
      if (!response.ok) throw new Error("Message not accepted");
      setFormState("success");
      form.reset();
    } catch {
      setFormState("error");
    } finally {
      clearTimeout(timeout);
      sending.current = false;
    }
  }

  async function copyEmail() {
    let success = false;
    try {
      await navigator.clipboard.writeText(portfolioData.person.email);
      success = true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = portfolioData.person.email;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      try { textarea.select(); success = document.execCommand("copy"); }
      catch { success = false; }
      finally { textarea.remove(); }
    }
    if (timer.current) clearTimeout(timer.current);
    setMessage(success ? "Email copied" : "Could not copy. You can select the address above.");
    if (success) trackEvent("email_copy_click", "contact");
    timer.current = setTimeout(() => setMessage(""), success ? 2000 : 5000);
  }

  return <section id="contact" className={styles.section} aria-labelledby="contact-heading">
    <div className="section-shell">
      <div className={styles.note}>
        <div className={styles.main}>
          <p className={styles.eyebrow}>A conversation starts here</p>
          <h2 id="contact-heading">Let&apos;s make<br /><em>something clearer.</em></h2>
          <p className={styles.intro}>A role, a project, or a problem your team is figuring out. I&apos;d love to hear about it.</p>
          <form className={styles.form} action="https://formspree.io/f/mqppqgyq" method="POST" onSubmit={submitMessage} aria-busy={formState === "sending"}>
            <div className={styles.formRow}>
              <label htmlFor="contact-name">Your name<input id="contact-name" name="name" autoComplete="name" required maxLength={100} /></label>
              <label htmlFor="contact-email">Your email<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
            </div>
            <label htmlFor="contact-message">A few words<textarea id="contact-message" name="message" rows={4} required maxLength={5000} /></label>
            <input type="hidden" name="_subject" value="A message from Shana's portfolio" />
            <div className={styles.honeypot} aria-hidden="true"><label>Leave this empty<input name="_gotcha" tabIndex={-1} autoComplete="off" /></label></div>
            <button className={styles.send} type="submit" disabled={formState === "sending"}><Send size={16} aria-hidden="true" />{formState === "sending" ? "Sending..." : "Send a message"}</button>
            <p className={styles.formStatus} role="status">{formState === "success" ? "Thank you! Your message has been sent." : formState === "error" ? "Your message could not be sent. Please try again or contact me by email. Your text is still here." : ""}</p>
          </form>
        </div>
        <aside className={styles.address} aria-label="Location and opportunities">
          <div className={styles.stamp}><Plane size={30} strokeWidth={1.4} aria-hidden="true" /><span>PARIS<strong>OPEN INTERNATIONALLY</strong></span></div>
          <dl>
            <div><dt>Based in</dt><dd>Paris, France</dd></div>
            <div><dt>Interested in</dt><dd>Business Analysis · Data Analytics · Product</dd></div>
            <div><dt>Open to</dt><dd>Europe · Asia · Canada · Morocco</dd></div>
            <div><dt>Languages</dt><dd>French · English · Spanish · Italian · Hindi</dd></div>
          </dl>
          <div className={styles.links}>
            <a className={styles.email} href={`mailto:${portfolioData.person.email}`}>{portfolioData.person.email}<ArrowUpRight size={14} aria-hidden="true" /></a>
            <a href={portfolioData.person.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("linkedin_click", "contact")}><Linkedin size={17} aria-hidden="true" />LinkedIn<ArrowUpRight size={14} aria-hidden="true" /></a>
            <a href={portfolioData.person.cv} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("cv_download_click", "contact")}><FileText size={17} aria-hidden="true" />Read my CV<ArrowUpRight size={14} aria-hidden="true" /></a>
            <button type="button" onClick={copyEmail}>{message === "Email copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}Copy email</button>
          </div>
          <p className={styles.feedback} role="status">{message}</p>
        </aside>
      </div>
    </div>
  </section>;
}
