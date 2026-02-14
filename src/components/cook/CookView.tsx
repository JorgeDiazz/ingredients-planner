"use client";

import { useState } from "react";
import { ProductWithStatus } from "@/lib/types";
import { useProducts } from "@/hooks/useProducts";
import SearchBar from "@/components/ui/SearchBar";
import EmptyState from "@/components/ui/EmptyState";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

export default function CookView() {
  const { products, loading, createProduct, updateProduct, deleteProduct } = useProducts();
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithStatus | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductWithStatus | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleAdd = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleEdit = (product: ProductWithStatus) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleSubmit = async (data: { name: string; quantity: number; minQuantity: number }) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
    } else {
      await createProduct(data);
    }
  };

  const handleDeleteRequest = (product: ProductWithStatus) => {
    setDeleteTarget(product);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      console.error("Failed to delete product:", err);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-ios-blue/30 border-t-ios-blue rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="px-5">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar ingredientes..."
        />
      </div>

      {/* Product List */}
      {products.length === 0 ? (
        <EmptyState
          icon="🥘"
          title="Sin ingredientes"
          description="Toca el boton + para agregar tu primer ingrediente"
        />
      ) : (
        <ProductList
          products={products}
          searchQuery={search}
          onIncrement={(id, qty) => updateProduct(id, { quantity: qty + 1 })}
          onDecrement={(id, qty) => updateProduct(id, { quantity: Math.max(0, qty - 1) })}
          onEdit={handleEdit}
          onDelete={handleDeleteRequest}
        />
      )}

      {/* Floating Add Button */}
      <button
        onClick={handleAdd}
        className="fixed bottom-7 right-7 w-[58px] h-[58px] bg-ios-blue text-white rounded-full shadow-lg shadow-ios-blue/25 flex items-center justify-center text-3xl active:scale-90 transition-transform z-40"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        +
      </button>

      {/* Form Modal */}
      <ProductForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        product={editingProduct}
      />

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-10">
          <div className="absolute inset-0 bg-black/40 modal-fade-in" onClick={() => !deleting && setDeleteTarget(null)} />
          <div className="relative bg-ios-card rounded-2xl w-full max-w-[300px] overflow-hidden confirm-pop shadow-xl">
            <div className="px-6 pt-7 pb-5 text-center">
              <div className="w-12 h-12 rounded-full bg-ios-red/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-ios-red" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
              <h3 className="text-[17px] font-bold text-ios-label mb-1.5">Eliminar ingrediente</h3>
              <p className="text-[14px] text-ios-gray-1 leading-snug">
                Se eliminara <span className="font-semibold text-ios-label">{deleteTarget.name}</span> de tu lista. Esta accion no se puede deshacer.
              </p>
            </div>
            <div className="border-t border-ios-gray-5 flex">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 py-3.5 text-[16px] font-medium text-ios-blue active:bg-ios-gray-6 transition-colors border-r border-ios-gray-5 disabled:opacity-40"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="flex-1 py-3.5 text-[16px] font-semibold text-ios-red active:bg-ios-red/5 transition-colors disabled:opacity-40"
              >
                {deleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
