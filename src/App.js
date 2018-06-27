import React, { Component } from 'react';
import { parseTree, fadeIn } from './utils'
import Tree from './components/Tree'
import styled from 'styled-components'

const TreeTextArea = styled.textarea.attrs({placeholder:"Example:\npage 1\n  page 1.1\n  page 1.2\n    page 1.2.1\n    page 1.2.2\npage 2\npage 3\n  page 3.1\n  page 3.2\npage 4"})`
  border: none;
  width: 100%;
`
const AppTitle = styled.h1`
  text-align: center;
  font-family: 'Open Sans';
`

const ErrorMessage = styled.div`
  font-family: 'Open Sans';
  text-align: center;
  background: #791912;
  color: #fff;
  padding-top: 30px; 
  padding-bottom: 30px;
  animation: ${fadeIn} .32s ease-out 1; 
`
class App extends Component {
  constructor(){
    super();
    this.state = {
      error: '',
      tree: [],
      history: [],
      currentHead: null
    }
  }
  updateTree = ({ target }) => {
    try {
      this.setTree(parseTree(target.value))
      this.setInputError('')
    } catch (error) {
      this.setInputError(error)
    }
    
  }
  setTree = (tree) => {
    this.setState({ tree, currentHead: tree })
  }
  setCurrentHead = (nextHead) => {
    const { currentHead, history } = this.state
    if(nextHead.children.length)
      this.setState({ currentHead:nextHead, history:[ currentHead, ...history ] })
  }
  goToPreviousHead = () => {
    const { history } = this.state
    if(history.length) {
      const [last, ...newHistory] = history
      this.setState({ history: newHistory, currentHead: last })
    }
  } 
  setInputError(error){
    this.setState({ error })
  }
  render() {
    const { error, currentHead } = this.state

    return (
      <div>
        <AppTitle>My Tree</AppTitle>
        <TreeTextArea onChange={ this.updateTree } name="tree-area" id="tree-area" cols="30" rows="10"></TreeTextArea>
        { error && <ErrorMessage>{error.message}</ErrorMessage>}
        { !error && currentHead && 
          <Tree title={currentHead.title} 
                isRoot={currentHead.isRoot} 
                leafs={currentHead.children} 
                setHead={this.setCurrentHead}
                previousHead={this.goToPreviousHead}> </Tree>
        }
      </div>
    );
  }
}

export default App;
