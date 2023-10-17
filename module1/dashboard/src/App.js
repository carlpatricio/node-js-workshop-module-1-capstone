import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import csvToJSON from './csvToJson';

const ENDPOINT = 'http://localhost:3000';
const webSocket = new WebSocket('ws://localhost:3002/');

function App() {
    const [datasets, setDatasets] = useState([]);
    const [columnHeaders, setColumnHeaders] = useState([]);

    const initialLoad = async () => {
        const res = await fetch(`${ENDPOINT}/metrics`)
        const csv = await res.text();
        const jsonCSV = csvToJSON(csv);

        const newColumnHeaders = jsonCSV.length > 0? Object.keys(jsonCSV[0]): columnHeaders;
        const newDatasets = jsonCSV.length > 0? jsonCSV.slice(1): [];
        setColumnHeaders(newColumnHeaders);
        setDatasets(newDatasets);
        console.log(`Initial Data has been loaded! ${new Date()}`)
    }


    useEffect(() => {
        initialLoad();
        webSocket.onmessage = (event) => {
            try {
                const { data: eventData } = event;
                const { type, data } = JSON.parse(eventData);
                if (type === 'csv') {
                    const newDatasets = data.length > 0? data.slice(1): [];
                    setDatasets(newDatasets);
                    console.log(`Data has been updated! ${new Date()}` ,newDatasets)
                }
            }
            catch (err) {
                console.log({ err })
            }
        };

    }, []);

    return (
        <div>
            <DataTable data={datasets} columnHeaders={columnHeaders} />
        </div>
    );
}

export default App;
