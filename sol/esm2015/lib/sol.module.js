import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SolComponent } from './sol.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
            BrowserModule,
            BrowserAnimationsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SolModule, { declarations: [SolComponent], imports: [HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule], exports: [SolComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SolModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    SolComponent
                ],
                imports: [
                    HttpClientModule,
                    BrowserModule,
                    BrowserAnimationsModule
                ],
                exports: [
                    SolComponent
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29sLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3NvbC9zcmMvbGliL3NvbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHNCQUFzQixFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDckYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQTtBQUN6RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQTtBQUM5RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTs7QUFnQnZELE1BQU0sT0FBTyxTQUFTO0lBQ2IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFVO1FBQzlCLE9BQU87WUFDTCxRQUFRLEVBQUUsU0FBUztZQUNuQixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLFFBQVEsRUFBRSxLQUFLO2lCQUNoQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7O2tFQVhVLFNBQVM7NkNBQVQsU0FBUztpREFWWDtZQUNQLGdCQUFnQjtZQUNoQixhQUFhO1lBQ2IsdUJBQXVCO1NBQ3hCO3dGQU1VLFNBQVMsbUJBWmxCLFlBQVksYUFHWixnQkFBZ0I7UUFDaEIsYUFBYTtRQUNiLHVCQUF1QixhQUd2QixZQUFZO3VGQUlILFNBQVM7Y0FkckIsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixZQUFZO2lCQUNiO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxnQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2IsdUJBQXVCO2lCQUN4QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzthQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IFNvbENvbXBvbmVudCB9IGZyb20gJy4vc29sLmNvbXBvbmVudCdcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJ1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnXG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFNvbENvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBTb2xDb21wb25lbnRcbiAgXSxcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIFNvbE1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChwYXJhbTogYW55KTogTW9kdWxlV2l0aFByb3ZpZGVyczxTb2xNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNvbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogJ3VzZXJJbnB1dCcsXG4gICAgICAgICAgdXNlVmFsdWU6IHBhcmFtXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbiJdfQ==