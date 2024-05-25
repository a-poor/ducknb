import { useState, useCallback, useEffect, useRef } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { Separator } from "@/components/ui/separator";
import { PlayCursorIcon } from "@/components/icons";
import IconButton from "@/components/IconButton";
import { Play, PanelRight, Bot, Square } from "lucide-react";
import testData from "@/test-data.json";

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
      <div className="max-h-[45px] flex space-x-2 items-center px-2 py-1">
        <IconButton label="Run Query" onClick={() => {}}>
          <Play className="h-5 w-5" />
        </IconButton>
        <IconButton label="Run Selected" onClick={() => {}}>
          <PlayCursorIcon />
        </IconButton>
        <IconButton label="Stop Query" onClick={() => {}}>
          <Square className="h-5 w-5" />
        </IconButton>
        <div className="flex-grow" />
        <IconButton label="Toggle SQL Assistant" onClick={() => {}}>
          <Bot className="h-5 w-5" />
        </IconButton>
        <IconButton label="Toggle Right Pannel" onClick={() => {}}>
          <PanelRight className="h-5 w-5" />
        </IconButton>
      </div>
      <Separator />
      <div
        ref={ref}
        className="h-[calc(100%-45px)]"
        onResize={(event) => setHeight(event.currentTarget.clientHeight)}
      >
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={80}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel onResize={(size) => setQueryPanelPct(size / 100)}>
                <QueryEditor height={height * queryPanelPct} />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel>
                <QueryOutput />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="h-full">Test</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
