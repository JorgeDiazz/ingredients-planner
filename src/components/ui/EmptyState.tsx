"use client";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
}

export default function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
      <span className="text-6xl mb-5">{icon}</span>
      <h3 className="text-lg font-bold text-ios-label mb-2">{title}</h3>
      <p className="text-[14px] text-ios-gray-1 leading-relaxed">{description}</p>
    </div>
  );
}
