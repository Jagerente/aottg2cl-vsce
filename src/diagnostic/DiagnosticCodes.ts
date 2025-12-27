export class DiagnosticCodes {
    // IncompleteMemberAccessValidator
    static readonly INCOMPLETE_MEMBER_ACCESS = 'ACL001';

    // MemberAccessValidator
    static readonly SELF_OUTSIDE_CLASS = 'ACL101';
    static readonly CONSTRUCTOR_NOT_FOUND = 'ACL102';
    static readonly METHOD_FORGOT_SELF = 'ACL103';
    static readonly METHOD_OR_CLASS_NOT_FOUND = 'ACL104';
    static readonly FIELD_FORGOT_SELF = 'ACL105';
    static readonly VARIABLE_OR_CLASS_NOT_FOUND = 'ACL106';
    static readonly TYPE_DEFINITION_NOT_FOUND = 'ACL107';
    static readonly MEMBER_DOES_NOT_EXIST = 'ACL108';
    static readonly MEMBER_DOES_NOT_EXIST_BASE_CLASS = 'ACL109';

    // CtorValidator
    static readonly MULTIPLE_CONSTRUCTORS = 'ACL201';

    // CutsceneValidator
    static readonly CUTSCENE_MISSING_START = 'ACL301';

    // DuplicatesValidator
    static readonly CLASS_OVERRIDES_GLOBAL = 'ACL401';
    static readonly DUPLICATE_CLASS_DECLARATION = 'ACL402';
    static readonly DUPLICATE_METHOD = 'ACL403';
    static readonly DUPLICATE_FIELD = 'ACL404';
    static readonly METHOD_FIELD_NAME_CONFLICT = 'ACL405';
    static readonly FIELD_METHOD_NAME_CONFLICT = 'ACL406';

    // ANTLRValidator
    static readonly ANTLR_PARSER_ERROR = 'ACL501';
}

