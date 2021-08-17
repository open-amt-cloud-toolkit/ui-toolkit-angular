import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing'

import { KvmComponent } from './kvm.component'
import { RouterTestingModule } from '@angular/router/testing'
import { AMTDesktop, AMTRedirector, ConsoleLogger, DataProcessor, KeyBoardHelper, MouseHelper } from '@open-amt-cloud-toolkit/ui-toolkit/core'
import { EventEmitter } from '@angular/core'

describe('KvmComponent', () => {
  let component: KvmComponent
  let fixture: ComponentFixture<KvmComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KvmComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents()
  })

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(KvmComponent)
    component = fixture.componentInstance
    component.mpsServer = 'wss://localhost'
    component.authToken = 'authToken'
    tick(4500)
    fixture.detectChanges()
    flush()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
    expect(component.redirector).toBeInstanceOf(AMTRedirector)
    expect(component.module).toBeInstanceOf(AMTDesktop)
    expect(component.logger).toBeInstanceOf(ConsoleLogger)
    expect(component.mouseHelper).toBeInstanceOf(MouseHelper)
    expect(component.keyboardHelper).toBeInstanceOf(KeyBoardHelper)
    expect(component.dataProcessor).toBeInstanceOf(DataProcessor)
    expect(component.selected).toEqual(1)
    expect(component.encodings.length).toEqual(2)
    expect(component.mpsServer).toEqual('wss://localhost')
    expect(component.authToken).toEqual('authToken')

  })

  it('should reset all the objects once kvm is stopped', () => {
    spyOn(component.redirector, 'stop')
    spyOn(component.keyboardHelper, 'UnGrabKeyInput')
    const resetSpy = spyOn(component, 'reset')
    component.stopKvm()
    expect(component.redirector.stop).toHaveBeenCalled()
    expect(component.keyboardHelper.UnGrabKeyInput).toHaveBeenCalled()
    expect(resetSpy).toHaveBeenCalled()
  })

  it('should disconnect the active KVM session if there is an encoding change', fakeAsync(() => {
    const stopKvmSpy = spyOn(component, 'stopKvm')
    const autoConnectSpy = spyOn(component, 'autoConnect')
    component.selectedEncoding.emit(1)
    tick(1100)
    fixture.detectChanges()
    expect(component.selected).toEqual(1)
    expect(stopKvmSpy).toHaveBeenCalled()
    expect(autoConnectSpy).toHaveBeenCalled()
    flush()
  }))

  it('should reset and re-instantiate the core objects on error', () => {
    const resetSpy = spyOn(component, 'reset')
    component.onRedirectorError()

    expect(resetSpy).toHaveBeenCalled()
  })

  it('should trigger the core components method on mouse interactions', () => {
    spyOn(component.mouseHelper, 'mousedown')
    spyOn(component.mouseHelper, 'mouseup')
    spyOn(component.mouseHelper, 'mousemove')

    const event: any = {
      button: 1,
      pageX: 100,
      pageY: 211
    }
    component.onMousedown(event)
    expect(component.mouseHelper).not.toBeNull()
    expect(component.mouseHelper.mousedown).toHaveBeenCalled()

    component.onMouseup(event)
    expect(component.mouseHelper).not.toBeNull()
    expect(component.mouseHelper.mouseup).toHaveBeenCalled()

    component.onMousemove(event)
    expect(component.mouseHelper).not.toBeNull()
    expect(component.mouseHelper.mousemove).toHaveBeenCalled()
  })

})
