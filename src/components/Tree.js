import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fadeIn } from '../utils';

const StyledTree = styled.div`
  width: 100%;
`
const TreeLeaf = styled.li`
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  font-size: 2rem;
  text-align: center;
  background: ${props => props.length > 0 ? '#067936' : '#eee'};
  color: ${props => props.length > 0 ? '#fff' : '#067936'};
  transition: .45s;
  animation: ${fadeIn} .32s ease-out 1; 
  `
const TreeLeafs = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  padding: 0;
  list-style: none;
  @media (min-width: 350px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 762px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`
const TreeTitle = styled.h2`
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  text-transform: uppercase;
  small {
    font-size: .25rem;
    display: block;
  }
`
export default class Tree extends Component {
  static propTypes = {
    title: PropTypes.string,
    leafs: PropTypes.array,
    isRoot: PropTypes.bool,
    setHead: PropTypes.func,
    previousHead: PropTypes.func,
  }
    static defaultProps = {
      title: '',
    leafs: [],
    isRoot: true,
    setHead: ()=>{},
    previousHead: ()=>{}
  }
  render() {
    const { title, leafs, isRoot, setHead, previousHead } = this.props

    return (
      <StyledTree>
        <TreeTitle onClick={previousHead}>{!isRoot ? title : 'Top Level'} {!isRoot && <small>Click the title to go back up</small>}</TreeTitle>
        { leafs.map && 
          <TreeLeafs>
            {leafs.map((leaf, i) => (<TreeLeaf key={`${leaf.title}-${i}`} length={leaf.children.length} onClick={ () => { setHead(leaf) } }>{ leaf.title }</TreeLeaf>))}
          </TreeLeafs> }
      </StyledTree>
    )
  }
}
