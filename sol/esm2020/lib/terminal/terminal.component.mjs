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
TerminalComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TerminalComponent, selectors: [["amt-terminal"]], inputs: { term: "term" }, outputs: { handleKeyPress: "handleKeyPress" }, decls: 1, vars: 0, consts: [["id", "terminal", 1, "xtermDisplay", 2, "width", "fit-content"]], template: function TerminalComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "div", 0);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TerminalComponent, [{
        type: Component,
        args: [{ selector: 'amt-terminal', template: "<div id=\"terminal\" class=\"xtermDisplay\" style=\"width: fit-content;\"></div>\n" }]
    }], null, { term: [{
            type: Input
        }], handleKeyPress: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc29sL3NyYy9saWIvdGVybWluYWwvdGVybWluYWwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc29sL3NyYy9saWIvdGVybWluYWwvdGVybWluYWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUM5RSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTs7QUFNbkQsTUFBTSxPQUFPLGlCQUFpQjtJQUw5QjtRQU9ZLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUE7S0FzQnRFO0lBcEJDLFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEMsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDL0MsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFBO1lBQ25CLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQTtZQUNsQixJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO2dCQUNoRSxPQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQTthQUMvRDtpQkFBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO2dCQUN2RSxPQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNoRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDaEMsQ0FBQyxDQUFDLENBQUE7YUFDSDtpQkFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO2dCQUMzQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUN2QztRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQzs7a0ZBdkJVLGlCQUFpQjtvRUFBakIsaUJBQWlCO1FDUDlCLHlCQUEwRTs7dUZETzdELGlCQUFpQjtjQUw3QixTQUFTOzJCQUNFLGNBQWM7Z0JBS2YsSUFBSTtrQkFBWixLQUFLO1lBQ0ksY0FBYztrQkFBdkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgQywgViwgU1BBQ0UgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbXQtdGVybWluYWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGVybWluYWwuY29tcG9uZW50Lmh0bWwnXG59KVxuXG5leHBvcnQgY2xhc3MgVGVybWluYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSB0ZXJtOiBhbnlcbiAgQE91dHB1dCgpIGhhbmRsZUtleVByZXNzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpXG4gIGNvbnRhaW5lciE6IGFueVxuICBuZ09uSW5pdCAoKTogdm9pZCB7XG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVybWluYWwnKVxuICAgIHRoaXMudGVybS5vcGVuKHRoaXMuY29udGFpbmVyKVxuICAgIHRoaXMudGVybS5vbkRhdGEoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgdGhpcy5oYW5kbGVLZXlQcmVzcy5lbWl0KGRhdGEpXG4gICAgfSlcbiAgICB0aGlzLnRlcm0uYXR0YWNoQ3VzdG9tS2V5RXZlbnRIYW5kbGVyKChlOiBhbnkpID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgaWYgKGUuY3RybEtleSA9PT0gdHJ1ZSAmJiBlLnNoaWZ0S2V5ID09PSB0cnVlICYmIGUua2V5Q29kZSA9PT0gQykge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGhpcy50ZXJtLmdldFNlbGVjdGlvbigpKVxuICAgICAgfSBlbHNlIGlmIChlLmN0cmxLZXkgPT09IHRydWUgJiYgZS5zaGlmdEtleSA9PT0gdHJ1ZSAmJiBlLmtleUNvZGUgPT09IFYpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKS50aGVuKHRleHQgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlS2V5UHJlc3MuZW1pdCh0ZXh0KVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmIChlLmNvZGUgPT09IFNQQUNFKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZUtleVByZXNzLmVtaXQoZS5rZXkpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIiwiPGRpdiBpZD1cInRlcm1pbmFsXCIgY2xhc3M9XCJ4dGVybURpc3BsYXlcIiBzdHlsZT1cIndpZHRoOiBmaXQtY29udGVudDtcIj48L2Rpdj5cbiJdfQ==