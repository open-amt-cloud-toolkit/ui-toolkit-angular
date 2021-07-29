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
SolComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SolComponent, selectors: [["amt-sol"]], inputs: { deviceConnection: "deviceConnection", mpsServer: "mpsServer", authToken: "authToken", deviceId: "deviceId" }, outputs: { deviceStatus: "deviceStatus" }, decls: 2, vars: 1, consts: [[1, "container"], [3, "term", "handleKeyPress", 4, "ngIf"], [3, "term", "handleKeyPress"]], template: function SolComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, SolComponent_amt_terminal_1_Template, 1, 1, "amt-terminal", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.deviceState === 3);
    } }, directives: [i1.NgIf, i2.TerminalComponent], styles: [".container{display:block;text-align:center}.xtermDisplay{display:inline-block}"], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SolComponent, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3NvbC9zcmMvbGliL3NvbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zb2wvc3JjL2xpYi9zb2wuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQVUsTUFBTSxFQUFFLGlCQUFpQixFQUFhLEtBQUssRUFBaUIsTUFBTSxlQUFlLENBQUE7QUFDM0gsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQTtBQUNoQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxxQkFBcUIsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLHlDQUF5QyxDQUFBOzs7Ozs7SUNEMUksdUNBQWdHO0lBQTFDLGlPQUF5QztJQUFDLGlCQUFlOzs7SUFBdkUsa0NBQWE7O0FEU3pELE1BQU0sT0FBTyxZQUFZO0lBY3ZCO1FBUkEsZ0JBQVcsR0FBRyxDQUFDLENBQUE7UUFDZixXQUFNLEdBQWtCLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMvQyxpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFBO1FBQ2hFLHFCQUFnQixHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFBO1FBQzlELGNBQVMsR0FBRyxFQUFFLENBQUE7UUFDZCxjQUFTLEdBQUcsRUFBRSxDQUFBO1FBQ2QsYUFBUSxHQUFHLEVBQUUsQ0FBQTtJQUk3QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFhLEVBQUUsRUFBRTtZQUNoRCxJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7YUFDWjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsT0FBTyxFQUFF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LENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ3RCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDbkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ2Y7SUFDSCxDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFBO1FBQ3RCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0lBQ2xCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2hCLENBQUM7O3dFQTlHVSxZQUFZO2lEQUFaLFlBQVk7UUNWekIsOEJBQXVCO1FBQ25CLCtFQUErRztRQUNuSCxpQkFBTTs7UUFEYSxlQUF1QjtRQUF2Qiw0Q0FBdUI7O3VGRFM3QixZQUFZO2NBTnhCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsV0FBVyxFQUFFLHNCQUFzQjtnQkFDbkMsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3RDO3NDQVNXLFlBQVk7a0JBQXJCLE1BQU07WUFDRSxnQkFBZ0I7a0JBQXhCLEtBQUs7WUFDVSxTQUFTO2tCQUF4QixLQUFLO1lBQ1UsU0FBUztrQkFBeEIsS0FBSztZQUNVLFFBQVE7a0JBQXZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkRlc3Ryb3ksIElucHV0LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IFRlcm1pbmFsIH0gZnJvbSAneHRlcm0nXG5pbXBvcnQgeyBBbXRUZXJtaW5hbCwgQU1UUmVkaXJlY3RvciwgVGVybWluYWxEYXRhUHJvY2Vzc29yLCBDb25zb2xlTG9nZ2VyLCBQcm90b2NvbCwgTG9nTGV2ZWwgfSBmcm9tICdAb3Blbi1hbXQtY2xvdWQtdG9vbGtpdC91aS10b29sa2l0L2NvcmUnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FtdC1zb2wnLFxuICB0ZW1wbGF0ZVVybDogJy4vc29sLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc29sLmNvbXBvbmVudC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBTb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIHRlcm1pbmFsOiBhbnlcbiAgY29udGFpbmVyITogYW55XG4gIHRlcm06IGFueVxuICByZWRpcmVjdG9yOiBhbnlcbiAgZGF0YVByb2Nlc3NvcjogYW55XG4gIGRldmljZVN0YXRlID0gMFxuICBsb2dnZXI6IENvbnNvbGVMb2dnZXIgPSBuZXcgQ29uc29sZUxvZ2dlcihMb2dMZXZlbC5FUlJPUilcbiAgQE91dHB1dCgpIGRldmljZVN0YXR1czogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKVxuICBASW5wdXQoKSBkZXZpY2VDb25uZWN0aW9uOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KClcbiAgQElucHV0KCkgcHVibGljIG1wc1NlcnZlciA9ICcnXG4gIEBJbnB1dCgpIHB1YmxpYyBhdXRoVG9rZW4gPSAnJ1xuICBASW5wdXQoKSBwdWJsaWMgZGV2aWNlSWQgPSAnJ1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRldmljZUNvbm5lY3Rpb24uc3Vic2NyaWJlKChkYXRhOiBib29sZWFuKSA9PiB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICB0aGlzLmluaXQoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdG9wU29sKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5zdGFudGlhdGUoKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zdGFydFNvbCgpXG4gICAgfSwgNDAwMClcbiAgfVxuXG4gIGluc3RhbnRpYXRlKCk6IHZvaWQge1xuICAgIHRoaXMudGVybWluYWwgPSBuZXcgQW10VGVybWluYWwoKVxuICAgIHRoaXMuZGF0YVByb2Nlc3NvciA9IG5ldyBUZXJtaW5hbERhdGFQcm9jZXNzb3IodGhpcy50ZXJtaW5hbClcbiAgICB0aGlzLnJlZGlyZWN0b3IgPSBuZXcgQU1UUmVkaXJlY3RvcihcbiAgICAgIHRoaXMubG9nZ2VyLFxuICAgICAgUHJvdG9jb2wuU09MLFxuICAgICAgbmV3IEZpbGVSZWFkZXIoKSxcbiAgICAgIHRoaXMuZGV2aWNlSWQsIDE2OTk0LFxuICAgICAgJycsXG4gICAgICAnJyxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgdGhpcy5hdXRoVG9rZW4sXG4gICAgICB0aGlzLm1wc1NlcnZlclxuICAgICAgKVxuICAgIHRoaXMudGVybWluYWwub25TZW5kID0gdGhpcy5yZWRpcmVjdG9yLnNlbmQuYmluZCh0aGlzLnJlZGlyZWN0b3IpXG4gICAgdGhpcy5yZWRpcmVjdG9yLm9uTmV3U3RhdGUgPSB0aGlzLnRlcm1pbmFsLlN0YXRlQ2hhbmdlLmJpbmQodGhpcy50ZXJtaW5hbClcbiAgICB0aGlzLnJlZGlyZWN0b3Iub25TdGF0ZUNoYW5nZWQgPSB0aGlzLm9uVGVybWluYWxTdGF0ZUNoYW5nZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5yZWRpcmVjdG9yLm9uUHJvY2Vzc0RhdGEgPSB0aGlzLmRhdGFQcm9jZXNzb3IucHJvY2Vzc0RhdGEuYmluZCh0aGlzKVxuICAgIHRoaXMuZGF0YVByb2Nlc3Nvci5wcm9jZXNzRGF0YVRvWHRlcm0gPSB0aGlzLmhhbmRsZVdyaXRlVG9YdGVybS5iaW5kKHRoaXMpXG4gICAgdGhpcy5kYXRhUHJvY2Vzc29yLmNsZWFyVGVybWluYWwgPSB0aGlzLmhhbmRsZUNsZWFyVGVybWluYWwuYmluZCh0aGlzKVxuICAgIHRoaXMudGVybSA9IG5ldyBUZXJtaW5hbCh7XG4gICAgICByb3dzOiAzMCxcbiAgICAgIGNvbHM6IDEwMCxcbiAgICAgIGN1cnNvclN0eWxlOiAnYmxvY2snLFxuICAgICAgZm9udFdlaWdodDogJ2JvbGQnXG4gICAgfSlcbiAgfVxuXG5cbiAgaGFuZGxlS2V5UHJlc3MoZG9tRXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudGVybWluYWwuVGVybVNlbmRLZXlzKGRvbUV2ZW50KVxuICB9XG5cbiAgaGFuZGxlQ2xlYXJUZXJtaW5hbCgpOiB2b2lkIHtcbiAgICB0aGlzLnRlcm0ucmVzZXQoKVxuICB9XG5cbiAgaGFuZGxlV3JpdGVUb1h0ZXJtKHN0cjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy50ZXJtLndyaXRlKHN0cilcbiAgfVxuXG4gIG9uVGVybWluYWxTdGF0ZUNoYW5nZShyZWRpcmVjdG9yOiBBTVRSZWRpcmVjdG9yLCBzdGF0ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5kZXZpY2VTdGF0dXMuZW1pdChzdGF0ZSlcbiAgICB0aGlzLmRldmljZVN0YXRlID0gc3RhdGVcbiAgfVxuXG4gIHN0YXJ0U29sKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZGlyZWN0b3IgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucmVkaXJlY3Rvci5zdGFydChXZWJTb2NrZXQpXG4gICAgfVxuICB9XG5cbiAgc3RvcFNvbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWRpcmVjdG9yICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnJlZGlyZWN0b3Iuc3RvcCgpXG4gICAgICB0aGlzLmhhbmRsZUNsZWFyVGVybWluYWwoKVxuICAgICAgdGhpcy50ZXJtLmRpc3Bvc2UoKVxuICAgICAgdGhpcy5jbGVhbnVwKClcbiAgICB9XG4gIH1cblxuICBjbGVhbnVwKCk6IHZvaWQge1xuICAgIHRoaXMudGVybWluYWwgPSBudWxsXG4gICAgdGhpcy5yZWRpcmVjdG9yID0gbnVsbFxuICAgIHRoaXMuZGF0YVByb2Nlc3NvciA9IG51bGxcbiAgICB0aGlzLnRlcm0gPSBudWxsXG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BTb2woKVxuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGFtdC10ZXJtaW5hbCAqbmdJZj1cImRldmljZVN0YXRlID09PSAzXCIgW3Rlcm1dPVwidGVybVwiIChoYW5kbGVLZXlQcmVzcyk9XCJoYW5kbGVLZXlQcmVzcygkZXZlbnQpXCI+PC9hbXQtdGVybWluYWw+XG48L2Rpdj4iXX0=