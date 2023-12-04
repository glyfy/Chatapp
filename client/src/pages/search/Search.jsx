import "./search.css";
import Topbar from "../../components/topbar/Topbar";
import Searchresult from "../../components/searchresult/Searchresult";
import {useEffect, useState, useContext} from "react";
import {axiosInstance} from "../../axios.js";
import {useLocation} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.js";
export default function Search() {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const queryValue = queryParam.get('query');
  const [searchResults, setSearchResults] = useState([]);
  const {dispatch, user} = useContext(AuthContext);

  useEffect(() => {
    const getSearchResults = async () => {
      const res = await axiosInstance.get(`/users/search/${queryValue}`)
      const results = res.data;
      setSearchResults(results);
    } 
    getSearchResults();
  }, [queryValue])

  return (
    <>
        <Topbar/>
        <div className="searchPage">
          <div className="searchResultsWrapper">
            {
              searchResults.map((searchResult) => (
                <Searchresult key={searchResult._id} user={searchResult}/>
              ))
            }
          </div>
        </div>
    </>
  )
}
