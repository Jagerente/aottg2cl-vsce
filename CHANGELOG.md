# Change Log

All notable changes to the "aottg2cl" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2025-05-29

### Changed

- Fixed local variables typing inside static methods and constructors

## [0.1.0] - 2025-05-27

### Added

- Local variables parsing using ANTLR parsing manager.
- Diagnostic error report on usage of undeclared classes or variables.
- Builtin generics types support (List, Dict) for better typing
- Typing support for variables inside loop definitions 

### Changed

- Fixed Annotation typed constructors shown as default.
- Removed default callbacks suggestion for user-defined classes.
- Improved autocompletion behaviour.
- Typing is much better now.
- More diagnostic error cases.

## [0.0.9-preview] - 2025-05-23

### Added

- Symbols provider

### Changed

- Updated built-in definitions.
- Updated packages

## [0.0.8-preview] - 2025-02-28

### Added

- Added imports support
- Added build cmd

### Changed

- ACL to CL ext support rename.
- Optimized parsing calls.
- Fixed autocompletion.
- Updated built-in definitions.

## [0.0.7-preview] - 2024-12-23

### Added

- Add missing LineRenderer class.
- Add missing MapObject definitions.
- Add missing Character definitions.

### Changed

- Updated global classes definitions to the latest game update. (https://github.com/Jagerente/aottg2cl-vsce/pull/57/commits/125895e94b726481584efdd53f685f6e2431e4cf)
- Improved hover markdown. (by oryxoik)
- Fixed MapObject.FindMapObjectsByComponent signature. (by ninj1337)

## [0.0.6-preview] - 2024-11-30

### Added

- Add missing Quaternion fields
- Add missing Cutscene fields
- Add duplicates diagnostic
- Add annotations strict-typing

### Changed

- Fixed callbacks snippets
- Fixed Input.SetKeyDefaultEnabled signature
- Extended ANTLR definition

## [0.0.5-preview] - 2024-11-01

### Changed

- Updated global classes definitions to the latest game update. (https://github.com/Jagerente/aottg2cl-vsce/commit/e769039c8aafe6d5f2d5ef6c821d5dd8e8066125)
- Improved completions for Main access. Treated as static (extension) now.
- Improved local variables parsing: better typing, loop variables support.
- Fixed optional/variadic function arguments diagnostic.
- Removed unsupported tokens `[]` & `'` (by oryxoik).

## [0.0.4-preview] - 2024-10-22

### Added

- Add component callbacks.
- Add objects default ctors.

### Changed

- Fix chain auto-completion starting with '!'.
- Fix parsing error.

## [0.0.3-preview] - 2024-10-18

### Added

- Inheritance hierarchy for global classes (Human < Character < Object etc.).
- `break` and `continue` keywords support.
- ANTLR integration

### Changed

- Extended cutscenes support:
    - Snippet
    - Better context auto-completions
    - Definition and usage error validation
- Extended loops and conditions support
    - Snippet
    - Better context auto-completions
- Extended callbacks support:
    - Improved snippet on callback declaring.
    - Improved callbacks hints information.
- Extended variables parsing:
    - Improved parsing
    - Added current method arguments as variables support
- Improved class, methods and calls parsing.
- Improved code navigation utils.
- New code diagnostics:
    - Class usage
        - Wrong self casting
        - Wrong static usage
        - Wrong instance usage
        - Wrong ctor calling
        - Wrong methods usage
        - Multiple class ctors definitions
        - Incomplete cutscene class definition
    - ANTLR parser provided
        - Brackets, semicolons, wrong positioning and much more.

## [0.0.2-preview] - 2024-10-09

### Added
 
- Inheritance support
- Callbacks support using inheritance definitions
- Constructors support
- Class kind support
- Method kind support
- Extensions support

### Changed

- Improved autocomplete features based on new class definitions
- Updated global classes definitions 
- Updated user-defined classes parsing
- Range detection as class, not keyword
- Constructors auto-complete

## [0.0.1-preview] - 2024-10-04

### Added

- Syntax highlighting for `.acl` files, ensuring clear code readability.
- Autocomplete support for:
    - Complete global static Classes and Objects (e.g. `Game`, `Network`, `Vector3` etc.):
        - Static fields
        - Static methods
        - Instance fields
        - Instance methods
    - User defined classes and components.
        - Instance fields
        - Instance methods
        - Local variables
- Signature help for methods, providing parameter hints as you type.
- Hover tooltips for quick reference, showing descriptions for class methods, fields, and keywords.
- Basic snippets to streamline coding with common constructs.
- Error validation mechanisms, including:
    - Mismatched brackets
    - Missing semicolons
    - Incomplete member access
    - Incorrect class usage
    - Incorrect number of arguments for method
- Context-aware completions for static, instance, private, public members based on usage context.
- Deep member access for nested properties and methods (e.g., `Network.MyPlayer.Character.Position.X`).
