import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { IDataProcessor, ILogger, KeyBoardHelper, MouseHelper } from '@open-amt-cloud-toolkit/ui-toolkit/core';
import * as i0 from "@angular/core";
export declare class KvmComponent implements OnInit, AfterViewInit, OnDestroy {
    canvas: ElementRef | undefined;
    device: string;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    mpsServer: string;
    authToken: string;
    deviceId: string;
    deviceStatus: EventEmitter<number>;
    deviceConnection: EventEmitter<boolean>;
    selectedEncoding: EventEmitter<number>;
    module: any;
    redirector: any;
    dataProcessor: IDataProcessor | null;
    mouseHelper: MouseHelper;
    keyboardHelper: KeyBoardHelper;
    logger: ILogger;
    powerState: any;
    selected: number;
    timeInterval: any;
    mouseMove: any;
    encodings: {
        value: number;
        viewValue: string;
    }[];
    ngOnInit(): void;
    ngAfterViewInit(): void;
    instantiate(): void;
    onConnectionStateChange: (redirector: any, state: number) => any;
    onRedirectorError(): void;
    init(): void;
    autoConnect(): void;
    onEncodingChange(): void;
    reset: () => void;
    stopKvm: () => void;
    onMouseup(event: MouseEvent): void;
    onMousedown(event: MouseEvent): void;
    onMousemove(event: MouseEvent): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<KvmComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KvmComponent, "amt-kvm", never, { "width": "width"; "height": "height"; "mpsServer": "mpsServer"; "authToken": "authToken"; "deviceId": "deviceId"; "deviceConnection": "deviceConnection"; "selectedEncoding": "selectedEncoding"; }, { "deviceStatus": "deviceStatus"; }, never, never>;
}
//# sourceMappingURL=kvm.component.d.ts.map