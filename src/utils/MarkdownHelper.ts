import { MarkdownString } from "vscode";

export function createKeywordMarkdown(keyword: { label: string; description: string }): MarkdownString {
    const md = `\`\`\`acl\n${keyword.label}\n\`\`\` \n\n---\n\n ${keyword.description}`;
    return new MarkdownString(md);
}