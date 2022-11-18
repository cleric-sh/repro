import _ from 'lodash';
import type Parser from 'web-tree-sitter';
import { getParser } from './getParser';
import { traverseDepth } from './traverseDepth';


describe('my_grammar', () => {

    it('should do stuff', async () => {
        
        const parser = await getParser();

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

        traverseDepth(previousTree.walk(), (node) => {
            previousNodes.push(node)
        })

        traverseDepth(editedTree.walk(), (node) => {
            editedNodes.push(node)
        })

        expect(previousNodes.length).toBeGreaterThan(0);
        expect(editedNodes.length).toBeGreaterThan(0);
        

        // Compare all node ids, to see how many have been re-used.
        const intersectingNodeIds = _.intersection(previousNodes.map(n => n.id), editedNodes.map(n => n.id));
        
        // Unfortunately, no node ids have been re-used.
        expect(intersectingNodeIds.length).toBe(0)

        // Compare the nodes referentially, to see if any node objects have been re-used.
        const intersectingNodes = _.intersection(previousNodes, editedNodes);

        // No node objects have been re-used either.
        expect(intersectingNodes.length).toBe(0)

        // In the above, I would have expected nodes related to 'service foo' and 'service bar' to be re-used.


        /**
         * IDEA
         * It could be that it's the WASM bridge that web-tree-sitter uses.
         * Let's:
         * - [ ] reproduce this in node-tree-sitter
         */
        
    })
})