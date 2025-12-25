import React, { Component, MouseEvent, ReactNode } from "react";

import { cn } from "@/utils/common.util";

import Truncate from "./Truncate";

interface ShowMoreTextProps {
  children: ReactNode;
  lines?: number;
  more?: ReactNode;
  less?: ReactNode;
  anchorClass?: string;
  className?: string;
  onClick?: (expanded: boolean, event: MouseEvent<HTMLSpanElement>) => void;
  expanded?: boolean;
  width?: number;
  keepNewLines?: boolean;
  truncatedEndingComponent?: ReactNode;
  expandByClick?: boolean;
  onTruncate?: () => void;
}

interface ShowMoreTextState {
  expanded: boolean;
  truncated: boolean;
}

class ShowMoreText extends Component<ShowMoreTextProps, ShowMoreTextState> {
  private _isMounted = false;
  private truncateRef: Truncate | null = null;

  static defaultProps = {
    lines: 3,
    more: "Show more",
    less: "Show less",
    anchorClass: "show-more-less-clickable",
    onClick: undefined,
    expanded: false,
    width: 0,
    keepNewLines: false,
    truncatedEndingComponent: "... ",
    expandByClick: true,
    onTruncate: undefined,
  };

  constructor(props: ShowMoreTextProps) {
    super(props);

    this.state = {
      expanded: false,
      truncated: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.setState({
        expanded: this.props.expanded || false,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleTruncate = (truncated: boolean) => {
    if (this._isMounted && truncated !== this.state.truncated) {
      this.setState({
        truncated,
      });
      if (truncated && this.truncateRef) {
        this.truncateRef.onResize();
      }
      this.props.onTruncate && this.props.onTruncate();
    }
  };

  toggleLines = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();

    if (!this.props.expandByClick) {
      if (this.props.onClick) {
        this.props.onClick(this.state.expanded, event);
      }

      return;
    }

    if (this._isMounted) {
      this.setState(
        (prevState) => ({
          expanded: !prevState.expanded,
        }),
        () => {
          if (this.props.onClick) {
            this.props.onClick(this.state.expanded, event);
          }
        },
      );
    }
  };

  render() {
    const {
      children,
      more,
      less,
      lines,
      anchorClass,
      className,
      width,
      keepNewLines,
      truncatedEndingComponent,
    } = this.props;

    const { expanded, truncated } = this.state;

    return (
      <div className={className}>
        <Truncate
          width={width}
          lines={!expanded && lines}
          ellipsis={
            <span className="whitespace-pre-wrap">
              {truncatedEndingComponent}
              <span
                className={cn(anchorClass, "whitespace-pre-wrap")}
                onClick={this.toggleLines}
              >
                {more}
              </span>
            </span>
          }
          onTruncate={this.handleTruncate}
          ref={(ref: any) => (this.truncateRef = ref)}
        >
          {keepNewLines
            ? children!
                .toString()
                .split("\n")
                .map((line: any, i, arr) => {
                  line = (
                    <span key={i} className="whitespace-pre-wrap">
                      {line}
                    </span>
                  );

                  if (i === arr.length - 1) {
                    return line;
                  } else {
                    return [line, <br key={i + "br"} />];
                  }
                })
            : children}
        </Truncate>
        {!truncated && expanded && (
          <span>
            {" "}
            <span
              className={cn(anchorClass, "whitespace-pre-wrap")}
              onClick={this.toggleLines}
            >
              {less}
            </span>
          </span>
        )}
      </div>
    );
  }
}

export default ShowMoreText;
