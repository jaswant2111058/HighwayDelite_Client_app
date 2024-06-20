import { Component, ReactNode } from "react";
import SVG from "../assets/svg";

class Icon extends Component<any> {
  TYPE = {
    SVG: "svg",
  };

  renderInlineSvg(): ReactNode {
    const { className, src } = this.props;
    const cName = className || src;
    const InlineSVG = SVG[src];

    return InlineSVG ? (
      <span className={`xen__icon ${cName !== "" ? `${cName}` : ""}`}>
        <InlineSVG {...this.props} />
      </span>
    ) : null;
  }

  render(): ReactNode {
    return this.renderInlineSvg();
  }
}

export default Icon;
