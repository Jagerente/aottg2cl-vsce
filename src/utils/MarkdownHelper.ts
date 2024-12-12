import { MarkdownString } from "vscode";
import { IClass } from "../classes/IClass";

const horizontalLine: string = "\n\n---\n\n";

export function createKeywordMarkdown(keyword: { label: string; description: string }): MarkdownString {
    const md = `${wrapLang(keyword.label)} ${horizontalLine} ${keyword.description}`;
    return new MarkdownString(md);
}

export function createClassMarkdown(classDef: IClass): MarkdownString {
    var md = wrapLang(`${classDef.kind} ${classDef.name}`);
    if (classDef.description !== "") {
        md += `${horizontalLine} ${classDef.description}`;
    }
    return new MarkdownString(md);
}

function wrapLang(code: string, language: string = "acl"): string {
    return `\`\`\`${language}\n${code}\n\`\`\``;
}