import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, ViewEncapsulation, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Terminal } from 'xterm';
import { ConsoleLogger, LogLevel, AmtTerminal, TerminalDataProcessor, AMTRedirector, Protocol } from '@open-amt-cloud-toolkit/ui-toolkit/core';
import * as i1 from '@angular/common';
import { C, V, SPACE } from '@angular/cdk/keycodes';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

class TerminalComponent {
    constructor() {
        this.handleKeyPress = new EventEmitter();
    }
    ngOnInit() {
        this.container = document.getElementById('terminal');
        this.term.open(this.container);
        this.term.onData((data) => {
            this.handleKeyPress.emit(data);
        });
        this.term.attachCustomKeyEventHandler((e) => {
            e.stopPropagation();
            e.preventDefault();
            if (e.ctrlKey === true && e.shiftKey === true && e.keyCode === C) {
                return navigator.clipboard.writeText(this.term.getSelection());
            }
            else if (e.ctrlKey === true && e.shiftKey === true && e.keyCode === V) {
                return navigator.clipboard.readText().then(text => {
                    this.handleKeyPress.emit(text);
                });
            }
            else if (e.code === SPACE) {
                return this.handleKeyPress.emit(e.key);
            }
        });
    }
}
TerminalComponent.ɵfac = function TerminalComponent_Factory(t) { return new (t || TerminalComponent)(); };
TerminalComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TerminalComponent, selectors: [["amt-terminal"]], inputs: { term: "term" }, outputs: { handleKeyPress: "handleKeyPress" }, decls: 1, vars: 0, consts: [["id", "terminal", 1, "xtermDisplay", 2, "width", "fit-content"]], template: function TerminalComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div", 0);
        }
    }, encapsulation: 2 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TerminalComponent, [{
            type: Component,
            args: [{ selector: 'amt-terminal', template: "<div id=\"terminal\" class=\"xtermDisplay\" style=\"width: fit-content;\"></div>\n" }]
        }], null, { term: [{
                type: Input
            }], handleKeyPress: [{
                type: Output
            }] });
})();

function SolComponent_amt_terminal_1_Template(rf, ctx) {
    if (rf & 1) {
        const _r2 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "amt-terminal", 2);
        i0.ɵɵlistener("handleKeyPress", function SolComponent_amt_terminal_1_Template_amt_terminal_handleKeyPress_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r1 = i0.ɵɵnextContext(); return ctx_r1.handleKeyPress($event); });
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵproperty("term", ctx_r0.term);
    }
}
class SolComponent {
    constructor() {
        this.deviceState = 0;
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
        this.term = new Terminal({
            rows: 30,
            cols: 100,
            cursorStyle: 'block',
            fontWeight: 'bold'
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
        this.deviceState = state;
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
SolComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SolComponent, selectors: [["amt-sol"]], inputs: { deviceConnection: "deviceConnection", mpsServer: "mpsServer", authToken: "authToken", deviceId: "deviceId" }, outputs: { deviceStatus: "deviceStatus" }, decls: 2, vars: 1, consts: [[1, "container"], [3, "term", "handleKeyPress", 4, "ngIf"], [3, "term", "handleKeyPress"]], template: function SolComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, SolComponent_amt_terminal_1_Template, 1, 1, "amt-terminal", 1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.deviceState === 3);
        }
    }, directives: [i1.NgIf, TerminalComponent], styles: [".container{display:block;text-align:center}.xtermDisplay{display:inline-block}\n"], encapsulation: 2 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SolComponent, [{
            type: Component,
            args: [{ selector: 'amt-sol', encapsulation: ViewEncapsulation.None, template: "<div class=\"container\">\n    <amt-terminal *ngIf=\"deviceState === 3\" [term]=\"term\" (handleKeyPress)=\"handleKeyPress($event)\"></amt-terminal>\n</div>", styles: [".container{display:block;text-align:center}.xtermDisplay{display:inline-block}\n"] }]
        }], null, { deviceStatus: [{
                type: Output
            }], deviceConnection: [{
                type: Input
            }], mpsServer: [{
                type: Input
            }], authToken: [{
                type: Input
            }], deviceId: [{
                type: Input
            }] });
})();

class SolModule {
}
SolModule.ɵfac = function SolModule_Factory(t) { return new (t || SolModule)(); };
SolModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SolModule });
SolModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[
            HttpClientModule,
            BrowserModule
        ]] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SolModule, [{
            type: NgModule,
            args: [{
                    declarations: [
                        SolComponent,
                        TerminalComponent
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
        }], null, null);
})();
(function () {
    (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SolModule, { declarations: [SolComponent,
            TerminalComponent], imports: [HttpClientModule,
            BrowserModule], exports: [SolComponent] });
})();

/*
 * Public API Surface of sol
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SolComponent, SolModule };
//# sourceMappingURL=sol.mjs.map
