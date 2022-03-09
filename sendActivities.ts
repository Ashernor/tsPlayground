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
  
const ckActivitySender = new sender('./files/ck-th/CK_sample.csv', 'view', ckTenants[0].trackerKey, ';');
ckActivitySender.sendActivities();