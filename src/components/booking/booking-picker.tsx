"use client";

import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import type { TreatmentCategory } from "@/lib/treatments/catalog";
import {
  SALON_TREATMENT_CATEGORIES,
  SALON_TREATMENT_OPTIONS,
  buildSalonCalendarItems,
  formatSalonDisplayDate,
  getAvailableTimesForDate,
  salonMonthNames,
  salonWeekdayLabels,
} from "@/lib/booking/salon-availability";
import { isArgentinaPublicHoliday } from "@/lib/booking/argentina-holidays";

export type BookingPickerProps = {
  selectedTreatmentId: string;
  onTreatmentIdChange: (id: string) => void;
  selectedDate: string;
  onDateChange: (dateKey: string) => void;
  selectedTime: string;
  onTimeChange: (time: string) => void;
  /** Si se pasa, define qué horarios mostrar (ej. reserva pública con margen de 60 min en “hoy”). */
  resolveTimeSlots?: (dateKey: string) => string[];
  /**
   * Horarios ya resueltos en servidor (solapes, reglas). Solo aplica al `selectedDate` actual.
   * `undefined`: usar `resolveTimeSlots` / plantilla. `null`: cargando.
   */
  remoteTimeSlots?: string[] | null;
  /** `public`: reglas y textos de reserva web. `panel`: alta manual sin tope de “desde mañana”. */
  bookingContext?: "public" | "panel";
  bookingFocusRef?: React.RefObject<HTMLDivElement | null>;
  treatmentFirstHintVisible: boolean;
  onTreatmentFirstHintVisible: (visible: boolean) => void;
  selectedCountLabel?: string;
  selectedDurationLabel?: string;
  summaryTitle?: string;
  monthAvailabilityServiceIds?: string[];
  multiSelect?: boolean;
  selectedTreatmentIds?: string[];
  onToggleTreatmentId?: (id: string) => void;
  onClearTreatmentIds?: () => void;
  comboHintText?: string;
  comboDurationLabel?: string;
  comboAlertText?: string | null;
  /** Si es `false`, solo se muestra el selector de servicio (mismo modal que turnos), sin calendario ni horarios. */
  showDateAndTimePickers?: boolean;
  /** Texto sobre el título del paso de servicio (por defecto "Paso 1"). */
  treatmentStepOverline?: string;
  /**
   * Cada vez que cambia (p. ej. contador incrementado), abre el modal de tratamientos.
   * Útil para enlazar la apertura con otra UI (ej. elegir “solo algunos tratamientos”).
   */
  openTreatmentModalRequestId?: number;
  /** Oculta el botón principal de servicio (p. ej. bloqueo de agenda con apertura externa). */
  hideTreatmentTriggerButton?: boolean;
  /** Estética del sheet modal de tratamientos: `panel` alinea con el panel de bloqueo. */
  treatmentModalVariant?: "booking" | "panel";
  /** Solo renderiza calendario u horarios (flujo wizard pantalla completa, estética clara). */
  wizardSection?: "date" | "time";
};

