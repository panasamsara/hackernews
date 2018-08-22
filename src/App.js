import React, { Component } from 'react';
import './App.css';
import Search from './Search.js'
import Button from './Button.js'

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;


function isSearched(searchTerm){
  return function(item){
    return item.title.toLowerCase().includes(searchTerm.toLowerCase() )
  }
}
class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    }
    this.setSearchTopStories = this.setSearchTopStories.bind(this); 
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
  }
  setSearchTopStories(result) {
    this.setState({ result });
  }
  fetchSearchTopStories(searchTerm) {
      fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
        .then(response => response.json())
        .then(result => this.setSearchTopStories(result))
        .catch(e => e);
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }
  onDismiss(id){
    // const updatedList = this.state.list.filter(function isNotId(item){
    //   return item.objectID !== id
    // })
    const isNotId = item => item.objectID !== id
    const updateHits = this.state.result.hits.filter(isNotId)
    this.setState({
      result: Object.assign({}, this.state.result, {hits: updateHits})
    })
  }
  onSearchChange(event){
    console.log(event.target.value)
    this.setState({
      searchTerm: event.target.value
    })
  }
  render() {
   const {searchTerm, result} = this.state
   if(!result){return null}
    return (
      <div className="page">
          <div className="interactions">
              <Search value={searchTerm} onChange={this.onSearchChange}>搜索</Search>
          </div>

          <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss}/>
      </div>
    );
  }
}



class Table extends Component{
  render(){
    const {list, pattern, onDismiss} = this.props
    return (
      <div className="table">
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID} className="table-row">
            <span style={{ width: '40%' }}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={{ width: '30%' }}>{item.author}</span>
            <span style={{ width: '10%' }}>{item.num_comments}</span>
            <span style={{ width: '10%' }}>{item.points} </span>
            <span style={{ width: '10%' }}>
                <Button
                    onClick={ ()=>onDismiss(item.objectID) }
                    className="button-inline"
                >删除</Button>
            </span>
        </div> )}
      </div>
    )
  }
}

export default App;
