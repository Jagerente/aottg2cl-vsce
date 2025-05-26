import {MarkdownString} from "vscode";
import {IClass, IConstructor, IField, IMethod, IParameter, IVariable, MethodKinds} from "../classes/IClass";
import { CodeContextUtils } from "./CodeContextUtils";

const horizontalLine: string = "\n\n---\n\n";

export function createKeywordMarkdown(keyword: { label: string; description: string }): MarkdownString {
    const md = `${wrapLang(keyword.label)} ${horizontalLine} ${keyword.description}`;
    return new MarkdownString(md);
}

export function createClassMarkdown(classDef: IClass): MarkdownString {
    let md = wrapLang(`${classDef.kind} ${classDef.name}`);
    if (classDef.description !== "") {
        md += `${horizontalLine} ${classDef.description}`;
    }
    return new MarkdownString(md);
}

export function createFieldMarkdown(fieldDef: IField): MarkdownString {
    const m1 = fieldDef.private ? 'private' : 'public';
    const m2 = fieldDef.readonly ? ' readonly' : '';

    const m3 = `(${m1}${m2} field) ${fieldDef.parent.name}.${fieldDef.label} ${CodeContextUtils.typeRefToString(fieldDef.type)}`;
    let m4 = wrapLang(m3, "csharp");
    if (fieldDef.description !== "") {
        m4 += `${horizontalLine} ${fieldDef.description}`;
    }
    return new MarkdownString(m4);
}

export function createMethodMarkdown(methodDef: IMethod, methodSignature: string): MarkdownString {
    const kind = methodDef.kind ?? MethodKinds.FUNCTION;
    let md = wrapLang(`${kind} ${methodDef.parent.name}.${methodDef.label}${methodSignature}: ${CodeContextUtils.typeRefToString(methodDef.returnType)}`);
    if (methodDef.description !== "") {
        md += `${horizontalLine} ${methodDef.description}`;
    }
    return new MarkdownString(md);
}

export function createConstructorMarkdown(constructorDef: IConstructor, methodSignature: string): MarkdownString {
    let md = wrapLang(`constructor ${constructorDef.parent.name}${methodSignature}: ${constructorDef.parent.name}`);
    if (constructorDef.description !== "") {
        md += `${horizontalLine} ${constructorDef.description}`;
    }
    return new MarkdownString(md);
}

export function createVariableMarkdown(variableDef: IVariable): MarkdownString {
    const md = wrapLang(`(local variable) ${variableDef.name}: ${CodeContextUtils.typeRefToString(variableDef.type)}`);
    return new MarkdownString(md);
}

export function createParameterMarkdown(paramDef: IParameter): MarkdownString {
    const md = wrapLang(`(parameter) ${paramDef.name}: ${CodeContextUtils.typeRefToString(paramDef.type)}`);
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
