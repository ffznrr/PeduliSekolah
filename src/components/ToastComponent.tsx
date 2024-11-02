// components/ToastComponent.tsx
"use client";

import { useToast } from "@/hooks/use-toast";

interface ToastProps {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}

export function ToastComponent({
  title,
  description,
  variant = "default",
}: ToastProps) {
  const { toast } = useToast();

  toast({
    title,
    description,
    variant,
  });

  return null; // No need to return any JSX, as it's a function
}
