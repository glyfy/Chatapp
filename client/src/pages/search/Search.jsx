import "./search.css";
import Topbar from "../../components/topbar/Topbar";
import {useEffect, useState} from "react";
import {axiosInstance} from "../../axios.js";
import {useLocation} from "react-router-dom";
export default function Search() {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const queryValue = queryParam.get('query');
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    const getSearchResults = async () => {
      const res = await axiosInstance.get(`/users/search/${queryValue}`)
      const results = res.data;
      console.log(results)
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
              <div className="searchResult">
                <img src="/images/noAvatar.png" alt="" className="searchResultImg" />
                <span className="searchResultName">Name</span>
                <div className="followButton">Follow</div>
              </div>
              ))
            }
          </div>
        </div>
    </>
  )
}
