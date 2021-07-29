import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { SolComponent } from './sol.component'
import { TerminalComponent } from './terminal/terminal.component'

@NgModule({
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
})
export class SolModule {
}
