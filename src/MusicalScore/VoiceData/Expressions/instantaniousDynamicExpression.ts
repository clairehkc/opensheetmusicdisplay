import {PlacementEnum, AbstractExpression} from "./abstractExpression";
import {MultiExpression} from "./multiExpression";
import {DynamicExpressionSymbolEnum} from "./dynamicExpressionSymbolEnum";
//import {ArgumentOutOfRangeException} from "../../Exceptions";
import {InvalidEnumArgumentException} from "../../Exceptions";
import {logging} from "../../../Common/logging";

export class InstantaniousDynamicExpression extends AbstractExpression {
    constructor(dynamicExpression: string, soundDynamics: number, placement: PlacementEnum, staffNumber: number) {
        super();
        this.dynamicEnum = DynamicEnum[dynamicExpression.toLowerCase()];
        this.soundDynamic = soundDynamics;
        this.placement = placement;
        this.staffNumber = staffNumber;
    }
    public static dynamicToRelativeVolumeDict: { [_: string]: number; } = {
        "ffffff": (127.0 / 127.0),
        "fffff": (126.0 / 127.0) ,
        "ffff": 125.0 / 127.0,
        "fff": 124.0 / 127.0,
        "ff": 108.0 / 127.0,
        "f": 92.0 / 127.0,
        "mf": 76.0 / 127.0,
        "mp": 60.0 / 127.0,
        "p": 44.0 / 127.0,
        "pp": 28.0 / 127.0,
        "ppp": 12.0 / 127.0,
        "pppp": 10.0 / 127.0,
        "ppppp": 8.0 / 127.0,
        "pppppp": 6.0 / 127.0,
        "sf": 0.5,
        "sfp": 0.5,
        "sfpp": 0.5,
        "fp": 0.5,
        "rf": 0.5,
        "rfz": 0.5,
        "sfz": 0.5,
        "sffz": 0.5,
        "fz": 0.5,
    };

    //private static weight: number;
    private static listInstantaniousDynamics: string[] =  [
        "pppppp", "ppppp", "pppp", "ppp", "pp", "p",
        "ffffff", "fffff", "ffff", "fff", "ff", "f",
        "mf", "mp", "sf", "sp", "spp", "fp", "rf", "rfz", "sfz", "sffz", "fz",
    ];

    private multiExpression: MultiExpression;
    private dynamicEnum: DynamicEnum;
    private soundDynamic: number;
    private placement: PlacementEnum;
    private staffNumber: number;
    private length: number;

    public get ParentMultiExpression(): MultiExpression {
        return this.multiExpression;
    }
    public set ParentMultiExpression(value: MultiExpression) {
        this.multiExpression = value;
    }
    public get DynEnum(): DynamicEnum {
        return this.dynamicEnum;
    }
    public set DynEnum(value: DynamicEnum) {
        this.dynamicEnum = value;
    }
    public get SoundDynamic(): number {
        return this.soundDynamic;
    }
    public set SoundDynamic(value: number) {
        this.soundDynamic = value;
    }
    public get Placement(): PlacementEnum {
        return this.placement;
    }
    public set Placement(value: PlacementEnum) {
        this.placement = value;
    }
    public get StaffNumber(): number {
        return this.staffNumber;
    }
    public set StaffNumber(value: number) {
        this.staffNumber = value;
    }
    public get Length(): number {
        if (Math.abs(this.length) < 0.0001) {
            this.length = this.calculateLength();
        }
        return this.length;
    }
    public get MidiVolume(): number {
        return InstantaniousDynamicExpression.dynamicToRelativeVolumeDict[this.dynamicEnum] * 127;
    }
    public static isInputStringInstantaniousDynamic(inputString: string): boolean {
        if (inputString === undefined) { return false; }
        return InstantaniousDynamicExpression.isStringInStringList(InstantaniousDynamicExpression.listInstantaniousDynamics, inputString);
    }

    //public getInstantaniousDynamicSymbol(expressionSymbolEnum:DynamicExpressionSymbolEnum): FontInfo.MusicFontSymbol {
    //    switch (expressionSymbolEnum) {
    //        case DynamicExpressionSymbolEnum.p:
    //            return FontInfo.MusicFontSymbol.P;
    //        case DynamicExpressionSymbolEnum.f:
    //            return FontInfo.MusicFontSymbol.F;
    //        case DynamicExpressionSymbolEnum.s:
    //            return FontInfo.MusicFontSymbol.S;
    //        case DynamicExpressionSymbolEnum.z:
    //            return FontInfo.MusicFontSymbol.Z;
    //        case DynamicExpressionSymbolEnum.m:
    //            return FontInfo.MusicFontSymbol.M;
    //        case DynamicExpressionSymbolEnum.r:
    //            return FontInfo.MusicFontSymbol.R;
    //        default:
    //            throw new ArgumentOutOfRangeException("expressionSymbolEnum");
    //    }
    //}
    public getDynamicExpressionSymbol(c: string): DynamicExpressionSymbolEnum  {
        switch (c) {
            case "p":
                return DynamicExpressionSymbolEnum.p;
            case "f":
                return DynamicExpressionSymbolEnum.f;
            case "s":
                return DynamicExpressionSymbolEnum.s;
            case "z":
                return DynamicExpressionSymbolEnum.z;
            case "m":
                return DynamicExpressionSymbolEnum.m;
            case "r":
                return DynamicExpressionSymbolEnum.r;
            default:
                throw new InvalidEnumArgumentException("unknown DynamicExpressionSymbolEnum: " + c);
        }
    }
    private calculateLength(): number {
        //var length: number = 0.0;
        //var dynamic: string = DynamicEnum[this.dynamicEnum];
        //for (var idx: number = 0, len = dynamic.length; idx < len; ++idx) {
        //    var c: string = dynamic[idx];
        //    var dynamicExpressionSymbol: DynamicExpressionSymbolEnum = this.getDynamicExpressionSymbol(c);
        //    var symbol: FontInfo.MusicFontSymbol = this.getInstantaniousDynamicSymbol(dynamicExpressionSymbol);
        //    length += FontInfo.Info.getBoundingBox(symbol).Width;
        //}
        //return length;
        logging.debug("[Andrea] instantaniousDynamicExpression: not implemented: calculateLength!");
        return 0.0;
    }

}

export enum DynamicEnum {
    pppppp = 0,
    ppppp = 1,
    pppp = 2,
    ppp = 3,
    pp = 4,
    p = 5,
    mp = 6,
    mf = 7,
    f = 8,
    ff = 9,
    fff = 10,
    ffff = 11,
    fffff = 12,
    ffffff = 13,
    sf = 14,
    sfp = 15,
    sfpp = 16,
    fp = 17,
    rf = 18,
    rfz = 19,
    sfz = 20,
    sffz = 21,
    fz = 22,
    other = 23
}
