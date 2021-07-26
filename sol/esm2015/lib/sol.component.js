import { Component, EventEmitter, Output, ViewEncapsulation, Input } from '@angular/core';
import { Terminal } from 'xterm';
import { AmtTerminal, AMTRedirector, TerminalDataProcessor, ConsoleLogger, Protocol, LogLevel } from '@open-amt-cloud-toolkit/ui-toolkit/core';
import { C, V, SPACE } from '@angular/cdk/keycodes';
import * as i0 from "@angular/core";
export class SolComponent {
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
SolComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SolComponent, selectors: [["amt-sol"]], inputs: { deviceConnection: "deviceConnection", mpsServer: "mpsServer", authToken: "authToken", deviceId: "deviceId" }, outputs: { deviceStatus: "deviceStatus" }, decls: 2, vars: 0, consts: [[1, "container"], ["id", "terminal", 1, "xtermDisplay", 2, "width", "fit-content"]], template: function SolComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "div", 1);
        i0.ɵɵelementEnd();
    } }, styles: [".container{display:block;text-align:center}.xtermDisplay{display:inline-block}"], encapsulation: 2 });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3NvbC9zcmMvbGliL3NvbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zb2wvc3JjL2xpYi9zb2wuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQWtCLE1BQU0sRUFBRSxpQkFBaUIsRUFBYSxLQUFLLEVBQWlCLE1BQU0sZUFBZSxDQUFBO0FBQ25JLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUE7QUFDaEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQTtBQUU5SSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTs7QUFRbkQsTUFBTSxPQUFPLFlBQVk7SUFhdkI7UUFQQSxXQUFNLEdBQWtCLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMvQyxpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFBO1FBQ2hFLHFCQUFnQixHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFBO1FBQzlELGNBQVMsR0FBRyxFQUFFLENBQUE7UUFDZCxjQUFTLEdBQUcsRUFBRSxDQUFBO1FBQ2QsYUFBUSxHQUFHLEVBQUUsQ0FBQTtJQUk3QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFhLEVBQUUsRUFBRTtZQUNoRCxJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7YUFDWjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7YUFDZjtRQUNILENB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LENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ25CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNmO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQTtRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQTtRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQTtRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtJQUNsQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNoQixDQUFDOzt3RUE3SFUsWUFBWTtpREFBWixZQUFZO1FDWnpCLDhCQUF1QjtRQUNuQix5QkFBMEU7UUFDOUUsaUJBQU07O3VGRFVPLFlBQVk7Y0FOeEIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQixXQUFXLEVBQUUsc0JBQXNCO2dCQUNuQyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDbEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDdEM7c0NBUVcsWUFBWTtrQkFBckIsTUFBTTtZQUNFLGdCQUFnQjtrQkFBeEIsS0FBSztZQUNVLFNBQVM7a0JBQXhCLEtBQUs7WUFDVSxTQUFTO2tCQUF4QixLQUFLO1lBQ1UsUUFBUTtrQkFBdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIE9uSW5pdCwgT3V0cHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgT25EZXN0cm95LCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgeyBUZXJtaW5hbCB9IGZyb20gJ3h0ZXJtJ1xuaW1wb3J0IHsgQW10VGVybWluYWwsIEFNVFJlZGlyZWN0b3IsIFRlcm1pbmFsRGF0YVByb2Nlc3NvciwgQ29uc29sZUxvZ2dlciwgUHJvdG9jb2wsIExvZ0xldmVsIH0gZnJvbSAnQG9wZW4tYW10LWNsb3VkLXRvb2xraXQvdWktdG9vbGtpdC9jb3JlJ1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInXG5pbXBvcnQgeyBDLCBWLCBTUEFDRSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2RlcydcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYW10LXNvbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zb2wuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zb2wuY29tcG9uZW50LmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFNvbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgdGVybWluYWw6IGFueVxuICBjb250YWluZXIhOiBhbnlcbiAgdGVybTogYW55XG4gIHJlZGlyZWN0b3I6IGFueVxuICBkYXRhUHJvY2Vzc29yOiBhbnlcbiAgbG9nZ2VyOiBDb25zb2xlTG9nZ2VyID0gbmV3IENvbnNvbGVMb2dnZXIoTG9nTGV2ZWwuRVJST1IpXG4gIEBPdXRwdXQoKSBkZXZpY2VTdGF0dXM6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KClcbiAgQElucHV0KCkgZGV2aWNlQ29ubmVjdGlvbjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpXG4gIEBJbnB1dCgpIHB1YmxpYyBtcHNTZXJ2ZXIgPSAnJ1xuICBASW5wdXQoKSBwdWJsaWMgYXV0aFRva2VuID0gJydcbiAgQElucHV0KCkgcHVibGljIGRldmljZUlkID0gJydcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kZXZpY2VDb25uZWN0aW9uLnN1YnNjcmliZSgoZGF0YTogYm9vbGVhbikgPT4ge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgdGhpcy5pbml0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RvcFNvbCgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmluc3RhbnRpYXRlKClcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc3RhcnRTb2woKVxuICAgIH0sIDQwMDApXG4gIH1cblxuICBpbnN0YW50aWF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRlcm1pbmFsID0gbmV3IEFtdFRlcm1pbmFsKClcbiAgICB0aGlzLmRhdGFQcm9jZXNzb3IgPSBuZXcgVGVybWluYWxEYXRhUHJvY2Vzc29yKHRoaXMudGVybWluYWwpXG4gICAgdGhpcy5yZWRpcmVjdG9yID0gbmV3IEFNVFJlZGlyZWN0b3IoXG4gICAgICB0aGlzLmxvZ2dlcixcbiAgICAgIFByb3RvY29sLlNPTCxcbiAgICAgIG5ldyBGaWxlUmVhZGVyKCksXG4gICAgICB0aGlzLmRldmljZUlkLCAxNjk5NCxcbiAgICAgICcnLFxuICAgICAgJycsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIHRoaXMuYXV0aFRva2VuLFxuICAgICAgdGhpcy5tcHNTZXJ2ZXJcbiAgICAgIClcbiAgICB0aGlzLnRlcm1pbmFsLm9uU2VuZCA9IHRoaXMucmVkaXJlY3Rvci5zZW5kLmJpbmQodGhpcy5yZWRpcmVjdG9yKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vbk5ld1N0YXRlID0gdGhpcy50ZXJtaW5hbC5TdGF0ZUNoYW5nZS5iaW5kKHRoaXMudGVybWluYWwpXG4gICAgdGhpcy5yZWRpcmVjdG9yLm9uU3RhdGVDaGFuZ2VkID0gdGhpcy5vblRlcm1pbmFsU3RhdGVDaGFuZ2UuYmluZCh0aGlzKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vblByb2Nlc3NEYXRhID0gdGhpcy5kYXRhUHJvY2Vzc29yLnByb2Nlc3NEYXRhLmJpbmQodGhpcylcbiAgICB0aGlzLmRhdGFQcm9jZXNzb3IucHJvY2Vzc0RhdGFUb1h0ZXJtID0gdGhpcy5oYW5kbGVXcml0ZVRvWHRlcm0uYmluZCh0aGlzKVxuICAgIHRoaXMuZGF0YVByb2Nlc3Nvci5jbGVhclRlcm1pbmFsID0gdGhpcy5oYW5kbGVDbGVhclRlcm1pbmFsLmJpbmQodGhpcylcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXJtaW5hbCcpXG4gICAgdGhpcy50ZXJtID0gbmV3IFRlcm1pbmFsKHtcbiAgICAgIHJvd3M6IDMwLFxuICAgICAgY29sczogMTAwLFxuICAgICAgY3Vyc29yU3R5bGU6ICdibG9jaycsXG4gICAgICBmb250V2VpZ2h0OiAnYm9sZCdcbiAgICB9KVxuICAgIHRoaXMudGVybS5vcGVuKHRoaXMuY29udGFpbmVyKVxuICAgIHRoaXMudGVybS5vbkRhdGEoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgdGhpcy5oYW5kbGVLZXlQcmVzcyhkYXRhKVxuICAgIH0pXG4gICAgdGhpcy50ZXJtLmF0dGFjaEN1c3RvbUtleUV2ZW50SGFuZGxlcigoZTogYW55KSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGlmIChlLmN0cmxLZXkgPT09IHRydWUgJiYgZS5zaGlmdEtleSA9PT0gdHJ1ZSAmJiBlLmtleUNvZGUgPT09IEMpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRoaXMudGVybS5nZXRTZWxlY3Rpb24oKSlcbiAgICAgIH0gZWxzZSBpZiAoZS5jdHJsS2V5ID09PSB0cnVlICYmIGUuc2hpZnRLZXkgPT09IHRydWUgJiYgZS5rZXlDb2RlID09PSBWKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuY2xpcGJvYXJkLnJlYWRUZXh0KCkudGhlbih0ZXh0ID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZUtleVByZXNzKHRleHQpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PT0gU1BBQ0UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlS2V5UHJlc3MoZS5rZXkpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGhhbmRsZUtleVByZXNzKGRvbUV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnRlcm1pbmFsLlRlcm1TZW5kS2V5cyhkb21FdmVudClcbiAgfVxuXG4gIGhhbmRsZUNsZWFyVGVybWluYWwoKTogdm9pZCB7XG4gICAgdGhpcy50ZXJtLnJlc2V0KClcbiAgfVxuXG4gIGhhbmRsZVdyaXRlVG9YdGVybShzdHI6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudGVybS53cml0ZShzdHIpXG4gIH1cblxuICBvblRlcm1pbmFsU3RhdGVDaGFuZ2UocmVkaXJlY3RvcjogQU1UUmVkaXJlY3Rvciwgc3RhdGU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZGV2aWNlU3RhdHVzLmVtaXQoc3RhdGUpXG4gIH1cblxuICBzdGFydFNvbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWRpcmVjdG9yICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnJlZGlyZWN0b3Iuc3RhcnQoV2ViU29ja2V0KVxuICAgIH1cbiAgfVxuXG4gIHN0b3BTb2woKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVkaXJlY3RvciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5yZWRpcmVjdG9yLnN0b3AoKVxuICAgICAgdGhpcy5oYW5kbGVDbGVhclRlcm1pbmFsKClcbiAgICAgIHRoaXMudGVybS5kaXNwb3NlKClcbiAgICAgIHRoaXMuY2xlYW51cCgpXG4gICAgfVxuICB9XG5cbiAgY2xlYW51cCgpOiB2b2lkIHtcbiAgICB0aGlzLnRlcm1pbmFsID0gbnVsbFxuICAgIHRoaXMucmVkaXJlY3RvciA9IG51bGxcbiAgICB0aGlzLmRhdGFQcm9jZXNzb3IgPSBudWxsXG4gICAgdGhpcy50ZXJtID0gbnVsbFxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wU29sKClcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxkaXYgaWQ9XCJ0ZXJtaW5hbFwiIGNsYXNzPVwieHRlcm1EaXNwbGF5XCIgc3R5bGU9XCJ3aWR0aDogZml0LWNvbnRlbnQ7XCI+PC9kaXY+XG48L2Rpdj4iXX0=