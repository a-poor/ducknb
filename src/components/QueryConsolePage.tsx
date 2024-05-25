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
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import testData from "@/test-data.json";

const DARK_MODE = false;

const defaultCode = `-- Write your SQL query here

WITH filtered_users AS (
  SELECT *
  FROM users
    JOIN addresses ON users.id = addresses.user_id
  WHERE 
    age > 18
    AND city = 'New York'
);

SELECT * 
FROM filtered_users
LIMIT 20;
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
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "isCool",
      header: "Is Cool",
    },
  ];
  const table = useReactTable({
    data: testData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <Table className="overflow-y-auto">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="overflow-y-auto">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
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
          {/* <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="h-full">Test</div>
          </ResizablePanel> */}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
