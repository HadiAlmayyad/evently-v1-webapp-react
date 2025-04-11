// src/components/FloatingAddButton.jsx
import React from 'react';
import {Button} from 'react-bootstrap'
import '../styles/FloatingAddButton.css';

export default function FloatingAddButton() {
  return (
    <Button
      className="floating-add-button rounded-circle"
      variant="light"
    >
      +
    </Button>
  );
}
