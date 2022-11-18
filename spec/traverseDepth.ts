export type ITreeCursor<TNode> = {        
    currentNode(): TNode;
    gotoFirstChild(): boolean;
    gotoParent(): boolean;
    gotoNextSibling(): boolean;
}

export function traverseDepth<TNode>(cursor: ITreeCursor<TNode>, cb: (node: TNode, level: number) => boolean | undefined | void, level = 0) {

    cb(cursor.currentNode(), level);

    if (cursor.gotoFirstChild()) {
        traverseDepth(cursor, cb, level + 1);
        cursor.gotoParent();
    }

    if (cursor.gotoNextSibling()) {
        traverseDepth(cursor, cb);
    }
}
