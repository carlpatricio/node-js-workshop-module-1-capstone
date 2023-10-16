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
        setColumnHeaders(Object.keys(jsonCSV[0]));
        setDatasets(jsonCSV.slice(1));
        console.log(`Initial Data has been loaded! ${new Date()}`)
    }


    useEffect(() => {
        initialLoad();
        webSocket.onmessage = (event) => {
            try {
                const { data: eventData } = event;
                const { type, data } = JSON.parse(eventData);
                if (type === 'csv') {
                    setColumnHeaders(Object.keys(data[0]));
                    setDatasets(data.slice(1));
                    console.log(`Data has been updated! ${new Date()}`)
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
