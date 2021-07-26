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
KvmComponent.ɵcmp = i0.ɵɵdefineComponent({ type: KvmComponent, selectors: [["amt-kvm"]], viewQuery: function KvmComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 1);
        i0.ɵɵviewQuery(_c1, 1);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.canvas = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.device = _t.first);
    } }, inputs: { width: "width", height: "height", mpsServer: "mpsServer", authToken: "authToken", deviceId: "deviceId", deviceConnection: "deviceConnection", selectedEncoding: "selectedEncoding" }, outputs: { deviceStatus: "deviceStatus" }, decls: 3, vars: 2, consts: [["oncontextmenu", "return false", 1, "canvas", 3, "width", "height", "mouseup", "mousedown", "mousemove"], ["canvas", ""]], template: function KvmComponent_Template(rf, ctx) { if (rf & 1) {
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
                styleUrls: ['./kvm.component.css']
            }]
    }], function () { return []; }, { canvas: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ZtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2t2bS9zcmMvbGliL2t2bS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9rdm0vc3JjL2xpYi9rdm0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxZQUFZLEVBRVosS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUE7QUFDdEIsT0FBTyxFQUNMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsYUFBYSxFQUNiLGFBQWEsRUFHYixjQUFjLEVBQ2QsV0FBVyxFQUNYLFFBQVEsRUFDVCxNQUFNLHlDQUF5QyxDQUFBO0FBQ2hELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFBO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTs7OztBQVE3QyxNQUFNLE9BQU8sWUFBWTtJQStCdkI7UUExQkEsOENBQThDO1FBRTlCLFVBQUssR0FBRyxHQUFHLENBQUE7UUFDWCxXQUFNLEdBQUcsR0FBRyxDQUFBO1FBQ1osY0FBUyxHQUFHLEVBQUUsQ0FBQTtRQUNkLGNBQVMsR0FBRyxFQUFFLENBQUE7UUFDZCxhQUFRLEdBQUcsRUFBRSxDQUFBO1FBRW5CLGlCQUFZLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUE7UUFDaEUscUJBQWdCLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUE7UUFDckUscUJBQWdCLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUE7UUFPNUUsZUFBVSxHQUFRLENBQUMsQ0FBQTtRQUNuQixhQUFRLEdBQUcsQ0FBQyxDQUFBO1FBRVosY0FBUyxHQUFRLElBQUksQ0FBQTtRQUNyQixjQUFTLEdBQUc7WUFDVixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLE9BQU8s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QUssQ0FBQyxDQUFBO1NBQ2xDO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFpQjtRQUMzQixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ2xDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDaEIsQ0FBQzs7d0VBbEtVLFlBQVk7aURBQVosWUFBWTs7Ozs7Ozs7UUNoQ3pCLDJCQUFLO1FBQ0gsb0NBU0M7UUFIQyxtR0FBVyxxQkFBaUIsSUFBQywwRkFDaEIsdUJBQW1CLElBREgsMEZBRWhCLHVCQUFtQixJQUZIO1FBRzlCLGlCQUFTO1FBQ1osaUJBQU07O1FBUEYsZUFBZTtRQUFmLGlDQUFlLHNCQUFBOzt1RkQ0Qk4sWUFBWTtjQUx4QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLFdBQVcsRUFBRSxzQkFBc0I7Z0JBQ25DLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2FBQ25DO3NDQUV5QyxNQUFNO2tCQUE3QyxTQUFTO21CQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7WUFDRSxNQUFNO2tCQUE3QyxTQUFTO21CQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7WUFLdEIsS0FBSztrQkFBcEIsS0FBSztZQUNVLE1BQU07a0JBQXJCLEtBQUs7WUFDVSxTQUFTO2tCQUF4QixLQUFLO1lBQ1UsU0FBUztrQkFBeEIsS0FBSztZQUNVLFFBQVE7a0JBQXZCLEtBQUs7WUFFSSxZQUFZO2tCQUFyQixNQUFNO1lBQ0UsZ0JBQWdCO2tCQUF4QixLQUFLO1lBQ0csZ0JBQWdCO2tCQUF4QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtcbiAgQU1URGVza3RvcCxcbiAgQU1US3ZtRGF0YVJlZGlyZWN0b3IsXG4gIENvbnNvbGVMb2dnZXIsXG4gIERhdGFQcm9jZXNzb3IsXG4gIElEYXRhUHJvY2Vzc29yLFxuICBJTG9nZ2VyLFxuICBLZXlCb2FyZEhlbHBlcixcbiAgTW91c2VIZWxwZXIsXG4gIFByb3RvY29sXG59IGZyb20gJ0BvcGVuLWFtdC1jbG91ZC10b29sa2l0L3VpLXRvb2xraXQvY29yZSdcbmltcG9ydCB7IGZyb21FdmVudCwgdGltZXIgfSBmcm9tICdyeGpzJ1xuaW1wb3J0IHsgdGhyb3R0bGVUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcidcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYW10LWt2bScsXG4gIHRlbXBsYXRlVXJsOiAnLi9rdm0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9rdm0uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEt2bUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnY2FudmFzJywgeyBzdGF0aWM6IGZhbHNlIH0pIGNhbnZhczogRWxlbWVudFJlZiB8IHVuZGVmaW5lZFxuICBAVmlld0NoaWxkKCdkZXZpY2UnLCB7IHN0YXRpYzogZmFsc2UgfSkgZGV2aWNlOiBzdHJpbmdcbiAgcHVibGljIGNvbnRleHQhOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcblxuICAvLyAvL3NldHRpbmcgYSB3aWR0aCBhbmQgaGVpZ2h0IGZvciB0aGUgY2FudmFzXG5cbiAgQElucHV0KCkgcHVibGljIHdpZHRoID0gNDAwXG4gIEBJbnB1dCgpIHB1YmxpYyBoZWlnaHQgPSA0MDBcbiAgQElucHV0KCkgcHVibGljIG1wc1NlcnZlciA9ICcnXG4gIEBJbnB1dCgpIHB1YmxpYyBhdXRoVG9rZW4gPSAnJ1xuICBASW5wdXQoKSBwdWJsaWMgZGV2aWNlSWQgPSAnJ1xuXG4gIEBPdXRwdXQoKSBkZXZpY2VTdGF0dXM6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KClcbiAgQElucHV0KCkgZGV2aWNlQ29ubmVjdGlvbjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpXG4gIEBJbnB1dCgpIHNlbGVjdGVkRW5jb2Rpbmc6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KClcbiAgbW9kdWxlOiBhbnlcbiAgcmVkaXJlY3RvcjogYW55XG4gIGRhdGFQcm9jZXNzb3IhOiBJRGF0YVByb2Nlc3NvciB8IG51bGxcbiAgbW91c2VIZWxwZXIhOiBNb3VzZUhlbHBlclxuICBrZXlib2FyZEhlbHBlciE6IEtleUJvYXJkSGVscGVyXG4gIGxvZ2dlciE6IElMb2dnZXJcbiAgcG93ZXJTdGF0ZTogYW55ID0gMFxuICBzZWxlY3RlZCA9IDFcbiAgdGltZUludGVydmFsITogYW55XG4gIG1vdXNlTW92ZTogYW55ID0gbnVsbFxuICBlbmNvZGluZ3MgPSBbXG4gICAgeyB2YWx1ZTogMSwgdmlld1ZhbHVlOiAnUkxFIDgnIH0sXG4gICAgeyB2YWx1ZTogMiwgdmlld1ZhbHVlOiAnUkxFIDE2JyB9XG4gIF1cblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cblxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyID0gbmV3IENvbnNvbGVMb2dnZXIoMSlcbiAgICB0aGlzLmRldmljZUNvbm5lY3Rpb24uc3Vic2NyaWJlKChkYXRhOiBib29sZWFuKSA9PiB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICB0aGlzLmluaXQoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdG9wS3ZtKClcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMuc2VsZWN0ZWRFbmNvZGluZy5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBkYXRhXG4gICAgICB0aGlzLm9uRW5jb2RpbmdDaGFuZ2UoKVxuICAgIH0pXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIGluc3RhbnRpYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzPy5uYXRpdmVFbGVtZW50LmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLnJlZGlyZWN0b3IgPSBuZXcgQU1US3ZtRGF0YVJlZGlyZWN0b3IoXG4gICAgICB0aGlzLmxvZ2dlcixcbiAgICAgIFByb3RvY29sLktWTSxcbiAgICAgIG5ldyBGaWxlUmVhZGVyKCksXG4gICAgICB0aGlzLmRldmljZUlkLFxuICAgICAgMTY5OTQsXG4gICAgICAnJyxcbiAgICAgICcnLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICB0aGlzLmF1dGhUb2tlbixcbiAgICAgIHRoaXMubXBzU2VydmVyXG4gICAgKVxuICAgIHRoaXMubW9kdWxlID0gbmV3IEFNVERlc2t0b3AodGhpcy5sb2dnZXIgYXMgYW55LCB0aGlzLmNvbnRleHQpXG4gICAgdGhpcy5kYXRhUHJvY2Vzc29yID0gbmV3IERhdGFQcm9jZXNzb3IoXG4gICAgICB0aGlzLmxvZ2dlcixcbiAgICAgIHRoaXMucmVkaXJlY3RvcixcbiAgICAgIHRoaXMubW9kdWxlXG4gICAgKVxuICAgIHRoaXMubW91c2VIZWxwZXIgPSBuZXcgTW91c2VIZWxwZXIodGhpcy5tb2R1bGUsIHRoaXMucmVkaXJlY3RvciwgMjAwKVxuICAgIHRoaXMua2V5Ym9hcmRIZWxwZXIgPSBuZXcgS2V5Qm9hcmRIZWxwZXIodGhpcy5tb2R1bGUsIHRoaXMucmVkaXJlY3RvcilcbiAgICB0aGlzLnJlZGlyZWN0b3Iub25Qcm9jZXNzRGF0YSA9IHRoaXMubW9kdWxlLnByb2Nlc3NEYXRhLmJpbmQodGhpcy5tb2R1bGUpXG4gICAgdGhpcy5yZWRpcmVjdG9yLm9uU3RhcnQgPSB0aGlzLm1vZHVsZS5zdGFydC5iaW5kKHRoaXMubW9kdWxlKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vbk5ld1N0YXRlID0gdGhpcy5tb2R1bGUub25TdGF0ZUNoYW5nZS5iaW5kKHRoaXMubW9kdWxlKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vblNlbmRLdm1EYXRhID0gdGhpcy5tb2R1bGUub25TZW5kS3ZtRGF0YS5iaW5kKHRoaXMubW9kdWxlKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vblN0YXRlQ2hhbmdlZCA9IHRoaXMub25Db25uZWN0aW9uU3RhdGVDaGFuZ2UuYmluZCh0aGlzKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vbkVycm9yID0gdGhpcy5vblJlZGlyZWN0b3JFcnJvci5iaW5kKHRoaXMpXG4gICAgdGhpcy5tb2R1bGUub25TZW5kID0gdGhpcy5yZWRpcmVjdG9yLnNlbmQuYmluZCh0aGlzLnJlZGlyZWN0b3IpXG4gICAgdGhpcy5tb2R1bGUub25Qcm9jZXNzRGF0YSA9IHRoaXMuZGF0YVByb2Nlc3Nvci5wcm9jZXNzRGF0YS5iaW5kKFxuICAgICAgdGhpcy5kYXRhUHJvY2Vzc29yXG4gICAgKVxuICAgIHRoaXMubW9kdWxlLmJwcCA9IHRoaXMuc2VsZWN0ZWRcbiAgICB0aGlzLm1vdXNlTW92ZSA9IGZyb21FdmVudCh0aGlzLmNhbnZhcz8ubmF0aXZlRWxlbWVudCwgJ21vdXNlbW92ZScpXG4gICAgdGhpcy5tb3VzZU1vdmUucGlwZSh0aHJvdHRsZVRpbWUoMjAwKSkuc3Vic2NyaWJlKChldmVudDogYW55KSA9PiB7XG4gICAgICBpZiAodGhpcy5tb3VzZUhlbHBlciAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMubW91c2VIZWxwZXIubW91c2Vtb3ZlKGV2ZW50KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBvbkNvbm5lY3Rpb25TdGF0ZUNoYW5nZSA9IChyZWRpcmVjdG9yOiBhbnksIHN0YXRlOiBudW1iZXIpOiBhbnkgPT4ge1xuICAgIHRoaXMuZGV2aWNlU3RhdHVzLmVtaXQoc3RhdGUpXG4gIH1cblxuICBvblJlZGlyZWN0b3JFcnJvcigpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2V0KClcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbnN0YW50aWF0ZSgpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmF1dG9Db25uZWN0KClcbiAgICB9LCA0MDAwKVxuICB9XG5cbiAgYXV0b0Nvbm5lY3QoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVkaXJlY3RvciAhPSBudWxsKSB7XG4gICAgICB0aGlzLnJlZGlyZWN0b3Iuc3RhcnQoV2ViU29ja2V0KVxuICAgICAgdGhpcy5rZXlib2FyZEhlbHBlci5HcmFiS2V5SW5wdXQoKVxuICAgIH1cbiAgfVxuXG4gIG9uRW5jb2RpbmdDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wS3ZtKClcbiAgICB0aW1lcigxMDAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5hdXRvQ29ubmVjdCgpXG4gICAgfSlcbiAgfVxuXG4gIHJlc2V0ID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMucmVkaXJlY3RvciA9IG51bGxcbiAgICB0aGlzLm1vZHVsZSA9IG51bGxcbiAgICB0aGlzLmRhdGFQcm9jZXNzb3IgPSBudWxsXG4gICAgdGhpcy5oZWlnaHQgPSA0MDBcbiAgICB0aGlzLndpZHRoID0gNDAwXG4gICAgdGhpcy5pbnN0YW50aWF0ZSgpXG4gIH1cblxuICBzdG9wS3ZtID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMucmVkaXJlY3Rvci5zdG9wKClcbiAgICB0aGlzLmtleWJvYXJkSGVscGVyLlVuR3JhYktleUlucHV0KClcbiAgICB0aGlzLnJlc2V0KClcbiAgfVxuXG4gIG9uTW91c2V1cChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vdXNlSGVscGVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMubW91c2VIZWxwZXIubW91c2V1cChldmVudClcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlZG93bihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vdXNlSGVscGVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMubW91c2VIZWxwZXIubW91c2Vkb3duKGV2ZW50KVxuICAgIH1cbiAgfVxuXG4gIG9uTW91c2Vtb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW91c2VIZWxwZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5tb3VzZUhlbHBlci5tb3VzZW1vdmUoZXZlbnQpXG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wS3ZtKClcbiAgfVxufVxuIiwiPGRpdj5cbiAgPGNhbnZhc1xuICAgIGNsYXNzPVwiY2FudmFzXCJcbiAgICAjY2FudmFzXG4gICAgW3dpZHRoXT1cIndpZHRoXCJcbiAgICBbaGVpZ2h0XT1cImhlaWdodFwiXG4gICAgb25jb250ZXh0bWVudT1cInJldHVybiBmYWxzZVwiXG4gICAgKG1vdXNldXApPVwib25Nb3VzZXVwKCRldmVudClcIlxuICAgIChtb3VzZWRvd24pPVwib25Nb3VzZWRvd24oJGV2ZW50KVwiXG4gICAgKG1vdXNlbW92ZSk9XCJvbk1vdXNlbW92ZSgkZXZlbnQpXCJcbiAgPjwvY2FudmFzPlxuPC9kaXY+XG4iXX0=