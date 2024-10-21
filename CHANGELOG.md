# Change Log

All notable changes to the "aottg2cl" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
