import { useState, useCallback, useEffect, useRef } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { dracula } from "@uiw/codemirror-theme-dracula";

const DARK_MODE = false;

const defaultCode = `-- Write your SQL query here

SELECT * 
FROM users;
`;

export function QueryEditor({ height }: { height?: number }) {
  const [value, setValue] = useState(defaultCode);
  const onChange = useCallback((val: string, _viewUpdate: any) => {
    setValue(val);
  }, []);
  return (
    <CodeMirror
      value={value}
      height={height ? `${height}px` : "100px"}
      theme={DARK_MODE ? dracula : undefined}
      extensions={[sql()]}
      onChange={onChange}
    />
  );
}

export function QueryOutput() {
  return <div className="" />;
}

export default function QueryConsolePage() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
      console.log("height:", ref.current.clientHeight);
    }
  }, [ref]);
  const [queryPanelPct, setQueryPanelPct] = useState(0.5);
  return (
    <div className="h-full">
      <div className="h-[40px]">
        <p>Test</p>
      </div>
      <div
        ref={ref}
        className="h-[calc(100%-40px)]"
        onResize={(event) => setHeight(event.currentTarget.clientHeight)}
      >
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel onResize={(size) => setQueryPanelPct(size / 100)}>
            <QueryEditor height={height * queryPanelPct} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <QueryOutput />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
