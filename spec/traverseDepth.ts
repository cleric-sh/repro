import Parser from 'web-tree-sitter';



export function traverseDepth(cursor: Parser.TreeCursor, cb: (node: Parser.SyntaxNode, level: number) => boolean | undefined | void, level = 0) {

    cb(cursor.currentNode(), level);

    if (cursor.gotoFirstChild()) {
        traverseDepth(cursor, cb, level + 1);
        cursor.gotoParent();
    }

    if (cursor.gotoNextSibling()) {
        traverseDepth(cursor, cb);
    }
}
