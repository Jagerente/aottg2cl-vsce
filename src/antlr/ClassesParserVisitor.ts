import { ACLVisitor } from './ACLVisitor';
import {
    ClassDeclContext,
    MethodDeclContext,
    VariableDeclContext,
    ParamListContext
} from './ACLParser';

import {
    IClass,
    IMethod,
    IField,
    IParameter,
    ClassKinds,
    MethodKinds
} from '../classes/IClass';

export class ClassesParserVisitor extends ACLVisitor<IClass[]> {
    public classes: IClass[] = [];
    private currentClass: IClass | null = null;
    private currentMethod: IMethod | null = null;

    public visitClassDecl = (ctx: ClassDeclContext): IClass[] => {
        this.currentMethod = null;
        let kind = ClassKinds.CLASS;
        if (ctx.EXTENSION()) {
            kind = ClassKinds.EXTENSION;
        } else if (ctx.COMPONENT()) {
            kind = ClassKinds.COMPONENT;
        } else if (ctx.CUTSCENE()) {
            kind = ClassKinds.CUTSCENE;
        }
        const className = ctx.ID().getText();
        this.currentClass = {
            kind: kind,
            name: className,
            description: '',
            staticFields: [],
            staticMethods: [],
            instanceFields: [],
            instanceMethods: [],
        };
        this.classes.push(this.currentClass);
        this.visitChildren(ctx);
        return this.classes;
    }

    public visitMethodDecl = (ctx: MethodDeclContext): IClass[] => {
        const methodName = ctx.ID().getText();
        let methodKind: MethodKinds = MethodKinds.FUNCTION;

        if (ctx.FUNCTION()) {
            methodKind = MethodKinds.FUNCTION;
        } else if (ctx.COROUTINE()) {
            methodKind = MethodKinds.COROUTINE;
        }

        if (this.currentClass) {
            const isStatic = this.currentClass.kind === ClassKinds.EXTENSION;
            const method: IMethod = {
                label: methodName,
                kind: methodKind,
                returnType: 'void',
                description: '',
                parameters: [],
            };
            this.currentMethod = method;

            if (isStatic) {
                this.currentClass.staticMethods.push(method);
            } else {
                this.currentClass.instanceMethods.push(method);
            }
        }

        this.visitChildren(ctx);

        this.currentMethod = null;

        return this.classes;
    }

    public visitParamList = (ctx: ParamListContext): IClass[] => {
        if (this.currentMethod) {
            for (const idCtx of ctx.ID()) {
                const paramName = idCtx.getText();
                const parameter: IParameter = {
                    name: paramName,
                    type: 'any',
                    description: '',
                };
                this.currentMethod.parameters.push(parameter);
            }
        }
        return this.classes;
    }

    public visitVariableDecl = (ctx: VariableDeclContext): IClass[] => {
        const id = ctx.ID();
        if (id === null) {
            this.visitChildren(ctx);
            return this.classes;
        }

        const variableName = id.getText();
        const isPrivate = variableName.startsWith('_');
        const isStatic = this.currentClass?.kind === ClassKinds.EXTENSION;
        const field: IField = {
            label: variableName,
            type: 'unknown',
            description: '',
            private: isPrivate,
        };

        if (this.currentClass && !this.currentMethod) {
            if (isStatic) {
                this.currentClass.staticFields.push(field);
            } else {
                this.currentClass.instanceFields.push(field);
            }
        } else if (this.currentMethod) {
            // TODO:
        }

        this.visitChildren(ctx);
        return this.classes;
    }

    public getParsedClasses(): IClass[] {
        return this.classes;
    }
}
