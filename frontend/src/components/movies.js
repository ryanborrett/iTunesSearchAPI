import React from "react";
import axios from "axios";
import "../search.css";
import loader from "../loader.gif";
import PageNavigation from "./PageNavigation";
import Favourite from "./Favourite";
import { Button } from "reactstrap";

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      Results: {},
      loading: false,
      message: "",
      totalResult: 0,
      totalPages: 0,
      currentPageNo: 0,
      favouriteList: []
    };
    this.cancel = "";
  }

  getPageCount = (total, denominator) => {
    const divisible = 0 === total % denominator;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  };

  componentWillMount = (updatedPageNo = "", query) => {
    // to get page number automatically
    let pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : "";
    const searchUrl = `/movies/${query}/${pageNumber}`;

    // to cancel results if user back space and types in new request
    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();

    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token
      })
      .then(res => {
        //   get response of total results
        const total = res.data.resultCount;
        const totalPagesCount = this.getPageCount(total, 20);
        const resultNotFound = !res.data.results.length
          ? "There are no more search results. Please try a new search"
          : "";
        //   set state
        this.setState({
          Results: res.data.results,
          message: resultNotFound,
          totalResult: total,
          totalPages: totalPagesCount,
          currentPageNo: updatedPageNo,
          loading: false
        });
      })
      .catch(error => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to fetch the data"
          });
        }
      });
  };

  handleOnInputChange = event => {
    const query = event.target.value;
    //if nothing on query set state to empty
    if (!query) {
      this.setState({
        query,
        Results: {},
        message: "",
        totalPages: 0,
        totalResult: 0
      });
    } else {
      this.setState({ query: query, loading: true, message: "" }, () => {
        this.componentWillMount(1, query);
      });
    }
  };

  handlePageClick = (type, e) => {
    e.preventDefault();
    const updatedPageNo =
      "Prev" === type
        ? this.state.currentPageNo - 1
        : this.state.currentPageNo + 1;

    // check our page current state
    if (!this.state.loading) {
      this.setState({ loading: true, message: "" }, () => {
        this.componentWillMount(updatedPageNo, this.state.query);
      });
    }
  };

  //addToFavourite
  addToFavourite = (index, previewUrl, trackName, artworkUrl100) => {
    const { favouriteList } = this.state;

    let item = {
      id: index,
      link: previewUrl,
      title: trackName,
      img: artworkUrl100
    };

    this.setState({ favouriteList: [...favouriteList, item] });

    console.log(favouriteList);
  };

  renderSearchResults = () => {
    const { Results } = this.state;
    // set state for search results
    if (Object.keys(Results).length && Results.length) {
      return (
        <div className="results-container">
          {Results.map((result, index) => {
            return (
              <div className="result-item">
                <a key={index} href={result.previewUrl}>
                  <h6 className="image-username">{result.trackName}</h6>
                  <div className="image-wraper">
                    <img
                      className="image"
                      src={result.artworkUrl100}
                      alt={result.trackName}
                      s
                    />
                  </div>
                </a>
                <div>
                  <Button
                    color="outline-success"
                    size="sm"
                    onClick={this.addToFavourite.bind(
                      this,
                      index,
                      result.previewUrl,
                      result.trackName,
                      result.artworkUrl100
                    )}
                  >
                    addToFavorite
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  render() {
    const {
      query,
      loading,
      message,
      currentPageNo,
      totalPages,
      favouriteList
    } = this.state;
    // next and previous page handle
    const showPrevLink = 1 < currentPageNo;
    const showNextLink = totalPages > currentPageNo;
    console.log(favouriteList);

    return (
      <div className="container">
        {/* favourite pass props */}
        <Favourite favouriteList={favouriteList} />

        {/* Heading*/}
        <h2 className="heading">Search For Movies Below</h2>
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            name="query"
            value={query}
            id="search-input"
            placeholder="Search..."
            onChange={this.handleOnInputChange}
          />
          <i className="fa fa-search search-icon" aria-hidden="true" />
        </label>

        {/* Message */}
        {message && <p className="message"> {message}</p>}

        {/*loader */}
        <img
          src={loader}
          className={`search-loading ${loading ? "show" : "hide"}`}
          alt="loader"
        />

        {/* Navigation */}
        <PageNavigation
          loading={loading}
          showPrevLink={showPrevLink}
          showNextLink={showNextLink}
          handlePrevClick={e => this.handlePageClick("prev", e)}
          handleNextClick={e => this.handlePageClick("next", e)}
        />

        {/* Results */}
        {this.renderSearchResults()}

        {/* Navigation */}
        <PageNavigation
          loading={loading}
          showPrevLink={showPrevLink}
          showNextLink={showNextLink}
          handlePrevClick={e => this.handlePageClick("prev", e)}
          handleNextClick={e => this.handlePageClick("next", e)}
        />
      </div>
    );
  }
}

export default Movies;
