"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { LeadCaptureModal } from "./LeadCaptureModal";

export function WaitlistForm() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          trackEvent({ event: "lead_form_open", source: "waitlist" });
          setShowModal(true);
        }}
        className="inline-flex items-center gap-2 px-6 py-3 bg-khoros-cyan text-white font-medium rounded-full hover:bg-khoros-cyan-dark transition-colors"
      >
        Entrar na lista de espera
      </button>

      <LeadCaptureModal
        open={showModal}
        onClose={() => setShowModal(false)}
        source="waitlist"
      />
    </>
  );
}
