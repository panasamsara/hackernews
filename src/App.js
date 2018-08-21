import React, { Component } from 'react';
import './App.css';
import Search from './Search.js'
import Button from './Button.js'

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  }, {
      title: 'Redux',
      url: 'https://github.com/reactjs/redux',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
  }
];
function isSearched(searchTerm){
  return function(item){
    return item.title.toLowerCase().includes(searchTerm.toLowerCase() )
  }
}
class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      list: list,
      searchTerm: ''
    }
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
  }
  onDismiss(id){
    const updatedList = this.state.list.filter(function isNotId(item){
      return item.objectID !== id
    })
    this.setState({
      list: updatedList
    })
  }
  onSearchChange(event){
    console.log(event.target.value)
    this.setState({
      searchTerm: event.target.value
    })
  }
  render() {
   const {searchTerm, list} = this.state
    return (
      <div className="page">
          <div className="interactions">
              <Search value={searchTerm} onChange={this.onSearchChange}>搜索</Search>
          </div>

          <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss}/>
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
