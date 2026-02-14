"use client";

import { ReactNode, useEffect, useState, useCallback, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [vpRect, setVpRect] = useState<{ height: number; offsetTop: number } | null>(null);
  const fullHeightRef = useRef(0);

  // Track visual viewport — resize container to sit above the iOS keyboard
  useEffect(() => {
    if (!isOpen) return;

    const vv = window.visualViewport;
    if (!vv) return;

    fullHeightRef.current = window.innerHeight;

    const update = () => {
      const isKb = fullHeightRef.current - vv.height > 100;
      if (isKb) {
        setVpRect({ height: vv.height, offsetTop: vv.offsetTop });
      } else {
        setVpRect(null);
      }
    };

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, [isOpen]);

  // Scroll focused input into view when keyboard opens
  useEffect(() => {
    if (!isOpen) return;

    const handleFocusIn = () => {
      setTimeout(() => {
        const active = document.activeElement;
        if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) {
          active.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
    };

    document.addEventListener("focusin", handleFocusIn);
    return () => document.removeEventListener("focusin", handleFocusIn);
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsClosing(false);
      setVpRect(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeWithAnimation = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 250);
  }, [onClose]);

  if (!isOpen) return null;

  const keyboardOpen = vpRect !== null;

  return (
    <>
      {/* Full-screen backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 ${isClosing ? "opacity-0" : "modal-fade-in"}`}
        style={{ transition: isClosing ? "opacity 0.25s ease-out" : undefined }}
        onClick={closeWithAnimation}
      />
      {/* Sheet container — tracks visual viewport so it sits above keyboard */}
      <div
        className="fixed z-50 left-0 right-0 flex items-end sm:items-center justify-center"
        style={vpRect ? { top: `${vpRect.offsetTop}px`, height: `${vpRect.height}px` } : { top: 0, bottom: 0 }}
      >
        {/* Sheet */}
        <div
          className={`relative w-full sm:max-w-lg bg-ios-card rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col ${isClosing ? "" : "modal-slide-up"}`}
          style={{
            maxHeight: keyboardOpen ? "100%" : "85dvh",
            transform: isClosing ? "translateY(100%)" : undefined,
            transition: "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
          }}
        >
          {/* Handle bar (decorative) */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden shrink-0">
            <div className="w-10 h-1 bg-ios-gray-4 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-ios-gray-5/60 bg-ios-card shrink-0">
            <button onClick={closeWithAnimation} className="text-ios-blue font-normal text-[17px] min-h-[44px] flex items-center">
              Cancelar
            </button>
            <h2 className="text-[17px] font-bold">{title}</h2>
            <div className="w-[70px]" />
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
            {children}
          </div>

          {/* Sticky footer */}
          {footer && (
            <div className="shrink-0 px-6 pb-6 pt-3 bg-ios-card border-t border-ios-gray-5/40 pb-safe">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
