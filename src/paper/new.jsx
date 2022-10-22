   import{useState} from 'react' 
   import './new.css'
   import axios from 'axios'
   import moment from 'moment'
   
//    const axios = require('axios').default

   function Paper (){
    const [data, setData]=useState([]);
    const [query, setQuery]=useState('');

    const getNews =(e)=>{
        e.preventDefault();

        const options = {
          method: 'GET',
          url: 'https://bing-news-search1.p.rapidapi.com/news/search',
          params: {q: query, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off'},
          headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Key': '77bd12c926msh288972a4c534cedp1d8669jsnc3609c71780b',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
          }
        };
        
        axios.request(options).then(function (response) {
            console.log(response.data.value);
            setData(response.data.value)
        }).catch(function (error) {
            console.error(error);
        });
    }


    return(
        <div>
<form onSubmit={getNews}>
    <input type="text" placeholder='Enter Your City Name' 
     onChange={(e)=>
     {setQuery(e.target.value)} }  id="" />
    <button type='submit'>Get News</button>

</form>
<div>
    {data.map(eachPost=> (
    <div className='post' key={eachPost.name}>
        <h1>{eachPost.name} </h1>
        <span>{moment(eachPost.datePublished)
        .format('Do MMMM YYYY, h:mm a')}</span>
        <h3>{eachPost.description} </h3>
        </div>))}
</div>

        </div>
    );
   }
   export default Paper;