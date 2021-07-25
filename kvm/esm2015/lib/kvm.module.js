import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(KvmModule, { declarations: [KvmComponent], imports: [HttpClientModule,
        BrowserModule], exports: [KvmComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KvmModule, [{
        type: NgModule,
        args: [{
                declarations: [KvmComponent],
                imports: [
                    HttpClientModule,
                    BrowserModule,
                ],
                exports: [KvmComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3ZtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2t2bS9zcmMvbGliL2t2bS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFFBQVEsRUFDUixzQkFBc0IsRUFFdkIsTUFBTSxlQUFlLENBQUE7QUFDdEIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUM5QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQTs7QUFXdkQsTUFBTSxPQUFPLFNBQVM7SUFDYixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQVU7UUFDOUIsT0FBTztZQUNMLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsV0FBVztvQkFDcEIsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQzs7a0VBWFUsU0FBUzs2Q0FBVCxTQUFTO2lEQVJYO1lBQ1AsZ0JBQWdCO1lBQ2hCLGFBQWE7U0FDZDt3RkFLVSxTQUFTLG1CQVRMLFlBQVksYUFFekIsZ0JBQWdCO1FBQ2hCLGFBQWEsYUFFTCxZQUFZO3VGQUlYLFNBQVM7Y0FWckIsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDNUIsT0FBTyxFQUFFO29CQUNQLGdCQUFnQjtvQkFDaEIsYUFBYTtpQkFDZDtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2FBRWxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgTmdNb2R1bGUsXG4gIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsXG4gIE1vZHVsZVdpdGhQcm92aWRlcnNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJ1xuaW1wb3J0IHsgS3ZtQ29tcG9uZW50IH0gZnJvbSAnLi9rdm0uY29tcG9uZW50J1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbS3ZtQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW0t2bUNvbXBvbmVudF0sXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxuXG59KVxuZXhwb3J0IGNsYXNzIEt2bU1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChwYXJhbTogYW55KTogTW9kdWxlV2l0aFByb3ZpZGVyczxLdm1Nb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEt2bU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogJ3VzZXJJbnB1dCcsXG4gICAgICAgICAgdXNlVmFsdWU6IHBhcmFtXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbiJdfQ==