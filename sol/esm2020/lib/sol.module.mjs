import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SolComponent } from './sol.component';
import { TerminalComponent } from './terminal/terminal.component';
import * as i0 from "@angular/core";
export class SolModule {
}
SolModule.ɵfac = function SolModule_Factory(t) { return new (t || SolModule)(); };
SolModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SolModule });
SolModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[
            HttpClientModule,
            BrowserModule
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SolModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    SolComponent,
                    TerminalComponent
                ],
                imports: [
                    HttpClientModule,
                    BrowserModule
                ],
                exports: [
                    SolComponent
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SolModule, { declarations: [SolComponent,
        TerminalComponent], imports: [HttpClientModule,
        BrowserModule], exports: [SolComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29sLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3NvbC9zcmMvbGliL3NvbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUE7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFBOztBQWdCakUsTUFBTSxPQUFPLFNBQVM7O2tFQUFULFNBQVM7MkRBQVQsU0FBUzsrREFUWDtZQUNQLGdCQUFnQjtZQUNoQixhQUFhO1NBQ2Q7dUZBTVUsU0FBUztjQWRyQixRQUFRO2VBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLFlBQVk7b0JBQ1osaUJBQWlCO2lCQUNsQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsZ0JBQWdCO29CQUNoQixhQUFhO2lCQUNkO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxZQUFZO2lCQUNiO2dCQUNELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2FBQ2xDOzt3RkFDWSxTQUFTLG1CQVpsQixZQUFZO1FBQ1osaUJBQWlCLGFBR2pCLGdCQUFnQjtRQUNoQixhQUFhLGFBR2IsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJ1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xuaW1wb3J0IHsgU29sQ29tcG9uZW50IH0gZnJvbSAnLi9zb2wuY29tcG9uZW50J1xuaW1wb3J0IHsgVGVybWluYWxDb21wb25lbnQgfSBmcm9tICcuL3Rlcm1pbmFsL3Rlcm1pbmFsLmNvbXBvbmVudCdcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU29sQ29tcG9uZW50LFxuICAgIFRlcm1pbmFsQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFNvbENvbXBvbmVudFxuICBdLFxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgU29sTW9kdWxlIHtcbn1cbiJdfQ==