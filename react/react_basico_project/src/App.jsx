import { useState } from 'react';
import './App.css'
import Bienvenida from './components/Bienvenida'
import ListaCompras from './components/ListaCompras'
import confetti from "@hiseb/confetti";

// componente funcionales
function App() {
  // como declarar un estado
  /**
   * 2 valores a tomar en cuenta
   * [0] = es el que se encarga de mostrar/guardar el estado
   * [1] = es el que se encarga de actualizar el estado
   */
  const [frutas, setFrutas] = useState(["🍇", "🍌", "🍓", "🟠"]) //todo estado necesita un valor de inicio

  // funcion para tirar confeti
  const tirarConfetti = () => {
      confetti();
  }

  // funcion para agregar frutas
  const agregarFruta = () => {
      // agregando un elemento al arreglo push()
      // ocupamos setFrutas() porque vamos a actualizar el estado
      // setFrutas(frutas.push("🥥"))

      // ... spread operator (copia de tu arreglo/objeto)
      setFrutas([...frutas, "🥥"])
  }

  // imprimiendo la lista de frutas del estado
  console.log(frutas)
  return (
    <>
      <h1 className="titulo">Mi primer proyecto de react</h1>
      {/** llamando nuestros componentes y los podemos reutilizar */}

      {/** pasando datos como props */}
      <Bienvenida usuario="Martha Santos" confetti={tirarConfetti} ></Bienvenida>
      <ListaCompras emoji="🛒" />
      <ListaCompras emoji="💵" />
      <ListaCompras emoji="💱" />

      {/** boton dinamico, utilizando evento de javascript */}
      <button onClick={tirarConfetti}>Click Aqui!</button>

      <section>
        <h3>Lista de frutas</h3>
        {/** boton que se va encargar de agregar una nueva fruta al estado */}
        <button onClick={agregarFruta}>Agregar fruta</button>

        <div>
          <table>
            {
              // iterando el arreglo de frutas (estado)
              // (primer elemento) fruta = es elemento como tal del arreglo
              // (segundo elemento) index = posicion de tu elemento del arreglo
              frutas.map((fruta, index) => {
                  return (
                    <tr key={index}>
                      <td>{fruta}</td>
                    </tr>
                  )
              })
            }
          </table>
        </div>
      </section>
    </>
  )
}

export default App