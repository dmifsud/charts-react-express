import { useState, useRef, useEffect } from "react";

export type DropdownProps = {
    list: string[]; // TODO: add validation for unique ids
    onSelected: (selectedId: string) => void;
    selected?: string;
    width?: string;
    preTitle?: string;
}


export function Dropdown(props: DropdownProps) {

    const { list, onSelected } = props;

    const [show, setShow] = useState<boolean>(false); // TODO: to reduce re-renders, update hidden attribute directly via ref
    const [selected, setSelected] = useState<string | undefined>(props?.selected);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShow(false);
            }
        };

        
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    useEffect(() => {
        if (selected) {
            onSelected(selected);
            setShow(false);
        }
    }, [selected]);

    return (
        <div ref={dropdownRef} style={ { width: props?.width }} className="relative inline-block text-left">
            <div>
                <button type="button" onClick={() => setShow(!show)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:ring-red-400" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    {props?.preTitle}{selected ?? 'Select...'}
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div hidden={!show} className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                    {list.map((item, i) => <a href="#" key={i} className={`block px-4 py-2 text-sm text-gray-700 hover:bg-red-50${item === selected ? ' font-bold' : ''}`} onClick={(e) => {e.preventDefault(); setSelected(item);}} role="menuitem" tabIndex={-1} id={`menu-item-${i}`}>{item}</a>)}
                </div>
            </div>
        </div>
    );
}