import { useState } from 'react'
import NewsSearch from "./jsx/newsSearch.jsx";



function App() {
  const [keyword, setKeyword] = useState('')
    const [search, setSearch] = useState(false)
    const [news, setNews] = useState([])

    async function getNews(keyword) {
       if (!keyword) return;
        console.log('pobieram wiadomości')
      const response = await fetch(`https://newsapi.org/v2/everything?q=${keyword}&from=2023-04-24&sortBy=publishedAt&apiKey=febb218de5d54005984fe62f862fd800`);
      const data = response.json()
        data.then((result) => {
            console.log(result.articles.length);
            // result.articles.map((article) => {setNews((prev) => [...prev, article])
            console.log(result.articles[0])
        // });
            setNews(result.articles);
            setSearch(true);
            // setSearch(result.articles[0].title);
            // console.log('NEWS: ' + news.length);
        });

        return data;
    }
const ShowInformation = ({info, idx}) => {
      return (<>
          <section className="infoBox" key={idx}>
              <div className="infoBox_left">
                  <p  className="infoBox__section">by: {info.author} | date: {info.publishedAt}</p>
                  <p  className="infoBox__section">{info.title}</p>
                  <p  className="infoBox__section">{info.content}</p>
              </div>
              <div className="infoBox__img-container">
                  <img src={info.urlToImage} alt={info.title} className="infoBox__img" />
              </div>



          </section>
          </>)
}
const ShowInfo = () => {
        console.log(news)
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
                placeholder="_"/>
            <button type="submit" onClick={() => getNews(keyword)}>enter</button>
            {/*<button type="submit" onClick={() => setSearch(true)}>enter</button>*/}
            </div>
            {(search ? <ShowInfo/> : <p>none</p>)}

                {/*<p>{news[0].title}</p>) */}

        </div>
        {/*{(search ? <NewsSearch keyword={keyword} /> : <></>)}*/}

    </>
  )
}

export default App
