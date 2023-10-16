const csvToJSON = (csv) => {
    //* split string per line
    const lines = csv.split('\n');
    const result = [];
    //* split for json keys
    const keys = lines[0].split(',');

    lines.map(l => {
        //* check if line is empty
        if (l.indexOf(',') > -1) {

            const obj = {};
            //* split data row line
            const line = l.split(',');
            keys.map((h, i) => {
                /* 
                    add object value h as key (column), 
                    line = data, i = index of column
                */
                obj[h] = line[i];
            })
            //* add formatted object to array
            result.push(obj);
        }
    })

    return result;
}

export default csvToJSON;