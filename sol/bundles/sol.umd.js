(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('xterm'), require('@open-amt-cloud-toolkit/ui-toolkit/core'), require('@angular/common'), require('@angular/cdk/keycodes'), require('@angular/platform-browser'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('sol', ['exports', '@angular/core', 'xterm', '@open-amt-cloud-toolkit/ui-toolkit/core', '@angular/common', '@angular/cdk/keycodes', '@angular/platform-browser', '@angular/common/http'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.sol = {}, global.ng.core, global.xterm, global['@open-amt-cloud-toolkit']['ui-toolkit'].core, global.ng.common, global.ng.cdk.keycodes, global.ng.platformBrowser, global.ng.common.http));
}(this, (function (exports, i0, xterm, core, i1, keycodes, platformBrowser, http) { 'use strict';

    var TerminalComponent = /** @class */ (function () {
        function TerminalComponent() {
            this.handleKeyPress = new i0.EventEmitter();
        }
        TerminalComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.container = document.getElementById('terminal');
            this.term.open(this.container);
            this.term.onData(function (data) {
                _this.handleKeyPress.emit(data);
            });
            this.term.attachCustomKeyEventHandler(function (e) {
                e.stopPropagation();
                e.preventDefault();
                if (e.ctrlKey === true && e.shiftKey === true && e.keyCode === keycodes.C) {
                    return navigator.clipboard.writeText(_this.term.getSelection());
                }
                else if (e.ctrlKey === true && e.shiftKey === true && e.keyCode === keycodes.V) {
                    return navigator.clipboard.readText().then(function (text) {
                        _this.handleKeyPress.emit(text);
                    });
                }
                else if (e.code === keycodes.SPACE) {
                    return _this.handleKeyPress.emit(e.key);
                }
            });
        };
        return TerminalComponent;
    }());
    TerminalComponent.ɵfac = function TerminalComponent_Factory(t) { return new (t || TerminalComponent)(); };
    TerminalComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TerminalComponent, selectors: [["amt-terminal"]], inputs: { term: "term" }, outputs: { handleKeyPress: "handleKeyPress" }, decls: 1, vars: 0, consts: [["id", "terminal", 1, "xtermDisplay", 2, "width", "fit-content"]], template: function TerminalComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelement(0, "div", 0);
            }
        }, encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TerminalComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'amt-terminal',
                        templateUrl: './terminal.component.html'
                    }]
            }], null, { term: [{
                    type: i0.Input
                }], handleKeyPress: [{
                    type: i0.Output
                }] });
    })();

    function SolComponent_amt_terminal_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r2_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "amt-terminal", 2);
            i0.ɵɵlistener("handleKeyPress", function SolComponent_amt_terminal_1_Template_amt_terminal_handleKeyPress_0_listener($event) { i0.ɵɵrestoreView(_r2_1); var ctx_r1 = i0.ɵɵnextContext(); return ctx_r1.handleKeyPress($event); });
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("term", ctx_r0.term);
        }
    }
    var SolComponent = /** @class */ (function () {
        function SolComponent() {
            this.deviceState = 0;
            this.logger = new core.ConsoleLogger(core.LogLevel.ERROR);
            this.deviceStatus = new i0.EventEmitter();
            this.deviceConnection = new i0.EventEmitter();
            this.mpsServer = '';
            this.authToken = '';
            this.deviceId = '';
        }
        SolComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.deviceConnection.subscribe(function (data) {
                if (data) {
                    _this.init();
                }
                else {
                    _this.stopSol();
                }
            });
        };
        SolComponent.prototype.ngAfterViewInit = function () {
            this.init();
        };
        SolComponent.prototype.init = function () {
            var _this = this;
            this.instantiate();
            setTimeout(function () {
                _this.startSol();
            }, 4000);
        };
        SolComponent.prototype.instantiate = function () {
            this.terminal = new core.AmtTerminal();
            this.dataProcessor = new core.TerminalDataProcessor(this.terminal);
            this.redirector = new core.AMTRedirector(this.logger, core.Protocol.SOL, new FileReader(), this.deviceId, 16994, '', '', 0, 0, this.authToken, this.mpsServer);
            this.terminal.onSend = this.redirector.send.bind(this.redirector);
            this.redirector.onNewState = this.terminal.StateChange.bind(this.terminal);
            this.redirector.onStateChanged = this.onTerminalStateChange.bind(this);
            this.redirector.onProcessData = this.dataProcessor.processData.bind(this);
            this.dataProcessor.processDataToXterm = this.handleWriteToXterm.bind(this);
            this.dataProcessor.clearTerminal = this.handleClearTerminal.bind(this);
            this.term = new xterm.Terminal({
                rows: 30,
                cols: 100,
                cursorStyle: 'block',
                fontWeight: 'bold'
            });
        };
        SolComponent.prototype.handleKeyPress = function (domEvent) {
            this.terminal.TermSendKeys(domEvent);
        };
        SolComponent.prototype.handleClearTerminal = function () {
            this.term.reset();
        };
        SolComponent.prototype.handleWriteToXterm = function (str) {
            this.term.write(str);
        };
        SolComponent.prototype.onTerminalStateChange = function (redirector, state) {
            this.deviceStatus.emit(state);
            this.deviceState = state;
        };
        SolComponent.prototype.startSol = function () {
            if (this.redirector !== null) {
                this.redirector.start(WebSocket);
            }
        };
        SolComponent.prototype.stopSol = function () {
            if (this.redirector !== null) {
                this.redirector.stop();
                this.handleClearTerminal();
                this.term.dispose();
                this.cleanup();
            }
        };
        SolComponent.prototype.cleanup = function () {
            this.terminal = null;
            this.redirector = null;
            this.dataProcessor = null;
            this.term = null;
        };
        SolComponent.prototype.ngOnDestroy = function () {
            this.stopSol();
        };
        return SolComponent;
    }());
    SolComponent.ɵfac = function SolComponent_Factory(t) { return new (t || SolComponent)(); };
    SolComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SolComponent, selectors: [["amt-sol"]], inputs: { deviceConnection: "deviceConnection", mpsServer: "mpsServer", authToken: "authToken", deviceId: "deviceId" }, outputs: { deviceStatus: "deviceStatus" }, decls: 2, vars: 1, consts: [[1, "container"], [3, "term", "handleKeyPress", 4, "ngIf"], [3, "term", "handleKeyPress"]], template: function SolComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtemplate(1, SolComponent_amt_terminal_1_Template, 1, 1, "amt-terminal", 1);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.deviceState === 3);
            }
        }, directives: [i1.NgIf, TerminalComponent], styles: [".container{display:block;text-align:center}.xtermDisplay{display:inline-block}"], encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SolComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'amt-sol',
                        templateUrl: './sol.component.html',
                        styleUrls: ['./sol.component.css'],
                        encapsulation: i0.ViewEncapsulation.None
                    }]
            }], function () { return []; }, { deviceStatus: [{
                    type: i0.Output
                }], deviceConnection: [{
                    type: i0.Input
                }], mpsServer: [{
                    type: i0.Input
                }], authToken: [{
                    type: i0.Input
                }], deviceId: [{
                    type: i0.Input
                }] });
    })();

    var SolModule = /** @class */ (function () {
        function SolModule() {
        }
        return SolModule;
    }());
    SolModule.ɵfac = function SolModule_Factory(t) { return new (t || SolModule)(); };
    SolModule.ɵmod = i0.ɵɵdefineNgModule({ type: SolModule });
    SolModule.ɵinj = i0.ɵɵdefineInjector({ imports: [[
                http.HttpClientModule,
                platformBrowser.BrowserModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SolModule, { declarations: [SolComponent,
                TerminalComponent], imports: [http.HttpClientModule,
                platformBrowser.BrowserModule], exports: [SolComponent] });
    })();
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SolModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            SolComponent,
                            TerminalComponent
                        ],
                        imports: [
                            http.HttpClientModule,
                            platformBrowser.BrowserModule
                        ],
                        exports: [
                            SolComponent
                        ],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA]
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of sol
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.SolComponent = SolComponent;
    exports.SolModule = SolModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sol.umd.js.map
