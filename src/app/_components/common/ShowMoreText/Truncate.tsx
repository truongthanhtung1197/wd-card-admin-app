import React, { ReactNode } from "react";

interface TruncateProps {
  children?: ReactNode;
  ellipsis?: ReactNode;
  lines?: number | false;
  trimWhitespace?: boolean;
  width?: number;
  onTruncate?: (didTruncate: boolean) => void;
}

interface TruncateState {
  targetWidth?: number;
}

export default class Truncate extends React.Component<
  TruncateProps,
  TruncateState
> {
  static defaultProps = {
    children: "",
    ellipsis: "…",
    lines: 1,
    trimWhitespace: false,
    width: 0,
  };

  state: TruncateState = {};

  private elements: { [key: string]: HTMLElement | null } = {};
  private replacedLinks: any[] = [];
  private canvasContext: CanvasRenderingContext2D | null = null;
  private timeout: number = 0;

  constructor(props: TruncateProps) {
    super(props);
  }

  componentDidMount() {
    const { text } = this.elements;
    const { calcTargetWidth, onResize } = this;

    const canvas = document.createElement("canvas");
    this.canvasContext = canvas.getContext("2d");

    calcTargetWidth(() => {
      if (text && text.parentNode) {
        text.parentNode.removeChild(text);
      }
    });

    window.addEventListener("resize", onResize);
  }

  componentDidUpdate(prevProps: TruncateProps) {
    if (this.props.children !== prevProps.children) {
      this.forceUpdate();
    }

    if (this.props.width !== prevProps.width) {
      this.calcTargetWidth();
    }
  }

  componentWillUnmount() {
    const { ellipsis } = this.elements;
    const { onResize, timeout } = this;

    if (ellipsis?.parentNode) {
      ellipsis.parentNode.removeChild(ellipsis);
    }

    window.removeEventListener("resize", onResize);
    window.cancelAnimationFrame(timeout);
  }

  extractReplaceLinksKeys = (content: string) => {
    let i = 0;
    this.replacedLinks = [];

    content = content.replace(
      /(<a[\s]+([^>]+)>((?:.(?!<\/a>))*.)<\/a>)/g,
      (_match, ...args) => {
        const item = args.slice(0, 3);
        const key = "[" + "@".repeat(args[2].length - 1) + "=" + i++ + "]";
        item.push({ key });
        this.replacedLinks.push(item);

        return key;
      },
    );

    return content;
  };

  restoreReplacedLinks = (content: string) => {
    this.replacedLinks.forEach((item) => {
      content = content.replace(item[3].key, item[0]);
    });

    return this.createMarkup(content);
  };

  innerText = (node: HTMLElement) => {
    const div: any = document.createElement("div");
    const contentKey: any =
      "innerText" in window.HTMLElement.prototype ? "innerText" : "textContent";

    const content = node.innerHTML.replace(/\r\n|\r|\n/g, " ");
    div.innerHTML = this.extractReplaceLinksKeys(content);

    let text = div[contentKey];

    const test: any = document.createElement("div");
    test.innerHTML = "foo<br/>bar";

    if (test[contentKey].replace(/\r\n|\r/g, "\n") !== "foo\nbar") {
      div.innerHTML = div.innerHTML.replace(/<br.*?[\/]?>/gi, "\n");
      text = div[contentKey];
    }

    return text;
  };

  onResize = () => {
    this.calcTargetWidth();
  };

  onTruncate = (didTruncate: boolean) => {
    const { onTruncate } = this.props;

    if (typeof onTruncate === "function") {
      this.timeout = window.requestAnimationFrame(() => {
        onTruncate(didTruncate);
      });
    }
  };

  calcTargetWidth = (callback?: () => void): any => {
    const { target }: any = this.elements;
    const { width } = this.props;

    if (!target) {
      return;
    }

    const targetWidth =
      width ||
      Math.floor(target.parentNode?.getBoundingClientRect().width || 0);

    if (!targetWidth) {
      return window.requestAnimationFrame(() => this.calcTargetWidth(callback));
    }

    const style: any = window.getComputedStyle(target);

    const font = [
      style["font-weight"],
      style["font-style"],
      style["font-size"],
      style["font-family"],
    ].join(" ");

    if (this.canvasContext) {
      this.canvasContext.font = font;
    }

    this.setState({ targetWidth }, callback);
  };

  measureWidth = (text: string) => {
    return this.canvasContext?.measureText(text).width || 0;
  };

  ellipsisWidth = (node: HTMLElement) => {
    return node.offsetWidth;
  };

  trimRight = (text: string) => {
    return text.replace(/\s+$/, "");
  };

  createMarkup = (str: string) => {
    return <span dangerouslySetInnerHTML={{ __html: str }} />;
  };

  getLines = () => {
    const { text } = this.elements;
    const { lines: numLines, ellipsis, trimWhitespace } = this.props;
    const { targetWidth } = this.state;

    const lines = [];
    const textContent = this.innerText(text!);
    const textLines = textContent
      .split("\n")
      .map((line: any) => line.split(" "));
    let didTruncate = true;
    const ellipsisWidth = this.ellipsisWidth(this.elements.ellipsis!);

    for (let line = 1; Number(line) <= Number(numLines)!; line++) {
      const textWords = textLines[0];

      if (textWords.length === 0) {
        lines.push(<br key={line} />);
        textLines.shift();
        line--;
        continue;
      }

      let resultLine = textWords.join(" ");

      if (this.measureWidth(resultLine) <= targetWidth!) {
        if (textLines.length === 1) {
          didTruncate = false;
          resultLine = this.restoreReplacedLinks(resultLine);
          lines.push(<span key={line}>{resultLine}</span>);
          break;
        }
      }

      if (line === numLines) {
        const textRest = textWords.join(" ");

        let lower = 0;
        let upper = textRest.length - 1;

        while (lower <= upper) {
          const middle = Math.floor((lower + upper) / 2);
          const testLine = textRest.slice(0, middle + 1);

          if (this.measureWidth(testLine) + ellipsisWidth <= targetWidth!) {
            lower = middle + 1;
          } else {
            upper = middle - 1;
          }
        }

        let lastLineText = textRest.slice(0, lower);

        if (trimWhitespace) {
          lastLineText = this.trimRight(lastLineText);

          while (!lastLineText.length && lines.length) {
            const prevLine = lines.pop();
            lastLineText = this.trimRight(prevLine!.toString());
          }
        }

        if (lastLineText.substr(lastLineText.length - 2) === "][") {
          lastLineText = lastLineText.substring(0, lastLineText.length - 1);
        }

        lastLineText = lastLineText.replace(/\[@+$/, "");
        lastLineText = this.restoreReplacedLinks(lastLineText);

        resultLine = (
          <span key={line}>
            {lastLineText}
            {ellipsis}
          </span>
        );
      } else {
        let lower = 0;
        let upper = textWords.length - 1;

        while (lower <= upper) {
          const middle = Math.floor((lower + upper) / 2);
          const testLine = textWords.slice(0, middle + 1).join(" ");

          if (this.measureWidth(testLine) <= targetWidth!) {
            lower = middle + 1;
          } else {
            upper = middle - 1;
          }
        }

        if (lower === 0) {
          line = Number(numLines)! - 1;
          continue;
        }

        resultLine = textWords.slice(0, lower).join(" ");
        resultLine = this.restoreReplacedLinks(resultLine);
        textLines[0].splice(0, lower);
      }

      lines.push(<span key={line}>{resultLine}</span>);
    }

    this.onTruncate(didTruncate);

    return lines;
  };

  renderLine = (line: ReactNode, i: number, arr: ReactNode[]) => {
    if (i === arr.length - 1) {
      return <span key={i}>{line}</span>;
    } else {
      const br = <br key={i + "br"} />;
      if (line) {
        return [<span key={i}>{line}</span>, br];
      } else {
        return br;
      }
    }
  };

  render() {
    const { target } = this.elements;
    const { children, ellipsis, lines, ...spanProps } = this.props;
    const { targetWidth } = this.state;

    let text;

    const mounted = !!(target && targetWidth);

    if (typeof window !== "undefined" && mounted) {
      if (Number(lines)! > 0) {
        text = this.getLines();
      } else {
        text = children;
        this.onTruncate(false);
      }
    }

    delete (spanProps as any).onTruncate;
    delete (spanProps as any).trimWhitespace;

    return (
      <span
        {...spanProps}
        ref={(targetEl) => {
          this.elements.target = targetEl;
        }}
      >
        <span
          style={{
            display: "block",
            maxWidth: spanProps.width! > 0 ? `${spanProps.width}px` : "unset",
          }}
        >
          {text}
        </span>
        <span
          ref={(textEl) => {
            this.elements.text = textEl;
          }}
        >
          {children}
        </span>
        <span
          ref={(ellipsisEl) => {
            this.elements.ellipsis = ellipsisEl;
          }}
          style={this.styles.ellipsis}
        >
          {ellipsis}
        </span>
      </span>
    );
  }

  private styles = {
    ellipsis: {
      position: "fixed",
      visibility: "hidden",
      top: 0,
      left: 0,
    } as React.CSSProperties,
  };
}
