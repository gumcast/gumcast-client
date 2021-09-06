import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: 'f2f7d17e-fea3-4b75-9038-2c4cd34d61eb',
  clientToken: 'pub2770b1a586c8f6bcc6ec2f0ae7d08939',
  site: 'datadoghq.com',
  service: 'gumcast-client',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  trackInteractions: true
})
