import { ComponentFixture, TestBed } from '@angular/core/testing'
import { IderComponent } from './ider.component'
import { AMTRedirector, AMTIDER } from '@open-amt-cloud-toolkit/ui-toolkit/core'

describe('IderComponent', () => {
  let component: IderComponent
  let fixture: ComponentFixture<IderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IderComponent],
      providers: [{
        provide: 'userInput',
        useValue: {
          mpsServer: 'https://localhost/mps'
        }
      }]

    })
      .compileComponents()
    fixture = TestBed.createComponent(IderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should correctly instantiate redirector and ider', () => {
    component.mpsServer = 'testServer'
    component.authToken = 'testToken'
    component.deviceId = 'testDeviceId'

    component.instantiate()

    expect(component.redirector).toBeTruthy()
    expect(component.ider).toBeTruthy()

    expect(component.ider).toBeInstanceOf(AMTIDER)
    expect(component.redirector).toBeInstanceOf(AMTRedirector)

    expect(component.redirector?.server).toEqual('testServer')
    expect(component.redirector?.authToken).toEqual('testToken')
    expect(component.redirector?.host).toEqual('testDeviceId')
  })

  it('should emit device status', () => {
    spyOn(component.deviceStatus, 'emit')
    component.onConnectionStateChange(component.redirector, 1)
    expect(component.deviceStatus.emit).toHaveBeenCalledWith(1)
  })

  it('should call instantiate when deviceConnection emits true', () => {
    spyOn(component, 'instantiate')
    component.deviceConnection.emit(true)
    expect(component.instantiate).toHaveBeenCalled()
  })

  it('should call stopIder when deviceConnection emits false', () => {
    spyOn(component, 'stopIder')
    component.deviceConnection.emit(false)
    expect(component.stopIder).toHaveBeenCalled()
  })

  it('should emit updated iderData', () => {
    spyOn(component.iderData, 'emit')
    component.instantiate()
    component.iderSectorStats(1, 0, 0, 0, 2)
    expect(component.iderData.emit).toHaveBeenCalled()
  })

  it('should stop ider', () => {
    const redirectorSpy = spyOn(AMTRedirector.prototype, 'stop')
    const cleanupSpy = spyOn(component, 'cleanup')
    component.instantiate()
    component.stopIder()

    expect(component.ider).not.toBeNull()
    expect(component.redirector).not.toBeNull()
    expect(redirectorSpy).toHaveBeenCalled()
    expect(cleanupSpy).toHaveBeenCalled()
  })

  it('should stop ider on destroy', () => {
    const stopSpy = spyOn(AMTIDER.prototype, 'stop')
    component.instantiate()
    component.ngOnDestroy()
    expect(stopSpy).toHaveBeenCalled()
  })

  it('should set null values to the core objects on cleanup', () => {
    component.cleanup()

    expect(component.redirector).toBeNull()
    expect(component.ider).toBeNull()
  })
})
