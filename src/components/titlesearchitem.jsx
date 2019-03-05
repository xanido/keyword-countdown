import PropTypes from 'prop-types';
import React from 'react';

const TitleSearchItem = ({title}) => (
  <div>
    <img
      alt={title.label}
      src={title.poster}
      style={{
        height: '50px',
        marginRight: '10px',
        width: '35px',
      }}
    />
    <span>{title.label}</span>
  </div>
);

TitleSearchItem.propTypes = {
  title: PropTypes.shape({
    poster: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default TitleSearchItem;
