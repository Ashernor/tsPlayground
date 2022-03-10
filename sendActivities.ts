import * as fs from 'fs';
import sender from './activitySender';
import { ckTenants } from './files/ck-th/CK_tenants';
import { thTenants } from './files/ck-th/TH_tenants';

// ckTenants.forEach(tenant => {
//   const ckActivitySender = new sender('./files/ck-th/CK_sample.csv', 'view', tenant.trackerKey, ';');
//   ckActivitySender.sendActivities();
// });


// thTenants.forEach(tenant => {
//   const thActivitySender = new sender('./files/ck-th/TH_sample.csv', 'view', tenant.trackerKey, ';');
//   thActivitySender.sendActivities();
// });
  
//const ckActivitySender = new sender('./files/ck-th/CK_sample.csv', 'view', ckTenants[0].trackerKey, ';');
//ckActivitySender.sendActivities();


const dir = fs.opendirSync('files/ck-th/data/')
let dirent
while ((dirent = dir.readSync()) !== null) {
  const ckActivitySender = new sender(`files/ck-th/data/${dirent.name}`, 'view', ckTenants[0].trackerKey, ';');
  ckActivitySender.sendActivities();
}
dir.closeSync()