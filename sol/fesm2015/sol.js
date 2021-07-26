import { EventEmitter, ɵɵdefineComponent, ɵɵelementStart, ɵɵelement, ɵɵelementEnd, ɵsetClassMetadata, Component, ViewEncapsulation, Output, Input, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Terminal } from 'xterm';
import { ConsoleLogger, LogLevel, AmtTerminal, TerminalDataProcessor, AMTRedirector, Protocol } from '@open-amt-cloud-toolkit/ui-toolkit/core';
import { C, V, SPACE } from '@angular/cdk/keycodes';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

class SolComponent {
    constructor() {
        this.logger = new ConsoleLogger(LogLevel.ERROR);
        this.deviceStatus = new EventEmitter();
        this.deviceConnection = new EventEmitter();
        this.mpsServer = '';
        this.authToken = '';
        this.deviceId = '';
    }
    ngOnInit() {
        this.deviceConnection.subscribe((data) => {
            if (data) {
                this.init();
            }
            else {
                this.stopSol();
            }
        });
    }
    ngAfterViewInit() {
        this.init();
    }
    init() {
        this.instantiate();
        setTimeout(() => {
            this.startSol();
        }, 4000);
    }
    instantiate() {
        this.terminal = new AmtTerminal();
        this.dataProcessor = new TerminalDataProcessor(this.terminal);
        this.redirector = new AMTRedirector(this.logger, Protocol.SOL, new FileReader(), this.deviceId, 16994, '', '', 0, 0, this.authToken, this.mpsServer);
        this.terminal.onSend = this.redirector.send.bind(this.redirector);
        this.redirector.onNewState = this.terminal.StateChange.bind(this.terminal);
        this.redirector.onStateChanged = this.onTerminalStateChange.bind(this);
        this.redirector.onProcessData = this.dataProcessor.processData.bind(this);
        this.dataProcessor.processDataToXterm = this.handleWriteToXterm.bind(this);
        this.dataProcessor.clearTerminal = this.handleClearTerminal.bind(this);
        this.container = document.getElementById('terminal');
        this.term = new Terminal({
            rows: 30,
            cols: 100,
            cursorStyle: 'block',
            fontWeight: 'bold'
        });
        this.term.open(this.container);
        this.term.onData((data) => {
            this.handleKeyPress(data);
        });
        this.term.attachCustomKeyEventHandler((e) => {
            e.stopPropagation();
            e.preventDefault();
            if (e.ctrlKey === true && e.shiftKey === true && e.keyCode === C) {
                return navigator.clipboard.writeText(this.term.getSelection());
            }
            else if (e.ctrlKey === true && e.shiftKey === true && e.keyCode === V) {
                return navigator.clipboard.readText().then(text => {
                    this.handleKeyPress(text);
                });
            }
            else if (e.code === SPACE) {
                return this.handleKeyPress(e.key);
            }
        });
    }
    handleKeyPress(domEvent) {
        this.terminal.TermSendKeys(domEvent);
    }
    handleClearTerminal() {
        this.term.reset();
    }
    handleWriteToXterm(str) {
        this.term.write(str);
    }
    onTerminalStateChange(redirector, state) {
        this.deviceStatus.emit(state);
    }
    startSol() {
        if (this.redirector !== null) {
            this.redirector.start(WebSocket);
        }
    }
    stopSol() {
        if (this.redirector !== null) {
            this.redirector.stop();
            this.handleClearTerminal();
            this.term.dispose();
            this.cleanup();
        }
    }
    cleanup() {
        this.terminal = null;
        this.redirector = null;
        this.dataProcessor = null;
        this.term = null;
    }
    ngOnDestroy() {
        this.stopSol();
    }
}
SolComponent.ɵfac = function SolComponent_Factory(t) { return new (t || SolComponent)(); };
SolComponent.ɵcmp = ɵɵdefineComponent({ type: SolComponent, selectors: [["amt-sol"]], inputs: { deviceConnection: "deviceConnection", mpsServer: "mpsServer", authToken: "authToken", deviceId: "deviceId" }, outputs: { deviceStatus: "deviceStatus" }, decls: 2, vars: 0, consts: [[1, "container"], ["id", "terminal", 1, "xtermDisplay", 2, "width", "fit-content"]], template: function SolComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelement(1, "div", 1);
        ɵɵelementEnd();
    } }, styles: [".container{display:block;text-align:center}.xtermDisplay{display:inline-block}"], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(SolComponent, [{
        type: Component,
        args: [{
                selector: 'amt-sol',
                templateUrl: './sol.component.html',
                styleUrls: ['./sol.component.css'],
                encapsulation: ViewEncapsulation.None
            }]
    }], function () { return []; }, { deviceStatus: [{
            type: Output
        }], deviceConnection: [{
            type: Input
        }], mpsServer: [{
            type: Input
        }], authToken: [{
            type: Input
        }], deviceId: [{
            type: Input
        }] }); })();

class SolModule {
    static forRoot(param) {
        return {
            ngModule: SolModule,
            providers: [
                {
                    provide: 'userInput',
                    useValue: param
                }
            ]
        };
    }
}
SolModule.ɵfac = function SolModule_Factory(t) { return new (t || SolModule)(); };
SolModule.ɵmod = ɵɵdefineNgModule({ type: SolModule });
SolModule.ɵinj = ɵɵdefineInjector({ imports: [[
            HttpClientModule,
            BrowserModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(SolModule, { declarations: [SolComponent], imports: [HttpClientModule,
        BrowserModule], exports: [SolComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(SolModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    SolComponent
                ],
                imports: [
                    HttpClientModule,
                    BrowserModule
                ],
                exports: [
                    SolComponent
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }]
    }], null, null); })();

/*
 * Public API Surface of sol
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SolComponent, SolModule };
//# sourceMappingURL=sol.js.map