export function BookingPicker({
  selectedTreatmentId,
  onTreatmentIdChange,
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
  resolveTimeSlots,
  remoteTimeSlots,
  bookingContext = "public",
  bookingFocusRef,
  treatmentFirstHintVisible,
  onTreatmentFirstHintVisible,
  selectedCountLabel,
  selectedDurationLabel,
  summaryTitle,
  monthAvailabilityServiceIds = [],
  multiSelect = false,
  selectedTreatmentIds = [],
  onToggleTreatmentId,
  onClearTreatmentIds,
  comboHintText,
  comboDurationLabel,
  comboAlertText,
  showDateAndTimePickers = true,
  treatmentStepOverline = "Paso 1",
  openTreatmentModalRequestId,
  hideTreatmentTriggerButton = false,
  wizardSection,
}: BookingPickerProps) {
  const isWizard = Boolean(wizardSection);
  const lastOpenTreatmentModalRequestRef = useRef<number | undefined>(undefined);
  const [visibleMonthDate, setVisibleMonthDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  /** `undefined`: sin servicio o sin datos; `null`: cargando; objeto: hay al menos un hueco ese día para el servicio. */
  const [monthAvailability, setMonthAvailability] = useState<Record<string, boolean> | null | undefined>(undefined);
  const [isTreatmentModalOpen, setIsTreatmentModalOpen] = useState(false);
  const [activeTreatmentCategory, setActiveTreatmentCategory] = useState<TreatmentCategory | null>(null);

  const selectedTreatment = useMemo(
    () => SALON_TREATMENT_OPTIONS.find((option) => option.id === selectedTreatmentId),
    [selectedTreatmentId],
  );
  const hasServiceSelection =
    Boolean(selectedTreatmentId.trim()) || monthAvailabilityServiceIds.length > 0;
  const visibleTreatments = useMemo(
    () =>
      activeTreatmentCategory
        ? SALON_TREATMENT_OPTIONS.filter((option) => option.category === activeTreatmentCategory)
        : [],
    [activeTreatmentCategory],
  );
  const calendarItems = useMemo(
    () => buildSalonCalendarItems(visibleMonthDate.getFullYear(), visibleMonthDate.getMonth()),
    [visibleMonthDate],
  );
  const visibleMonthLabel = `${salonMonthNames[visibleMonthDate.getMonth()]} ${visibleMonthDate.getFullYear()}`;

  useEffect(() => {
    if (!showDateAndTimePickers) {
      setMonthAvailability(undefined);
      return;
    }
    if (!selectedTreatmentId.trim() && monthAvailabilityServiceIds.length === 0) {
      setMonthAvailability(undefined);
      return;
    }
    let cancelled = false;
    const ac = new AbortController();
    setMonthAvailability(null);
    const y = visibleMonthDate.getFullYear();
    const m = visibleMonthDate.getMonth();
    const q = new URLSearchParams({
      year: String(y),
      monthIndex: String(m),
      treatmentId: selectedTreatmentId,
      scope: bookingContext === "panel" ? "panel" : "public",
    });
    if (monthAvailabilityServiceIds.length > 0) {
      q.set("serviceIds", monthAvailabilityServiceIds.join(","));
    }
    fetch(`/api/booking/month-availability?${q.toString()}`, {
      credentials: "same-origin",
      signal: ac.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<{ availability?: Record<string, boolean> }>;
      })
      .then((data) => {
        if (cancelled) return;
        const raw = data.availability;
        setMonthAvailability(typeof raw === "object" && raw !== null ? raw : undefined);
      })
      .catch(() => {
        if (!cancelled) setMonthAvailability(undefined);
      });
    return () => {
      cancelled = true;
      ac.abort();
    };
  }, [
    showDateAndTimePickers,
    selectedTreatmentId,
    visibleMonthDate,
    bookingContext,
    monthAvailabilityServiceIds,
  ]);

  useEffect(() => {
    if (!showDateAndTimePickers) return;
    if (!selectedDate || !hasServiceSelection) return;
    if (monthAvailability === undefined || monthAvailability === null) return;
    if (monthAvailability[selectedDate] === false) {
      onDateChange("");
      onTimeChange("");
    }
  }, [monthAvailability, onDateChange, onTimeChange, selectedDate, selectedTreatmentId, monthAvailabilityServiceIds]);

  const useRemoteSlots = remoteTimeSlots !== undefined;
  const slotsLoading = useRemoteSlots && selectedDate && remoteTimeSlots === null;
  const availableTimes = selectedDate
    ? useRemoteSlots
      ? remoteTimeSlots === null
        ? []
        : remoteTimeSlots
      : resolveTimeSlots
        ? resolveTimeSlots(selectedDate)
        : getAvailableTimesForDate(selectedDate)
    : [];
  const isSelectedDateHoliday = Boolean(selectedDate && isArgentinaPublicHoliday(selectedDate));

  const activeStep = showDateAndTimePickers
    ? !selectedTreatment
      ? 1
      : !selectedDate
        ? 2
        : !selectedTime
          ? 3
          : 4
    : 1;

  const openTreatmentModal = () => {
    setActiveTreatmentCategory(selectedTreatment?.category ?? null);
    setIsTreatmentModalOpen(true);
  };

  useEffect(() => {
    if (openTreatmentModalRequestId === undefined) return;
    if (lastOpenTreatmentModalRequestRef.current === openTreatmentModalRequestId) return;
    lastOpenTreatmentModalRequestRef.current = openTreatmentModalRequestId;
    const cat =
      SALON_TREATMENT_OPTIONS.find((option) => option.id === selectedTreatmentId)?.category ?? null;
    setActiveTreatmentCategory(cat);
    setIsTreatmentModalOpen(true);
  }, [openTreatmentModalRequestId, selectedTreatmentId]);

  const closeTreatmentModal = () => {
    setIsTreatmentModalOpen(false);
    setActiveTreatmentCategory(null);
  };

  const selectTreatment = (treatmentId: string) => {
    onTreatmentIdChange(treatmentId);
    if (multiSelect && onToggleTreatmentId) {
      onToggleTreatmentId(treatmentId);
      return;
    }
    closeTreatmentModal();
  };

  const showTreatmentStepSection = !hideTreatmentTriggerButton || showDateAndTimePickers;

  const tmBackdrop = "fixed inset-0 z-40 flex items-end bg-black/40 backdrop-blur-[2px]";
  const tmSheet =
    "relative w-full rounded-t-[32px] border-t border-gray-100 bg-white px-4 pt-3 pb-6 shadow-[0_-18px_40px_rgba(0,0,0,0.12)]";
  const tmHandle = "mx-auto mb-4 h-1.5 w-14 rounded-full bg-gray-200";
  const tmIconBtn = "cursor-pointer rounded-lg p-1 text-gray-600 hover:bg-gray-100";
  const tmCloseBtn = "cursor-pointer rounded-lg px-2 py-1 text-[13px] text-gray-500 hover:bg-gray-100";
  const tmTitle = "min-w-0 flex-1 text-center font-heading text-[22px] leading-none text-gray-900";
  const tmSummaryBox = "mb-3 rounded-xl border border-gray-100 bg-[#F5F5F5] px-3 py-2";
  const tmCountAccent = "font-medium text-[#B88E2F]";
  const tmDurAccent = "text-[13px] font-semibold text-[#B88E2F]";
  const tmTrash =
    "shrink-0 cursor-pointer rounded-lg border border-red-200 bg-red-50 p-1.5 text-red-700 transition hover:bg-red-100";
  const tmAlert =
    "mb-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-3 text-center text-[14px] text-amber-900";
  const tmTreatSelected = "border-[#B88E2F] bg-[#B88E2F]/10";
  const tmTreatIdle = "border-gray-200 bg-white hover:border-[#B88E2F]/40";
  const tmCatBtn =
    "flex w-full cursor-pointer items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-4 text-left hover:bg-gray-50";
  const tmCatTitle = "font-heading text-[18px] leading-none text-gray-900";
  const tmContinuarOn = "cursor-pointer bg-[#B88E2F] text-white shadow-md";
  const tmContinuarOff = "cursor-not-allowed bg-gray-200 text-gray-400";

  return (
    <>
      {!isWizard && showTreatmentStepSection ? (
        <section className="space-y-2">
          {!hideTreatmentTriggerButton ? (
            <button
              type="button"
              onClick={openTreatmentModal}
              className={`flex w-full cursor-pointer items-center justify-between rounded-2xl border bg-white px-4 py-3 text-left shadow-sm transition-all ${
                activeStep === 1
                  ? "border-[#B88E2F] shadow-[0_0_0_1px_rgba(184,142,47,0.22)]"
                  : "border-gray-200"
              }`}
            >
              <div>
                <p className="text-[11px] tracking-[0.14em] text-gray-500">{treatmentStepOverline}</p>
                <p className="mt-1 text-[14px] text-gray-900">
                  {summaryTitle ?? (selectedTreatment ? selectedTreatment.name : "Elegí servicio")}
                </p>
                {selectedCountLabel ? (
                  <p className="mt-1 text-[11px] text-gray-500">{selectedCountLabel}</p>
                ) : selectedTreatment ? (
                  <p className="mt-1 text-[11px] text-gray-500">
                    {selectedTreatment.category} · {selectedTreatment.subtitle}
                  </p>
                ) : null}
                {selectedDurationLabel ? (
                  <div className="mt-2 inline-flex items-center rounded-full border border-[#B88E2F]/55 bg-[#B88E2F]/12 px-2.5 py-1">
                    <span className="text-[11px] font-semibold tracking-[0.02em] text-[#B88E2F]">
                      {selectedDurationLabel}
                    </span>
                  </div>
                ) : null}
                {activeStep === 1 && (
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-[var(--premium-gold)]/92">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--premium-gold)]" />
                    <span>Comenzá seleccionando el servicio</span>
                  </div>
                )}
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" strokeWidth={1.8} />
            </button>
          ) : null}

          {showDateAndTimePickers ? (
            <div
              className={`flex items-center justify-between rounded-2xl border bg-white px-4 py-3 shadow-sm transition-all ${
                activeStep === 2
                  ? "border-[#B88E2F] shadow-[0_0_0_1px_rgba(184,142,47,0.22)]"
                  : "border-gray-200"
              }`}
            >
              <div>
                <p className="text-[11px] tracking-[0.14em] text-gray-500">Paso 2</p>
                <p className="mt-1 text-[14px] text-gray-900">
                  {selectedDate ? formatSalonDisplayDate(selectedDate) : "Elegí día"}
                </p>
                {activeStep === 2 && (
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-[#B88E2F]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#B88E2F]" />
                    <span>Ahora elegí una fecha disponible</span>
                  </div>
                )}
              </div>
              <ChevronRight className="h-4 w-4 rotate-90 text-gray-400" strokeWidth={1.8} />
            </div>
          ) : null}
        </section>
      ) : null}

      {showDateAndTimePickers && (wizardSection === undefined || wizardSection === "date") ? (
        <>
      <section
        className={
          isWizard
            ? "overflow-hidden rounded-[24px] border border-gray-100 bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            : "mt-4 overflow-hidden rounded-[24px] border border-gray-100 bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
        }
      >
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              setVisibleMonthDate((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))
            }
            className="cursor-pointer rounded-lg p-2 text-gray-900 hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
          </button>
          <h2
            className="font-heading flex items-center gap-2 text-[20px] leading-none font-bold text-gray-900"
          >
            {visibleMonthLabel}
            {hasServiceSelection && monthAvailability === null ? (
              <span
                className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#B88E2F]"
                aria-hidden
              />
            ) : null}
          </h2>
          <button
            type="button"
            onClick={() =>
              setVisibleMonthDate((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))
            }
            className="cursor-pointer rounded-lg p-2 text-gray-900 hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

        {treatmentFirstHintVisible ? (
          <p
            role="status"
            aria-live="polite"
            className="mb-3 rounded-xl border border-[#B88E2F]/40 bg-[#B88E2F]/10 px-4 py-3 text-center text-[16px] leading-snug text-gray-900"
          >
            <span className="font-semibold">Primero elegí un servicio</span>
            <span> (paso 1) para poder elegir el día.</span>
          </p>
        ) : null}

        <div
          className="grid grid-cols-7 gap-y-2 text-center"
          aria-busy={Boolean(hasServiceSelection && monthAvailability === null)}
        >
          {salonWeekdayLabels.map((label) => (
            <div
              key={label}
              className="text-[16px] font-semibold tracking-[0.04em] text-gray-500"
            >
              {label}
            </div>
          ))}
          {calendarItems.map((day) => {
            const isSelected = day.value === selectedDate;
            const monthAvailReady = monthAvailability !== undefined && monthAvailability !== null;
            const fullyBooked =
              Boolean(hasServiceSelection) &&
              monthAvailReady &&
              day.isCurrentMonth &&
              day.isAvailable &&
              monthAvailability[day.value] === false;
            const isDisabled = !day.isCurrentMonth || !day.isAvailable || fullyBooked;

            return (
              <button
                key={day.value}
                type="button"
                disabled={isDisabled}
                title={
                  fullyBooked
                    ? "Sin cupos para este servicio (ocupado o bloqueado)."
                    : !day.isAvailable && day.isCurrentMonth
                      ? "Día no disponible (cerrado o feriado)."
                      : undefined
                }
                aria-label={
                  fullyBooked
                    ? `${day.dayNumber}, sin cupos`
                    : !day.isAvailable && day.isCurrentMonth
                      ? `${day.dayNumber}, no disponible`
                      : undefined
                }
                onClick={() => {
                  if (!hasServiceSelection) {
                    onTreatmentFirstHintVisible(true);
                    return;
                  }
                  onDateChange(day.value);
                  onTimeChange("");
                  requestAnimationFrame(() => {
                    bookingFocusRef?.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  });
                }}
                className={`mx-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border text-[16px] font-semibold transition-all disabled:cursor-not-allowed ${
                  isSelected
                    ? "border-[#B88E2F] bg-[#B88E2F] text-white shadow-[0_4px_12px_rgba(184,142,47,0.35)]"
                    : fullyBooked
                      ? "border-gray-100 bg-gray-50 text-gray-400 line-through"
                      : !day.isCurrentMonth
                        ? "border-transparent text-gray-300"
                        : day.isAvailable
                          ? "border-gray-200 bg-white text-gray-900 hover:border-[#B88E2F]/40 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                          : "border-transparent text-gray-300"
                }`}
              >
                {day.dayNumber}
              </button>
            );
          })}
        </div>
      </section>
        </>
      ) : null}

      {showDateAndTimePickers && (wizardSection === undefined || wizardSection === "time") ? (
      <div ref={bookingFocusRef} className={isWizard ? "" : "mt-4"}>
        <section>
          {!isWizard ? (
          <div
            className={`flex items-center justify-between rounded-2xl border bg-white px-4 py-3 shadow-sm transition-all ${
              activeStep === 3
                ? "border-[#B88E2F] shadow-[0_0_0_1px_rgba(184,142,47,0.22)]"
                : "border-gray-200"
            }`}
          >
            <div>
              <p className="text-[11px] tracking-[0.14em] text-gray-500">Paso 3</p>
              <p className="mt-1 text-[14px] text-gray-900">
                {selectedTime ? `Horario elegido: ${selectedTime}` : "Elegí horario"}
              </p>
              {activeStep === 3 && (
                <div className="mt-2 flex items-center gap-2 text-[11px] text-[#B88E2F]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#B88E2F]" />
                  <span>Seleccioná un horario para continuar</span>
                </div>
              )}
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" strokeWidth={1.8} />
          </div>
          ) : null}

          <div className={`grid grid-cols-2 gap-3 ${isWizard ? "" : "mt-4"}`}>
            {slotsLoading ? (
              <div
                className="col-span-2 rounded-2xl border border-gray-100 bg-white px-4 py-5 text-center text-[16px] text-gray-500"
              >
                Cargando horarios…
              </div>
            ) : availableTimes.length > 0 ? (
              availableTimes.map((time) => {
                const isActive = time === selectedTime;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => onTimeChange(time)}
                    className={`h-12 min-h-[48px] cursor-pointer rounded-xl border text-[16px] font-semibold transition-all ${
                      isActive
                        ? "border-[#B88E2F] bg-[#B88E2F] text-white shadow-[0_4px_14px_rgba(184,142,47,0.35)]"
                        : "border-gray-200 bg-white text-gray-900 hover:border-[#B88E2F]/45 hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)]"
                    }`}
                  >
                    {time}
                  </button>
                );
              })
            ) : (
              <div
                className={`col-span-2 rounded-2xl border px-4 py-5 text-center ${
                  selectedDate
                    ? "border-amber-300 bg-amber-50"
                    : "border-[#B88E2F]/35 bg-[#B88E2F]/10"
                }`}
              >
                {selectedDate ? (
                  <>
                    <p className="text-[16px] font-semibold text-gray-900">
                      {isSelectedDateHoliday
                        ? "Feriado (cerrado): no hay horarios disponibles para este dia."
                        : "No hay horarios disponibles para este dia."}
                    </p>
                    <p className="mt-2 text-[16px] text-gray-500">
                      {isSelectedDateHoliday
                        ? "Elegi otra fecha habilitada para ver turnos disponibles."
                        : "Proba con otra fecha para ver turnos disponibles."}
                    </p>
                  </>
                ) : bookingContext === "panel" ? (
                  <p className="text-[16px] text-gray-500">
                    Elegí una fecha para ver los horarios disponibles.
                  </p>
                ) : (
                  <>
                    <p className="text-[16px] font-semibold text-gray-900">
                      Los turnos web se reservan a partir de mañana (no el mismo día).
                    </p>
                    <p className="mt-2 text-[16px] text-gray-500">
                      Elegí una fecha desde mañana para ver horarios.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
      ) : null}

      {!isWizard && isTreatmentModalOpen && (
        <div className={tmBackdrop}>
          <button
            type="button"
            aria-label="Cerrar selector de servicio"
            onClick={closeTreatmentModal}
            className="absolute inset-0 cursor-pointer bg-transparent"
          />

          <div className={tmSheet}>
            <div className={tmHandle} />

            <div className="mb-4 flex items-center justify-between gap-2">
              {activeTreatmentCategory ? (
                <button
                  type="button"
                  onClick={() => setActiveTreatmentCategory(null)}
                  className={tmIconBtn}
                  aria-label="Volver a categorías"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
                </button>
              ) : (
                <span className="h-5 w-5 shrink-0" />
              )}

              <h2 className={tmTitle}>{activeTreatmentCategory ?? "Elegí servicio"}</h2>

              <button type="button" onClick={closeTreatmentModal} className={`${tmCloseBtn} shrink-0`}>
                Cerrar
              </button>
            </div>
            {multiSelect ? (
              <div className={tmSummaryBox}>
                <div className="flex items-start justify-between gap-2">
                  <p className="min-w-0 flex-1 text-[12px] leading-snug text-gray-600">
                    <span className={tmCountAccent}>{selectedTreatmentIds.length}</span>{" "}
                    seleccionados
                    {comboDurationLabel ? (
                      <span className="text-gray-500">
                        {" "}
                        ·{" "}
                        <span className={tmDurAccent}>{comboDurationLabel}</span>
                      </span>
                    ) : null}
                    {summaryTitle ? <span className="text-gray-500"> · {summaryTitle}</span> : null}
                  </p>
                  {selectedTreatmentIds.length > 0 && onClearTreatmentIds ? (
                    <button
                      type="button"
                      onClick={onClearTreatmentIds}
                      aria-label="Quitar todos los servicios seleccionados"
                      className={tmTrash}
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}
            {multiSelect && comboAlertText ? <div className={tmAlert}>{comboAlertText}</div> : null}
            {activeTreatmentCategory ? (
              <div className="max-h-[52vh] space-y-2 overflow-y-auto pb-2">
                {visibleTreatments.map((treatment) => {
                  const isSelected = multiSelect
                    ? selectedTreatmentIds.includes(treatment.id)
                    : treatment.id === selectedTreatmentId;

                  return (
                    <button
                      key={treatment.id}
                      type="button"
                      onClick={() => selectTreatment(treatment.id)}
                      className={`w-full cursor-pointer rounded-2xl border px-4 py-3 text-left transition-colors ${
                        isSelected ? tmTreatSelected : tmTreatIdle
                      }`}
                    >
                      <p className="font-heading text-[16px] leading-tight text-gray-900">
                        {treatment.name}
                      </p>
                      <p className="mt-1 text-[12px] text-gray-500">{treatment.subtitle}</p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                {SALON_TREATMENT_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveTreatmentCategory(category)}
                    className={tmCatBtn}
                  >
                    <div>
                      <p className={tmCatTitle}>{category}</p>
                      <p className="mt-1 text-[12px] text-gray-500">
                        {SALON_TREATMENT_OPTIONS.filter((option) => option.category === category).length} servicios
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" strokeWidth={1.8} />
                  </button>
                ))}
              </div>
            )}
            {multiSelect ? (
              <div className="mt-4">
                <button
                  type="button"
                  disabled={selectedTreatmentIds.length === 0}
                  onClick={closeTreatmentModal}
                  className={`h-11 w-full rounded-xl text-[14px] font-semibold transition ${
                    selectedTreatmentIds.length > 0 ? tmContinuarOn : tmContinuarOff
                  }`}
                >
                  Continuar ({selectedTreatmentIds.length})
                </button>
                {selectedTreatmentIds.length > 0 ? (
                  <p className="mt-1.5 text-center text-[11px] text-gray-500">
                    Cuando termines de elegir, tocá Continuar.
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
