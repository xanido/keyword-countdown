import React, {Component} from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';

import styles from "./sortablekeywords.scss";

const DragHandle = SortableHandle(() => <span className={styles.handle}></span>); // This can be any component you want
const DeleteButton = ({onClick}) => <span className={styles.delete} onClick={onClick}></span>;

const SortableItem = SortableElement(({value, onDelete}) => {
  return (
    <li className={styles.stylizedItem}>
      <DragHandle />
      <span className={styles.title}>{value}</span>
      <DeleteButton onClick={onDelete} />
    </li>
  );
});

const SortableList = SortableContainer(({items, onDelete}) => {
  return (
    <ul className={styles.stylizedList}>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} idx={index} value={value} onDelete={() => onDelete(index)}/>
      ))}
    </ul>
  );
});

class SortableKeywords extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keywords: props.keywords
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.keywords !== this.state.keywords) {
      this.setState({keywords: this.props.keywords})
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    const {keywords} = this.state;

    this.props.onSort(arrayMove(keywords, oldIndex, newIndex));
  };

  onDelete = (index) => {
    const {keywords} = this.state;
    keywords.splice(index, 1);
    this.props.onSort(keywords);
  }

  render() {
    const {keywords} = this.state;

    return <SortableList items={keywords} onSortEnd={this.onSortEnd} onDelete={this.onDelete} useDragHandle />;
  }
}

export default SortableKeywords;
