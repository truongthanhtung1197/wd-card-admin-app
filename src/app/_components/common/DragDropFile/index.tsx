import React from "react";

class DragDropFile extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  suppress(evt: any) {
    evt.stopPropagation();
    evt.preventDefault();
  }
  onDrop(evt: any) {
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files) this.props.handleFile(files);
  }
  render() {
    return (
      <div
        onDrop={this.onDrop}
        onDragEnter={this.suppress}
        onDragOver={this.suppress}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DragDropFile;
