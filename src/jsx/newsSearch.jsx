import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsSearch = ({keyword}) => {
    const [infoNews, setInfoNews] = useState("");
    console.log('news')

    useEffect(() => {
        const searchNews = async () => {

            const url = `https://api.fakty.tvn24.pl/news?q=${keyword}&limit=1`; // Adres API serwisu informacyjnego

            try {
                const response = await axios.get(url);
                const data = response.data;

                if (data.articles && data.articles.length > 0) {
                    const firstArticle = data.articles[0];
                    const title = firstArticle.title;
                    setInfoNews(title);
                } else {
                    setInfoNews("Nie znaleziono pasującej wiadomości.");
                }
            } catch (error) {
                console.error("Błąd pobierania wiadomości:", error);
                setInfoNews("Wystąpił błąd podczas pobierania wiadomości.");
            }
        };

        searchNews();
    }, []);

    return (
        <div>
            <h1>Znaleziona wiadomość:</h1>
            <p>{infoNews}</p>
        </div>
    );
};

export default NewsSearch;
