import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core'
import { SolComponent } from './sol.component'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
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
})
export class SolModule {
  public static forRoot(param: any): ModuleWithProviders<SolModule> {
    return {
      ngModule: SolModule,
      providers: [
        {
          provide: 'userInput',
          useValue: param
        }
      ]
    }
  }
}
