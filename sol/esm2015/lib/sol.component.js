import { Component, EventEmitter, Inject, Output, ViewEncapsulation, Input } from '@angular/core';
import { Terminal } from 'xterm';
import { AmtTerminal, AMTRedirector, TerminalDataProcessor, ConsoleLogger, Protocol, LogLevel } from '@open-amt-cloud-toolkit/ui-toolkit/core';
import { C, V, SPACE } from '@angular/cdk/keycodes';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class SolComponent {
    constructor(params, activatedRoute) {
        this.params = params;
        this.activatedRoute = activatedRoute;
        this.uuid = '';
        this.token = localStorage.getItem('loggedInUser');
        this.server = '';
        this.logger = new ConsoleLogger(LogLevel.ERROR);
        this.deviceStatus = new EventEmitter();
        this.deviceConnection = new EventEmitter();
        const loggedInUser = localStorage.getItem('loggedInUser');
        this.token = loggedInUser ? JSON.parse(loggedInUser).token : '{}';
        this.server = `${this.urlConstructor()}/relay`;
        this.mpsServer = this.params.mpsServer.includes('/mps');
        if (this.mpsServer) {
            this.server = `${this.urlConstructor()}/ws/relay`;
        }
    }
    urlConstructor() {
        return this.params.mpsServer.replace('http', 'ws');
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.uuid = params.id;
        });
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
        this.redirector = new AMTRedirector(this.logger, Protocol.SOL, new FileReader(), this.uuid, 16994, '', '', 0, 0, JSON.parse(this.token).token, this.server);
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
SolComponent.ɵfac = function SolComponent_Factory(t) { return new (t || SolComponent)(i0.ɵɵdirectiveInject('userInput'), i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
SolComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SolComponent, selectors: [["amt-sol"]], inputs: { deviceConnection: "deviceConnection" }, outputs: { deviceStatus: "deviceStatus" }, decls: 2, vars: 0, consts: [[1, "container"], ["id", "terminal", 1, "xtermDisplay", 2, "width", "fit-content"]], template: function SolComponent_Template(rf, ctx) { if (rf & 1) {
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
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: ['userInput']
            }] }, { type: i1.ActivatedRoute }]; }, { deviceStatus: [{
            type: Output
        }], deviceConnection: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3NvbC9zcmMvbGliL3NvbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zb2wvc3JjL2xpYi9zb2wuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFVLE1BQU0sRUFBRSxpQkFBaUIsRUFBYSxLQUFLLEVBQWlCLE1BQU0sZUFBZSxDQUFBO0FBQ25JLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUE7QUFDaEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQTtBQUU5SSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTs7O0FBUW5ELE1BQU0sT0FBTyxZQUFZO0lBY3ZCLFlBQXdDLE1BQU0sRUFBbUIsY0FBOEI7UUFBdkQsV0FBTSxHQUFOLE1BQU0sQ0FBQTtRQUFtQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFiL0YsU0FBSSxHQUFHLEVBQUUsQ0FBQTtRQU1ULFVBQUssR0FBUSxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQ2pELFdBQU0sR0FBRyxFQUFFLENBQUE7UUFFWCxXQUFNLEdBQWtCLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMvQyxpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFBO1FBQ2hFLHFCQUFnQixHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFBO1FBRzVFLE1BQU0sWUFBWSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDekQsSUFBSSxDQUFD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Q0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUE7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUE7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7SUFDbEIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDaEIsQ0FBQzs7d0VBM0lVLFlBQVksdUJBY0gsV0FBVztpREFkcEIsWUFBWTtRQ1p6Qiw4QkFBdUI7UUFDbkIseUJBQTBFO1FBQzlFLGlCQUFNOzt1RkRVTyxZQUFZO2NBTnhCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsV0FBVyxFQUFFLHNCQUFzQjtnQkFDbkMsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3RDOztzQkFlYyxNQUFNO3VCQUFDLFdBQVc7cURBSHJCLFlBQVk7a0JBQXJCLE1BQU07WUFDRSxnQkFBZ0I7a0JBQXhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBPbkluaXQsIE91dHB1dCwgVmlld0VuY2Fwc3VsYXRpb24sIE9uRGVzdHJveSwgSW5wdXQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgVGVybWluYWwgfSBmcm9tICd4dGVybSdcbmltcG9ydCB7IEFtdFRlcm1pbmFsLCBBTVRSZWRpcmVjdG9yLCBUZXJtaW5hbERhdGFQcm9jZXNzb3IsIENvbnNvbGVMb2dnZXIsIFByb3RvY29sLCBMb2dMZXZlbCB9IGZyb20gJ0BvcGVuLWFtdC1jbG91ZC10b29sa2l0L3VpLXRvb2xraXQvY29yZSdcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJ1xuaW1wb3J0IHsgQywgViwgU1BBQ0UgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FtdC1zb2wnLFxuICB0ZW1wbGF0ZVVybDogJy4vc29sLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc29sLmNvbXBvbmVudC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBTb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIHV1aWQgPSAnJ1xuICB0ZXJtaW5hbDogYW55XG4gIGNvbnRhaW5lciE6IGFueVxuICB0ZXJtOiBhbnlcbiAgcmVkaXJlY3RvcjogYW55XG4gIGRhdGFQcm9jZXNzb3I6IGFueVxuICB0b2tlbjogYW55ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlZEluVXNlcicpXG4gIHNlcnZlciA9ICcnXG4gIG1wc1NlcnZlcjogYm9vbGVhblxuICBsb2dnZXI6IENvbnNvbGVMb2dnZXIgPSBuZXcgQ29uc29sZUxvZ2dlcihMb2dMZXZlbC5FUlJPUilcbiAgQE91dHB1dCgpIGRldmljZVN0YXR1czogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKVxuICBASW5wdXQoKSBkZXZpY2VDb25uZWN0aW9uOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KClcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KCd1c2VySW5wdXQnKSBwdWJsaWMgcGFyYW1zLCBwcml2YXRlIHJlYWRvbmx5IGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgIGNvbnN0IGxvZ2dlZEluVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dnZWRJblVzZXInKVxuICAgIHRoaXMudG9rZW4gPSBsb2dnZWRJblVzZXIgPyBKU09OLnBhcnNlKGxvZ2dlZEluVXNlcikudG9rZW4gOiAne30nXG4gICAgdGhpcy5zZXJ2ZXIgPSBgJHt0aGlzLnVybENvbnN0cnVjdG9yKCl9L3JlbGF5YFxuICAgIHRoaXMubXBzU2VydmVyID0gdGhpcy5wYXJhbXMubXBzU2VydmVyLmluY2x1ZGVzKCcvbXBzJylcbiAgICBpZiAodGhpcy5tcHNTZXJ2ZXIpIHtcbiAgICAgIHRoaXMuc2VydmVyID0gYCR7dGhpcy51cmxDb25zdHJ1Y3RvcigpfS93cy9yZWxheWBcbiAgICB9XG4gIH1cblxuICB1cmxDb25zdHJ1Y3RvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBhcmFtcy5tcHNTZXJ2ZXIucmVwbGFjZSgnaHR0cCcsICd3cycpXG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgIHRoaXMudXVpZCA9IHBhcmFtcy5pZFxuICAgIH0pXG4gICAgdGhpcy5kZXZpY2VDb25uZWN0aW9uLnN1YnNjcmliZSgoZGF0YTogYm9vbGVhbikgPT4ge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgdGhpcy5pbml0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RvcFNvbCgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmluc3RhbnRpYXRlKClcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc3RhcnRTb2woKVxuICAgIH0sIDQwMDApXG4gIH1cblxuICBpbnN0YW50aWF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRlcm1pbmFsID0gbmV3IEFtdFRlcm1pbmFsKClcbiAgICB0aGlzLmRhdGFQcm9jZXNzb3IgPSBuZXcgVGVybWluYWxEYXRhUHJvY2Vzc29yKHRoaXMudGVybWluYWwpXG4gICAgdGhpcy5yZWRpcmVjdG9yID0gbmV3IEFNVFJlZGlyZWN0b3IoXG4gICAgICB0aGlzLmxvZ2dlcixcbiAgICAgIFByb3RvY29sLlNPTCxcbiAgICAgIG5ldyBGaWxlUmVhZGVyKCksXG4gICAgICB0aGlzLnV1aWQsIDE2OTk0LFxuICAgICAgJycsXG4gICAgICAnJyxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgSlNPTi5wYXJzZSh0aGlzLnRva2VuKS50b2tlbixcbiAgICAgIHRoaXMuc2VydmVyXG4gICAgICApXG4gICAgdGhpcy50ZXJtaW5hbC5vblNlbmQgPSB0aGlzLnJlZGlyZWN0b3Iuc2VuZC5iaW5kKHRoaXMucmVkaXJlY3RvcilcbiAgICB0aGlzLnJlZGlyZWN0b3Iub25OZXdTdGF0ZSA9IHRoaXMudGVybWluYWwuU3RhdGVDaGFuZ2UuYmluZCh0aGlzLnRlcm1pbmFsKVxuICAgIHRoaXMucmVkaXJlY3Rvci5vblN0YXRlQ2hhbmdlZCA9IHRoaXMub25UZXJtaW5hbFN0YXRlQ2hhbmdlLmJpbmQodGhpcylcbiAgICB0aGlzLnJlZGlyZWN0b3Iub25Qcm9jZXNzRGF0YSA9IHRoaXMuZGF0YVByb2Nlc3Nvci5wcm9jZXNzRGF0YS5iaW5kKHRoaXMpXG4gICAgdGhpcy5kYXRhUHJvY2Vzc29yLnByb2Nlc3NEYXRhVG9YdGVybSA9IHRoaXMuaGFuZGxlV3JpdGVUb1h0ZXJtLmJpbmQodGhpcylcbiAgICB0aGlzLmRhdGFQcm9jZXNzb3IuY2xlYXJUZXJtaW5hbCA9IHRoaXMuaGFuZGxlQ2xlYXJUZXJtaW5hbC5iaW5kKHRoaXMpXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVybWluYWwnKVxuICAgIHRoaXMudGVybSA9IG5ldyBUZXJtaW5hbCh7XG4gICAgICByb3dzOiAzMCxcbiAgICAgIGNvbHM6IDEwMCxcbiAgICAgIGN1cnNvclN0eWxlOiAnYmxvY2snLFxuICAgICAgZm9udFdlaWdodDogJ2JvbGQnXG4gICAgfSlcbiAgICB0aGlzLnRlcm0ub3Blbih0aGlzLmNvbnRhaW5lcilcbiAgICB0aGlzLnRlcm0ub25EYXRhKChkYXRhOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuaGFuZGxlS2V5UHJlc3MoZGF0YSlcbiAgICB9KVxuICAgIHRoaXMudGVybS5hdHRhY2hDdXN0b21LZXlFdmVudEhhbmRsZXIoKGU6IGFueSkgPT4ge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBpZiAoZS5jdHJsS2V5ID09PSB0cnVlICYmIGUuc2hpZnRLZXkgPT09IHRydWUgJiYgZS5rZXlDb2RlID09PSBDKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0aGlzLnRlcm0uZ2V0U2VsZWN0aW9uKCkpXG4gICAgICB9IGVsc2UgaWYgKGUuY3RybEtleSA9PT0gdHJ1ZSAmJiBlLnNoaWZ0S2V5ID09PSB0cnVlICYmIGUua2V5Q29kZSA9PT0gVikge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmNsaXBib2FyZC5yZWFkVGV4dCgpLnRoZW4odGV4dCA9PiB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVLZXlQcmVzcyh0ZXh0KVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT09IFNQQUNFKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZUtleVByZXNzKGUua2V5KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVLZXlQcmVzcyhkb21FdmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy50ZXJtaW5hbC5UZXJtU2VuZEtleXMoZG9tRXZlbnQpXG4gIH1cblxuICBoYW5kbGVDbGVhclRlcm1pbmFsKCk6IHZvaWQge1xuICAgIHRoaXMudGVybS5yZXNldCgpXG4gIH1cblxuICBoYW5kbGVXcml0ZVRvWHRlcm0oc3RyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnRlcm0ud3JpdGUoc3RyKVxuICB9XG5cbiAgb25UZXJtaW5hbFN0YXRlQ2hhbmdlKHJlZGlyZWN0b3I6IEFNVFJlZGlyZWN0b3IsIHN0YXRlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmRldmljZVN0YXR1cy5lbWl0KHN0YXRlKVxuICB9XG5cbiAgc3RhcnRTb2woKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVkaXJlY3RvciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5yZWRpcmVjdG9yLnN0YXJ0KFdlYlNvY2tldClcbiAgICB9XG4gIH1cblxuICBzdG9wU29sKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZGlyZWN0b3IgIT09IG51bGwpIHtcbiAgICAgIHRoaXMucmVkaXJlY3Rvci5zdG9wKClcbiAgICAgIHRoaXMuaGFuZGxlQ2xlYXJUZXJtaW5hbCgpXG4gICAgICB0aGlzLnRlcm0uZGlzcG9zZSgpXG4gICAgICB0aGlzLmNsZWFudXAoKVxuICAgIH1cbiAgfVxuXG4gIGNsZWFudXAoKTogdm9pZCB7XG4gICAgdGhpcy50ZXJtaW5hbCA9IG51bGxcbiAgICB0aGlzLnJlZGlyZWN0b3IgPSBudWxsXG4gICAgdGhpcy5kYXRhUHJvY2Vzc29yID0gbnVsbFxuICAgIHRoaXMudGVybSA9IG51bGxcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcFNvbCgpXG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICA8ZGl2IGlkPVwidGVybWluYWxcIiBjbGFzcz1cInh0ZXJtRGlzcGxheVwiIHN0eWxlPVwid2lkdGg6IGZpdC1jb250ZW50O1wiPjwvZGl2PlxuPC9kaXY+Il19