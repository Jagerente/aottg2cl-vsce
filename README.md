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

    # @type Character
    _myCharacter = null;

    /*
        @type Timer
    */
    _myTimer = null;

    /*@type Object*/
    _myObject = null;

    # @param foo float
    # @param bar Human
    # @param baz Titan
    # @return Timer
    function MethodExample(foo, bar, baz)
    {
        return Timer();
    }

    /*
      @param foo string
      @param bar bool
      @param baz Vector3
      @return int
    */
    function MethodExample2(foo, bar, baz)
    {
        return 83;
    }
    
    function GenericsExample()
    {
        # @type List<Vector3>
        positions = List();
        
        # @type Dict<string, Timer>
        timers = Dict();
        
        # @type Dict<int, List<Human>>
        teamPlayers = Dict();
        
        # @type List<Dict<string, float>>
        playerStats = List();
    }
}
```

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
