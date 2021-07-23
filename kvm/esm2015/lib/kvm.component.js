import { Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { AMTDesktop, AMTKvmDataRedirector, ConsoleLogger, DataProcessor, KeyBoardHelper, MouseHelper, Protocol } from '@open-amt-cloud-toolkit/ui-toolkit/core';
import { fromEvent, timer } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const _c0 = ["canvas"];
const _c1 = ["device"];
export class KvmComponent {
    constructor(params, activatedRoute) {
        this.params = params;
        this.activatedRoute = activatedRoute;
        // //setting a width and height for the canvas
        this.width = 400;
        this.height = 400;
        this.deviceStatus = new EventEmitter();
        this.deviceConnection = new EventEmitter();
        this.selectedEncoding = new EventEmitter();
        this.powerState = 0;
        this.deviceId = '';
        this.selected = 1;
        this.server = '';
        this.mouseMove = null;
        this.encodings = [
            { value: 1, viewValue: 'RLE 8' },
            { value: 2, viewValue: 'RLE 16' }
        ];
        this.urlConstructor = () => {
            return this.params.mpsServer.replace('http', 'ws');
        };
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
        const loggedInUser = localStorage.getItem('loggedInUser');
        this.token = loggedInUser ? JSON.parse(loggedInUser).token : '{}';
        this.server = `${this.urlConstructor()}/relay`;
        this.mpsServer = this.params.mpsServer.includes('/mps');
        if (this.mpsServer) {
            // handles kong route
            this.server = `${this.urlConstructor()}/ws/relay`;
        }
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.deviceId = params.id;
        });
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
        this.redirector = new AMTKvmDataRedirector(this.logger, Protocol.KVM, new FileReader(), this.deviceId, 16994, '', '', 0, 0, JSON.parse(this.token).token, this.server);
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
KvmComponent.ɵfac = function KvmComponent_Factory(t) { return new (t || KvmComponent)(i0.ɵɵdirectiveInject('userInput'), i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
KvmComponent.ɵcmp = i0.ɵɵdefineComponent({ type: KvmComponent, selectors: [["amt-kvm"]], viewQuery: function KvmComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 1);
        i0.ɵɵviewQuery(_c1, 1);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.canvas = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.device = _t.first);
    } }, inputs: { width: "width", height: "height", deviceConnection: "deviceConnection", selectedEncoding: "selectedEncoding" }, outputs: { deviceStatus: "deviceStatus" }, decls: 3, vars: 2, consts: [["oncontextmenu", "return false", 1, "canvas", 3, "width", "height", "mouseup", "mousedown", "mousemove"], ["canvas", ""]], template: function KvmComponent_Template(rf, ctx) { if (rf & 1) {
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
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: ['userInput']
            }] }, { type: i1.ActivatedRoute }]; }, { canvas: [{
            type: ViewChild,
            args: ['canvas', { static: false }]
        }], device: [{
            type: ViewChild,
            args: ['device', { static: false }]
        }], width: [{
            type: Input
        }], height: [{
            type: Input
        }], deviceStatus: [{
            type: Output
        }], deviceConnection: [{
            type: Input
        }], selectedEncoding: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ZtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2t2bS9zcmMvbGliL2t2bS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9rdm0vc3JjL2xpYi9rdm0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFBO0FBQ3RCLE9BQU8sRUFDTCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLGFBQWEsRUFDYixhQUFhLEVBR2IsY0FBYyxFQUNkLFdBQVcsRUFDWCxRQUFRLEVBQ1QsTUFBTSx5Q0FBeUMsQ0FBQTtBQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQTtBQUN2QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7Ozs7O0FBUTdDLE1BQU0sT0FBTyxZQUFZO0lBK0J2QixZQUF3QyxNQUFNLEVBQVMsY0FBOEI7UUFBN0MsV0FBTSxHQUFOLE1BQU0sQ0FBQTtRQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQTFCckYsOENBQThDO1FBRTlCLFVBQUssR0FBRyxHQUFHLENBQUE7UUFDWCxXQUFNLEdBQUcsR0FBRyxDQUFBO1FBQ2xCLGlCQUFZLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUE7UUFDaEUscUJBQWdCLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUE7UUFDckUscUJBQWdCLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUE7UUFRNUUsZUFBVSxHQUFRLENBQUMsQ0FBQTtRQUNuQixhQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2IsYUFBUSxHQUFHLENBQUMsQ0FBQTtRQUVaLFdBQU0sR0FBRyxFQUFFLENBQUE7UUFDWCxjQUFTLEdBQVEsSUFBSSxDQUFB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QUFBO1NBQ2xDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDaEIsQ0FBQzs7d0VBOUtVLFlBQVksdUJBK0JILFdBQVc7aURBL0JwQixZQUFZOzs7Ozs7OztRQ2hDekIsMkJBQUs7UUFDSCxvQ0FTQztRQUhDLG1HQUFXLHFCQUFpQixJQUFDLDBGQUNoQix1QkFBbUIsSUFESCwwRkFFaEIsdUJBQW1CLElBRkg7UUFHOUIsaUJBQVM7UUFDWixpQkFBTTs7UUFQRixlQUFlO1FBQWYsaUNBQWUsc0JBQUE7O3VGRDRCTixZQUFZO2NBTHhCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsV0FBVyxFQUFFLHNCQUFzQjtnQkFDbkMsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7YUFDbkM7O3NCQWdDYyxNQUFNO3VCQUFDLFdBQVc7cURBOUJTLE1BQU07a0JBQTdDLFNBQVM7bUJBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtZQUNFLE1BQU07a0JBQTdDLFNBQVM7bUJBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtZQUt0QixLQUFLO2tCQUFwQixLQUFLO1lBQ1UsTUFBTTtrQkFBckIsS0FBSztZQUNJLFlBQVk7a0JBQXJCLE1BQU07WUFDRSxnQkFBZ0I7a0JBQXhCLEtBQUs7WUFDRyxnQkFBZ0I7a0JBQXhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge1xuICBBTVREZXNrdG9wLFxuICBBTVRLdm1EYXRhUmVkaXJlY3RvcixcbiAgQ29uc29sZUxvZ2dlcixcbiAgRGF0YVByb2Nlc3NvcixcbiAgSURhdGFQcm9jZXNzb3IsXG4gIElMb2dnZXIsXG4gIEtleUJvYXJkSGVscGVyLFxuICBNb3VzZUhlbHBlcixcbiAgUHJvdG9jb2xcbn0gZnJvbSAnQG9wZW4tYW10LWNsb3VkLXRvb2xraXQvdWktdG9vbGtpdC9jb3JlJ1xuaW1wb3J0IHsgZnJvbUV2ZW50LCB0aW1lciB9IGZyb20gJ3J4anMnXG5pbXBvcnQgeyB0aHJvdHRsZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbXQta3ZtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2t2bS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2t2bS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgS3ZtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdjYW52YXMnLCB7IHN0YXRpYzogZmFsc2UgfSkgY2FudmFzOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkXG4gIEBWaWV3Q2hpbGQoJ2RldmljZScsIHsgc3RhdGljOiBmYWxzZSB9KSBkZXZpY2U6IHN0cmluZ1xuICBwdWJsaWMgY29udGV4dCE6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuXG4gIC8vIC8vc2V0dGluZyBhIHdpZHRoIGFuZCBoZWlnaHQgZm9yIHRoZSBjYW52YXNcblxuICBASW5wdXQoKSBwdWJsaWMgd2lkdGggPSA0MDBcbiAgQElucHV0KCkgcHVibGljIGhlaWdodCA9IDQwMFxuICBAT3V0cHV0KCkgZGV2aWNlU3RhdHVzOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpXG4gIEBJbnB1dCgpIGRldmljZUNvbm5lY3Rpb246IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKVxuICBASW5wdXQoKSBzZWxlY3RlZEVuY29kaW5nOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpXG4gIHRva2VuOiBhbnlcbiAgbW9kdWxlOiBhbnlcbiAgcmVkaXJlY3RvcjogYW55XG4gIGRhdGFQcm9jZXNzb3IhOiBJRGF0YVByb2Nlc3NvciB8IG51bGxcbiAgbW91c2VIZWxwZXIhOiBNb3VzZUhlbHBlclxuICBrZXlib2FyZEhlbHBlciE6IEtleUJvYXJkSGVscGVyXG4gIGxvZ2dlciE6IElMb2dnZXJcbiAgcG93ZXJTdGF0ZTogYW55ID0gMFxuICBkZXZpY2VJZCA9ICcnXG4gIHNlbGVjdGVkID0gMVxuICB0aW1lSW50ZXJ2YWwhOiBhbnlcbiAgc2VydmVyID0gJydcbiAgbW91c2VNb3ZlOiBhbnkgPSBudWxsXG4gIG1wc1NlcnZlcjogYm9vbGVhblxuICBlbmNvZGluZ3MgPSBbXG4gICAgeyB2YWx1ZTogMSwgdmlld1ZhbHVlOiAnUkxFIDgnIH0sXG4gICAgeyB2YWx1ZTogMiwgdmlld1ZhbHVlOiAnUkxFIDE2JyB9XG4gIF1cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KCd1c2VySW5wdXQnKSBwdWJsaWMgcGFyYW1zLCBwdWJsaWMgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgY29uc3QgbG9nZ2VkSW5Vc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlZEluVXNlcicpXG4gICAgdGhpcy50b2tlbiA9IGxvZ2dlZEluVXNlciA/IEpTT04ucGFyc2UobG9nZ2VkSW5Vc2VyKS50b2tlbiA6ICd7fSdcbiAgICB0aGlzLnNlcnZlciA9IGAke3RoaXMudXJsQ29uc3RydWN0b3IoKX0vcmVsYXlgXG4gICAgdGhpcy5tcHNTZXJ2ZXIgPSB0aGlzLnBhcmFtcy5tcHNTZXJ2ZXIuaW5jbHVkZXMoJy9tcHMnKVxuICAgIGlmICh0aGlzLm1wc1NlcnZlcikge1xuICAgICAgLy8gaGFuZGxlcyBrb25nIHJvdXRlXG4gICAgICB0aGlzLnNlcnZlciA9IGAke3RoaXMudXJsQ29uc3RydWN0b3IoKX0vd3MvcmVsYXlgXG4gICAgfVxuICB9XG5cbiAgdXJsQ29uc3RydWN0b3IgPSAoKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXMubXBzU2VydmVyLnJlcGxhY2UoJ2h0dHAnLCAnd3MnKVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICB0aGlzLmRldmljZUlkID0gcGFyYW1zLmlkXG4gICAgfSlcbiAgICB0aGlzLmxvZ2dlciA9IG5ldyBDb25zb2xlTG9nZ2VyKDEpXG4gICAgdGhpcy5kZXZpY2VDb25uZWN0aW9uLnN1YnNjcmliZSgoZGF0YTogYm9vbGVhbikgPT4ge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgdGhpcy5pbml0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RvcEt2bSgpXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLnNlbGVjdGVkRW5jb2Rpbmcuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gZGF0YVxuICAgICAgdGhpcy5vbkVuY29kaW5nQ2hhbmdlKClcbiAgICB9KVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBpbnN0YW50aWF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcz8ubmF0aXZlRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpXG4gICAgdGhpcy5yZWRpcmVjdG9yID0gbmV3IEFNVEt2bURhdGFSZWRpcmVjdG9yKFxuICAgICAgdGhpcy5sb2dnZXIsXG4gICAgICBQcm90b2NvbC5LVk0sXG4gICAgICBuZXcgRmlsZVJlYWRlcigpLFxuICAgICAgdGhpcy5kZXZpY2VJZCxcbiAgICAgIDE2OTk0LFxuICAgICAgJycsXG4gICAgICAnJyxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgSlNPTi5wYXJzZSh0aGlzLnRva2VuKS50b2tlbixcbiAgICAgIHRoaXMuc2VydmVyXG4gICAgKVxuICAgIHRoaXMubW9kdWxlID0gbmV3IEFNVERlc2t0b3AodGhpcy5sb2dnZXIgYXMgYW55LCB0aGlzLmNvbnRleHQpXG4gICAgdGhpcy5kYXRhUHJvY2Vzc29yID0gbmV3IERhdGFQcm9jZXNzb3IoXG4gICAgICB0aGlzLmxvZ2dlcixcbiAgICAgIHRoaXMucmVkaXJlY3RvcixcbiAgICAgIHRoaXMubW9kdWxlXG4gICAgKVxuICAgIHRoaXMubW91c2VIZWxwZXIgPSBuZXcgTW91c2VIZWxwZXIodGhpcy5tb2R1bGUsIHRoaXMucmVkaXJlY3RvciwgMjAwKVxuICAgIHRoaXMua2V5Ym9hcmRIZWxwZXIgPSBuZXcgS2V5Qm9hcmRIZWxwZXIodGhpcy5tb2R1bGUsIHRoaXMucmVkaXJlY3RvcilcbiAgICB0aGlzLnJlZGlyZWN0b3Iub25Qcm9jZXNzRGF0YSA9IHRoaXMubW9kdWxlLnByb2Nlc3NEYXRhLmJpbmQodGhpcy5tb2R1bGUpXG4gICAgdGhpcy5yZWRpcmVjdG9yLm9uU3RhcnQgPSB0aGlzLm1vZHVsZS5zdGFydC5iaW5kKHRoaXMubW9kdWxlKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vbk5ld1N0YXRlID0gdGhpcy5tb2R1bGUub25TdGF0ZUNoYW5nZS5iaW5kKHRoaXMubW9kdWxlKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vblNlbmRLdm1EYXRhID0gdGhpcy5tb2R1bGUub25TZW5kS3ZtRGF0YS5iaW5kKHRoaXMubW9kdWxlKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vblN0YXRlQ2hhbmdlZCA9IHRoaXMub25Db25uZWN0aW9uU3RhdGVDaGFuZ2UuYmluZCh0aGlzKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vbkVycm9yID0gdGhpcy5vblJlZGlyZWN0b3JFcnJvci5iaW5kKHRoaXMpXG4gICAgdGhpcy5tb2R1bGUub25TZW5kID0gdGhpcy5yZWRpcmVjdG9yLnNlbmQuYmluZCh0aGlzLnJlZGlyZWN0b3IpXG4gICAgdGhpcy5tb2R1bGUub25Qcm9jZXNzRGF0YSA9IHRoaXMuZGF0YVByb2Nlc3Nvci5wcm9jZXNzRGF0YS5iaW5kKFxuICAgICAgdGhpcy5kYXRhUHJvY2Vzc29yXG4gICAgKVxuICAgIHRoaXMubW9kdWxlLmJwcCA9IHRoaXMuc2VsZWN0ZWRcbiAgICB0aGlzLm1vdXNlTW92ZSA9IGZyb21FdmVudCh0aGlzLmNhbnZhcz8ubmF0aXZlRWxlbWVudCwgJ21vdXNlbW92ZScpXG4gICAgdGhpcy5tb3VzZU1vdmUucGlwZSh0aHJvdHRsZVRpbWUoMjAwKSkuc3Vic2NyaWJlKChldmVudDogYW55KSA9PiB7XG4gICAgICBpZiAodGhpcy5tb3VzZUhlbHBlciAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMubW91c2VIZWxwZXIubW91c2Vtb3ZlKGV2ZW50KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBvbkNvbm5lY3Rpb25TdGF0ZUNoYW5nZSA9IChyZWRpcmVjdG9yOiBhbnksIHN0YXRlOiBudW1iZXIpOiBhbnkgPT4ge1xuICAgIHRoaXMuZGV2aWNlU3RhdHVzLmVtaXQoc3RhdGUpXG4gIH1cblxuICBvblJlZGlyZWN0b3JFcnJvcigpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2V0KClcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbnN0YW50aWF0ZSgpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmF1dG9Db25uZWN0KClcbiAgICB9LCA0MDAwKVxuICB9XG5cbiAgYXV0b0Nvbm5lY3QoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVkaXJlY3RvciAhPSBudWxsKSB7XG4gICAgICB0aGlzLnJlZGlyZWN0b3Iuc3RhcnQoV2ViU29ja2V0KVxuICAgICAgdGhpcy5rZXlib2FyZEhlbHBlci5HcmFiS2V5SW5wdXQoKVxuICAgIH1cbiAgfVxuXG4gIG9uRW5jb2RpbmdDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wS3ZtKClcbiAgICB0aW1lcigxMDAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5hdXRvQ29ubmVjdCgpXG4gICAgfSlcbiAgfVxuXG4gIHJlc2V0ID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMucmVkaXJlY3RvciA9IG51bGxcbiAgICB0aGlzLm1vZHVsZSA9IG51bGxcbiAgICB0aGlzLmRhdGFQcm9jZXNzb3IgPSBudWxsXG4gICAgdGhpcy5oZWlnaHQgPSA0MDBcbiAgICB0aGlzLndpZHRoID0gNDAwXG4gICAgdGhpcy5pbnN0YW50aWF0ZSgpXG4gIH1cblxuICBzdG9wS3ZtID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMucmVkaXJlY3Rvci5zdG9wKClcbiAgICB0aGlzLmtleWJvYXJkSGVscGVyLlVuR3JhYktleUlucHV0KClcbiAgICB0aGlzLnJlc2V0KClcbiAgfVxuXG4gIG9uTW91c2V1cChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vdXNlSGVscGVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMubW91c2VIZWxwZXIubW91c2V1cChldmVudClcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlZG93bihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vdXNlSGVscGVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMubW91c2VIZWxwZXIubW91c2Vkb3duKGV2ZW50KVxuICAgIH1cbiAgfVxuXG4gIG9uTW91c2Vtb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW91c2VIZWxwZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5tb3VzZUhlbHBlci5tb3VzZW1vdmUoZXZlbnQpXG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wS3ZtKClcbiAgfVxufVxuIiwiPGRpdj5cbiAgPGNhbnZhc1xuICAgIGNsYXNzPVwiY2FudmFzXCJcbiAgICAjY2FudmFzXG4gICAgW3dpZHRoXT1cIndpZHRoXCJcbiAgICBbaGVpZ2h0XT1cImhlaWdodFwiXG4gICAgb25jb250ZXh0bWVudT1cInJldHVybiBmYWxzZVwiXG4gICAgKG1vdXNldXApPVwib25Nb3VzZXVwKCRldmVudClcIlxuICAgIChtb3VzZWRvd24pPVwib25Nb3VzZWRvd24oJGV2ZW50KVwiXG4gICAgKG1vdXNlbW92ZSk9XCJvbk1vdXNlbW92ZSgkZXZlbnQpXCJcbiAgPjwvY2FudmFzPlxuPC9kaXY+XG4iXX0=