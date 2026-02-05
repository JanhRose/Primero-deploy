import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function FormList({ onAdd }) {
  const [text, setText] = useState("");

  const guardar = async (e) => {
    e.preventDefault();

    if (typeof text !== "string" || !text.trim()) return;

    try {
      await addDoc(collection(db, "notas"), {
        notas: text,
        completed: false,
        createAt: serverTimestamp(),
      });
      console.log("Guardado");
    } catch (error) {
      console.error("Error al guardar:", error);
    }

    setText("");
    onAdd();
  };

  return (
    <form className="container mt-4" onSubmit={guardar}>
      <div className="row justify-content-center">
        <div className="col-6">
          <h1 className="text-center">Super excelente!!</h1>
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="input"
              id="notetext"
              name="notetext"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
            <button type="submit" className="btn btn-outline-primary">
              enviar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormList;
