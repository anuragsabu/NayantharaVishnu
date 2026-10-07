/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Confirmation Modal for User-Confirmed Google Workspace operations
 */

import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm & Save',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  const { isNight } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
    >
      <div
        className="w-full max-w-md p-6 sm:p-8 border rounded-sm shadow-xl transition-colors duration-500 text-left"
        style={{
          backgroundColor: isNight ? '#1A1816' : '#FDFBF7',
          borderColor: isNight ? 'rgba(199, 170, 113, 0.4)' : 'rgba(155, 126, 70, 0.4)',
          color: isNight ? '#F7F3EE' : '#1E1B18',
        }}
      >
        <h4
          className="font-cormorant text-2xl font-normal tracking-wide mb-3"
          style={{ color: isNight ? '#DFC794' : '#681A24' }}
        >
          {title}
        </h4>

        <p
          className="font-sans-ui text-xs sm:text-sm leading-relaxed mb-6 opacity-85"
          style={{ color: isNight ? '#EAE3DA' : '#4A443E' }}
        >
          {message}
        </p>

        <div className="flex items-center justify-end gap-3 pt-2 border-t"
          style={{
            borderColor: isNight ? 'rgba(199, 170, 113, 0.2)' : 'rgba(155, 126, 70, 0.2)',
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs tracking-wider uppercase font-sans-ui rounded-sm hover:opacity-75 transition-opacity cursor-pointer"
            style={{ color: isNight ? '#A8A096' : '#7D756C' }}
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2 text-xs tracking-wider uppercase font-sans-ui font-medium rounded-sm border transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: isNight ? 'rgba(223, 199, 148, 0.15)' : 'rgba(155, 126, 70, 0.15)',
              borderColor: isNight ? '#DFC794' : '#9B7E46',
              color: isNight ? '#DFC794' : '#681A24',
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
