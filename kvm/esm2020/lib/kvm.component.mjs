import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AMTDesktop, AMTKvmDataRedirector, ConsoleLogger, DataProcessor, KeyBoardHelper, MouseHelper, Protocol } from '@open-amt-cloud-toolkit/ui-toolkit/core';
import { fromEvent, timer } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import * as i0 from "@angular/core";
const _c0 = ["canvas"];
const _c1 = ["device"];
export class KvmComponent {
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
        this.context = this.canvas?.nativeElement.getContext('2d');
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
        this.mouseMove = fromEvent(this.canvas?.nativeElement, 'mousemove');
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
KvmComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KvmComponent, selectors: [["amt-kvm"]], viewQuery: function KvmComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
        i0.ɵɵviewQuery(_c1, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.canvas = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.device = _t.first);
    } }, inputs: { width: "width", height: "height", mpsServer: "mpsServer", authToken: "authToken", deviceId: "deviceId", deviceConnection: "deviceConnection", selectedEncoding: "selectedEncoding" }, outputs: { deviceStatus: "deviceStatus" }, decls: 3, vars: 2, consts: [["oncontextmenu", "return false", 1, "canvas", 3, "width", "height", "mouseup", "mousedown", "mousemove"], ["canvas", ""]], template: function KvmComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div")(1, "canvas", 0, 1);
        i0.ɵɵlistener("mouseup", function KvmComponent_Template_canvas_mouseup_1_listener($event) { return ctx.onMouseup($event); })("mousedown", function KvmComponent_Template_canvas_mousedown_1_listener($event) { return ctx.onMousedown($event); })("mousemove", function KvmComponent_Template_canvas_mousemove_1_listener($event) { return ctx.onMousemove($event); });
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("width", ctx.width)("height", ctx.height);
    } }, styles: [".canvas[_ngcontent-%COMP%]{max-height:80%;max-width:100%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KvmComponent, [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ZtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2t2bS9zcmMvbGliL2t2bS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9rdm0vc3JjL2xpYi9rdm0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUE7QUFDdEIsT0FBTyxFQUNMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsYUFBYSxFQUNiLGFBQWEsRUFHYixjQUFjLEVBQ2QsV0FBVyxFQUNYLFFBQVEsRUFDVCxNQUFNLHlDQUF5QyxDQUFBO0FBQ2hELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFBO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTs7OztBQU83QyxNQUFNLE9BQU8sWUFBWTtJQUx6QjtRQVVFLDhDQUE4QztRQUU5QixVQUFLLEdBQUcsR0FBRyxDQUFBO1FBQ1gsV0FBTSxHQUFHLEdBQUcsQ0FBQTtRQUNaLGNBQVMsR0FBRyxFQUFFLENBQUE7UUFDZCxjQUFTLEdBQUcsRUFBRSxDQUFBO1FBQ2QsYUFBUSxHQUFHLEVBQUUsQ0FBQTtRQUVuQixpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFBO1FBQ2hFLHFCQUFnQixHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFBO1FBQ3JFLHFCQUFnQixHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFBO1FBTzVFLGVBQVUsR0FBUSxDQUFDLENBQUE7UUFDbkIsYUFBUSxHQUFHLENBQUMsQ0FBQTtRQUVaLGNBQVMsR0FBUSxJQUFJLENBQUE7UUFDckIsY0FBUyxHQUFHO1lBQ1YsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVB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QUFBO1NBQ2xDO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBRSxLQUFpQjtRQUM1QixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ2xDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDaEIsQ0FBQzs7d0VBNUpVLFlBQVk7K0RBQVosWUFBWTs7Ozs7Ozs7UUM5QnpCLDJCQUFLLG1CQUFBO1FBT0QsbUdBQVcscUJBQWlCLElBQUMsMEZBQ2hCLHVCQUFtQixJQURILDBGQUVoQix1QkFBbUIsSUFGSDtRQUc5QixpQkFBUyxFQUFBOztRQU5SLGVBQWU7UUFBZixpQ0FBZSxzQkFBQTs7dUZEMEJOLFlBQVk7Y0FMeEIsU0FBUzsyQkFDRSxTQUFTO2dCQUtxQixNQUFNO2tCQUE3QyxTQUFTO21CQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7WUFDRSxNQUFNO2tCQUE3QyxTQUFTO21CQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7WUFLdEIsS0FBSztrQkFBcEIsS0FBSztZQUNVLE1BQU07a0JBQXJCLEtBQUs7WUFDVSxTQUFTO2tCQUF4QixLQUFLO1lBQ1UsU0FBUztrQkFBeEIsS0FBSztZQUNVLFFBQVE7a0JBQXZCLEtBQUs7WUFFSSxZQUFZO2tCQUFyQixNQUFNO1lBQ0UsZ0JBQWdCO2tCQUF4QixLQUFLO1lBQ0csZ0JBQWdCO2tCQUF4QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7XG4gIEFNVERlc2t0b3AsXG4gIEFNVEt2bURhdGFSZWRpcmVjdG9yLFxuICBDb25zb2xlTG9nZ2VyLFxuICBEYXRhUHJvY2Vzc29yLFxuICBJRGF0YVByb2Nlc3NvcixcbiAgSUxvZ2dlcixcbiAgS2V5Qm9hcmRIZWxwZXIsXG4gIE1vdXNlSGVscGVyLFxuICBQcm90b2NvbFxufSBmcm9tICdAb3Blbi1hbXQtY2xvdWQtdG9vbGtpdC91aS10b29sa2l0L2NvcmUnXG5pbXBvcnQgeyBmcm9tRXZlbnQsIHRpbWVyIH0gZnJvbSAncnhqcydcbmltcG9ydCB7IHRocm90dGxlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbXQta3ZtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2t2bS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2t2bS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgS3ZtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdjYW52YXMnLCB7IHN0YXRpYzogZmFsc2UgfSkgY2FudmFzOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkXG4gIEBWaWV3Q2hpbGQoJ2RldmljZScsIHsgc3RhdGljOiBmYWxzZSB9KSBkZXZpY2U6IHN0cmluZ1xuICBwdWJsaWMgY29udGV4dCE6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuXG4gIC8vIC8vc2V0dGluZyBhIHdpZHRoIGFuZCBoZWlnaHQgZm9yIHRoZSBjYW52YXNcblxuICBASW5wdXQoKSBwdWJsaWMgd2lkdGggPSA0MDBcbiAgQElucHV0KCkgcHVibGljIGhlaWdodCA9IDQwMFxuICBASW5wdXQoKSBwdWJsaWMgbXBzU2VydmVyID0gJydcbiAgQElucHV0KCkgcHVibGljIGF1dGhUb2tlbiA9ICcnXG4gIEBJbnB1dCgpIHB1YmxpYyBkZXZpY2VJZCA9ICcnXG5cbiAgQE91dHB1dCgpIGRldmljZVN0YXR1czogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKVxuICBASW5wdXQoKSBkZXZpY2VDb25uZWN0aW9uOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KClcbiAgQElucHV0KCkgc2VsZWN0ZWRFbmNvZGluZzogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKVxuICBtb2R1bGU6IGFueVxuICByZWRpcmVjdG9yOiBhbnlcbiAgZGF0YVByb2Nlc3NvciE6IElEYXRhUHJvY2Vzc29yIHwgbnVsbFxuICBtb3VzZUhlbHBlciE6IE1vdXNlSGVscGVyXG4gIGtleWJvYXJkSGVscGVyITogS2V5Qm9hcmRIZWxwZXJcbiAgbG9nZ2VyITogSUxvZ2dlclxuICBwb3dlclN0YXRlOiBhbnkgPSAwXG4gIHNlbGVjdGVkID0gMVxuICB0aW1lSW50ZXJ2YWwhOiBhbnlcbiAgbW91c2VNb3ZlOiBhbnkgPSBudWxsXG4gIGVuY29kaW5ncyA9IFtcbiAgICB7IHZhbHVlOiAxLCB2aWV3VmFsdWU6ICdSTEUgOCcgfSxcbiAgICB7IHZhbHVlOiAyLCB2aWV3VmFsdWU6ICdSTEUgMTYnIH1cbiAgXVxuXG4gIG5nT25Jbml0ICgpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ2dlciA9IG5ldyBDb25zb2xlTG9nZ2VyKDEpXG4gICAgdGhpcy5kZXZpY2VDb25uZWN0aW9uLnN1YnNjcmliZSgoZGF0YTogYm9vbGVhbikgPT4ge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgdGhpcy5pbml0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RvcEt2bSgpXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLnNlbGVjdGVkRW5jb2Rpbmcuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gZGF0YVxuICAgICAgdGhpcy5vbkVuY29kaW5nQ2hhbmdlKClcbiAgICB9KVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0ICgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgaW5zdGFudGlhdGUgKCk6IHZvaWQge1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzPy5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLnJlZGlyZWN0b3IgPSBuZXcgQU1US3ZtRGF0YVJlZGlyZWN0b3IoXG4gICAgICB0aGlzLmxvZ2dlcixcbiAgICAgIFByb3RvY29sLktWTSxcbiAgICAgIG5ldyBGaWxlUmVhZGVyKCksXG4gICAgICB0aGlzLmRldmljZUlkLFxuICAgICAgMTY5OTQsXG4gICAgICAnJyxcbiAgICAgICcnLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICB0aGlzLmF1dGhUb2tlbixcbiAgICAgIHRoaXMubXBzU2VydmVyXG4gICAgKVxuICAgIHRoaXMubW9kdWxlID0gbmV3IEFNVERlc2t0b3AodGhpcy5sb2dnZXIgYXMgYW55LCB0aGlzLmNvbnRleHQpXG4gICAgdGhpcy5kYXRhUHJvY2Vzc29yID0gbmV3IERhdGFQcm9jZXNzb3IoXG4gICAgICB0aGlzLmxvZ2dlcixcbiAgICAgIHRoaXMucmVkaXJlY3RvcixcbiAgICAgIHRoaXMubW9kdWxlXG4gICAgKVxuICAgIHRoaXMubW91c2VIZWxwZXIgPSBuZXcgTW91c2VIZWxwZXIodGhpcy5tb2R1bGUsIHRoaXMucmVkaXJlY3RvciwgMjAwKVxuICAgIHRoaXMua2V5Ym9hcmRIZWxwZXIgPSBuZXcgS2V5Qm9hcmRIZWxwZXIodGhpcy5tb2R1bGUsIHRoaXMucmVkaXJlY3RvcilcbiAgICB0aGlzLnJlZGlyZWN0b3Iub25Qcm9jZXNzRGF0YSA9IHRoaXMubW9kdWxlLnByb2Nlc3NEYXRhLmJpbmQodGhpcy5tb2R1bGUpXG4gICAgdGhpcy5yZWRpcmVjdG9yLm9uU3RhcnQgPSB0aGlzLm1vZHVsZS5zdGFydC5iaW5kKHRoaXMubW9kdWxlKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vbk5ld1N0YXRlID0gdGhpcy5tb2R1bGUub25TdGF0ZUNoYW5nZS5iaW5kKHRoaXMubW9kdWxlKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vblNlbmRLdm1EYXRhID0gdGhpcy5tb2R1bGUub25TZW5kS3ZtRGF0YS5iaW5kKHRoaXMubW9kdWxlKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vblN0YXRlQ2hhbmdlZCA9IHRoaXMub25Db25uZWN0aW9uU3RhdGVDaGFuZ2UuYmluZCh0aGlzKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vbkVycm9yID0gdGhpcy5vblJlZGlyZWN0b3JFcnJvci5iaW5kKHRoaXMpXG4gICAgdGhpcy5tb2R1bGUub25TZW5kID0gdGhpcy5yZWRpcmVjdG9yLnNlbmQuYmluZCh0aGlzLnJlZGlyZWN0b3IpXG4gICAgdGhpcy5tb2R1bGUub25Qcm9jZXNzRGF0YSA9IHRoaXMuZGF0YVByb2Nlc3Nvci5wcm9jZXNzRGF0YS5iaW5kKFxuICAgICAgdGhpcy5kYXRhUHJvY2Vzc29yXG4gICAgKVxuICAgIHRoaXMubW9kdWxlLmJwcCA9IHRoaXMuc2VsZWN0ZWRcbiAgICB0aGlzLm1vdXNlTW92ZSA9IGZyb21FdmVudCh0aGlzLmNhbnZhcz8ubmF0aXZlRWxlbWVudCwgJ21vdXNlbW92ZScpXG4gICAgdGhpcy5tb3VzZU1vdmUucGlwZSh0aHJvdHRsZVRpbWUoMjAwKSkuc3Vic2NyaWJlKChldmVudDogYW55KSA9PiB7XG4gICAgICBpZiAodGhpcy5tb3VzZUhlbHBlciAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMubW91c2VIZWxwZXIubW91c2Vtb3ZlKGV2ZW50KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBvbkNvbm5lY3Rpb25TdGF0ZUNoYW5nZSA9IChyZWRpcmVjdG9yOiBhbnksIHN0YXRlOiBudW1iZXIpOiBhbnkgPT4ge1xuICAgIHRoaXMuZGV2aWNlU3RhdHVzLmVtaXQoc3RhdGUpXG4gIH1cblxuICBvblJlZGlyZWN0b3JFcnJvciAoKTogdm9pZCB7XG4gICAgdGhpcy5yZXNldCgpXG4gIH1cblxuICBpbml0ICgpOiB2b2lkIHtcbiAgICB0aGlzLmluc3RhbnRpYXRlKClcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYXV0b0Nvbm5lY3QoKVxuICAgIH0sIDQwMDApXG4gIH1cblxuICBhdXRvQ29ubmVjdCAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVkaXJlY3RvciAhPSBudWxsKSB7XG4gICAgICB0aGlzLnJlZGlyZWN0b3Iuc3RhcnQoV2ViU29ja2V0KVxuICAgICAgdGhpcy5rZXlib2FyZEhlbHBlci5HcmFiS2V5SW5wdXQoKVxuICAgIH1cbiAgfVxuXG4gIG9uRW5jb2RpbmdDaGFuZ2UgKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcEt2bSgpXG4gICAgdGltZXIoMTAwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuYXV0b0Nvbm5lY3QoKVxuICAgIH0pXG4gIH1cblxuICByZXNldCA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLnJlZGlyZWN0b3IgPSBudWxsXG4gICAgdGhpcy5tb2R1bGUgPSBudWxsXG4gICAgdGhpcy5kYXRhUHJvY2Vzc29yID0gbnVsbFxuICAgIHRoaXMuaGVpZ2h0ID0gNDAwXG4gICAgdGhpcy53aWR0aCA9IDQwMFxuICAgIHRoaXMuaW5zdGFudGlhdGUoKVxuICB9XG5cbiAgc3RvcEt2bSA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLnJlZGlyZWN0b3Iuc3RvcCgpXG4gICAgdGhpcy5rZXlib2FyZEhlbHBlci5VbkdyYWJLZXlJbnB1dCgpXG4gICAgdGhpcy5yZXNldCgpXG4gIH1cblxuICBvbk1vdXNldXAgKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW91c2VIZWxwZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5tb3VzZUhlbHBlci5tb3VzZXVwKGV2ZW50KVxuICAgIH1cbiAgfVxuXG4gIG9uTW91c2Vkb3duIChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vdXNlSGVscGVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMubW91c2VIZWxwZXIubW91c2Vkb3duKGV2ZW50KVxuICAgIH1cbiAgfVxuXG4gIG9uTW91c2Vtb3ZlIChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vdXNlSGVscGVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMubW91c2VIZWxwZXIubW91c2Vtb3ZlKGV2ZW50KVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95ICgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BLdm0oKVxuICB9XG59XG4iLCI8ZGl2PlxuICA8Y2FudmFzXG4gICAgY2xhc3M9XCJjYW52YXNcIlxuICAgICNjYW52YXNcbiAgICBbd2lkdGhdPVwid2lkdGhcIlxuICAgIFtoZWlnaHRdPVwiaGVpZ2h0XCJcbiAgICBvbmNvbnRleHRtZW51PVwicmV0dXJuIGZhbHNlXCJcbiAgICAobW91c2V1cCk9XCJvbk1vdXNldXAoJGV2ZW50KVwiXG4gICAgKG1vdXNlZG93bik9XCJvbk1vdXNlZG93bigkZXZlbnQpXCJcbiAgICAobW91c2Vtb3ZlKT1cIm9uTW91c2Vtb3ZlKCRldmVudClcIlxuICA+PC9jYW52YXM+XG48L2Rpdj5cbiJdfQ==