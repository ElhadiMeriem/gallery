/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';

function Gallery() {
  const [hits, setHits] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage , setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);

  const getHits = () => {
    let apiKey = "41895282-8ab668c5a4933da861a850b59";
    let pageSize = 10;
    let url = "https://pixabay.com/api/?key=" + apiKey + "&q=" + keyword + "&image_type=photo&page=" +currentPage+ "&per_page=" + pageSize;
    axios.get(url).then((resp) => {
      const total = (resp.data.totalHits % pageSize === 0 ? resp.data.totalHits / pageSize : 1 + resp.data.totalHits / pageSize);
      setPages(new Array(total).fill(0));
      setHits(resp.data.hits);
    }).catch((err => {
      console.log(err);
    })
    )
  };
  const getTopage =(i)=>
  {
    setCurrentPage(i);
    getHits();

  }
  const search = (e) => {
    e.preventDefault();
    getHits();
  };
  return (
    <div>
      <form onSubmit={search}>
        <div className="row m-2 p-2">
          <div className="col">
            <input type="text" className="form-control" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          </div>
          <div className="col-auto"><button className="btn btn-success" type="submit">Chercher</button></div>
        </div>
      </form>
      <div className="row">
        {
          hits.map((hit) => (
            <div className="col-md-4" key={hit.id}>
              <div className="card" >
                <div className="card-header">{hit.tags} | {hit.webformatWidth} x {hit.webformatHeight}</div>
                <div className="card-body">
                  <img className="card-img" height={200} src={hit.webformatURL} alt=""></img>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="row">
        <ul className="nav nav-pills">
          {
            pages.map((_,index) =>
              <li key={index}>
                <a className={currentPage===index+1 ? "btn btn-primary" : "btn"} onClick={()=>getTopage(index + 1)}>{index + 1}</a>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Gallery
