"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xzzdbrze", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setErrorMessage(data?.error || "Failed to deliver transmission. Try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Try again.");
    }
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
          <button type="submit" className="button" disabled={status === "sending"}>
            <span>{status === "sending" ? "[transmitting...]" : "[transmit message]"}</span>
          </button>
          {status === "success" && <span style={{ color: "var(--ink)" }}>[message sent successfully]</span>}
          {status === "error" && <span style={{ color: "var(--muted)" }}>[{errorMessage}]</span>}
        </div>
      </form>
    </div>
  );
}
