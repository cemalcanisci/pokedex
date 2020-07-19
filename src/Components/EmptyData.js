import React from 'react';

export default function EmptyData(props) {
  const { message, type } = props;
  const path = type === 'error' ? '../' : '';
  const image = type === '404' ? '404.jpg' : 'psyduck.gif';
  const imgClass = type === '404' ? 'not-found' : '';
  return (
    <div className="mt-5 container d-flex flex-column align-items-center justify-content-center">
      <img
        className={`${imgClass} mt-3`}
        src={`${path}${image}`}
        alt="emptyData"
      />

      <h3 className="text-danger mt-3">{message}</h3>

    </div>
  );
}
