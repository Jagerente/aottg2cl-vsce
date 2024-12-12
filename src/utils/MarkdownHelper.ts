import { MarkdownString } from "vscode";
import { IClass, IField, IMethod, IVariable, MethodKinds } from "../classes/IClass";

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

export function createFieldMarkdown(fieldDef: IField): MarkdownString {
    const m1 = fieldDef.private ? 'private' : 'public';
    const m2 = fieldDef.readonly ? ' readonly' : '';
    
    const m3 = `(${m1}${m2} field) ${fieldDef.label} ${fieldDef.type}`;
    var m4 = wrapLang(m3, "csharp");
    if (fieldDef.description !== "") {
        m4 += `${horizontalLine} ${fieldDef.description}`;
    }
    return new MarkdownString(m4);
}

export function createMethodMarkdown(methodDef: IMethod, methodSignature: string): MarkdownString {
    const kind = methodDef.kind ?? MethodKinds.FUNCTION;
    var md = wrapLang(`${kind} ${methodDef.label}${methodSignature} ${methodDef.returnType}`);
    if (methodDef.description !== "") {
        md += `${horizontalLine} ${methodDef.description}`;
    }
    return new MarkdownString(md);
}

export function createVariableMarkdown(variableDef: IVariable): MarkdownString {
    const md = wrapLang(`(local variable) ${variableDef.name} ${variableDef.type} = ${variableDef.value}`);
    return new MarkdownString(md);
}

function wrapLang(code: string, language: string = "acl"): string {
    return '\n' + appendEscapedMarkdownCodeBlockFence(code, language) + '\n';
}

// https://github.com/microsoft/vscode/blob/main/src/vs/base/common/htmlContent.ts#L145
export function appendEscapedMarkdownCodeBlockFence(code: string, langId: string) {
	const longestFenceLength =
		code.match(/^`+/gm)?.reduce((a, b) => (a.length > b.length ? a : b)).length ??
		0;
	const desiredFenceLength =
		longestFenceLength >= 3 ? longestFenceLength + 1 : 3;

	// the markdown result
	return [
		`${'`'.repeat(desiredFenceLength)}${langId}`,
		code,
		`${'`'.repeat(desiredFenceLength)}`,
	].join('\n');
}