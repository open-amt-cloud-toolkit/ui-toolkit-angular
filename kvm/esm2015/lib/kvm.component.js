import { Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { AMTDesktop, AMTKvmDataRedirector, ConsoleLogger, DataProcessor, KeyBoardHelper, MouseHelper, Protocol, } from '@open-amt-cloud-toolkit/ui-toolkit/core';
import { fromEvent, timer } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import * as i0 from "@angular/core";
const _c0 = ["canvas"];
export class KvmComponent {
    constructor() {
        // //setting a width and height for the canvas
        this.width = 400;
        this.height = 400;
        this.mpsServer = '';
        this.authToken = '';
        this.deviceId = '';
        this.deviceState = 0;
        this.deviceStatus = new EventEmitter();
        this.deviceConnection = new EventEmitter();
        this.selectedEncoding = new EventEmitter();
        this.powerState = 0;
        this.selected = 1;
        this.server = '';
        this.mouseMove = null;
        this.encodings = [
            { value: 1, viewValue: 'RLE 8' },
            { value: 2, viewValue: 'RLE 16' },
        ];
        this.urlConstructor = () => {
            return this.mpsServer.replace('http', 'ws');
        };
        this.onConnectionStateChange = (redirector, state) => {
            this.deviceState = state;
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
        this.server = `${this.urlConstructor()}/relay`;
        if (this.mpsServer.includes('/mps')) {
            // handles kong route
            this.server = `${this.urlConstructor()}/ws/relay`;
        }
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
        this.redirector = new AMTKvmDataRedirector(this.logger, Protocol.KVM, new FileReader(), this.deviceId, 16994, '', '', 0, 0, this.authToken, this.server);
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
    checkPowerStatus() {
        return this.powerState.powerstate === 2;
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
KvmComponent.ɵcmp = i0.ɵɵdefineComponent({ type: KvmComponent, selectors: [["amt-kvm"]], viewQuery: function KvmComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 1);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.canvas = _t.first);
    } }, inputs: { width: "width", height: "height", mpsServer: "mpsServer", authToken: "authToken", deviceId: "deviceId", deviceConnection: "deviceConnection", selectedEncoding: "selectedEncoding" }, outputs: { deviceState: "deviceState", deviceStatus: "deviceStatus" }, decls: 3, vars: 2, consts: [["oncontextmenu", "return false", 1, "canvas", 3, "width", "height", "mouseup", "mousedown", "mousemove"], ["canvas", ""]], template: function KvmComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵelementStart(1, "canvas", 0, 1);
        i0.ɵɵlistener("mouseup", function KvmComponent_Template_canvas_mouseup_1_listener($event) { return ctx.onMouseup($event); })("mousedown", function KvmComponent_Template_canvas_mousedown_1_listener($event) { return ctx.onMousedown($event); })("mousemove", function KvmComponent_Template_canvas_mousemove_1_listener($event) { return ctx.onMousemove($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("width", ctx.width)("height", ctx.height);
    } }, styles: [".canvas[_ngcontent-%COMP%]{max-height:80%;max-width:100%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KvmComponent, [{
        type: Component,
        args: [{
                selector: 'amt-kvm',
                templateUrl: './kvm.component.html',
                styleUrls: ['./kvm.component.css'],
            }]
    }], function () { return []; }, { canvas: [{
            type: ViewChild,
            args: ['canvas', { static: false }]
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
        }], deviceState: [{
            type: Output
        }], deviceStatus: [{
            type: Output
        }], deviceConnection: [{
            type: Input
        }], selectedEncoding: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ZtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2t2bS9zcmMvbGliL2t2bS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9rdm0vc3JjL2xpYi9rdm0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxZQUFZLEVBRVosS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUE7QUFDdEIsT0FBTyxFQUNMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsYUFBYSxFQUNiLGFBQWEsRUFHYixjQUFjLEVBQ2QsV0FBVyxFQUNYLFFBQVEsR0FDVCxNQUFNLHlDQUF5QyxDQUFBO0FBQ2hELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFBO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTs7O0FBTzdDLE1BQU0sT0FBTyxZQUFZO0lBbUN2QjtRQS9CQSw4Q0FBOEM7UUFFOUIsVUFBSyxHQUFHLEdBQUcsQ0FBQTtRQUNYLFdBQU0sR0FBRyxHQUFHLENBQUE7UUFDWixjQUFTLEdBQUcsRUFBRSxDQUFBO1FBQ2QsY0FBUyxHQUFHLEVBQUUsQ0FBQTtRQUNkLGFBQVEsR0FBRyxFQUFFLENBQUE7UUFFbkIsZ0JBQVcsR0FBRyxDQUFDLENBQUE7UUFFZixpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFBO1FBRS9DLHFCQUFnQixHQUN4QyxJQUFJLFlBQVksRUFBVyxDQUFBO1FBQ3BCLHFCQUFnQixHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFBO1FBTzVFLGVBQVUsR0FBUSxDQUFDLENBQUE7UUFDbkIsYUFBUSxHQUFHLENBQUMsQ0FBQTtRQUVaLFdBQU0sR0FBRyxFQUFFLENBQUE7UUFDWCxjQUFTLEdBQVEsSUFBSSxDQUFBO1FBQ3JCLGNBQVMs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QUFFLHNCQUFzQjtnQkFDbkMsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7YUFDbkM7c0NBRXlDLE1BQU07a0JBQTdDLFNBQVM7bUJBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtZQUt0QixLQUFLO2tCQUFwQixLQUFLO1lBQ1UsTUFBTTtrQkFBckIsS0FBSztZQUNVLFNBQVM7a0JBQXhCLEtBQUs7WUFDVSxTQUFTO2tCQUF4QixLQUFLO1lBQ1UsUUFBUTtrQkFBdkIsS0FBSztZQUVJLFdBQVc7a0JBQXBCLE1BQU07WUFFRyxZQUFZO2tCQUFyQixNQUFNO1lBRW1CLGdCQUFnQjtrQkFBekMsS0FBSztZQUVHLGdCQUFnQjtrQkFBeEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge1xuICBBTVREZXNrdG9wLFxuICBBTVRLdm1EYXRhUmVkaXJlY3RvcixcbiAgQ29uc29sZUxvZ2dlcixcbiAgRGF0YVByb2Nlc3NvcixcbiAgSURhdGFQcm9jZXNzb3IsXG4gIElMb2dnZXIsXG4gIEtleUJvYXJkSGVscGVyLFxuICBNb3VzZUhlbHBlcixcbiAgUHJvdG9jb2wsXG59IGZyb20gJ0BvcGVuLWFtdC1jbG91ZC10b29sa2l0L3VpLXRvb2xraXQvY29yZSdcbmltcG9ydCB7IGZyb21FdmVudCwgdGltZXIgfSBmcm9tICdyeGpzJ1xuaW1wb3J0IHsgdGhyb3R0bGVUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FtdC1rdm0nLFxuICB0ZW1wbGF0ZVVybDogJy4va3ZtLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4va3ZtLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgS3ZtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdjYW52YXMnLCB7IHN0YXRpYzogZmFsc2UgfSkgY2FudmFzOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkXG4gIHB1YmxpYyBjb250ZXh0ITogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG5cbiAgLy8gLy9zZXR0aW5nIGEgd2lkdGggYW5kIGhlaWdodCBmb3IgdGhlIGNhbnZhc1xuXG4gIEBJbnB1dCgpIHB1YmxpYyB3aWR0aCA9IDQwMFxuICBASW5wdXQoKSBwdWJsaWMgaGVpZ2h0ID0gNDAwXG4gIEBJbnB1dCgpIHB1YmxpYyBtcHNTZXJ2ZXIgPSAnJ1xuICBASW5wdXQoKSBwdWJsaWMgYXV0aFRva2VuID0gJydcbiAgQElucHV0KCkgcHVibGljIGRldmljZUlkID0gJydcblxuICBAT3V0cHV0KCkgZGV2aWNlU3RhdGUgPSAwXG5cbiAgQE91dHB1dCgpIGRldmljZVN0YXR1czogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKVxuXG4gIEBJbnB1dCgpIHByaXZhdGUgcmVhZG9ubHkgZGV2aWNlQ29ubmVjdGlvbjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KClcbiAgQElucHV0KCkgc2VsZWN0ZWRFbmNvZGluZzogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKVxuICBtb2R1bGU6IGFueVxuICByZWRpcmVjdG9yOiBhbnlcbiAgZGF0YVByb2Nlc3NvciE6IElEYXRhUHJvY2Vzc29yIHwgbnVsbFxuICBtb3VzZUhlbHBlciE6IE1vdXNlSGVscGVyXG4gIGtleWJvYXJkSGVscGVyITogS2V5Qm9hcmRIZWxwZXJcbiAgbG9nZ2VyITogSUxvZ2dlclxuICBwb3dlclN0YXRlOiBhbnkgPSAwXG4gIHNlbGVjdGVkID0gMVxuICB0aW1lSW50ZXJ2YWwhOiBhbnlcbiAgc2VydmVyID0gJydcbiAgbW91c2VNb3ZlOiBhbnkgPSBudWxsXG4gIGVuY29kaW5ncyA9IFtcbiAgICB7IHZhbHVlOiAxLCB2aWV3VmFsdWU6ICdSTEUgOCcgfSxcbiAgICB7IHZhbHVlOiAyLCB2aWV3VmFsdWU6ICdSTEUgMTYnIH0sXG4gIF1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNlcnZlciA9IGAke3RoaXMudXJsQ29uc3RydWN0b3IoKX0vcmVsYXlgXG4gICAgaWYgKHRoaXMubXBzU2VydmVyLmluY2x1ZGVzKCcvbXBzJykpIHtcbiAgICAgIC8vIGhhbmRsZXMga29uZyByb3V0ZVxuICAgICAgdGhpcy5zZXJ2ZXIgPSBgJHt0aGlzLnVybENvbnN0cnVjdG9yKCl9L3dzL3JlbGF5YFxuICAgIH1cbiAgfVxuXG4gIHVybENvbnN0cnVjdG9yID0gKCk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHRoaXMubXBzU2VydmVyLnJlcGxhY2UoJ2h0dHAnLCAnd3MnKVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5sb2dnZXIgPSBuZXcgQ29uc29sZUxvZ2dlcigxKVxuICAgIHRoaXMuZGV2aWNlQ29ubmVjdGlvbi5zdWJzY3JpYmUoKGRhdGE6IGJvb2xlYW4pID0+IHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0b3BLdm0oKVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5zZWxlY3RlZEVuY29kaW5nLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IGRhdGFcbiAgICAgIHRoaXMub25FbmNvZGluZ0NoYW5nZSgpXG4gICAgfSlcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgaW5zdGFudGlhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXM/Lm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKVxuICAgIHRoaXMucmVkaXJlY3RvciA9IG5ldyBBTVRLdm1EYXRhUmVkaXJlY3RvcihcbiAgICAgIHRoaXMubG9nZ2VyLFxuICAgICAgUHJvdG9jb2wuS1ZNLFxuICAgICAgbmV3IEZpbGVSZWFkZXIoKSxcbiAgICAgIHRoaXMuZGV2aWNlSWQsXG4gICAgICAxNjk5NCxcbiAgICAgICcnLFxuICAgICAgJycsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIHRoaXMuYXV0aFRva2VuLFxuICAgICAgdGhpcy5zZXJ2ZXJcbiAgICApXG4gICAgdGhpcy5tb2R1bGUgPSBuZXcgQU1URGVza3RvcCh0aGlzLmxvZ2dlciBhcyBhbnksIHRoaXMuY29udGV4dClcbiAgICB0aGlzLmRhdGFQcm9jZXNzb3IgPSBuZXcgRGF0YVByb2Nlc3NvcihcbiAgICAgIHRoaXMubG9nZ2VyLFxuICAgICAgdGhpcy5yZWRpcmVjdG9yLFxuICAgICAgdGhpcy5tb2R1bGVcbiAgICApXG4gICAgdGhpcy5tb3VzZUhlbHBlciA9IG5ldyBNb3VzZUhlbHBlcih0aGlzLm1vZHVsZSwgdGhpcy5yZWRpcmVjdG9yLCAyMDApXG4gICAgdGhpcy5rZXlib2FyZEhlbHBlciA9IG5ldyBLZXlCb2FyZEhlbHBlcih0aGlzLm1vZHVsZSwgdGhpcy5yZWRpcmVjdG9yKVxuXG4gICAgdGhpcy5yZWRpcmVjdG9yLm9uUHJvY2Vzc0RhdGEgPSB0aGlzLm1vZHVsZS5wcm9jZXNzRGF0YS5iaW5kKHRoaXMubW9kdWxlKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vblN0YXJ0ID0gdGhpcy5tb2R1bGUuc3RhcnQuYmluZCh0aGlzLm1vZHVsZSlcbiAgICB0aGlzLnJlZGlyZWN0b3Iub25OZXdTdGF0ZSA9IHRoaXMubW9kdWxlLm9uU3RhdGVDaGFuZ2UuYmluZCh0aGlzLm1vZHVsZSlcbiAgICB0aGlzLnJlZGlyZWN0b3Iub25TZW5kS3ZtRGF0YSA9IHRoaXMubW9kdWxlLm9uU2VuZEt2bURhdGEuYmluZCh0aGlzLm1vZHVsZSlcbiAgICB0aGlzLnJlZGlyZWN0b3Iub25TdGF0ZUNoYW5nZWQgPSB0aGlzLm9uQ29ubmVjdGlvblN0YXRlQ2hhbmdlLmJpbmQodGhpcylcbiAgICB0aGlzLnJlZGlyZWN0b3Iub25FcnJvciA9IHRoaXMub25SZWRpcmVjdG9yRXJyb3IuYmluZCh0aGlzKVxuICAgIHRoaXMubW9kdWxlLm9uU2VuZCA9IHRoaXMucmVkaXJlY3Rvci5zZW5kLmJpbmQodGhpcy5yZWRpcmVjdG9yKVxuICAgIHRoaXMubW9kdWxlLm9uUHJvY2Vzc0RhdGEgPSB0aGlzLmRhdGFQcm9jZXNzb3IucHJvY2Vzc0RhdGEuYmluZChcbiAgICAgIHRoaXMuZGF0YVByb2Nlc3NvclxuICAgIClcbiAgICB0aGlzLm1vZHVsZS5icHAgPSB0aGlzLnNlbGVjdGVkXG4gICAgdGhpcy5tb3VzZU1vdmUgPSBmcm9tRXZlbnQodGhpcy5jYW52YXM/Lm5hdGl2ZUVsZW1lbnQsICdtb3VzZW1vdmUnKVxuICAgIHRoaXMubW91c2VNb3ZlLnBpcGUodGhyb3R0bGVUaW1lKDIwMCkpLnN1YnNjcmliZSgoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgaWYgKHRoaXMubW91c2VIZWxwZXIgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLm1vdXNlSGVscGVyLm1vdXNlbW92ZShldmVudClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgb25Db25uZWN0aW9uU3RhdGVDaGFuZ2UgPSAocmVkaXJlY3RvcjogYW55LCBzdGF0ZTogbnVtYmVyKTogYW55ID0+IHtcbiAgICB0aGlzLmRldmljZVN0YXRlID0gc3RhdGVcbiAgICB0aGlzLmRldmljZVN0YXR1cy5lbWl0KHN0YXRlKVxuICB9XG5cbiAgb25SZWRpcmVjdG9yRXJyb3IoKTogdm9pZCB7XG4gICAgdGhpcy5yZXNldCgpXG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5zdGFudGlhdGUoKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5hdXRvQ29ubmVjdCgpXG4gICAgfSwgNDAwMClcbiAgfVxuXG4gIGF1dG9Db25uZWN0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZGlyZWN0b3IgIT0gbnVsbCkge1xuICAgICAgdGhpcy5yZWRpcmVjdG9yLnN0YXJ0KFdlYlNvY2tldClcbiAgICAgIHRoaXMua2V5Ym9hcmRIZWxwZXIuR3JhYktleUlucHV0KClcbiAgICB9XG4gIH1cblxuICBvbkVuY29kaW5nQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcEt2bSgpXG4gICAgdGltZXIoMTAwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuYXV0b0Nvbm5lY3QoKVxuICAgIH0pXG4gIH1cblxuICBjaGVja1Bvd2VyU3RhdHVzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBvd2VyU3RhdGUucG93ZXJzdGF0ZSA9PT0gMlxuICB9XG5cbiAgcmVzZXQgPSAoKTogdm9pZCA9PiB7XG4gICAgdGhpcy5yZWRpcmVjdG9yID0gbnVsbFxuICAgIHRoaXMubW9kdWxlID0gbnVsbFxuICAgIHRoaXMuZGF0YVByb2Nlc3NvciA9IG51bGxcbiAgICB0aGlzLmhlaWdodCA9IDQwMFxuICAgIHRoaXMud2lkdGggPSA0MDBcbiAgICB0aGlzLmluc3RhbnRpYXRlKClcbiAgfVxuXG4gIHN0b3BLdm0gPSAoKTogdm9pZCA9PiB7XG4gICAgdGhpcy5yZWRpcmVjdG9yLnN0b3AoKVxuICAgIHRoaXMua2V5Ym9hcmRIZWxwZXIuVW5HcmFiS2V5SW5wdXQoKVxuICAgIHRoaXMucmVzZXQoKVxuICB9XG5cbiAgb25Nb3VzZXVwKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW91c2VIZWxwZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5tb3VzZUhlbHBlci5tb3VzZXVwKGV2ZW50KVxuICAgIH1cbiAgfVxuXG4gIG9uTW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW91c2VIZWxwZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5tb3VzZUhlbHBlci5tb3VzZWRvd24oZXZlbnQpXG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZW1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb3VzZUhlbHBlciAhPSBudWxsKSB7XG4gICAgICB0aGlzLm1vdXNlSGVscGVyLm1vdXNlbW92ZShldmVudClcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BLdm0oKVxuICB9XG59XG4iLCI8ZGl2PlxuICA8Y2FudmFzXG4gICAgY2xhc3M9XCJjYW52YXNcIlxuICAgICNjYW52YXNcbiAgICBbd2lkdGhdPVwid2lkdGhcIlxuICAgIFtoZWlnaHRdPVwiaGVpZ2h0XCJcbiAgICBvbmNvbnRleHRtZW51PVwicmV0dXJuIGZhbHNlXCJcbiAgICAobW91c2V1cCk9XCJvbk1vdXNldXAoJGV2ZW50KVwiXG4gICAgKG1vdXNlZG93bik9XCJvbk1vdXNlZG93bigkZXZlbnQpXCJcbiAgICAobW91c2Vtb3ZlKT1cIm9uTW91c2Vtb3ZlKCRldmVudClcIlxuICA+PC9jYW52YXM+XG48L2Rpdj5cbiJdfQ==