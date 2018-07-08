import { keyframes } from 'styled-components'

const errors = {
  INVALID_SPACES:'INVALID_SPACES',
  INVALID_INPUT:'INVALID_INPUT'
}

 /**
   * Counts the number of spcaes at the beginning of a line of text.
   * @param text A line of text
   */
const countBeginningSpaces = function(text){
    
    const patt = new RegExp('^( *)')

    const count = patt.exec(text) //?
    
    return count[1].length;
};

/**
* Takes a block of text and parses it into a tree structure.
* @param input Block of text 
*/
function parseTree(input) {
  const nodes = input.split('\n');
  /**
   * Creates a child node.
   * @param text The title of the node.
   */
  const createChildNode = (text) => {
      return {
          title: text.trim(),
          isRoot: false,
          children: []
      }
  };
 
  /**
   * Throws an error for invalid inputs.
   * @param nodeText The line of text where the error occured.
   * @param type The type of error that was found.
   */
  const throwInvalidInput = ({node:nodeText, index:lineNumber}, type) => {
      if(type === errors.INVALID_SPACES)
          throw new Error(`The line ${lineNumber + 1}:'${nodeText.trim()}' does not include an even amount of spaces.`);
      if(type === errors.INVALID_INPUT)
          throw new Error(`Please check your input at line ${lineNumber + 1}:'${nodeText.trim()}' for the correct number of spaces for each step.`);
  };
  /**
   * Finds the heirarchy level of a line of text based on a 2 spacing criteria.
   * @param nodeText The line of text to find the level of.
   */
  const nodeLevel = (nodeText) => {
      const count = countBeginningSpaces(nodeText)
      return count / 2;
  };
  /**
   * Validates the input.
   * @throws ${errors} if the input is invalid.
   * @param input the input text
   */
  const validateInput = (input) => {
      input.split('\n').reduce((prev, node, index) => {
          let currentCount = countBeginningSpaces(node)

          if(currentCount - prev > 2)
              throwInvalidInput({node, index}, errors.INVALID_INPUT);
          else if(currentCount % 2 !== 0)
              throwInvalidInput({node, index},  errors.INVALID_SPACES);
          return currentCount
      }, 0)
  };

  validateInput(input);
  
  const rootNode = {
      title: null,
      isRoot: true,
      children: []
  };
  /**
   * Creates the tree structure starting from the root node.
   * @param currentNode The node to be set in the tree.
   * @param stack An array stack that holds the current parent nodes. Holds the rootNode initially.
   * @param nodeIter An iterator of the lines that will be added to tree.
   */
  const createTree = (currentNode, stack, nodeIter) => {
      if (stack.length) {
          if (currentNode) {
              let nextLevel = nodeLevel(currentNode)
              let nextNode = createChildNode(currentNode)
              if (nextLevel > stack.length - 2) {
                  stack.slice(-1)[0].children.push(nextNode)
                  createTree(nodeIter.next().value, stack.concat(nextNode), nodeIter)
              } else if (stack.length - 2 === nextLevel) {
                  stack.pop()
                  createTree(currentNode, stack, nodeIter)
              } else if (nextLevel < stack.length - 2) {
                  stack.pop()
                  createTree(currentNode, stack, nodeIter)
              }
          }
      }
  };

  const nodeIter = nodes[Symbol.iterator]();
  createTree(nodeIter.next().value, [rootNode], nodeIter);

  return rootNode;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }`
export {
  parseTree, 
  fadeIn
}