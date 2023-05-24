import { useState } from 'react'
import React from "react";


function App() {
  const [keyword, setKeyword] = useState('')
    const [search, setSearch] = useState(false)
    const [news, setNews] = useState([])
    const [choiceLenguageType, setChoiceLenguageType] = useState("en")
    const [choiceSortBy, setChoiceSortBy] = useState("publishedAt")

    const languageTypes = ["en", "ar", "de", "es", "fr", "he", "it", "nl", "no", "pt", "sv", "ud", "zh"]
    const sortBy = ["publishedAt", "relevancy", "popularity"]

    async function getNews(keyword) {
       if (!keyword) return;
      const response = await fetch(`https://newsapi.org/v2/everything?q=${keyword}&language=${choiceLenguageType}&from=2023-04-24&sortBy=${choiceSortBy}&apiKey=febb218de5d54005984fe62f862fd800`);
      const data = response.json()
        data.then((result) => {
            setNews(result.articles);
            setSearch(true);
        });

        return data;
    }
const ShowInformation = ({info, idx}) => {
      return (<>
          <section className="infoBox" key={idx}>
              <div className="infoBox_left">
                  <p className="infoBox__section">by: {info.author} | date: {info.publishedAt}</p>
                  <p className="infoBox__section">{info.title}</p>
                  <p className="infoBox__section">{info.content}</p>
                  <a className="infoBox__section" href={info.url} target="_blank"> more info...</a>
              </div>
              <div className="infoBox__img-container">
                  <img src={info.urlToImage} alt={info.title} className="infoBox__img" />
              </div>



          </section>
          </>)
}
const ShowInfo = () => {
      return (<>
          <p>result: {news.length}</p>
          {news.map((info,idx) => <ShowInformation info = {info} idx = {idx}/> )}</>)
}


  return (
    <>
        <div className="mainDiv">
            <div className="headerBox">
                <h1>newsScanner</h1>

                <input
                    type="text"
                    name="subject"
                    className="mainInput"
                    onChange={(event) => setKeyword(event.target.value)}
                    value={keyword}
                    placeholder="..."/>
                <button type="submit" onClick={() => getNews(keyword)}>enter</button>
            </div>
            <section className="underHeader">
                <p>choose lenguage</p>
                <select value={choiceLenguageType} onChange={() => setChoiceLenguageType(event.target.value)} className="fnt box_input" >
                    {languageTypes.map((languageType) => (
                        <option key={languageType} value={languageType} className="fnt">
                            {languageType}
                        </option>
                    ))}
                </select>
                <p>sort</p>
                <select value={choiceSortBy} onChange={() => setChoiceSortBy(event.target.value)} className="fnt box_input" >
                    {sortBy.map((sortType) => (
                        <option key={sortType} value={sortType} className="fnt">
                            {sortType}
                        </option>
                    ))}
                </select>
            </section>
            <section>
                {(search ? <ShowInfo/> : <></>)}
            </section>

        </div>

    </>
  )
}

export default App
