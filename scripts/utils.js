function ParseCSV(text, columns) {
    // Split text by newlines
    var csvData = text.split("\r\n");

    // Remove caption
    csvData.splice(0, 1);

    for (var i = 0; i < csvData.length; i++) {
        csvData[i] = csvData[i].split(",");

        // Catch entries that are non-existant or too small (e.g., empty last lines)
        if(csvData[i] == null || csvData[i].length < columns) {
            csvData.splice(i, 1);
            continue;
        }

        // Cope for additional commas in descriptions
        while (csvData[i].length > columns) {
            csvData[i][2] += ", " + csvData[i][3];
            csvData[i].splice(3, 1);
        }

        // Remove any left-over " characters at the beginning and the end of the text
        if (csvData[i].length == columns && csvData[i][2].at(0) == '\"') {
            csvData[i][2] = csvData[i][2].substring(1, csvData[i][2].length - 1);
        }
    }

    return csvData;
}