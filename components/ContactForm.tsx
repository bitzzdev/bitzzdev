"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const message = (formData.get("message") as string)?.trim() || "";

    const subject = encodeURIComponent(`Project Inquiry from ${name}`);
    const bodyContent = encodeURIComponent(
      `Hi Dev,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}`
    );

    const mailtoUrl = `mailto:bitzzdev@gmail.com?subject=${subject}&body=${bodyContent}`;

    window.location.href = mailtoUrl;
    setStatus("success");
  };

  return (
    <div className="snippet" style={{ maxWidth: "68ch" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", color: "var(--muted)", fontSize: "0.75rem", marginBottom: "0.25rem" }}>
            $ name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Ada Lovelace"
            required
            style={{
              width: "100%",
              background: "transparent",
              border: 0,
              borderBottom: "1px dotted var(--muted)",
              color: "var(--ink)",
              fontFamily: "inherit",
              padding: "0.3rem 0",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", color: "var(--muted)", fontSize: "0.75rem", marginBottom: "0.25rem" }}>
            $ email
          </label>
          <input
            type="email"
            name="email"
            placeholder="ada@domain.io"
            required
            style={{
              width: "100%",
              background: "transparent",
              border: 0,
              borderBottom: "1px dotted var(--muted)",
              color: "var(--ink)",
              fontFamily: "inherit",
              padding: "0.3rem 0",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", color: "var(--muted)", fontSize: "0.75rem", marginBottom: "0.25rem" }}>
            $ message
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder="Describe your project, timeline, or inquiry..."
            required
            style={{
              width: "100%",
              background: "transparent",
              border: "1px dotted var(--muted)",
              color: "var(--ink)",
              fontFamily: "inherit",
              padding: "0.5rem",
              outline: "none",
              resize: "vertical",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.5rem" }}>
          <button type="submit" className="button">
            <span>[transmit message]</span>
          </button>
          {status === "success" && <span style={{ color: "var(--ink)" }}>[opening email client...]</span>}
        </div>
      </form>
    </div>
  );
}
