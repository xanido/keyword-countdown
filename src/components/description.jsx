import React from "react";

class Description extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      value: props.value,
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value);
  }

  stopEditing = () => {
    this.setState({ isEditing: false });
  }

  startEditing = () => {
    this.setState({ isEditing: true });
  }

  render() {
    const { isEditing, value } = this.state;
    return (
      isEditing
        ? (
          <textarea
            onChange={this.handleChange}
            onBlur={this.stopEditing}
            value={value}
            autoFocus
          />
        ) : (
          <div onClick={this.startEditing}>
            {value || 'Enter link here'}
          </div>
        )
    );
  }
}

export default Description;
