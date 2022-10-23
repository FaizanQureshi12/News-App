   import{useState,useEffect} from 'react' 
   import './new.css'
   import axios from 'axios'
   import moment from 'moment'
   

   function Paper (){
    const [data, setData]=useState([]);
    const [query, setQuery]=useState('');
    const [isLoading, setIsLoading]=useState(false);

        useEffect(()=>{
        function getTrendingNews(){

            const options = {
                method: 'GET',
                url: 'https://bing-news-search1.p.rapidapi.com/news',
                params: {safeSearch: 'Off', textFormat: 'Raw'},
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
    },[]
    )

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

    return(
        <div>
    <form onSubmit={getNews}>
    <input type="text" placeholder='Enter Your City Name' 
     onChange={(e)=>
     {setQuery(e.target.value)} }  id="" />
    <button type='submit'>Get News</button>
        </form>
        <div>

    {(isLoading)? "Loading...":""}
    {data.map(eachPost=> (
    <div className='post' key={eachPost?.name}>

        <h2>
            <a href={eachPost?.url}
            target='_blank' rel='noreferrer'> 
            {eachPost?.name}</a>  
        </h2>
        <span>
            {moment(eachPost?.datePublished)
        .format('Do MMMM YYYY, h:mm a')}
        </span>

        <h5>{eachPost?.description} </h5>
        <img src={
            eachPost?.image?.thumbnail?.contentUrl
            .replace("&pid=News",'')
            .replace('pid=News&','')
            .replace('pid=News','')} alt="" />
           </div>))}
       </div>
 </div>
    );
   }
   export default Paper;