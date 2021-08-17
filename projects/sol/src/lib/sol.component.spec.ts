import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AMTRedirector, AmtTerminal, ConsoleLogger } from '@open-amt-cloud-toolkit/ui-toolkit/core'
import { Terminal } from 'xterm'

import { SolComponent } from './sol.component'

describe('SolComponent', () => {
  let component: SolComponent
  let fixture: ComponentFixture<SolComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolComponent ],
      imports: [ RouterTestingModule],
      providers: [{
        provide: 'userInput',
          useValue: {
            mpsServer: 'https://localhost/mps'
          }
      }]

    })
    .compileComponents()
  })

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(SolComponent)
    component = fixture.componentInstance
    component.mpsServer = 'wss://localhost'
    component.authToken = 'authToken'
    tick(4500)
    fixture.detectChanges()
    flush()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
    expect(component.terminal).toBeInstanceOf(AmtTerminal)
    expect(component.term).toBeInstanceOf(Terminal)
    expect(component.redirector).toBeInstanceOf(AMTRedirector)
    expect(component.mpsServer).toEqual('wss://localhost')
    expect(component.authToken).toEqual('authToken')
    expect(component.logger).toBeInstanceOf(ConsoleLogger)
  })

  it('should stop the websocket and dispose terminal on sol stop', () => {
    const redirectorSpy = spyOn(AMTRedirector.prototype, 'stop')
    const cleanupSpy = spyOn(component, 'cleanup')
    const handleClearTerminalSpy = spyOn(component, 'handleClearTerminal')
    const disposeSpy = spyOn(Terminal.prototype, 'dispose')
    component.stopSol()

    expect(component.redirector).not.toBeNull()
    expect(redirectorSpy).toHaveBeenCalled()
    expect(handleClearTerminalSpy).toHaveBeenCalled()
    expect(disposeSpy).toHaveBeenCalled()
    expect(cleanupSpy).toHaveBeenCalled()
  })

  it('should update the terminal state on terminal state change', () => {
    spyOn(component.deviceStatus, 'emit')
    const state = 0
    component.onTerminalStateChange(component.redirector, state)
    expect(component.deviceStatus.emit).toHaveBeenCalled()
    expect(component.deviceState).toEqual(state)
  })

  it('should set null values to the core objects on cleanup', () => {
    component.cleanup()

    expect(component.redirector).toBeNull()
    expect(component.dataProcessor).toBeNull()
    expect(component.terminal).toBeNull()
    expect(component.term).toBeNull()
  })

  it('should write the string to xterm on write function is called', () => {
    spyOn(component.term, 'write')

    const xtermString = 'serialOverLAN'
    component.handleWriteToXterm(xtermString)
    expect(component.term.write).toHaveBeenCalled()
  })

  it('should send the keypress event to the core function', () => {
    spyOn(component.terminal, 'TermSendKeys')

    const domEvent = {
      code : 'A'
    }
    component.handleKeyPress(domEvent)
    expect(component.terminal.TermSendKeys).toHaveBeenCalled()
  })
})
