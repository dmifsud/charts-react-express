import { DataObject } from "@charts-react-express/backend/src/models/data.model";
import { Dropdown, DropdownProps } from "@components/ui/Dropdown";
import { useState, useEffect } from "react";

export type ScatterPlotXYDropdownsProps = {
    dataItems: (keyof Omit<DataObject, 'DATE' | 'PIC'>)[];
    axisSelections: [string, string];
    onAxisSelections: (selections: [string, string]) => void;
};

export function ScatterPlotXYDropdowns(props: ScatterPlotXYDropdownsProps) {
    // TODO: prop drilling could be reduced with the use of a state management library
    const { dataItems, onAxisSelections } = props;
    const [selectionX, setSelectionX] = useState<DropdownProps['list']>([]);
    const [selectionY, setSelectionY] = useState<DropdownProps['list']>([]);
    const [axisSelections, setAxisSelections] = useState<[string, string]>(props.axisSelections);
    
    useEffect(() => {
        if (dataItems.length > 0) {
        
            if ((axisSelections as ScatterPlotXYDropdownsProps['dataItems']).some((item) => !dataItems.includes(item))) {
                console.error('Axis selections not included in dataItems');
            } else {
                const [x, y] = axisSelections;
                setSelectionX(dataItems.filter(item => item !== y));
                setSelectionY(dataItems.filter(item => item !== x));
                onAxisSelections([x, y]);
            }
    
          }
    }, [dataItems, axisSelections]);

    const [selectedX, selectedY] = axisSelections;
    const dropdownWidth = "120px";

      return (
        <div className="flex gap-4">
            <Dropdown preTitle="X " width={dropdownWidth} list={selectionX} selected={selectedX} onSelected={(selected) => setAxisSelections([selected, selectedY])}/>
            <Dropdown preTitle="Y " width={dropdownWidth} list={selectionY} selected={selectedY} onSelected={(selected) => setAxisSelections([selectedX, selected])}/>
        </div>
      )
}