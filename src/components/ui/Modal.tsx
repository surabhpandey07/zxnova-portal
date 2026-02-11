import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: React.ReactNode;
  closeButton?: boolean;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  size = 'md',
  footer,
  closeButton = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className={cn(
            'bg-white rounded-3xl shadow-zxnova-lg overflow-hidden',
            'max-w-full relative',
            sizeClasses[size]
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || closeButton) && (
            <div className="bg-gradient-zxnova px-6 py-4 flex items-center justify-between">
              {title && (
                <h2 className="text-xl font-bold text-white">{title}</h2>
              )}
              {closeButton && (
                <button
                  onClick={onClose}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-colors"
                >
                  <X size={24} />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="p-6">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Modal };
export type { ModalProps };
