import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SolComponent } from './sol.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import * as i0 from "@angular/core";
export class SolModule {
    static forRoot(param) {
        return {
            ngModule: SolModule,
            providers: [
                {
                    provide: 'userInput',
                    useValue: param
                }
            ]
        };
    }
}
SolModule.ɵfac = function SolModule_Factory(t) { return new (t || SolModule)(); };
SolModule.ɵmod = i0.ɵɵdefineNgModule({ type: SolModule });
SolModule.ɵinj = i0.ɵɵdefineInjector({ imports: [[
            HttpClientModule,
            BrowserModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SolModule, { declarations: [SolComponent], imports: [HttpClientModule,
        BrowserModule], exports: [SolComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SolModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    SolComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29sLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3NvbC9zcmMvbGliL3NvbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHNCQUFzQixFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDckYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQTtBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTs7QUFldkQsTUFBTSxPQUFPLFNBQVM7SUFDYixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQVU7UUFDOUIsT0FBTztZQUNMLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsV0FBVztvQkFDcEIsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQzs7a0VBWFUsU0FBUzs2Q0FBVCxTQUFTO2lEQVRYO1lBQ1AsZ0JBQWdCO1lBQ2hCLGFBQWE7U0FDZDt3RkFNVSxTQUFTLG1CQVhsQixZQUFZLGFBR1osZ0JBQWdCO1FBQ2hCLGFBQWEsYUFHYixZQUFZO3VGQUlILFNBQVM7Y0FickIsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixZQUFZO2lCQUNiO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxnQkFBZ0I7b0JBQ2hCLGFBQWE7aUJBQ2Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7YUFDbEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQgeyBTb2xDb21wb25lbnQgfSBmcm9tICcuL3NvbC5jb21wb25lbnQnXG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlcidcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCdcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU29sQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFNvbENvbXBvbmVudFxuICBdLFxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgU29sTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KHBhcmFtOiBhbnkpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFNvbE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU29sTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiAndXNlcklucHV0JyxcbiAgICAgICAgICB1c2VWYWx1ZTogcGFyYW1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxufVxuIl19