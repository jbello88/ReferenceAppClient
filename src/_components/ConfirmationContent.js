import React from 'react';

export function ConfirmationContent({ children }) {
  return (
    <>
      {React.Children.map(children, child => {
        return child;
      })}
    </>
  );
}
