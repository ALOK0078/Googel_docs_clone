"use client";
import { useEditor, EditorContent } from '@tiptap/react';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import { Color } from '@tiptap/extension-color'
import  Highlight  from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import TableRow from '@tiptap/extension-table-row'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import {useEditorStore} from '@/store/use-editor-store';
import { useStorage } from '@liveblocks/react';
import { FontSizextension } from '@/extensions/font-size';
import { LineHeightExtension } from '@/extensions/line-height';
import { Ruler } from './ruler';

import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Threads } from './threads';

interface EditorProps {
    initialContent?: string|undefined;
};

export const Editor = ({initialContent}:EditorProps) => {
    const leftmargin = useStorage((root) => root.leftMargin);
    const rightmargin = useStorage((root) => root.rightMargin);
    const liveblocks = useLiveblocksExtension({
        initialContent,
        offlineSupport_experimental:true,
    });
    const {setEditor} = useEditorStore();

    const editor = useEditor({
        immediatelyRender: false,
        onCreate ({ editor })  {
            setEditor(editor);
        },
        onDestroy(){
            setEditor(null);
        },
        onUpdate({ editor }) {
            setEditor(editor);
        },
        onSelectionUpdate({ editor }) {
            setEditor(editor);
        },
        onTransaction({ editor }) {
            setEditor(editor);
        },
        onFocus({ editor }) {
            setEditor(editor);
        },
        onBlur({ editor }) {
            setEditor(editor);
        },
        onContentError({ editor }) {
            setEditor(editor);
        },

        editorProps: {
            attributes: {
                style :`padding-left:${leftmargin??56}px; padding-right:${rightmargin??56}px;`,
                class: 'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
            },
        },
        extensions: [
            liveblocks,
            StarterKit.configure({
                history: false,
            }),
            FontSizextension,
            LineHeightExtension.configure({
                types: ['heading', 'paragraph'],
                defaultLineHeight: 'normal',
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',//mark 2:34:59
                linkOnPaste: true,
                
            }),
            Color,
            Highlight.configure({
                multicolor: true,   
            }),
            FontFamily,
            TextStyle,
            Underline,
            Image,
            ImageResize,
            Table,
            TableCell,
            TableHeader,
            TableRow,    
            TaskItem.configure({
                nested: true,
                
            }),
            TaskList,
        ],
        
    })
  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] PX-4 print:p-0 print:bg-white print:overflow-hidden">
    <Ruler/>
      <div className='min-w-max flex justify-center w-[816px] py-4 printpy-0 mx-auto print:w-full print:min-w-0'>
      <EditorContent editor={editor} />
      <Threads editor={editor} />
      </div>
    </div>
  ); 
}