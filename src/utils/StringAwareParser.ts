export class StringAwareParser {
    private inString: boolean = false;
    private escapeNext: boolean = false;

    public parseLine(line: string): string {
        let resultLine = '';

        for (let j = 0; j < line.length; j++) {
            const currentChar = line[j];

            if (this.escapeNext) {
                this.escapeNext = false;
                continue;
            }

            if (currentChar === '\\') {
                this.escapeNext = true;
                continue;
            }

            if (currentChar === '"') {
                this.inString = !this.inString;
                continue;
            }

            if (!this.inString) {
                resultLine += currentChar;
            }
        }

        return resultLine.trim();
    }
}
