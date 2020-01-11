import React from "react";
import "./text.css";

const initialText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
  "Aenean eleifend rutrum libero, finibus congue dolor tempor id. " +
  "Nam interdum orci in massa imperdiet viverra. Duis neque libero, tempor ut leo in," +
  " porta volutpat ipsum. Nullam non turpis ex. Aliquam erat volutpat. Ut ante libero," +
  " vestibulum interdum ullamcorper ac, faucibus id metus. " +
  "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." +
  " Maecenas consectetur, odio non maximus elementum, leo nisi imperdiet nunc, " +
  "nec vehicula quam nisl vitae mi. Aliquam erat volutpat.";

export default class Text extends React.Component {
  setColor = ({inputType, color}) => {
    if (inputType === "textColor")
      this.textNode.style.color = color;
    else
      this.textNode.style.backgroundColor = color;
  };

  setText = (text) => {
    if (this.textNode) {
      this.setColor(this.props.colorData);
    }
    return text;
  };

  render() {
    return (
      <div className="text" ref={node => (this.textNode = node)}>{this.setText(initialText)}</div>
    );
  }

}
