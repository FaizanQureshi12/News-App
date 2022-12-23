import { useState, useEffect } from 'react'
import './new.css'
import axios from 'axios'
import moment from 'moment'

function Paper() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //class code
    useEffect(() => {
        function getTrendingNews() {

            const options = {
                method: 'GET',
                url: 'https://bing-news-search1.p.rapidapi.com/news',
                params: { safeSearch: 'Off', textFormat: 'Raw' },
                headers: {
                    'X-BingApis-SDK': 'true',
                    'X-RapidAPI-Key': '77bd12c926msh288972a4c534cedp1d8669jsnc3609c71780b',
                    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
                }
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
                setData(response.data.value)
            }).catch(function (error) {
                console.error(error);
            });
        }
        getTrendingNews();
    }, []
    )

    const getNews = (e) => {
        e.preventDefault();

        const options = {
            method: 'GET',
            url: 'https://bing-news-search1.p.rapidapi.com/news/search',
            params: { q: query, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
            headers: {
                'X-BingApis-SDK': 'true',
                'X-RapidAPI-Key': '77bd12c926msh288972a4c534cedp1d8669jsnc3609c71780b',
                'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
            }
        };

        setIsLoading(true)
        axios
            .request(options).then(function (response) {
                setIsLoading(false)
                console.log(response.data.value);
                setData(response.data.value)
            }).catch(function (error) {
                setIsLoading(false)
                console.error(error);
            });
    }

    return (

        <div>
            <div className='navbar'>
                <form onSubmit={getNews}>
                    <input type="text" placeholder='Enter Your City Name'
                        onChange={(e) => { setQuery(e.target.value) }} id="inp" />
                    <button className='btn' type='submit'>Get News</button>
                </form>
            </div>

            <div>
                {(isLoading) ? "Loading..." : ""}
                <div className='fullpost'>
                    {data.map(eachPost => (
                        <div className='post' key={eachPost?.name}>

                            <h3>
                                <a href={eachPost?.url}
                                    target='_blank' rel='noreferrer'>
                                    {eachPost?.name}</a>
                            </h3>
                            <span>
                                {moment(eachPost?.datePublished)
                                    .format('Do MMMM YYYY, h:mm a')}
                            </span>

                            <h6>{eachPost?.description} </h6>
                            <img src={
                                eachPost?.image?.thumbnail?.contentUrl
                                    .replace("&pid=News", '')
                                    .replace('pid=News&', '')
                                    .replace('pid=News', '')} className='img' alt="" />
                        </div>))}
                </div>

            </div>
        </div>
    );
}
export default Paper;