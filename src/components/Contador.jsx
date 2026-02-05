import { useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <>
      <h1>Contador</h1>
      <p>{contador}</p>
      <button
        onClick={() => {
          setContador(contador + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setContador(contador - 1);
        }}
      >
        -
      </button>
    </>
  );
}

export default Contador;
