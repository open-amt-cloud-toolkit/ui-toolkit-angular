import * as i0 from '@angular/core';
import { EventEmitter, Component, ViewChild, Input, Output, NgModule } from '@angular/core';
import { ConsoleLogger, AMTKvmDataRedirector, Protocol, AMTDesktop, DataProcessor, MouseHelper, KeyBoardHelper } from '@open-amt-cloud-toolkit/ui-toolkit/core';
import { fromEvent, timer } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

const _c0 = ["canvas"];
const _c1 = ["device"];
class KvmComponent {
    constructor() {
        // //setting a width and height for the canvas
        this.width = 400;
        this.height = 400;
        this.mpsServer = '';
        this.authToken = '';
        this.deviceId = '';
        this.deviceStatus = new EventEmitter();
        this.deviceConnection = new EventEmitter();
        this.selectedEncoding = new EventEmitter();
        this.powerState = 0;
        this.selected = 1;
        this.mouseMove = null;
        this.encodings = [
            { value: 1, viewValue: 'RLE 8' },
            { value: 2, viewValue: 'RLE 16' }
        ];
        this.onConnectionStateChange = (redirector, state) => {
            this.deviceStatus.emit(state);
        };
        this.reset = () => {
            this.redirector = null;
            this.module = null;
            this.dataProcessor = null;
            this.height = 400;
            this.width = 400;
            this.instantiate();
        };
        this.stopKvm = () => {
            this.redirector.stop();
            this.keyboardHelper.UnGrabKeyInput();
            this.reset();
        };
    }
    ngOnInit() {
        this.logger = new ConsoleLogger(1);
        this.deviceConnection.subscribe((data) => {
            if (data) {
                this.init();
            }
            else {
                this.stopKvm();
            }
        });
        this.selectedEncoding.subscribe((data) => {
            this.selected = data;
            this.onEncodingChange();
        });
    }
    ngAfterViewInit() {
        this.init();
    }
    instantiate() {
        var _a, _b;
        this.context = (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.nativeElement.getContext('2d');
        this.redirector = new AMTKvmDataRedirector(this.logger, Protocol.KVM, new FileReader(), this.deviceId, 16994, '', '', 0, 0, this.authToken, this.mpsServer);
        this.module = new AMTDesktop(this.logger, this.context);
        this.dataProcessor = new DataProcessor(this.logger, this.redirector, this.module);
        this.mouseHelper = new MouseHelper(this.module, this.redirector, 200);
        this.keyboardHelper = new KeyBoardHelper(this.module, this.redirector);
        this.redirector.onProcessData = this.module.processData.bind(this.module);
        this.redirector.onStart = this.module.start.bind(this.module);
        this.redirector.onNewState = this.module.onStateChange.bind(this.module);
        this.redirector.onSendKvmData = this.module.onSendKvmData.bind(this.module);
        this.redirector.onStateChanged = this.onConnectionStateChange.bind(this);
        this.redirector.onError = this.onRedirectorError.bind(this);
        this.module.onSend = this.redirector.send.bind(this.redirector);
        this.module.onProcessData = this.dataProcessor.processData.bind(this.dataProcessor);
        this.module.bpp = this.selected;
        this.mouseMove = fromEvent((_b = this.canvas) === null || _b === void 0 ? void 0 : _b.nativeElement, 'mousemove');
        this.mouseMove.pipe(throttleTime(200)).subscribe((event) => {
            if (this.mouseHelper != null) {
                this.mouseHelper.mousemove(event);
            }
        });
    }
    onRedirectorError() {
        this.reset();
    }
    init() {
        this.instantiate();
        setTimeout(() => {
            this.autoConnect();
        }, 4000);
    }
    autoConnect() {
        if (this.redirector != null) {
            this.redirector.start(WebSocket);
            this.keyboardHelper.GrabKeyInput();
        }
    }
    onEncodingChange() {
        this.stopKvm();
        timer(1000).subscribe(() => {
            this.autoConnect();
        });
    }
    onMouseup(event) {
        if (this.mouseHelper != null) {
            this.mouseHelper.mouseup(event);
        }
    }
    onMousedown(event) {
        if (this.mouseHelper != null) {
            this.mouseHelper.mousedown(event);
        }
    }
    onMousemove(event) {
        if (this.mouseHelper != null) {
            this.mouseHelper.mousemove(event);
        }
    }
    ngOnDestroy() {
        this.stopKvm();
    }
}
KvmComponent.ɵfac = function KvmComponent_Factory(t) { return new (t || KvmComponent)(); };
KvmComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KvmComponent, selectors: [["amt-kvm"]], viewQuery: function KvmComponent_Query(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
            i0.ɵɵviewQuery(_c1, 5);
        }
        if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.canvas = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.device = _t.first);
        }
    }, inputs: { width: "width", height: "height", mpsServer: "mpsServer", authToken: "authToken", deviceId: "deviceId", deviceConnection: "deviceConnection", selectedEncoding: "selectedEncoding" }, outputs: { deviceStatus: "deviceStatus" }, decls: 3, vars: 2, consts: [["oncontextmenu", "return false", 1, "canvas", 3, "width", "height", "mouseup", "mousedown", "mousemove"], ["canvas", ""]], template: function KvmComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div")(1, "canvas", 0, 1);
            i0.ɵɵlistener("mouseup", function KvmComponent_Template_canvas_mouseup_1_listener($event) { return ctx.onMouseup($event); })("mousedown", function KvmComponent_Template_canvas_mousedown_1_listener($event) { return ctx.onMousedown($event); })("mousemove", function KvmComponent_Template_canvas_mousemove_1_listener($event) { return ctx.onMousemove($event); });
            i0.ɵɵelementEnd()();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("width", ctx.width)("height", ctx.height);
        }
    }, styles: [".canvas[_ngcontent-%COMP%]{max-height:80%;max-width:100%}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KvmComponent, [{
            type: Component,
            args: [{ selector: 'amt-kvm', template: "<div>\n  <canvas\n    class=\"canvas\"\n    #canvas\n    [width]=\"width\"\n    [height]=\"height\"\n    oncontextmenu=\"return false\"\n    (mouseup)=\"onMouseup($event)\"\n    (mousedown)=\"onMousedown($event)\"\n    (mousemove)=\"onMousemove($event)\"\n  ></canvas>\n</div>\n", styles: [".canvas{max-height:80%;max-width:100%}\n"] }]
        }], null, { canvas: [{
                type: ViewChild,
                args: ['canvas', { static: false }]
            }], device: [{
                type: ViewChild,
                args: ['device', { static: false }]
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], mpsServer: [{
                type: Input
            }], authToken: [{
                type: Input
            }], deviceId: [{
                type: Input
            }], deviceStatus: [{
                type: Output
            }], deviceConnection: [{
                type: Input
            }], selectedEncoding: [{
                type: Input
            }] });
})();

class KvmModule {
}
KvmModule.ɵfac = function KvmModule_Factory(t) { return new (t || KvmModule)(); };
KvmModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: KvmModule });
KvmModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[
            HttpClientModule,
            BrowserModule
        ]] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KvmModule, [{
            type: NgModule,
            args: [{
                    declarations: [KvmComponent],
                    imports: [
                        HttpClientModule,
                        BrowserModule
                    ],
                    exports: [KvmComponent],
                    schemas: []
                }]
        }], null, null);
})();
(function () {
    (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(KvmModule, { declarations: [KvmComponent], imports: [HttpClientModule,
            BrowserModule], exports: [KvmComponent] });
})();

/*
 * Public API Surface of kvm
 */

/**
 * Generated bundle index. Do not edit.
 */

export { KvmComponent, KvmModule };
//# sourceMappingURL=kvm.mjs.map
