import csv from 'csvtojson'

export async function csvTojson<T>(csvFilePath: string, replacements?: [string | RegExp, string][]): Promise<T[]> {
    return csv({
      delimiter: ';',
      ignoreEmpty: true,
    })
    .preFileLine((fileLineString, lineIdx) => {
      if (lineIdx === 0){
        return fileLineString.toLowerCase()
      }
      if(replacements) {
        replacements.forEach(([key, value]) => {
          fileLineString = fileLineString.replaceAll(key, value)
        })
      }
      return fileLineString
    })
    .fromFile(csvFilePath)
}