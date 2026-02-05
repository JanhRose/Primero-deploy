import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

function List({ refresh }) {
  const [notas, setNotas] = useState([]);

  const getNotas = async () => {
    const q = query(collection(db, "notas"), orderBy("createAt", "asc"));

    const snapshot = await getDocs(q);

    const notasFromDB = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setNotas(notasFromDB);
  };

  useEffect(() => {
    getNotas();
  }, [refresh]);

  const eliminarNota = async (id) => {
    try {
      await deleteDoc(doc(db, "notas", id));

      setNotas((prevNotas) => prevNotas.filter((nota) => nota.id !== id));
    } catch (error) {
      console.error("Error al eliminar nota:", error);
    }
  };

  const notaCompletada = async (data) => {
    const notaref = doc(db, "notas", data.id);

    try {
      await updateDoc(notaref, {
        completed: !data.completed,
      });

      setNotas((prevNotas) =>
        prevNotas.map((n) =>
          n.id === data.id ? { ...n, completed: !n.completed } : n,
        ),
      );
    } catch (error) {
      console.error("Error al actualizar nota:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card mb-3">
            <ul className="list-group">
              {notas.map((data) => (
                <li key={data.id} className="list-group-item">
                  <div className="row align-items-start">
                    <div className="col-8">
                      {/* TEXTO */}

                      <div className="col-8 col-md-9">
                        <div className="fw-semibold text-start text-break">
                          {data.notas}
                        </div>

                        <small
                          className={
                            data.completed
                              ? "text-success d-block"
                              : "text-danger d-block"
                          }
                        >
                          {data.completed ? "✔ " : "✖ "}
                        </small>
                      </div>
                    </div>

                    <div className="col-4 d-flex flex-column align-items-end gap-2">
                      {/* BOTONES */}

                      <button
                        className="btn btn-danger btn-sm w-100"
                        onClick={() => eliminarNota(data.id)}
                      >
                        eliminar
                      </button>

                      <button
                        className="btn btn-outline-success btn-sm w-100"
                        onClick={() => notaCompletada(data)}
                      >
                        {data.completed ? "no terminada" : "Listo"}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
