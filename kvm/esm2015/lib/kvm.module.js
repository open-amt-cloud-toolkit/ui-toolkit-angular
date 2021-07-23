import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KvmComponent } from './kvm.component';
import { HttpClientModule } from '@angular/common/http';
import * as i0 from "@angular/core";
export class KvmModule {
    static forRoot(param) {
        return {
            ngModule: KvmModule,
            providers: [
                {
                    provide: 'userInput',
                    useValue: param
                }
            ]
        };
    }
}
KvmModule.ɵfac = function KvmModule_Factory(t) { return new (t || KvmModule)(); };
KvmModule.ɵmod = i0.ɵɵdefineNgModule({ type: KvmModule });
KvmModule.ɵinj = i0.ɵɵdefineInjector({ imports: [[
            HttpClientModule,
            BrowserModule,
            BrowserAnimationsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(KvmModule, { declarations: [KvmComponent], imports: [HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule], exports: [KvmComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KvmModule, [{
        type: NgModule,
        args: [{
                declarations: [KvmComponent],
                imports: [
                    HttpClientModule,
                    BrowserModule,
                    BrowserAnimationsModule
                ],
                exports: [KvmComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ZtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2t2bS9zcmMvbGliL2t2bS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFFBQVEsRUFDUixzQkFBc0IsRUFFdkIsTUFBTSxlQUFlLENBQUE7QUFDdEIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBQ3pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFBO0FBQzlFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUM5QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTs7QUFZdkQsTUFBTSxPQUFPLFNBQVM7SUFDYixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQVU7UUFDOUIsT0FBTztZQUNMLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsV0FBVztvQkFDcEIsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQzs7a0VBWFUsU0FBUzs2Q0FBVCxTQUFTO2lEQVRYO1lBQ1AsZ0JBQWdCO1lBQ2hCLGFBQWE7WUFDYix1QkFBdUI7U0FDeEI7d0ZBS1UsU0FBUyxtQkFWTCxZQUFZLGFBRXpCLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2IsdUJBQXVCLGFBRWYsWUFBWTt1RkFJWCxTQUFTO2NBWHJCLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQzVCLE9BQU8sRUFBRTtvQkFDUCxnQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2IsdUJBQXVCO2lCQUN4QjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2FBRWxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgTmdNb2R1bGUsXG4gIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsXG4gIE1vZHVsZVdpdGhQcm92aWRlcnNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJ1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnXG5pbXBvcnQgeyBLdm1Db21wb25lbnQgfSBmcm9tICcuL2t2bS5jb21wb25lbnQnXG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtLdm1Db21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtLdm1Db21wb25lbnRdLFxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cblxufSlcbmV4cG9ydCBjbGFzcyBLdm1Nb2R1bGUge1xuICBwdWJsaWMgc3RhdGljIGZvclJvb3QocGFyYW06IGFueSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8S3ZtTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBLdm1Nb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6ICd1c2VySW5wdXQnLFxuICAgICAgICAgIHVzZVZhbHVlOiBwYXJhbVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG59XG4iXX0=