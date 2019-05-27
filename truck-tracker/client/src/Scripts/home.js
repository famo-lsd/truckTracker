import React from 'react';

export default function Home({ ...rest }) {
console.log(rest);

    return (<h1>Página inicial</h1>);
}