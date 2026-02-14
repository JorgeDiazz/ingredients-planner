"use client";

import { useState, useEffect } from "react";
import { ProductWithStatus } from "@/lib/types";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Stepper from "@/components/ui/Stepper";
import Button from "@/components/ui/Button";

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; quantity: number; minQuantity: number }) => Promise<void>;
  product?: ProductWithStatus | null;
}

export default function ProductForm({
  isOpen,
  onClose,
  onSubmit,
  product,
}: ProductFormProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [minQuantity, setMinQuantity] = useState(1);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setQuantity(product.quantity);
      setMinQuantity(product.minQuantity);
    } else {
      setName("");
      setQuantity(0);
      setMinQuantity(1);
    }
  }, [product, isOpen]);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    setSaving(true);
    try {
      await onSubmit({
        name: name.trim(),
        quantity,
        minQuantity,
      });
      onClose();
    } catch (err) {
      console.error("Failed to save product:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? "Editar Producto" : "Agregar Producto"}
      footer={
        <Button
          type="button"
          className="w-full"
          disabled={saving || !name.trim()}
          onClick={handleSubmit}
        >
          {saving ? "Guardando..." : product ? "Actualizar" : "Agregar"}
        </Button>
      }
    >
      <div className="space-y-6">
        <Input
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Huevos, Leche, Pechuga de pollo"
          required
        />

        <Stepper
          label="Cantidad"
          value={quantity}
          onChange={setQuantity}
          min={0}
          max={99}
          step={1}
        />

        <Stepper
          label="Minimo semanal"
          value={minQuantity}
          onChange={setMinQuantity}
          min={1}
          max={99}
          step={1}
          helperText="Cantidad necesaria para la semana"
        />
      </div>
    </Modal>
  );
}
