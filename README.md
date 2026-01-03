# AoTTG 2 Custom Logic VSCode Extension

This is a VSCode extension providing  syntax highlighting and autocomplete features for AoTTG 2 Custom Logic.

While this is a super early version of the extension, it already should significantly improve the comfort of writing scripts.

## Usage

> Script files must be ended with `.cl` extension.

### Annotations example

```csharp
class AnnotationsDemo
{
    # @type Human
    _myHuman = null;

    # @type Character Player character instance
    _myCharacter = null;

    /*
        @type Timer Timer instance for tracking time
    */
    _myTimer = null;

    /*@type Object Base game object*/
    _myObject = null;

    # @param foo float Speed multiplier value
    # @param bar Human Target human character
    # @param baz Titan Titan instance to process
    # @return Timer Created timer instance
    function MethodExample(foo, bar, baz)
    {
        return Timer();
    }

    /*
      @param foo string Input string to process
      @param bar bool Enable or disable feature
      @param baz Vector3 Position in 3D space
      @return int Result code (0 for success)
    */
    function MethodExample2(foo, bar, baz)
    {
        return 83;
    }
    
    function GenericsExample()
    {
        # @type List<Vector3> List of 3D positions
        positions = List();
        
        # @type Dict<string, Timer> Dictionary mapping names to timers
        timers = Dict();
        
        # @type Dict<int, List<Human>> Dictionary mapping team IDs to player lists
        teamPlayers = Dict();
        
        # @type List<Dict<string, float>> List of player stats dictionaries
        playerStats = List();
    }
}
```

#### Annotation syntax

`@type` - Specifies the type of a variable
- Format: `# @type TypeName [description]`
- Format (multiline): `/* @type TypeName [description] */`
- `TypeName` can be a simple type (e.g., `Human`, `Timer`) or a generic type (e.g., `List<Vector3>`, `Dict<string, Timer>`)
- Optional `description` provides additional information about the variable
- Example: `# @type Character Player character instance`

`@param` - Specifies the type and description of a method parameter
- Format: `# @param parameterName TypeName [description]`
- Format (multiline): `/* @param parameterName TypeName [description] */`
- `parameterName` must match the actual parameter name in the method signature
- `TypeName` can be a simple type or a generic type
- Optional `description` provides additional information about the parameter
- Example: `# @param foo float Speed multiplier value`

`@return` - Specifies the return type and description of a method
- Format: `# @return TypeName [description]`
- Format (multiline): `/* @return TypeName [description] */`
- `TypeName` can be a simple type or a generic type
- Optional `description` provides additional information about the return value
- Example: `# @return Timer Created timer instance`

### Modular imports support

Use `# @import fileName1 fileName2` annotations in the beginning of your files to import other script files.

#### Example file structure
```
|---yourFolder/
|     portal2.cl
|     router.cl
|     enums.cl
|     ui_enums.cl
```

#### Import syntax

You can import multiple files in one line:
```csharp
# @import fileName1 fileName2
```

Or use separate import lines:
```csharp
# @import fileName1
# @import fileName2
```

#### Complete example

**portal2.cl**
```csharp
# @import router enums

class Main
{
    /*_*/
}
```

**enums.cl**
```csharp
# @import ui_enums

extension KeyBindsEnum
{
    GENERAL_FORWARD = "General/Forward";
    GENERAL_BACK = "General/Back";
    GENERAL_LEFT = "General/Left";
    GENERAL_RIGHT = "General/Right";
    GENERAL_UP = "General/Up";
    /*_*/
}
```

**ui_enums.cl**
```csharp
extension UIPosEnum
{
    TOPCENTER = "TopCenter";
    TOPLEFT = "TopLeft";
    TOPRIGHT = "TopRight";
    /*_*/
}
```

**router.cl**
```csharp
class Router
{
    /*_*/
}
```

### Build commands

The extension provides two build commands accessible via `Ctrl + Shift + P`:

#### Build Custom Logic
Builds all imported files into a single final script file. Choose name and destination for the output file.

Available via:
- `Ctrl + Shift + P` > "Build Custom Logic"
- `Ctrl + Shift + B` > "Build Custom Logic"

#### Build Custom Logic Into Custom Map

Available via:
- `Ctrl + Shift + P` > "Build Custom Logic Into Custom Map"
- `Ctrl + Shift + B` > "Build Custom Logic Into Custom Map"

Builds all imported files and injects the result into an existing Custom Map file between `/// Logic` and `/// Weather` boundaries.

### VSCode Extensions Hub

1. Open VSCode and go to the Extensions view (you can press `Ctrl + Shift + X`).
2. Search for `AoTTG 2 Custom Logic` and install it.

### Manual installation

1. Download latest `aottg2cl-*.vsix` package.
2. Open VSCode and go to the Extensions view (you can press `Ctrl + Shift + X`)
3. Click on the three-dot menu (`...`) in the top-right corner of the Extensions view.
4. Select `Install from VSIX...`
5. Choose the `.vsix` file you downloaded in the first step.

## Build

```sh
npm install -g vsce
npm i
npm run build
```

## Antlr Generation

### Prerequirements

- JDK installed
- JDK bin directory added to your PATH (so that the java command is available)

### Run

```
npm run antlr4ts
```
