import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';

export default class Tree extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      treeData: [
        { title: 'Chickens', children: [{ title: 'Egg' }] },
        { title: 'Fish', children: [{ title: 'fingerline' }] }
      ],
    };
  }

  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}