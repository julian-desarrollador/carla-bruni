"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { BookingPicker } from "@/components/booking/booking-picker";
import {
  SALON_TREATMENT_OPTIONS,
  formatSalonDisplayDate,
  isLikelyWhatsappNumber,
} from "@/lib/booking/salon-availability";
import { findSalonTreatmentById } from "@/lib/treatments/catalog";

export function PanelNuevoTurnoClient() {
  const router = useRouter();
  const [selectedTreatmentId, setSelectedTreatmentId] = useState("");
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [serviceLimitHint, setServiceLimitHint] = useState<string | null>(null);
  const [treatmentFirstHintVisible, setTreatmentFirstHintVisible] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [panelNotes, setPanelNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remoteSlots, setRemoteSlots] = useState<string[] | null | undefined>(undefined);
  const bookingFocusRef = useRef<HTMLDivElement | null>(null);
  const dataSectionRef = useRef<HTMLElement | null>(null);

  const selectedServices = useMemo(
    () =>
      selectedServiceIds.flatMap((id) => {
        const found = SALON_TREATMENT_OPTIONS.find((o) => o.id === id);
        return found ? [found] : [];
      }),
    [selectedServiceIds],
  );
  const selectedServicesSummary = useMemo(
    () => selectedServices.map((s) => s.name).join(" + "),
    [selectedServices],
  );
  const totalSelectedDurationMinutes = useMemo(
    () =>
      selectedServiceIds.reduce((acc, id) => {
        const t = findSalonTreatmentById(id);
        return acc + (t?.durationMinutes ?? 0);
      }, 0),
    [selectedServiceIds],
  );
  const totalSelectedDurationLabel = useMemo(() => {
    const total = totalSelectedDurationMinutes;
    if (total <= 0) return "";
    const h = Math.floor(total / 60);
    const m = total % 60;
    if (h > 0 && m > 0) return `Duración ${h} h ${m} min`;
    if (h > 0) return `Duración ${h} h`;
    return `Duración ${m} min`;
  }, [totalSelectedDurationMinutes]);
  const primaryService = selectedServices[0];

  const hasSlot = Boolean(selectedServices.length > 0 && selectedDate && selectedTime);
  const datosComplete = Boolean(
    customerName.trim().length >= 2 &&
      isLikelyWhatsappNumber(customerPhone) &&
      whatsappOptIn,
  );
  const showWhatsappInvalidHint =
    customerPhone.trim().length >= 8 && !isLikelyWhatsappNumber(customerPhone);

  useEffect(() => {
    if (selectedServices.length > 0) setTreatmentFirstHintVisible(false);
  }, [selectedServices.length]);

  useEffect(() => {
    if (!treatmentFirstHintVisible) return;
    const t = window.setTimeout(() => setTreatmentFirstHintVisible(false), 4500);
    return () => window.clearTimeout(t);
  }, [treatmentFirstHintVisible]);

  useEffect(() => {
    if (!selectedDate || selectedServiceIds.length === 0) {
      setRemoteSlots(undefined);
      return;
    }
    let cancelled = false;
    setRemoteSlots(null);
    const q = new URLSearchParams({
      dateKey: selectedDate,
      treatmentId: selectedServiceIds[0] ?? "",
      serviceIds: selectedServiceIds.join(","),
      scope: "panel",
    });
    fetch(`/api/booking/slots?${q.toString()}`, { credentials: "same-origin" })
      .then((res) => res.json())
      .then((data: { slots?: string[] }) => {
        if (!cancelled) {
          setRemoteSlots(Array.isArray(data.slots) ? data.slots : []);
        }
      })
      .catch(() => {
        if (!cancelled) setRemoteSlots([]);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedDate, selectedServiceIds]);

  useEffect(() => {
    if (!selectedDate || !selectedTime || selectedServiceIds.length === 0) return;
    if (remoteSlots === undefined || remoteSlots === null) return;
    if (!remoteSlots.includes(selectedTime)) {
      setSelectedTime("");
    }
  }, [selectedDate, selectedTime, selectedServiceIds, remoteSlots]);

  useEffect(() => {
    if (!serviceLimitHint) return;
    const t = window.setTimeout(() => setServiceLimitHint(null), 3200);
    return () => window.clearTimeout(t);
  }, [serviceLimitHint]);

  useEffect(() => {
    if (!hasSlot || !selectedTime) return;
    const id = requestAnimationFrame(() => {
      dataSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(id);
  }, [hasSlot, selectedTime]);

  async function handleSubmit() {
    if (!primaryService || selectedServices.length === 0 || !selectedDate || !selectedTime || !datosComplete) {
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/panel/reservations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          treatmentId: primaryService.id,
          serviceIds: selectedServices.map((s) => s.id),
          dateKey: selectedDate,
          timeLocal: selectedTime,
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          whatsappOptIn,
          panelNotes: panelNotes.trim() || undefined,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; id?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? "No se pudo guardar el turno.");
        return;
      }
      if (data.ok && data.id) {
        router.push("/panel-turnos");
        router.refresh();
      }
    } catch {
      setError("Sin conexión o error de red. Probá de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white pb-28 text-gray-900">
      <div className="mx-auto max-w-md px-4 pt-6">
        <header className="mb-5 flex items-center gap-3">
          <Link
            href="/panel-turnos"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50"
            aria-label="Volver al panel"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.85} />
          </Link>
          <div>
            <h1 className="font-heading text-[22px] leading-tight text-[#B88E2F]">Nuevo turno</h1>
            <p className="mt-0.5 text-[12px] text-gray-500">Alta manual · sin pago</p>
          </div>
        </header>

        <BookingPicker
          bookingContext="panel"
          selectedTreatmentId={selectedTreatmentId}
          onTreatmentIdChange={setSelectedTreatmentId}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          selectedTime={selectedTime}
          onTimeChange={setSelectedTime}
          remoteTimeSlots={
            selectedDate && selectedServiceIds.length > 0 ? (remoteSlots ?? null) : undefined
          }
          bookingFocusRef={bookingFocusRef}
          treatmentFirstHintVisible={treatmentFirstHintVisible}
          onTreatmentFirstHintVisible={setTreatmentFirstHintVisible}
          selectedCountLabel={
            selectedServices.length > 0
              ? `${selectedServices.length} servicio${selectedServices.length === 1 ? "" : "s"} seleccionado${
                  selectedServices.length === 1 ? "" : "s"
                }`
              : undefined
          }
          selectedDurationLabel={selectedServices.length > 0 ? totalSelectedDurationLabel : undefined}
          summaryTitle={selectedServices.length > 0 ? selectedServicesSummary : undefined}
          monthAvailabilityServiceIds={selectedServiceIds}
          multiSelect
          selectedTreatmentIds={selectedServiceIds}
          onToggleTreatmentId={(id) => {
            setSelectedServiceIds((prev) => {
              if (prev.includes(id)) return prev.filter((x) => x !== id);
              if (prev.length >= 4) {
                setServiceLimitHint("Máximo 4 tratamientos por turno.");
                return prev;
              }
              return [...prev, id];
            });
            setSelectedTime("");
          }}
          onClearTreatmentIds={() => {
            setSelectedServiceIds([]);
            setSelectedTreatmentId("");
            setSelectedTime("");
          }}
          comboHintText="Podés elegir hasta 4 tratamientos en un mismo turno (según disponibilidad de agenda)."
          comboDurationLabel={totalSelectedDurationLabel}
          comboAlertText={serviceLimitHint}
        />

        {hasSlot && (
          <section
            ref={dataSectionRef}
            className="mt-6 scroll-mt-6 space-y-4 rounded-2xl border border-gray-100 bg-white px-4 py-4"
          >
            <div>
              <p className="text-[11px] tracking-[0.14em] text-gray-500">Datos del cliente</p>
              <p className="mt-1 text-[12px] text-gray-500">
                Turno el {formatSalonDisplayDate(selectedDate)} a las {selectedTime}
              </p>
              <p className="mt-1 text-[12px] text-[#B88E2F]/90">{selectedServicesSummary}</p>
            </div>
            <div className="space-y-3">
              <div>
                <label htmlFor="pn-customerName" className="text-[11px] tracking-[0.12em] text-gray-500">
                  Nombre y apellido
                </label>
                <input
                  id="pn-customerName"
                  name="customerName"
                  autoComplete="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-[15px] text-gray-900 outline-none placeholder:text-gray-900/35 focus:border-[#B88E2F]/50"
                />
              </div>
              <div>
                <label htmlFor="pn-customerPhone" className="text-[11px] tracking-[0.12em] text-gray-500">
                  WhatsApp
                </label>
                <input
                  id="pn-customerPhone"
                  name="customerPhone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Ej: +54 9 11 2345-6789"
                  aria-invalid={showWhatsappInvalidHint}
                  className={`mt-1.5 w-full rounded-xl border bg-white px-3 py-3 text-[15px] text-gray-900 outline-none placeholder:text-gray-900/35 focus:border-[#B88E2F]/50 ${
                    showWhatsappInvalidHint ? "border-amber-500/45" : "border-gray-200"
                  }`}
                />
                {showWhatsappInvalidHint ? (
                  <p className="mt-1 text-[11px] text-amber-800">Revisá el número (10–15 dígitos).</p>
                ) : null}
              </div>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3">
                <input
                  type="checkbox"
                  checked={whatsappOptIn}
                  onChange={(e) => setWhatsappOptIn(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-gray-200 accent-[var(--premium-gold)]"
                />
                <span className="text-[12px] leading-snug text-gray-600">
                  Recordatorios por WhatsApp
                </span>
              </label>
              <div>
                <label htmlFor="pn-notes" className="text-[11px] tracking-[0.12em] text-gray-500">
                  Notas internas (opcional)
                </label>
                <textarea
                  id="pn-notes"
                  name="panelNotes"
                  rows={3}
                  value={panelNotes}
                  onChange={(e) => setPanelNotes(e.target.value)}
                  placeholder="Solo visible en el sistema…"
                  className="mt-1.5 w-full resize-none rounded-xl border border-gray-200 bg-white px-3 py-3 text-[14px] text-gray-900 outline-none placeholder:text-gray-900/35 focus:border-[#B88E2F]/50"
                />
              </div>
            </div>

            {error ? (
              <p
                role="alert"
                className="rounded-xl border border-red-500/35 bg-red-50 px-3 py-2.5 text-center text-[12px] text-red-700"
              >
                {error}
              </p>
            ) : null}

            <button
              type="button"
              disabled={!datosComplete || submitting}
              onClick={() => void handleSubmit()}
              className={`flex h-[50px] w-full items-center justify-center rounded-xl text-[15px] font-semibold transition-all ${
                datosComplete && !submitting
                  ? "cursor-pointer bg-[#B88E2F] text-white shadow-md"
                  : "cursor-not-allowed bg-gray-200 text-gray-400"
              }`}
            >
              {submitting ? "Guardando…" : "Confirmar turno"}
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
