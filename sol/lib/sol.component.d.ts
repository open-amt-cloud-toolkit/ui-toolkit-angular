import { EventEmitter, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AMTRedirector, ConsoleLogger } from '@open-amt-cloud-toolkit/ui-toolkit/core';
import * as i0 from "@angular/core";
export declare class SolComponent implements OnInit, OnDestroy, AfterViewInit {
    terminal: any;
    container: any;
    term: any;
    redirector: any;
    dataProcessor: any;
    deviceState: number;
    logger: ConsoleLogger;
    deviceStatus: EventEmitter<number>;
    deviceConnection: EventEmitter<boolean>;
    mpsServer: string;
    authToken: string;
    deviceId: string;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    init(): void;
    instantiate(): void;
    handleKeyPress(domEvent: any): void;
    handleClearTerminal(): void;
    handleWriteToXterm(str: string): void;
    onTerminalStateChange(redirector: AMTRedirector, state: number): void;
    startSol(): void;
    stopSol(): void;
    cleanup(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SolComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SolComponent, "amt-sol", never, { "deviceConnection": "deviceConnection"; "mpsServer": "mpsServer"; "authToken": "authToken"; "deviceId": "deviceId"; }, { "deviceStatus": "deviceStatus"; }, never, never>;
}
//# sourceMappingURL=sol.component.d.ts.map