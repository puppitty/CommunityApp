import React, { Component } from "react";
import API from "./../../utils/API";
import moment from "moment";

class News extends Component {
  state = {
    articles: []
    // q: "",
    // begin_date: "",
    // end_date: ""
  };

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    API.nytSearch({})
      .then(res => {
        console.log(res.data.results);
        this.setState({
          articles: res.data.results
        });
      })
      .catch(err => console.log(err));
  }

  articleSearch = event => {
    event.preventDefault();
    API.nytSearch({
      q: this.state.q
    })
      .then(res => {
        console.log(res.data);
        this.setState({
          articles: res.data.response.docs,
          q: ""
        });
      })
      .catch(err => console.log(err));
  };

  saveArticle = id => {
    const savedArticle = this.state.articles.find(
      article => article._id === id
    );
    console.log(savedArticle);
    API.articleSave({
      title: savedArticle.headline.main,
      url: savedArticle.web_url,
      date: savedArticle.pub_date || ""
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        {" "}
        <div className="container-fluid">
          <div className="row">
            {/* Form for article search */}
            {/* Article result container */}
            <div className="col-12">
              <h2>
                {this.state.articles.length
                  ? "Top News Stories"
                  : "Search for some articles"}
              </h2>

              <ul className="list-group list-group-flush">
                {this.state.articles.map(article => (
                  <li
                    key={article.title}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <a href={article.url} target="_blank">
                      <img
                        className="img-thumbnail"
                        style={{ width: "70px", height: "70px" }}
                        src={article.multimedia.length > 0 ? article.multimedia[0].url : 'http://via.placeholder.com/70x70'}
                        alt={article.title}
                      /> &nbsp;&nbsp;&nbsp;&nbsp;
                      <strong>{article.title} </strong> -{" "}
                      <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {article.abstract} -{" "}
                      {moment(article.updated_date).format(
                        "Do	MMMM YYYY hh:mm:ss a"
                      )}

                    </a>

                    {/*<span
                      className="badge badge-primary badge-pill"
                      onClick={() => this.saveArticle(article._id)}
                    >
                      Save Article
                    </span>*/}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
