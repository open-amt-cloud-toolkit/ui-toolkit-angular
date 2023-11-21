import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AMTRedirector, Protocol, AMTIDER, RedirectorConfig } from '@open-amt-cloud-toolkit/ui-toolkit/core'

export interface IDERData {
  floppyRead: number
  floppyWrite: number
  cdromRead: number
  cdromWrite: number
}

@Component({
  selector: 'amt-ider',
  template: '',
  styles: []
})
export class IderComponent {
  redirector: AMTRedirector | null
  ider: AMTIDER | null
  data: IDERData | null
  deviceState = 0

  @Output() deviceStatus: EventEmitter<number> = new EventEmitter<number>()
  @Output() iderData: EventEmitter<IDERData> = new EventEmitter<IDERData>()

  @Input() deviceConnection: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() public cdrom: File | null = null
  @Input() public floppy: File | null = null
  @Input() public mpsServer = ''
  @Input() public authToken = ''
  @Input() public deviceId = ''

  ngOnInit (): void {
    this.deviceConnection.subscribe((data: boolean) => {
      if (data) {
        this.instantiate()
      } else {
        this.stopIder()
      }
    })
  }

  ngAfterViewInit (): void {
    this.instantiate()
  }

  startIder (): void {
    if (this.redirector != null) {
      this.redirector.start(WebSocket)
    }
  }

  instantiate (): void {
    const config: RedirectorConfig = {
      protocol: Protocol.IDER,
      fr: new FileReader(),
      host: this.deviceId,
      port: 16994,
      user: '',
      pass: '',
      tls: 0,
      tls1only: 0,
      authToken: this.authToken,
      server: this.mpsServer
    }
    this.redirector = new AMTRedirector(config)
    this.ider = new AMTIDER(this.redirector, this.cdrom, this.floppy)
    this.redirector.onNewState = this.ider.stateChange.bind(this.ider)
    this.redirector.onStateChanged = this.onConnectionStateChange.bind(this)
    this.redirector.onProcessData = this.ider.processData.bind(this.ider)
    this.ider.sectorStats = this.iderSectorStats.bind(this)
  }

  iderSectorStats (mode: number, dev: number, total: number, start: number, len: number): void {
    if (this.ider == null) {
      return
    }
    if (mode === 1) {
      if (dev === 0) { // Floppy
        this.ider.floppyRead += len * 512
      } else { // CD-ROM
        this.ider.cdromRead += len * 2048
      }
    } else {
      if (dev === 0) { // Floppy
        this.ider.floppyWrite += len * 512
      } else { // CD-ROM
        this.ider.cdromWrite += len * 2048
      }
    }
    this.iderData.emit({
      floppyRead: this.ider.floppyRead,
      cdromRead: this.ider.cdromRead,
      floppyWrite: this.ider.floppyWrite,
      cdromWrite: this.ider.cdromWrite
    })
  }

  onConnectionStateChange = (redirector: any, state: number): any => {
    this.deviceStatus.emit(state)
  }

  stopIder (): void {
    if (this.redirector !== null) {
      this.redirector.stop()
      this.cleanup()
    }
  }

  cleanup (): void {
    (this.redirector) = null;
    (this.ider) = null
  }

  ngOnDestroy (): void {
    if (this.ider != null) {
      this.ider.stop()
    }
  }
}
