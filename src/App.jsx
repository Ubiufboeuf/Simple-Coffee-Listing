/* eslint-disable react/prop-types */
import { useState } from "react"
import { data } from "./data"
import { variables } from "./variables"


export function Article({ name, img, price, rating, votes, isPopular, isAvailable }) {
  let available = ""
  let popular = ""
  let starImg = "/src/assets/Star_fill.svg"
  let lbl_rating = rating ?? ""
  let lbl_votes

  if (!votes) {
    lbl_votes = "No ratings"
    lbl_rating = ""
    starImg = "/src/assets/Star.svg"
  } else {
    lbl_votes = `(${votes} votes)`
    if (rating.toString().length === 1) {
      lbl_rating = `${rating}.0`
    }
  }

  available = !isAvailable && "Sold out"
  popular = isPopular && "popular"

  return (
    <>
      <article id="card">
        <div id="img-wrapper">
          <img id="img" src={img} />
          <p id="popular" className={`small-text ${popular}`}>Popular</p>
        </div>
        <section id="info">
          <h2 id="card-title">{name}</h2>
          <button id="price">{price}</button>
          <div id="rating">
            <div id="star">
              <img id="star-img" src={starImg} />
            </div>
            <p id="numbers">
              {lbl_rating}
              <span id="votes">{lbl_votes}</span>
            </p>
          </div>
          <p id="solded">{available}</p>
        </section>
      </article>
    </>
  )
}

function App() {
  let [isAllSelected, setIsAllSelected] = useState(true);
  let [isAvailableSelected, setIsAvailableSelected] = useState(false);
  let [allClass, setAllClass] = useState("allSelected");
  let [availableClass, setAvailableClass] = useState("");
  let [localData, setLocalData] = useState(data);

  function handleAllSelectedClick() {
    if (isAllSelected === false) {
      console.log("isAll " + isAllSelected)
      console.log("allClass on handleAll : " + allClass)
      console.log("avClass on handleAll : " + availableClass)
      setIsAllSelected(true)
      setIsAvailableSelected(false)
      setAllClass("allSelected")
      setAvailableClass("")
      setLocalData(data)
    }
  }

  function handleAvailableSelectedClick() {
    if (isAvailableSelected === false) {
      console.log("isAv " + isAvailableSelected)
      console.log("allClass on handleAv : " + allClass)
      console.log("avClass on handleAv : " + availableClass)
      setIsAllSelected(false)
      setIsAvailableSelected(true)
      setAllClass("")
      setAvailableClass("availableSelected")
      setLocalData(data.filter(el => el.available))
    }
  }
  
  return (
    <>
      <header>
        <h1>{variables.title}</h1>
        <p>{variables.text}</p>
        <div>
          <button
            id="btnAll"
            className={allClass}
            onClick={handleAllSelectedClick}
          >{variables.all}</button>
          <button
            id="btnAvailable"
            className={availableClass}
            onClick={handleAvailableSelectedClick}
          >{variables.available}</button>
        </div>
        <img src="/src/assets/vector.svg" />
      </header>
      <main>
        {
          localData.map((el) => {
            return (
              <Article
                key={el.id}
                name={el.name}
                img={el.image}
                rating={el.rating}
                price={el.price}
                votes={el.votes}
                isPopular={el.popular}
                isAvailable={el.available}
              />
            )
          })
        }
      </main>
    </>
  )
}

export default App
