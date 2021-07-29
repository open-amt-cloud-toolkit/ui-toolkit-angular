import { Component, Input, Output, EventEmitter } from '@angular/core';
import { C, V, SPACE } from '@angular/cdk/keycodes';
import * as i0 from "@angular/core";
export class TerminalComponent {
    constructor() {
        this.handleKeyPress = new EventEmitter();
    }
    ngOnInit() {
        this.container = document.getElementById('terminal');
        this.term.open(this.container);
        this.term.onData((data) => {
            this.handleKeyPress.emit(data);
        });
        this.term.attachCustomKeyEventHandler((e) => {
            e.stopPropagation();
            e.preventDefault();
            if (e.ctrlKey === true && e.shiftKey === true && e.keyCode === C) {
                return navigator.clipboard.writeText(this.term.getSelection());
            }
            else if (e.ctrlKey === true && e.shiftKey === true && e.keyCode === V) {
                return navigator.clipboard.readText().then(text => {
                    this.handleKeyPress.emit(text);
                });
            }
            else if (e.code === SPACE) {
                return this.handleKeyPress.emit(e.key);
            }
        });
    }
}
TerminalComponent.ɵfac = function TerminalComponent_Factory(t) { return new (t || TerminalComponent)(); };
TerminalComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TerminalComponent, selectors: [["amt-terminal"]], inputs: { term: "term" }, outputs: { handleKeyPress: "handleKeyPress" }, decls: 1, vars: 0, consts: [["id", "terminal", 1, "xtermDisplay", 2, "width", "fit-content"]], template: function TerminalComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "div", 0);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TerminalComponent, [{
        type: Component,
        args: [{
                selector: 'amt-terminal',
                templateUrl: './terminal.component.html'
            }]
    }], null, { term: [{
            type: Input
        }], handleKeyPress: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc29sL3NyYy9saWIvdGVybWluYWwvdGVybWluYWwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc29sL3NyYy9saWIvdGVybWluYWwvdGVybWluYWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUM5RSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTs7QUFNbkQsTUFBTSxPQUFPLGlCQUFpQjtJQUw5QjtRQU9jLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUE7S0FzQnhFO0lBcEJHLFFBQVE7UUFDSixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbEMsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDN0MsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFBO1lBQ25CLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQTtZQUNsQixJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO2dCQUM5RCxPQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQTthQUNqRTtpQkFBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO2dCQUNyRSxPQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDbEMsQ0FBQyxDQUFDLENBQUE7YUFDTDtpQkFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO2dCQUN6QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUN6QztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQzs7a0ZBdkJRLGlCQUFpQjtzREFBakIsaUJBQWlCO1FDUDlCLHlCQUEwRTs7dUZETzdELGlCQUFpQjtjQUw3QixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFdBQVcsRUFBRSwyQkFBMkI7YUFDM0M7Z0JBR1ksSUFBSTtrQkFBWixLQUFLO1lBQ0ksY0FBYztrQkFBdkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgQywgViwgU1BBQ0UgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FtdC10ZXJtaW5hbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Rlcm1pbmFsLmNvbXBvbmVudC5odG1sJ1xufSlcblxuZXhwb3J0IGNsYXNzIFRlcm1pbmFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSB0ZXJtOiBhbnlcbiAgICBAT3V0cHV0KCkgaGFuZGxlS2V5UHJlc3M6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KClcbiAgICBjb250YWluZXIhOiBhbnlcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVybWluYWwnKVxuICAgICAgICB0aGlzLnRlcm0ub3Blbih0aGlzLmNvbnRhaW5lcilcbiAgICAgICAgdGhpcy50ZXJtLm9uRGF0YSgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUtleVByZXNzLmVtaXQoZGF0YSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50ZXJtLmF0dGFjaEN1c3RvbUtleUV2ZW50SGFuZGxlcigoZTogYW55KSA9PiB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGlmIChlLmN0cmxLZXkgPT09IHRydWUgJiYgZS5zaGlmdEtleSA9PT0gdHJ1ZSAmJiBlLmtleUNvZGUgPT09IEMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGhpcy50ZXJtLmdldFNlbGVjdGlvbigpKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmN0cmxLZXkgPT09IHRydWUgJiYgZS5zaGlmdEtleSA9PT0gdHJ1ZSAmJiBlLmtleUNvZGUgPT09IFYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmNsaXBib2FyZC5yZWFkVGV4dCgpLnRoZW4odGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlS2V5UHJlc3MuZW1pdCh0ZXh0KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PT0gU1BBQ0UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVLZXlQcmVzcy5lbWl0KGUua2V5KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cbiIsIjxkaXYgaWQ9XCJ0ZXJtaW5hbFwiIGNsYXNzPVwieHRlcm1EaXNwbGF5XCIgc3R5bGU9XCJ3aWR0aDogZml0LWNvbnRlbnQ7XCI+PC9kaXY+XG4iXX0=