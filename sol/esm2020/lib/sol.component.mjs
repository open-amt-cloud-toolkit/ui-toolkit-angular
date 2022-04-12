import { Component, EventEmitter, Output, ViewEncapsulation, Input } from '@angular/core';
import { Terminal } from 'xterm';
import { AmtTerminal, AMTRedirector, TerminalDataProcessor, ConsoleLogger, Protocol, LogLevel } from '@open-amt-cloud-toolkit/ui-toolkit/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./terminal/terminal.component";
function SolComponent_amt_terminal_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "amt-terminal", 2);
    i0.ɵɵlistener("handleKeyPress", function SolComponent_amt_terminal_1_Template_amt_terminal_handleKeyPress_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r1 = i0.ɵɵnextContext(); return ctx_r1.handleKeyPress($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("term", ctx_r0.term);
} }
export class SolComponent {
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
SolComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SolComponent, selectors: [["amt-sol"]], inputs: { deviceConnection: "deviceConnection", mpsServer: "mpsServer", authToken: "authToken", deviceId: "deviceId" }, outputs: { deviceStatus: "deviceStatus" }, decls: 2, vars: 1, consts: [[1, "container"], [3, "term", "handleKeyPress", 4, "ngIf"], [3, "term", "handleKeyPress"]], template: function SolComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, SolComponent_amt_terminal_1_Template, 1, 1, "amt-terminal", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.deviceState === 3);
    } }, directives: [i1.NgIf, i2.TerminalComponent], styles: [".container{display:block;text-align:center}.xtermDisplay{display:inline-block}\n"], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SolComponent, [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3NvbC9zcmMvbGliL3NvbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zb2wvc3JjL2xpYi9zb2wuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQVUsTUFBTSxFQUFFLGlCQUFpQixFQUFhLEtBQUssRUFBaUIsTUFBTSxlQUFlLENBQUE7QUFDM0gsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQTtBQUNoQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxxQkFBcUIsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLHlDQUF5QyxDQUFBOzs7Ozs7SUNEMUksdUNBQWdHO0lBQTFDLGdNQUFrQiw2QkFBc0IsSUFBQztJQUFDLGlCQUFlOzs7SUFBdkUsa0NBQWE7O0FEU3pELE1BQU0sT0FBTyxZQUFZO0lBTnpCO1FBWUUsZ0JBQVcsR0FBRyxDQUFDLENBQUE7UUFDZixXQUFNLEdBQWtCLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMvQyxpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFBO1FBQ2hFLHFCQUFnQixHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFBO1FBQzlELGNBQVMsR0FBRyxFQUFFLENBQUE7UUFDZCxjQUFTLEdBQUcsRUFBRSxDQUFBO1FBQ2QsYUFBUSxHQUFHLEVBQUUsQ0FBQTtLQThGOUI7SUE1RkMsUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFhLEVBQUUsRUFBRTtZQUNoRCxJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7YUFDWjtpQkFBTTtnQkFDTCxJQUFJLENBQUMs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QUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ3RCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDbkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ2Y7SUFDSCxDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFBO1FBQ3RCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0lBQ2xCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2hCLENBQUM7O3dFQXpHVSxZQUFZOytEQUFaLFlBQVk7UUNWekIsOEJBQXVCO1FBQ25CLCtFQUErRztRQUNuSCxpQkFBTTs7UUFEYSxlQUF1QjtRQUF2Qiw0Q0FBdUI7O3VGRFM3QixZQUFZO2NBTnhCLFNBQVM7MkJBQ0UsU0FBUyxpQkFHSixpQkFBaUIsQ0FBQyxJQUFJO2dCQVUzQixZQUFZO2tCQUFyQixNQUFNO1lBQ0UsZ0JBQWdCO2tCQUF4QixLQUFLO1lBQ1UsU0FBUztrQkFBeEIsS0FBSztZQUNVLFNBQVM7a0JBQXhCLEtBQUs7WUFDVSxRQUFRO2tCQUF2QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT3V0cHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgT25EZXN0cm95LCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgeyBUZXJtaW5hbCB9IGZyb20gJ3h0ZXJtJ1xuaW1wb3J0IHsgQW10VGVybWluYWwsIEFNVFJlZGlyZWN0b3IsIFRlcm1pbmFsRGF0YVByb2Nlc3NvciwgQ29uc29sZUxvZ2dlciwgUHJvdG9jb2wsIExvZ0xldmVsIH0gZnJvbSAnQG9wZW4tYW10LWNsb3VkLXRvb2xraXQvdWktdG9vbGtpdC9jb3JlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbXQtc29sJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NvbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NvbC5jb21wb25lbnQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgU29sQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICB0ZXJtaW5hbDogYW55XG4gIGNvbnRhaW5lciE6IGFueVxuICB0ZXJtOiBhbnlcbiAgcmVkaXJlY3RvcjogYW55XG4gIGRhdGFQcm9jZXNzb3I6IGFueVxuICBkZXZpY2VTdGF0ZSA9IDBcbiAgbG9nZ2VyOiBDb25zb2xlTG9nZ2VyID0gbmV3IENvbnNvbGVMb2dnZXIoTG9nTGV2ZWwuRVJST1IpXG4gIEBPdXRwdXQoKSBkZXZpY2VTdGF0dXM6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KClcbiAgQElucHV0KCkgZGV2aWNlQ29ubmVjdGlvbjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpXG4gIEBJbnB1dCgpIHB1YmxpYyBtcHNTZXJ2ZXIgPSAnJ1xuICBASW5wdXQoKSBwdWJsaWMgYXV0aFRva2VuID0gJydcbiAgQElucHV0KCkgcHVibGljIGRldmljZUlkID0gJydcblxuICBuZ09uSW5pdCAoKTogdm9pZCB7XG4gICAgdGhpcy5kZXZpY2VDb25uZWN0aW9uLnN1YnNjcmliZSgoZGF0YTogYm9vbGVhbikgPT4ge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgdGhpcy5pbml0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RvcFNvbCgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCAoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIGluaXQgKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zdGFudGlhdGUoKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zdGFydFNvbCgpXG4gICAgfSwgNDAwMClcbiAgfVxuXG4gIGluc3RhbnRpYXRlICgpOiB2b2lkIHtcbiAgICB0aGlzLnRlcm1pbmFsID0gbmV3IEFtdFRlcm1pbmFsKClcbiAgICB0aGlzLmRhdGFQcm9jZXNzb3IgPSBuZXcgVGVybWluYWxEYXRhUHJvY2Vzc29yKHRoaXMudGVybWluYWwpXG4gICAgdGhpcy5yZWRpcmVjdG9yID0gbmV3IEFNVFJlZGlyZWN0b3IoXG4gICAgICB0aGlzLmxvZ2dlcixcbiAgICAgIFByb3RvY29sLlNPTCxcbiAgICAgIG5ldyBGaWxlUmVhZGVyKCksXG4gICAgICB0aGlzLmRldmljZUlkLCAxNjk5NCxcbiAgICAgICcnLFxuICAgICAgJycsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIHRoaXMuYXV0aFRva2VuLFxuICAgICAgdGhpcy5tcHNTZXJ2ZXJcbiAgICApXG4gICAgdGhpcy50ZXJtaW5hbC5vblNlbmQgPSB0aGlzLnJlZGlyZWN0b3Iuc2VuZC5iaW5kKHRoaXMucmVkaXJlY3RvcilcbiAgICB0aGlzLnJlZGlyZWN0b3Iub25OZXdTdGF0ZSA9IHRoaXMudGVybWluYWwuU3RhdGVDaGFuZ2UuYmluZCh0aGlzLnRlcm1pbmFsKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vblN0YXRlQ2hhbmdlZCA9IHRoaXMub25UZXJtaW5hbFN0YXRlQ2hhbmdlLmJpbmQodGhpcylcbiAgICB0aGlzLnJlZGlyZWN0b3Iub25Qcm9jZXNzRGF0YSA9IHRoaXMuZGF0YVByb2Nlc3Nvci5wcm9jZXNzRGF0YS5iaW5kKHRoaXMpXG4gICAgdGhpcy5kYXRhUHJvY2Vzc29yLnByb2Nlc3NEYXRhVG9YdGVybSA9IHRoaXMuaGFuZGxlV3JpdGVUb1h0ZXJtLmJpbmQodGhpcylcbiAgICB0aGlzLmRhdGFQcm9jZXNzb3IuY2xlYXJUZXJtaW5hbCA9IHRoaXMuaGFuZGxlQ2xlYXJUZXJtaW5hbC5iaW5kKHRoaXMpXG4gICAgdGhpcy50ZXJtID0gbmV3IFRlcm1pbmFsKHtcbiAgICAgIHJvd3M6IDMwLFxuICAgICAgY29sczogMTAwLFxuICAgICAgY3Vyc29yU3R5bGU6ICdibG9jaycsXG4gICAgICBmb250V2VpZ2h0OiAnYm9sZCdcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlS2V5UHJlc3MgKGRvbUV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnRlcm1pbmFsLlRlcm1TZW5kS2V5cyhkb21FdmVudClcbiAgfVxuXG4gIGhhbmRsZUNsZWFyVGVybWluYWwgKCk6IHZvaWQge1xuICAgIHRoaXMudGVybS5yZXNldCgpXG4gIH1cblxuICBoYW5kbGVXcml0ZVRvWHRlcm0gKHN0cjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy50ZXJtLndyaXRlKHN0cilcbiAgfVxuXG4gIG9uVGVybWluYWxTdGF0ZUNoYW5nZSAocmVkaXJlY3RvcjogQU1UUmVkaXJlY3Rvciwgc3RhdGU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZGV2aWNlU3RhdHVzLmVtaXQoc3RhdGUpXG4gICAgdGhpcy5kZXZpY2VTdGF0ZSA9IHN0YXRlXG4gIH1cblxuICBzdGFydFNvbCAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVkaXJlY3RvciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5yZWRpcmVjdG9yLnN0YXJ0KFdlYlNvY2tldClcbiAgICB9XG4gIH1cblxuICBzdG9wU29sICgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWRpcmVjdG9yICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnJlZGlyZWN0b3Iuc3RvcCgpXG4gICAgICB0aGlzLmhhbmRsZUNsZWFyVGVybWluYWwoKVxuICAgICAgdGhpcy50ZXJtLmRpc3Bvc2UoKVxuICAgICAgdGhpcy5jbGVhbnVwKClcbiAgICB9XG4gIH1cblxuICBjbGVhbnVwICgpOiB2b2lkIHtcbiAgICB0aGlzLnRlcm1pbmFsID0gbnVsbFxuICAgIHRoaXMucmVkaXJlY3RvciA9IG51bGxcbiAgICB0aGlzLmRhdGFQcm9jZXNzb3IgPSBudWxsXG4gICAgdGhpcy50ZXJtID0gbnVsbFxuICB9XG5cbiAgbmdPbkRlc3Ryb3kgKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcFNvbCgpXG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICA8YW10LXRlcm1pbmFsICpuZ0lmPVwiZGV2aWNlU3RhdGUgPT09IDNcIiBbdGVybV09XCJ0ZXJtXCIgKGhhbmRsZUtleVByZXNzKT1cImhhbmRsZUtleVByZXNzKCRldmVudClcIj48L2FtdC10ZXJtaW5hbD5cbjwvZGl2PiJdfQ==