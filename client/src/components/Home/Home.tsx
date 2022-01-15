import React from 'react';

// Defino mediante una interface el tipado de las props
interface HomeProps {
  title: string;
}

// El tipado del return de las funciones de React debe ser: JSX:Element
export default function Home({title}:HomeProps): JSX.Element {
    return <h1>Home component. Este es nuestro { title }</h1>
}

