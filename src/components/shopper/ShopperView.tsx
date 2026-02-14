"use client";

import { useState, useCallback } from "react";
import { ProductWithStatus } from "@/lib/types";
import { useShoppingList } from "@/hooks/useShoppingList";
import EmptyState from "@/components/ui/EmptyState";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ShoppingList from "./ShoppingList";

export default function ShopperView() {
  const { items, loading, restockItem } = useShoppingList();
  const [restockTarget, setRestockTarget] = useState<ProductWithStatus | null>(null);
  const [restockAmount, setRestockAmount] = useState("");
  const [saving, setSaving] = useState(false);

  const handleRestock = (item: ProductWithStatus) => {
    setRestockTarget(item);
    setRestockAmount(String(item.minQuantity));
  };

  const handleRestockConfirm = async () => {
    if (!restockTarget) return;
    const amount = parseFloat(restockAmount) || 0;
    if (amount <= 0) return;

    setSaving(true);
    try {
      await restockItem(restockTarget.id, restockTarget.quantity + amount);
      setRestockTarget(null);
    } catch (err) {
      console.error("Failed to restock:", err);
    } finally {
      setSaving(false);
    }
  };

  const missingCount = items.filter((i) => i.status === "missing").length;
  const lowCount = items.filter((i) => i.status === "low").length;

  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const text = items
      .map((i, idx) => {
        const toBuy = Math.max(0, i.minQuantity - i.quantity);
        return `${idx + 1}. ${toBuy} ${i.name}`;
      })
      .join("\n");

    if (!text) return;

    let success = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch {
        // Falls through to legacy fallback
      }
    }

    if (!success) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        success = document.execCommand("copy");
      } catch {
        // Copy not supported
      }
      document.body.removeChild(textarea);
    }

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [items]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-ios-blue/30 border-t-ios-blue rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Summary Banner */}
      {items.length > 0 && (
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex gap-5">
              {missingCount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-ios-red" />
                  <span className="text-[14px] font-semibold">
                    {missingCount} agotado{missingCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}
              {lowCount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-ios-yellow" />
                  <span className="text-[14px] font-semibold">
                    {lowCount} poco{lowCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
            <button onClick={handleCopy} className="flex items-center gap-2 text-ios-blue text-[14px] font-semibold min-h-[44px] px-3 -mr-3 active:opacity-60">
              {copied ? (
                <>
                  <svg className="w-5 h-5 text-ios-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-ios-green">Copiado</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar
                </>
              )}
            </button>
          </div>
        </Card>
      )}

      {/* Shopping List */}
      {items.length === 0 ? (
        <EmptyState
          icon="✅"
          title="Todo abastecido"
          description="Tu cocina tiene todo lo que necesita"
        />
      ) : (
        <ShoppingList items={items} onRestock={handleRestock} />
      )}

      {/* Restock Modal */}
      <Modal
        isOpen={!!restockTarget}
        onClose={() => setRestockTarget(null)}
        title="Reabastecer"
        footer={
          <Button
            type="button"
            className="w-full"
            disabled={saving || parseFloat(restockAmount) <= 0}
            onClick={handleRestockConfirm}
          >
            {saving ? "Guardando..." : "Confirmar"}
          </Button>
        }
      >
        {restockTarget && (
          <div className="space-y-5">
            <p className="text-[14px] text-ios-gray-1 leading-relaxed">
              <span className="font-semibold text-ios-label">{restockTarget.name}</span> — tienes {restockTarget.quantity}, necesitas {restockTarget.minQuantity} para la semana
            </p>
            <Input
              label="Cantidad comprada"
              type="number"
              inputMode="decimal"
              value={restockAmount}
              onChange={(e) => setRestockAmount(e.target.value)}
              onKeyDown={(e) => { if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault(); }}
              min="0.5"
              step="0.5"
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
