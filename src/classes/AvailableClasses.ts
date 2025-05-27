import {BaseComponentClassInstance} from "./BaseComponentsClass";
import {CameraClassInstance} from "./CameraClass";
import {CharacterClassInstance} from "./CharacterClass";
import {ColorClassInstance} from "./ColorClass";
import {ConvertClassInstance} from "./ConvertClass";
import {CutsceneClassInstance} from "./CutsceneClass";
import {DictClassInstance} from "./DictClass";
import {GameClassInstance} from "./GameClass";
import {HumanClassInstance} from "./HumanClass";
import {IClass, IGenericClass} from "./IClass";
import {InputClassInstance} from "./InputClass";
import {JsonClassInstance} from "./JsonClass";
import {LineCastHitResultClassInstance} from "./LineCastHitResultClass";
import {LineRendererClassInstance} from "./LineRendererClass";
import {ListClassInstance} from "./ListClass";
import {MapClassInstance} from "./MapClass";
import {MapObjectClassInstance} from "./MapObjectClass";
import {MapTargetableClassInstance} from "./MapTargetableClass";
import {MathClassInstance} from "./MathClass";
import {NetworkClassInstance} from "./NetworkClass";
import {NetworkViewClassInstance} from "./NetworkViewClass";
import {ObjectClassInstance} from "./ObjectClass";
import {PersistentDataClassInstance} from "./PersistentDataClass";
import {PhysicsClassInstance} from "./PhysicsClass";
import {PlayerClassInstance} from "./PlayerClass";
import {PrimitiveBoolClassInstance} from "./PrimitiveBoolClass";
import {PrimitiveFloatClassInstance} from "./PrimitiveFloatClass";
import {PrimitiveIntClassInstance} from "./PrimitiveIntClass";
import {PrimitiveStringClassInstance} from "./PrimitiveStringClass";
import {PrimitiveVoidClassInstance} from "./PrimitiveVoidClass";
import {QuaternionClassInstance} from "./QuaternionClass";
import {RandomClassInstance} from "./RandomClass";
import {RangeClassInstance} from "./RangeClass";
import {RoomDataClassInstance} from "./RoomDataClass";
import {ShifterClassInstance} from "./ShifterClass";
import {StringClassInstance} from "./StringClass";
import {TimeClassInstance} from "./TimeClass";
import {TitanClassInstance} from "./TitanClass";
import {TransformClassInstance} from "./TransformClass";
import {UIClassInstance} from "./UIClass";
import {Vector3ClassInstance} from "./Vector3Class";

export const AvailableClasses: IClass[] = [
    GameClassInstance,
    NetworkClassInstance,
    MapClassInstance,
    UIClassInstance,
    TimeClassInstance,
    ConvertClassInstance,
    StringClassInstance,
    InputClassInstance,
    MathClassInstance,
    RandomClassInstance,
    CutsceneClassInstance,
    CameraClassInstance,
    RoomDataClassInstance,
    PersistentDataClassInstance,
    JsonClassInstance,
    PhysicsClassInstance,
    ObjectClassInstance,
    CharacterClassInstance,
    HumanClassInstance,
    TitanClassInstance,
    ShifterClassInstance,
    MapObjectClassInstance,
    MapTargetableClassInstance,
    TransformClassInstance,
    PlayerClassInstance,
    NetworkViewClassInstance,
    ColorClassInstance,
    Vector3ClassInstance,
    QuaternionClassInstance,
    DictClassInstance,
    ListClassInstance,
    LineRendererClassInstance,
    RangeClassInstance,
    LineCastHitResultClassInstance,
];

export const AvailableClassesMap: Map<string, IClass> = new Map([
    [GameClassInstance.name, GameClassInstance],
    [NetworkClassInstance.name, NetworkClassInstance],
    [MapClassInstance.name, MapClassInstance],
    [UIClassInstance.name, UIClassInstance],
    [TimeClassInstance.name, TimeClassInstance],
    [ConvertClassInstance.name, ConvertClassInstance],
    [StringClassInstance.name, StringClassInstance],
    [InputClassInstance.name, InputClassInstance],
    [MathClassInstance.name, MathClassInstance],
    [RandomClassInstance.name, RandomClassInstance],
    [CutsceneClassInstance.name, CutsceneClassInstance],
    [CameraClassInstance.name, CameraClassInstance],
    [RoomDataClassInstance.name, RoomDataClassInstance],
    [PersistentDataClassInstance.name, PersistentDataClassInstance],
    [JsonClassInstance.name, JsonClassInstance],
    [PhysicsClassInstance.name, PhysicsClassInstance],
    [ObjectClassInstance.name, ObjectClassInstance],
    [CharacterClassInstance.name, CharacterClassInstance],
    [HumanClassInstance.name, HumanClassInstance],
    [TitanClassInstance.name, TitanClassInstance],
    [ShifterClassInstance.name, ShifterClassInstance],
    [MapObjectClassInstance.name, MapObjectClassInstance],
    [MapTargetableClassInstance.name, MapTargetableClassInstance],
    [TransformClassInstance.name, TransformClassInstance],
    [PlayerClassInstance.name, PlayerClassInstance],
    [NetworkViewClassInstance.name, NetworkViewClassInstance],
    [ColorClassInstance.name, ColorClassInstance],
    [Vector3ClassInstance.name, Vector3ClassInstance],
    [QuaternionClassInstance.name, QuaternionClassInstance],
    [LineRendererClassInstance.name, LineRendererClassInstance],
    [RangeClassInstance.name, RangeClassInstance],
    [LineCastHitResultClassInstance.name, LineCastHitResultClassInstance],
    [PrimitiveIntClassInstance.name, PrimitiveIntClassInstance],
    [PrimitiveStringClassInstance.name, PrimitiveStringClassInstance],
    [PrimitiveFloatClassInstance.name, PrimitiveFloatClassInstance],
    [PrimitiveBoolClassInstance.name, PrimitiveBoolClassInstance],
    [PrimitiveVoidClassInstance.name, PrimitiveVoidClassInstance],
    [BaseComponentClassInstance.name, BaseComponentClassInstance],
]);

export const AvailableGenericClassesMap: Map<string, IGenericClass> = new Map([
    [ListClassInstance.name, ListClassInstance as IGenericClass],
    [DictClassInstance.name, DictClassInstance as IGenericClass],
]);
