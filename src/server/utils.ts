import fs from "fs/promises";

export const getFileContents: ( filepath: string ) => Promise<string | undefined> = async ( filepath ) => {
    try {
        return await fs.readFile( filepath, { encoding: 'utf8' });
    } catch (err) {
        console.log(err);
    }
}
