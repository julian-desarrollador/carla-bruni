"use client";

import { useState } from "react";

import type { TreatmentCategory } from "@/lib/treatments/catalog";
import {
  MAX_SERVICES_PER_BOOKING,
  SALON_TREATMENTS,
  TREATMENT_CATEGORIES,
  categoryChipLabel,
  totalDurationMinutesForServiceIds,
} from "@/lib/treatments/catalog";

type BookingStepFreyjaServicesProps = {
  selectedServiceIds: string[];
  onToggleTreatmentId: (id: string) => void;
  comboAlertText?: string | null;
};

type FilterCategory = TreatmentCategory | "all";

function formatTotalDurationLabel(totalMinutes: number): string {
  if (totalMinutes <= 0) return "";
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h > 0 && m > 0) return `${h} h ${m} min en total`;
  if (h > 0) return `${h} h en total`;
  return `${m} min en total`;
}

export function BookingStepFreyjaServices({
  selectedServiceIds,
  onToggleTreatmentId,
  comboAlertText,
}: BookingStepFreyjaServicesProps) {
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("all");
  const totalMinutes = totalDurationMinutesForServiceIds(selectedServiceIds);
  const atMax = selectedServiceIds.length >= MAX_SERVICES_PER_BOOKING;
  const visibleCategories =
    filterCategory === "all" ? TREATMENT_CATEGORIES : TREATMENT_CATEGORIES.filter((c) => c === filterCategory);

  return (
    <div className="space-y-5">
      {comboAlertText ? (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-center text-[16px] text-gray-900">
          {comboAlertText}
        </div>
      ) : null}

      {selectedServiceIds.length > 0 && totalMinutes > 0 ? (
        <p className="text-center text-[15px] font-semibold text-[#B88E2F]">
          {formatTotalDurationLabel(totalMinutes)}
        </p>
      ) : null}

      <div className="sticky top-0 z-10 -mx-5 bg-white px-5 py-2">
        <div
          className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Filtrar por categoría"
        >
          <button
            type="button"
            role="tab"
            aria-selected={filterCategory === "all"}
            onClick={() => setFilterCategory("all")}
            className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
              filterCategory === "all"
                ? "bg-[#B88E2F] text-white"
                : "border border-gray-200 bg-white text-gray-700"
            }`}
          >
            Todos
          </button>
          {TREATMENT_CATEGORIES.map((category) => {
            const selected = filterCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilterCategory(category)}
                className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
                  selected ? "bg-[#B88E2F] text-white" : "border border-gray-200 bg-white text-gray-700"
                }`}
              >
                {categoryChipLabel(category)}
              </button>
            );
          })}
        </div>
      </div>

      {visibleCategories.map((category) => {
        const treatments = SALON_TREATMENTS.filter((t) => t.category === category);
        if (treatments.length === 0) return null;

        return (
          <section key={category} className="space-y-3">
            <h2 className="font-heading text-lg font-semibold text-gray-900">{category}</h2>
            {treatments.map((treatment) => {
              const isSelected = selectedServiceIds.includes(treatment.id);
              const disabled = !isSelected && atMax;

              return (
                <button
                  key={treatment.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => onToggleTreatmentId(treatment.id)}
                  className={`flex w-full cursor-pointer flex-col rounded-[24px] border p-6 text-left shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45 ${
                    isSelected
                      ? "border-[#B88E2F] bg-[#B88E2F]/10 ring-2 ring-[#B88E2F]/20"
                      : "border-gray-50 bg-white"
                  }`}
                >
                  <h3 className="text-xl font-semibold text-gray-900">{treatment.name}</h3>
                  {treatment.subtitle ? (
                    <p className="mt-1 text-[15px] font-medium text-gray-600">{treatment.subtitle}</p>
                  ) : null}
                  {isSelected ? (
                    <span className="mt-3 inline-flex w-fit rounded-full bg-[#B88E2F] px-3 py-1 text-[14px] font-semibold text-white">
                      Seleccionado
                    </span>
                  ) : null}
                </button>
              );
            })}
          </section>
        );
      })}

      <p className="border-t border-gray-100 pt-4 text-center text-[13px] leading-relaxed text-gray-500">
        Podés combinar hasta {MAX_SERVICES_PER_BOOKING} tratamientos en un mismo turno.
      </p>
    </div>
  );
}
