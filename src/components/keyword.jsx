import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './keyword.scss';

const Keyword = ({ selected, children, onClick }) => {
  const keywordClass = classNames([
    'col-sm-4',
    styles.keyword,
    { [styles.selected]: selected },
  ]);
  return (
    <div className={keywordClass} onClick={onClick}>
      {children}
    </div>
  );
};

Keyword.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Keyword.defaultProps = {
  selected: false,
  onClick: () => {},
};

export default Keyword;
