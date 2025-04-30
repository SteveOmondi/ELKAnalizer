
// components/ErrorState.jsx
import React from 'react'
export default function ErrorState({ message }) {
    return (
      <div className="text-center py-12 text-red-600">{message}</div>
    );
  }