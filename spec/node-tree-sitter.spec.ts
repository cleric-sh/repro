
import _ from 'lodash';
import Parser from 'tree-sitter';
import MyGrammar from '../bindings/node';
import { ITreeCursor, traverseDepth } from './traverseDepth';

describe('node-tree-sitter', () => {
    
    it('does stuff', () => {
        const parser = new Parser();        
        parser.setLanguage(MyGrammar);

        const previousText = `service foo service bar`;
        const previousTree = parser.parse(previousText)

        const editedText = `service foo service baz service bar`;        

        // Edit previousTree, describing the insertion of 'service baz', to get editedTree.

        const insertAt = 12;
        const insertLength = editedText.length - previousText.length;
        const insertEnd = insertAt + insertLength;

        previousTree.edit({
            startIndex: insertAt,
            oldEndIndex: insertAt,
            newEndIndex: insertEnd,
            startPosition: { row: 0, column: insertAt },
            oldEndPosition: { row: 0, column: insertAt },
            newEndPosition: { row: 0, column: insertEnd }
        })

        const editedTree = parser.parse(editedText, previousTree);
        

        // Walk both trees depth-first, to get a linear representation of all syntax nodes.

        const previousNodes: Parser.SyntaxNode[] = [];
        const editedNodes: Parser.SyntaxNode[] = [];

        function toITreeCursor(cursor: Parser.TreeCursor): ITreeCursor<Parser.SyntaxNode> {
            return {
                currentNode: () => cursor.currentNode,
                gotoFirstChild: () => cursor.gotoFirstChild(),
                gotoNextSibling: () => cursor.gotoNextSibling(),
                gotoParent: () => cursor.gotoParent()
            }
        }

        traverseDepth(toITreeCursor(previousTree.walk()), (node) => {
            previousNodes.push(node)
        })

        traverseDepth(toITreeCursor(editedTree.walk()), (node) => {
            editedNodes.push(node)
        })

        expect(previousNodes.length).toBeGreaterThan(0);
        expect(editedNodes.length).toBeGreaterThan(0);

        /**
         * INSIGHT
         * node-tree-sitter does not provide node.id, like web-tree-sitter does.
         * 
         * QUESTION
         * is this because in web-tree-sitter, the WASM bridge requires new node instances, and there would be no other way to relate node object instances?
         */
        // Compare all node ids, to see how many have been re-used.
        // const intersectingNodeIds = _.intersection(previousNodes.map(n => n.id), editedNodes.map(n => n.id));        
        // expect(intersectingNodeIds.length).toBe(0)

        // Compare the nodes referentially, to see if any node objects have been re-used.
        const intersectingNodes = _.intersection(previousNodes, editedNodes);

        // No node objects have been re-used either.
        expect(intersectingNodes.length).toBe(0)

        // In the above, I would have expected nodes related to 'service foo' and 'service bar' to be re-used.
    })
})